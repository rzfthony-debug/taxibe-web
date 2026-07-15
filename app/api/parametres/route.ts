import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { cle, valeur } = await req.json();

  if (!cle) return NextResponse.json({ error: "cle required" }, { status: 400 });

  const { error } = await adminDb
    .from("parametres")
    .upsert({ cle, valeur, updated_at: new Date().toISOString() }, { onConflict: "cle" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
