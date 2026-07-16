"use server";

import { adminDb } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const MAX_ATTEMPTS = 5;
const BLOCK_MINUTES = 15;

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function loginAdmin(formData: FormData) {
  const cle = (formData.get("cle") as string)?.trim();
  if (!cle || cle.length > 128) { redirect("/gestion/login?error=required"); return; }

  const hdrs = await headers();
  // Use rightmost IP (trusted proxy) to resist X-Forwarded-For spoofing
  const forwardedFor = hdrs.get("x-forwarded-for") ?? "";
  const ips = forwardedFor.split(",").map(s => s.trim()).filter(Boolean);
  const ip = ips[ips.length - 1] ?? hdrs.get("x-real-ip") ?? "unknown";
  // Also rate-limit by key prefix so distributed IPs can't bypass the block
  const cleKey = `cle:${cle.slice(0, 32)}`;

  const [{ data: ipAttempt }, { data: cleAttempt }] = await Promise.all([
    adminDb.from("login_attempts").select("count, blocked_until").eq("ip", ip).maybeSingle(),
    adminDb.from("login_attempts").select("count, blocked_until").eq("ip", cleKey).maybeSingle(),
  ]);

  const blocked = (a: typeof ipAttempt) =>
    a?.blocked_until && new Date(a.blocked_until) > new Date();

  if (blocked(ipAttempt) || blocked(cleAttempt)) {
    redirect("/gestion/login?error=blocked");
    return;
  }

  const { data } = await adminDb
    .from("admin_users")
    .select("id, nom, role")
    .eq("cle", cle)
    .eq("actif", true)
    .single();

  if (!data || data.role !== "superadmin") {
    const newIpCount = (ipAttempt?.count ?? 0) + 1;
    const newCleCount = (cleAttempt?.count ?? 0) + 1;
    const blockedAt = (n: number) =>
      n >= MAX_ATTEMPTS
        ? new Date(Date.now() + BLOCK_MINUTES * 60 * 1000).toISOString()
        : null;

    await Promise.all([
      adminDb.from("login_attempts").upsert(
        { ip, count: newIpCount, blocked_until: blockedAt(newIpCount), updated_at: new Date().toISOString() },
        { onConflict: "ip" }
      ),
      adminDb.from("login_attempts").upsert(
        { ip: cleKey, count: newCleCount, blocked_until: blockedAt(newCleCount), updated_at: new Date().toISOString() },
        { onConflict: "ip" }
      ),
    ]);

    redirect("/gestion/login?error=invalid");
    return;
  }

  await Promise.all([
    adminDb.from("login_attempts").delete().eq("ip", ip),
    adminDb.from("login_attempts").delete().eq("ip", cleKey),
  ]);

  const jar = await cookies();
  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
  jar.set("taxibe_admin", data.id, { ...cookieOpts, maxAge: 60 * 60 * 24 * 7 });
  jar.set("taxibe_admin_nom", data.nom, { ...cookieOpts, maxAge: 60 * 60 * 24 * 7 });
  jar.set("taxibe_admin_role", data.role ?? "lecteur", { ...cookieOpts, maxAge: 60 * 60 * 24 * 7 });

  redirect("/gestion");
}

export async function logoutAdmin() {
  const jar = await cookies();
  jar.delete("taxibe_admin");
  jar.delete("taxibe_admin_nom");
  jar.delete("taxibe_admin_role");
  redirect("/gestion/login");
}

// ── Parametres (texte) ────────────────────────────────────────────────────────

export async function saveParam(formData: FormData) {
  await requireAdmin();
  const cle = (formData.get("cle") as string)?.trim();
  const valeur = ((formData.get("valeur") as string) ?? "").trim().slice(0, 2000);
  if (!cle) return;
  await adminDb.from("parametres").upsert({ cle, valeur }, { onConflict: "cle" });
}

// ── Chat ──────────────────────────────────────────────────────────────────────

export async function sendAdminMessage(formData: FormData) {
  await requireAdmin();
  const session_id = (formData.get("session_id") as string)?.trim();
  const contenu = (formData.get("contenu") as string)?.trim().slice(0, 1000);
  const admin_nom = (formData.get("admin_nom") as string)?.trim().slice(0, 100) || "Admin";
  if (!session_id || !contenu) return;
  await adminDb.from("chat_messages").insert({ session_id, contenu, expediteur: "admin", admin_nom });
  await adminDb.from("chat_sessions").update({ last_message_at: new Date().toISOString() }).eq("id", session_id);
}

