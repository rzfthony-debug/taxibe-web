"use server";

import { adminDb } from "@/lib/supabase";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const MAX_ATTEMPTS = 5;
const BLOCK_MINUTES = 15;

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function loginAdmin(formData: FormData) {
  const cle = (formData.get("cle") as string)?.trim();
  if (!cle) { redirect("/gestion/login?error=required"); return; }

  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { data: attempt } = await adminDb
    .from("login_attempts")
    .select("count, blocked_until")
    .eq("ip", ip)
    .maybeSingle();

  if (attempt?.blocked_until && new Date(attempt.blocked_until) > new Date()) {
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
    const newCount = (attempt?.count ?? 0) + 1;
    const blockedUntil = newCount >= MAX_ATTEMPTS
      ? new Date(Date.now() + BLOCK_MINUTES * 60 * 1000).toISOString()
      : null;

    await adminDb.from("login_attempts").upsert(
      { ip, count: newCount, blocked_until: blockedUntil, updated_at: new Date().toISOString() },
      { onConflict: "ip" }
    );

    redirect("/gestion/login?error=invalid");
    return;
  }

  await adminDb.from("login_attempts").delete().eq("ip", ip);

  const jar = await cookies();
  jar.set("taxibe_admin", data.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  jar.set("taxibe_admin_nom", data.nom, { path: "/" });
  jar.set("taxibe_admin_role", data.role ?? "lecteur", { path: "/" });

  redirect("/gestion");
}

export async function logoutAdmin() {
  const jar = await cookies();
  jar.delete("taxibe_admin");
  jar.delete("taxibe_admin_nom");
  jar.delete("taxibe_admin_role");
  redirect("/gestion/login");
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
  await adminDb.from("actualites").update({ publie }).eq("id", id);
}

export async function deleteActualite(id: string) {
  await adminDb.from("actualites").delete().eq("id", id);
}

export async function createActualite(formData: FormData) {
  const image_url = formData.get("image_url") as string;
  const texte = formData.get("texte") as string;
  const contenu = formData.get("contenu") as string;
  const lien = (formData.get("lien") as string) || null;
  const publie = formData.get("publie") === "true";
  const ordre = parseInt((formData.get("ordre") as string) || "0");

  if (!image_url || !texte) { redirect("/gestion/actualites"); return; }

  await adminDb.from("actualites").insert({ image_url, texte, contenu, lien, publie, ordre });
  redirect("/gestion/actualites");
}

export async function updateActualite(id: string, formData: FormData) {
  const image_url = formData.get("image_url") as string;
  const texte = formData.get("texte") as string;
  const contenu = formData.get("contenu") as string;
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
  await adminDb.from("spotlight").update({ publie }).eq("id", id);
}

export async function deleteSpotlight(id: string) {
  await adminDb.from("spotlight").delete().eq("id", id);
}

export async function createSpotlight(formData: FormData) {
  const image_url = formData.get("image_url") as string;
  const titre = formData.get("titre") as string;
  const sous_titre = (formData.get("sous_titre") as string) || null;
  const cta_label = (formData.get("cta_label") as string) || null;
  const cta_url = (formData.get("cta_url") as string) || null;
  const publie = formData.get("publie") === "true";
  const ordre = parseInt((formData.get("ordre") as string) || "0");

  if (!image_url || !titre) { redirect("/gestion/spotlight"); return; }

  await adminDb.from("spotlight").insert({ image_url, titre, sous_titre, cta_label, cta_url, publie, ordre });
  redirect("/gestion/spotlight");
}

export async function updateSpotlight(id: string, formData: FormData) {
  const image_url = formData.get("image_url") as string;
  const titre = formData.get("titre") as string;
  const sous_titre = (formData.get("sous_titre") as string) || null;
  const cta_label = (formData.get("cta_label") as string) || null;
  const cta_url = (formData.get("cta_url") as string) || null;
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
  const cle = "txb-usr-" + Math.random().toString(36).slice(2, 14);
  await adminDb
    .from("app_users")
    .update({ statut: "approuve", cle, updated_at: new Date().toISOString() })
    .eq("id", id);
}

export async function suspendreUser(id: string) {
  await adminDb
    .from("app_users")
    .update({ statut: "suspendu", updated_at: new Date().toISOString() })
    .eq("id", id);
}

export async function deleteUser(id: string) {
  await adminDb.from("app_users").delete().eq("id", id);
}

// ── Emplois ───────────────────────────────────────────────────────────────────

export async function getEmplois() {
  const { data } = await adminDb
    .from("offres_emploi")
    .select("id, nom, telephone, type_poste, lieu, description, statut, date_limite, created_at")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function updateStatutEmploi(id: string, statut: string) {
  await adminDb.from("offres_emploi").update({ statut }).eq("id", id);
}

export async function deleteEmploi(id: string) {
  await adminDb.from("offres_emploi").delete().eq("id", id);
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
  await adminDb.from("messages_contact").update({ statut }).eq("id", id);
}

export async function deleteMessage(id: string) {
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
