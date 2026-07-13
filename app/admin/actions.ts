"use server";

import { adminDb } from "@/lib/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function loginAdmin(formData: FormData) {
  const cle = (formData.get("cle") as string)?.trim();
  if (!cle) return { error: "Clé requise." };

  const { data } = await adminDb
    .from("admin_users")
    .select("id, nom, role")
    .eq("cle", cle)
    .eq("actif", true)
    .single();

  if (!data) return { error: "Clé invalide ou compte désactivé." };

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

  redirect("/admin");
}

export async function logoutAdmin() {
  const jar = await cookies();
  jar.delete("taxibe_admin");
  jar.delete("taxibe_admin_nom");
  jar.delete("taxibe_admin_role");
  redirect("/admin/login");
}

// ── Actualités ────────────────────────────────────────────────────────────────

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

  if (!image_url || !texte) return { error: "Image et texte requis." };

  await adminDb.from("actualites").insert({ image_url, texte, contenu, lien, publie, ordre });
  redirect("/admin/actualites");
}

export async function updateActualite(id: string, formData: FormData) {
  const image_url = formData.get("image_url") as string;
  const texte = formData.get("texte") as string;
  const contenu = formData.get("contenu") as string;
  const lien = (formData.get("lien") as string) || null;
  const publie = formData.get("publie") === "true";
  const ordre = parseInt((formData.get("ordre") as string) || "0");

  await adminDb.from("actualites").update({ image_url, texte, contenu, lien, publie, ordre }).eq("id", id);
  redirect("/admin/actualites");
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

  if (!image_url || !titre) return { error: "Image et titre requis." };

  await adminDb.from("spotlight").insert({ image_url, titre, sous_titre, cta_label, cta_url, publie, ordre });
  redirect("/admin/spotlight");
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
  redirect("/admin/spotlight");
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

// ── Dashboard stats ───────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const [users, emplois, actualites, signalements] = await Promise.all([
    adminDb.from("app_users").select("*", { count: "exact", head: true }).eq("statut", "en_attente"),
    adminDb.from("offres_emploi").select("*", { count: "exact", head: true }).eq("statut", "en_attente"),
    adminDb.from("actualites").select("*", { count: "exact", head: true }).eq("publie", true),
    adminDb.from("signalements").select("*", { count: "exact", head: true }).eq("statut", "en_attente"),
  ]);
  return {
    usersEnAttente: users.count ?? 0,
    emploisEnAttente: emplois.count ?? 0,
    actualitesPubliees: actualites.count ?? 0,
    signalementsOuverts: signalements.count ?? 0,
  };
}
