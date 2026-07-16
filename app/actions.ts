"use server";

import { adminDb } from "@/lib/supabase";
import { redirect } from "next/navigation";

const CATEGORIES = ["contact", "erreur", "contribution", "publicite", "partenariat"] as const;
export type MessageCategorie = (typeof CATEGORIES)[number];

/** Validates that redirectTo is a relative path to prevent open-redirect attacks. */
function safeRedirect(redirectTo: unknown, fallback = "/contact"): string {
  if (typeof redirectTo !== "string") return fallback;
  // Only allow relative paths starting with /
  if (/^\/[a-zA-Z0-9/_?=&#%-]*$/.test(redirectTo)) return redirectTo;
  return fallback;
}

export async function submitMessage(formData: FormData) {
  const redirectTo = safeRedirect(formData.get("redirect_to"), "/contact");

  if ((formData.get("site_web") as string)?.trim()) {
    redirect(redirectTo);
    return;
  }

  const categorie = formData.get("categorie") as string;
  const nom = (formData.get("nom") as string)?.trim().slice(0, 100);
  const email = (formData.get("email") as string)?.trim().slice(0, 200);
  const telephone = (formData.get("telephone") as string)?.trim().slice(0, 30) || null;
  const sujet = (formData.get("sujet") as string)?.trim().slice(0, 200) || null;
  const message = (formData.get("message") as string)?.trim().slice(0, 5000);
  const ligne_numero = (formData.get("ligne_numero") as string)?.trim().slice(0, 20) || null;

  if (!CATEGORIES.includes(categorie as MessageCategorie) || !nom || !email || !message) {
    redirect(`${redirectTo}?statut=erreur`);
    return;
  }

  const { error } = await adminDb.from("messages_contact").insert({
    categorie, nom, email, telephone, sujet, message, ligne_numero,
  });

  redirect(`${redirectTo}?statut=${error ? "erreur" : "envoye"}`);
}

// ── Chat visiteur ─────────────────────────────────────────────────────────────

export async function sendVisitorChatMessage(
  session_id: string,
  contenu: string,
  visitor_id: string
): Promise<{ ok: boolean; error?: string }> {
  if (!session_id || !visitor_id) return { ok: false, error: "invalid" };

  const text = contenu?.trim().slice(0, 500);
  if (!text) return { ok: false, error: "empty" };

  // Verify session belongs to this visitor and is still active
  const { data: session } = await adminDb
    .from("chat_sessions")
    .select("id, statut")
    .eq("id", session_id)
    .eq("visitor_id", visitor_id)
    .eq("statut", "actif")
    .single();

  if (!session) return { ok: false, error: "invalid_session" };

  // Rate limit: max 5 messages per 30 seconds per session
  const since = new Date(Date.now() - 30_000).toISOString();
  const { count } = await adminDb
    .from("chat_messages")
    .select("*", { count: "exact", head: true })
    .eq("session_id", session_id)
    .eq("expediteur", "visiteur")
    .gte("created_at", since);

  if ((count ?? 0) >= 5) return { ok: false, error: "rate_limit" };

  const { error } = await adminDb
    .from("chat_messages")
    .insert({ session_id, contenu: text, expediteur: "visiteur" });

  if (error) return { ok: false, error: "db_error" };

  await adminDb
    .from("chat_sessions")
    .update({ last_message_at: new Date().toISOString() })
    .eq("id", session_id);

  return { ok: true };
}
