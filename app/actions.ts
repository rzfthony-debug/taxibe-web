"use server";

import { adminDb } from "@/lib/supabase";
import { redirect } from "next/navigation";

const CATEGORIES = ["contact", "erreur", "contribution", "publicite", "partenariat"] as const;
export type MessageCategorie = (typeof CATEGORIES)[number];

export async function submitMessage(formData: FormData) {
  const redirectTo = (formData.get("redirect_to") as string) || "/contact";

  // Piege a robots : ce champ est invisible pour un humain, un bot le remplit.
  if ((formData.get("site_web") as string)?.trim()) {
    redirect(redirectTo);
    return;
  }

  const categorie = formData.get("categorie") as string;
  const nom = (formData.get("nom") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const telephone = (formData.get("telephone") as string)?.trim() || null;
  const sujet = (formData.get("sujet") as string)?.trim() || null;
  const message = (formData.get("message") as string)?.trim();
  const ligne_numero = (formData.get("ligne_numero") as string)?.trim() || null;

  if (!CATEGORIES.includes(categorie as MessageCategorie) || !nom || !email || !message) {
    redirect(`${redirectTo}?statut=erreur`);
    return;
  }

  const { error } = await adminDb.from("messages_contact").insert({
    categorie, nom, email, telephone, sujet, message, ligne_numero,
  });

  redirect(`${redirectTo}?statut=${error ? "erreur" : "envoye"}`);
}
