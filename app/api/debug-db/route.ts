import { NextResponse } from "next/server";
import { adminDb } from "@/lib/supabase";

export async function GET() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "(vide)";
  const hasServiceKey = !!(process.env.SUPABASE_SERVICE_ROLE_KEY);

  const { data, error, count } = await adminDb
    .from("lignes")
    .select("id, numero, actif", { count: "exact" })
    .limit(5);

  return NextResponse.json({
    env: { url, hasServiceKey },
    error: error?.message ?? null,
    count,
    sample: data,
  });
}
