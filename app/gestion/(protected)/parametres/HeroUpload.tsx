"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

export default function HeroUpload({ cle, label, description, ratio = "3/2", currentUrl }: {
  cle: string; label: string; description: string; ratio?: string; currentUrl: string | null;
}) {
  const [preview, setPreview] = useState<string | null>(currentUrl);
  const [progress, setProgress] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const supabase = createClient(
    "https://sorucqpaytrhmthxeuhx.supabase.co",
    "sb_publishable_8aNBK0nOIb4ZcrmBF0TGTQ_XO_8zhd8"
  );

  async function uploadFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setMsg({ type: "err", text: "Sélectionnez une image (JPG, PNG, WebP)." }); return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setMsg({ type: "err", text: "L'image ne doit pas dépasser 10 Mo." }); return;
    }

    setMsg(null);
    setProgress(0);

    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${cle}_${Date.now()}.${ext}`;

    // Upload avec suivi de progression via XHR direct sur Supabase Storage
    const uploadUrl = `https://sorucqpaytrhmthxeuhx.supabase.co/storage/v1/object/images/${path}`;

    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve();
        else reject(new Error(`HTTP ${xhr.status}: ${xhr.responseText}`));
      };
      xhr.onerror = () => reject(new Error("Erreur réseau"));
      xhr.open("POST", uploadUrl);
      xhr.setRequestHeader("Authorization", `Bearer sb_publishable_8aNBK0nOIb4ZcrmBF0TGTQ_XO_8zhd8`);
      xhr.setRequestHeader("Content-Type", file.type);
      xhr.setRequestHeader("x-upsert", "true");
      xhr.send(file);
    }).catch(async (err: Error) => {
      // Fallback : utiliser le SDK Supabase
      setProgress(10);
      const { error } = await supabase.storage.from("images").upload(path, file, { upsert: true, contentType: file.type });
      if (error) throw new Error(error.message);
    });

    setProgress(100);

    const { data: urlData } = supabase.storage.from("images").getPublicUrl(path);

    // Sauvegarder l'URL via API
    const res = await fetch("/api/parametres", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cle, valeur: urlData.publicUrl }),
    });

    setProgress(null);
    if (res.ok) {
      setPreview(urlData.publicUrl);
      setMsg({ type: "ok", text: "Image mise à jour avec succès !" });
    } else {
      const json = await res.json().catch(() => ({}));
      setMsg({ type: "err", text: `Erreur sauvegarde : ${json.error ?? "inconnue"}` });
    }
  }

  async function handleUpload(file: File) {
    try {
      await uploadFile(file);
    } catch (e: unknown) {
      setProgress(null);
      const msg = e instanceof Error ? e.message : "Erreur inconnue";
      setMsg({ type: "err", text: `Erreur : ${msg}` });
    }
  }

  async function handleDelete() {
    const res = await fetch("/api/parametres", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cle, valeur: null }),
    });
    if (res.ok) { setPreview(null); setMsg({ type: "ok", text: "Image supprimée." }); }
  }

  const uploading = progress !== null;

  return (
    <div style={{ background: "white", borderRadius: 12, border: "1px solid #E8ECF0", padding: 24 }}>
      <h2 style={{ margin: "0 0 4px", fontWeight: 800, fontSize: "0.95rem", color: "#0D1525" }}>{label}</h2>
      <p style={{ margin: "0 0 20px", fontSize: "0.78rem", color: "#94A3B8" }}>{description}</p>

      <div onClick={() => !uploading && inputRef.current?.click()} style={{
        width: "100%", maxWidth: 520, aspectRatio: ratio, borderRadius: 10, overflow: "hidden",
        background: preview ? "transparent" : "#F1F5F9",
        border: `2px dashed ${preview ? "transparent" : "#CBD5E1"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 16, position: "relative", cursor: uploading ? "default" : "pointer",
      }}>
        {preview && <Image src={preview} alt={label} fill style={{ objectFit: "cover" }} sizes="520px" unoptimized />}
        {!preview && !uploading && (
          <div style={{ textAlign: "center", color: "#94A3B8" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ marginBottom: 8 }}>
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: 600 }}>Cliquer pour choisir une image</p>
          </div>
        )}
        {uploading && (
          <div style={{
            position: "absolute", inset: 0, background: "rgba(13,21,37,0.8)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16,
          }}>
            <div style={{ width: "65%", background: "rgba(255,255,255,0.2)", borderRadius: 99, height: 8, overflow: "hidden" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: "#FFB800", borderRadius: 99, transition: "width 0.3s ease" }} />
            </div>
            <span style={{ color: "white", fontWeight: 800, fontSize: "1rem" }}>
              {progress === 100 ? "Finalisation…" : `${progress}%`}
            </span>
          </div>
        )}
      </div>

      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: "none" }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); e.target.value = ""; }} />

      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <button type="button" disabled={uploading} onClick={() => inputRef.current?.click()} style={{
          padding: "10px 22px", background: "#FFB800", border: "none", borderRadius: 8,
          fontWeight: 800, fontSize: "0.84rem", color: "#0D1525",
          cursor: uploading ? "not-allowed" : "pointer", opacity: uploading ? 0.6 : 1,
          fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8,
        }}>
          {uploading
            ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>{progress === 100 ? "Finalisation…" : `Envoi ${progress}%`}</>
            : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>Téléverser une image</>
          }
        </button>

        {preview && !uploading && (
          <button type="button" onClick={handleDelete} style={{
            padding: "10px 16px", background: "transparent", border: "1.5px solid #E2E8F0",
            borderRadius: 8, fontWeight: 700, fontSize: "0.84rem", color: "#EF4444",
            cursor: "pointer", fontFamily: "inherit",
          }}>Supprimer</button>
        )}

        {msg && !uploading && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.82rem", fontWeight: 700,
            color: msg.type === "ok" ? "#16A34A" : "#EF4444",
            background: msg.type === "ok" ? "#F0FDF4" : "#FEF2F2",
            border: `1px solid ${msg.type === "ok" ? "#BBF7D0" : "#FECACA"}`,
            borderRadius: 8, padding: "7px 12px",
          }}>
            {msg.type === "ok"
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            }
            {msg.text}
          </span>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
