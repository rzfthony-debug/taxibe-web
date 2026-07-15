import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";

const adminStorage = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const cle = formData.get("cle") as string | null;

  if (!file || !cle) {
    return NextResponse.json({ error: "file et cle requis" }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const path = `${cle}_${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await adminStorage.storage
    .from("images")
    .upload(path, buffer, { upsert: true, contentType: file.type });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: urlData } = adminStorage.storage.from("images").getPublicUrl(path);

  await adminDb
    .from("parametres")
    .upsert({ cle, valeur: urlData.publicUrl, updated_at: new Date().toISOString() }, { onConflict: "cle" });

  return NextResponse.json({ url: urlData.publicUrl });
}
