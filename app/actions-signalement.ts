"use server";

import { adminDb } from "@/lib/supabase";

interface SignalementData {
  ligne?: string;
  type_erreur?: string;
  description: string;
  contact?: string;
  source?: string;
}

export async function submitSignalement(data: SignalementData): Promise<{ ok: boolean }> {
  try {
    const { error } = await adminDb.from("signalements").insert({
      ligne: data.ligne?.trim() || null,
      type_erreur: data.type_erreur || null,
      description: data.description.trim().slice(0, 1000),
      contact: data.contact?.trim() || null,
      source: data.source ?? "web",
    });
    return { ok: !error };
  } catch {
    return { ok: false };
  }
}