export async function closeChatSession(formData: FormData) {
  await requireAdmin();
  const session_id = (formData.get("session_id") as string)?.trim();
  if (!session_id) return;
  await adminDb.from("chat_sessions").update({ statut: "ferme" }).eq("id", session_id);
}

export async function getUnreadChatCount(): Promise<number> {
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const { count } = await adminDb
    .from("chat_messages")
    .select("*", { count: "exact", head: true })
    .eq("expediteur", "visiteur")
    .eq("lu", false)
    .gte("created_at", since);
  return count ?? 0;
}

// ── Actualites ────────────────────────────────────────────────────────────────

export async function getActualites() {
  const { data } = await adminDb
    .from("actualites")
    .select("id, image_url, texte, publie, ordre, created_at")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function toggleActualite(id: string, publie: boolean) {
  await requireAdmin();
  await adminDb.from("actualites").update({ publie }).eq("id", id);
}

export async function deleteActualite(id: string) {
  await requireAdmin();
  await adminDb.from("actualites").delete().eq("id", id);
}

export async function createActualite(formData: FormData) {
  await requireAdmin();
  const image_url = formData.get("image_url") as string;
  const texte = (formData.get("texte") as string)?.slice(0, 300);
  const contenu = (formData.get("contenu") as string)?.slice(0, 50000) || null;
  const lien = (formData.get("lien") as string) || null;
  const publie = formData.get("publie") === "true";
  const ordre = parseInt((formData.get("ordre") as string) || "0");

  if (!image_url || !texte) { redirect("/gestion/actualites"); return; }

  await adminDb.from("actualites").insert({ image_url, texte, contenu, lien, publie, ordre });
  redirect("/gestion/actualites");
}

export async function updateActualite(id: string, formData: FormData) {
  await requireAdmin();
  const image_url = formData.get("image_url") as string;
  const texte = (formData.get("texte") as string)?.slice(0, 300);
  const contenu = (formData.get("contenu") as string)?.slice(0, 50000) || null;
  const lien = (formData.get("lien") as string) || null;
  const publie = formData.get("publie") === "true";
  const ordre = parseInt((formData.get("ordre") as string) || "0");

  await adminDb.from("actualites").update({ image_url, texte, contenu, lien, publie, ordre }).eq("id", id);
  redirect("/gestion/actualites");
}

// ── Spotlight ─────────────────────────────────────────────────────────────────

export async function getSpotlight() {
  const { data } = await adminDb
    .from("spotlight")
    .select("id, image_url, titre, sous_titre, cta_label, cta_url, publie, ordre, created_at")
    .order("ordre", { ascending: true });
  return data ?? [];
}

export async function toggleSpotlight(id: string, publie: boolean) {
  await requireAdmin();
  await adminDb.from("spotlight").update({ publie }).eq("id", id);
}

export async function deleteSpotlight(id: string) {
  await requireAdmin();
  await adminDb.from("spotlight").delete().eq("id", id);
}

export async function createSpotlight(formData: FormData) {
  await requireAdmin();
  const image_url = formData.get("image_url") as string;
  const titre = (formData.get("titre") as string)?.slice(0, 200);
  const sous_titre = (formData.get("sous_titre") as string)?.slice(0, 400) || null;
  const cta_label = (formData.get("cta_label") as string)?.slice(0, 100) || null;
  const rawUrl = (formData.get("cta_url") as string) || null;
  const cta_url = rawUrl && /^https?:\/\//.test(rawUrl) ? rawUrl : rawUrl?.startsWith("/") ? rawUrl : null;
  const publie = formData.get("publie") === "true";
  const ordre = parseInt((formData.get("ordre") as string) || "0");

  if (!image_url || !titre) { redirect("/gestion/spotlight"); return; }

  await adminDb.from("spotlight").insert({ image_url, titre, sous_titre, cta_label, cta_url, publie, ordre });
  redirect("/gestion/spotlight");
}

export async function updateSpotlight(id: string, formData: FormData) {
  await requireAdmin();
  const image_url = formData.get("image_url") as string;
  const titre = (formData.get("titre") as string)?.slice(0, 200);
  const sous_titre = (formData.get("sous_titre") as string)?.slice(0, 400) || null;
  const cta_label = (formData.get("cta_label") as string)?.slice(0, 100) || null;
  const rawUrl = (formData.get("cta_url") as string) || null;
  const cta_url = rawUrl && /^https?:\/\//.test(rawUrl) ? rawUrl : rawUrl?.startsWith("/") ? rawUrl : null;
  const publie = formData.get("publie") === "true";
  const ordre = parseInt((formData.get("ordre") as string) || "0");

  await adminDb.from("spotlight").update({ image_url, titre, sous_titre, cta_label, cta_url, publie, ordre }).eq("id", id);
  redirect("/gestion/spotlight");
}

// ── Utilisateurs ──────────────────────────────────────────────────────────────

export async function getUtilisateurs() {
  const { data } = await adminDb
    .from("app_users")
    .select("id, nom, telephone, email, statut, cle, created_at")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function approuverUser(id: string) {
  await requireAdmin();
  // crypto.randomUUID() is cryptographically secure
  const cle = "txb-usr-" + crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  await adminDb
    .from("app_users")
    .update({ statut: "approuve", cle, updated_at: new Date().toISOString() })
    .eq("id", id);
}

export async function suspendreUser(id: string) {
  await requireAdmin();
  await adminDb
    .from("app_users")
    .update({ statut: "suspendu", updated_at: new Date().toISOString() })
    .eq("id", id);
}

export async function deleteUser(id: string) {
  await requireAdmin();
  await adminDb.from("app_users").delete().eq("id", id);
}

// ── Emplois ───────────────────────────────────────────────────────────────────

export async function getEmplois() {
  const { data } = await adminDb
    .from("offres_emploi")
    .select("id, nom, telephone, type_poste, lieu, description, statut, date_limite, created_at, interne")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function updateStatutEmploi(id: string, statut: string) {
  await requireAdmin();
  const STATUTS = ["en_attente", "publie", "ferme", "refuse"];
  if (!STATUTS.includes(statut)) return;
  await adminDb.from("offres_emploi").update({ statut }).eq("id", id);
}

export async function deleteEmploi(id: string) {
  await requireAdmin();
  await adminDb.from("offres_emploi").delete().eq("id", id);
}

export async function createEmploiInterne(formData: FormData) {
  await requireAdmin();
  const nom = (formData.get("nom") as string)?.trim().slice(0, 200);
  const type_poste = (formData.get("type_poste") as string)?.trim().slice(0, 100) || null;
  const lieu = (formData.get("lieu") as string)?.trim().slice(0, 100) || "Antananarivo";
  const description = (formData.get("description") as string)?.trim().slice(0, 5000) || null;
  const date_limite = (formData.get("date_limite") as string) || null;

  if (!nom) { redirect("/gestion/emplois"); return; }

  await adminDb.from("offres_emploi").insert({
    nom,
    type_poste,
    lieu,
    description,
    date_limite: date_limite || null,
    interne: true,
    statut: "publie",
    telephone: "",
  });
  redirect("/gestion/emplois");
}

export async function toggleInterneEmploi(id: string, interne: boolean) {
  await requireAdmin();
  await adminDb.from("offres_emploi").update({ interne }).eq("id", id);
}

// ── Messages (contact, signalement, contribution, publicite, partenariat) ─────

export async function getMessages() {
  const { data } = await adminDb
    .from("messages_contact")
    .select("id, categorie, nom, email, telephone, sujet, message, ligne_numero, statut, created_at")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function updateStatutMessage(id: string, statut: string) {
  await requireAdmin();
  const STATUTS = ["nouveau", "lu", "traite", "archive"];
  if (!STATUTS.includes(statut)) return;
  await adminDb.from("messages_contact").update({ statut }).eq("id", id);
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  await adminDb.from("messages_contact").delete().eq("id", id);
}

// ── Dashboard stats ───────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const [users, emplois, actualites, signalements, messages] = await Promise.all([
    adminDb.from("app_users").select("*", { count: "exact", head: true }).eq("statut", "en_attente"),
    adminDb.from("offres_emploi").select("*", { count: "exact", head: true }).eq("statut", "en_attente"),
    adminDb.from("actualites").select("*", { count: "exact", head: true }).eq("publie", true),
    adminDb.from("signalements").select("*", { count: "exact", head: true }).eq("statut", "en_attente"),
    adminDb.from("messages_contact").select("*", { count: "exact", head: true }).eq("statut", "nouveau"),
  ]);
  return {
    usersEnAttente: users.count ?? 0,
    emploisEnAttente: emplois.count ?? 0,
    actualitesPubliees: actualites.count ?? 0,
    signalementsOuverts: signalements.count ?? 0,
    messagesNouveaux: messages.count ?? 0,
  };
}
