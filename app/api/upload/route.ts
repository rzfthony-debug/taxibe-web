import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 Mo

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

  const adminStorage = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const cle = formData.get("cle") as string | null;

  if (!file || !cle) {
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Type de fichier non autorisé" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Fichier trop volumineux (max 10 Mo)" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") ?? "jpg";
  const safeCle = cle.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 100);
  const path = `${safeCle}_${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await adminStorage.storage
    .from("images")
    .upload(path, buffer, { upsert: true, contentType: file.type });

  if (uploadError) {
    return NextResponse.json({ error: "Erreur lors du téléversement" }, { status: 500 });
  }

  const { data: urlData } = adminStorage.storage.from("images").getPublicUrl(path);

  const { error: dbError } = await adminDb
    .from("parametres")
    .upsert({ cle: safeCle, valeur: urlData.publicUrl, updated_at: new Date().toISOString() }, { onConflict: "cle" });

  if (dbError) {
    return NextResponse.json({ error: "Erreur lors de la sauvegarde" }, { status: 500 });
  }

  return NextResponse.json({ url: urlData.publicUrl });
}
