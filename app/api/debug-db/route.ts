import { NextResponse } from "next/server";
import { adminDb } from "@/lib/supabase";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? "104";

  const { data: lignes, error: e1 } = await adminDb
    .from("lignes")
    .select("id, numero, cooperative, couleur_bus, type_circuit")
    .eq("actif", true)
    .ilike("numero", `${q}%`)
    .order("numero")
    .limit(5);

  if (e1 || !lignes?.length) {
    return NextResponse.json({ step: "lignes", error: e1?.message ?? null, lignes });
  }

  const ids = lignes.map((l) => l.id);
  const { data: arrets, error: e2 } = await adminDb
    .from("ligne_arrets")
    .select("ligne_id, direction, position, arret")
    .in("ligne_id", ids)
    .in("direction", ["aller", "unique"])
    .order("position", { ascending: true });

  return NextResponse.json({
    step: "ok",
    lignes,
    arretsError: e2?.message ?? null,
    arretsSample: arrets?.slice(0, 5),
  });
}
