import { cookies } from "next/headers";
import { adminDb } from "@/lib/supabase";

export async function requireAdmin(): Promise<{ id: string; nom: string; role: string }> {
  const jar = await cookies();
  const adminId = jar.get("taxibe_admin")?.value;
  if (!adminId) throw new Error("Non autorisé");

  const { data } = await adminDb
    .from("admin_users")
    .select("id, nom, role")
    .eq("id", adminId)
    .eq("actif", true)
    .single();

  if (!data) throw new Error("Non autorisé");
  return data as { id: string; nom: string; role: string };
}
