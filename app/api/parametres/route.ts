import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/supabase";
import { cookies } from "next/headers";

async function getAdminId(): Promise<string | null> {
  const jar = await cookies();
  const adminId = jar.get("taxibe_admin")?.value;
  if (!adminId) return null;
  const { data } = await adminDb
    .from("admin_users")
    .select("id")
    .eq("id", adminId)
    .eq("actif", true)
    .single();
  return data?.id ?? null;
}

export async function POST(req: NextRequest) {
  const adminId = await getAdminId();
  if (!adminId) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { cle, valeur } = await req.json();

  if (!cle || typeof cle !== "string") {
    return NextResponse.json({ error: "Paramètre manquant" }, { status: 400 });
  }

  const safeCle = cle.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 100);
  const safeValeur = typeof valeur === "string" ? valeur.slice(0, 2000) : null;

  const { error } = await adminDb
    .from("parametres")
    .upsert({ cle: safeCle, valeur: safeValeur, updated_at: new Date().toISOString() }, { onConflict: "cle" });

  if (error) return NextResponse.json({ error: "Erreur lors de la sauvegarde" }, { status: 500 });

  return NextResponse.json({ ok: true });
}
