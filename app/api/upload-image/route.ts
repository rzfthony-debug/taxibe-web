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

/** Upload générique : renvoie l'URL publique sans écrire dans `parametres`.
 *  Utilisé pour les images liées à un enregistrement (article, spotlight...)
 *  plutôt qu'à un réglage global unique. */
export async function POST(req: NextRequest) {
  try {
    const adminId = await getAdminId();
    if (!adminId) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "Configuration serveur manquante (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)" }, { status: 500 });
    }

    const adminStorage = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Type de fichier non autorisé" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Fichier trop volumineux (max 10 Mo)" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await adminStorage.storage
      .from("images")
      .upload(path, buffer, { upsert: false, contentType: file.type });

    if (uploadError) {
      return NextResponse.json({ error: `Erreur lors du téléversement : ${uploadError.message}` }, { status: 500 });
    }

    const { data: urlData } = adminStorage.storage.from("images").getPublicUrl(path);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (e) {
    return NextResponse.json({ error: `Erreur serveur : ${e instanceof Error ? e.message : String(e)}` }, { status: 500 });
  }
}
