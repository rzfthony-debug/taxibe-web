"use server";

import { headers } from "next/headers";
import { adminDb } from "@/lib/supabase";

interface SignalementData {
  ligne?: string;
  type_erreur?: string;
  description: string;
  contact?: string;
  source?: string;
}

async function checkRateLimit(ip: string): Promise<boolean> {
  try {
    const windowStart = new Date(Date.now() - 60_000).toISOString();
    const { count } = await adminDb
      .from("rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip", ip)
      .eq("action", "signalement")
      .gte("created_at", windowStart) as { count: number | null };
    if ((count ?? 0) >= 5) return false;
    await adminDb.from("rate_limits").insert({ ip, action: "signalement" });
    return true;
  } catch { return true; }
}

export async function submitSignalement(data: SignalementData): Promise<{ ok: boolean }> {
  try {
    const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    if (!(await checkRateLimit(ip))) return { ok: false };

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
