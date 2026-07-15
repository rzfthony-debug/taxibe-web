"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

type Props = {
  cle: string;
  label: string;
  description: string;
  ratio?: string;
  currentUrl: string | null;
};

export default function HeroUpload({ cle, label, description, ratio = "3/2", currentUrl }: Props) {
  const [preview, setPreview] = useState<string | null>(currentUrl);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setMsg({ type: "err", text: "Sélectionnez une image (JPG, PNG, WebP)." });
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setMsg({ type: "err", text: "L'image ne doit pas dépasser 8 Mo." });
      return;
    }

    setLoading(true);
    setMsg(null);

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const ext = file.name.split(".").pop();
    const path = `${cle}_${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(path, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      setMsg({ type: "err", text: `Erreur upload : ${uploadError.message}` });
      setLoading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("images").getPublicUrl(path);

    const res = await fetch("/api/parametres", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cle, valeur: urlData.publicUrl }),
    });

    if (!res.ok) {
      setMsg({ type: "err", text: "Image uploadée mais échec de la sauvegarde." });
    } else {
      setPreview(urlData.publicUrl);
      setMsg({ type: "ok", text: "Image mise à jour !" });
    }
    setLoading(false);
  }

  async function handleDelete() {
    setLoading(true);
    const res = await fetch("/api/parametres", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cle, valeur: null }),
    });
    if (res.ok) { setPreview(null); setMsg({ type: "ok", text: "Image supprimée." }); }
    setLoading(false);
  }

  return (
    <div style={{ background: "white", borderRadius: 12, border: "1px solid #E8ECF0", padding: 24 }}>
      <h2 style={{ margin: "0 0 4px", fontWeight: 800, fontSize: "0.95rem", color: "#0D1525" }}>{label}</h2>
      <p style={{ margin: "0 0 20px", fontSize: "0.78rem", color: "#94A3B8" }}>{description}</p>

      <div
        onClick={() => inputRef.current?.click()}
        style={{
          width: "100%", maxWidth: 520, aspectRatio: ratio,
          borderRadius: 10, overflow: "hidden",
          background: preview ? "transparent" : "#F1F5F9",
          border: `2px dashed ${preview ? "transparent" : "#CBD5E1"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16, position: "relative", cursor: "pointer",
        }}
      >
        {preview ? (
          <>
            <Image src={preview} alt={label} fill style={{ objectFit: "cover" }} sizes="520px" />
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0)", display: "flex",
              alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,0,0,0.4)";
                const btn = e.currentTarget.querySelector("span") as HTMLElement;
                if (btn) btn.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,0,0,0)";
                const btn = e.currentTarget.querySelector("span") as HTMLElement;
                if (btn) btn.style.opacity = "0";
              }}
            >
              <span style={{
                background: "white", borderRadius: 8, padding: "6px 16px",
                fontSize: "0.78rem", fontWeight: 800, color: "#0D1525",
                opacity: 0, transition: "opacity 0.2s",
              }}>
                Changer l&apos;image
              </span>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", color: "#94A3B8" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ marginBottom: 8 }}>
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: 600 }}>Cliquer pour choisir une image</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
      />

      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <button
          type="button"
          disabled={loading}
          onClick={() => inputRef.current?.click()}
          style={{
            padding: "9px 20px", background: "#FFB800", border: "none", borderRadius: 8,
            fontWeight: 800, fontSize: "0.84rem", color: "#0D1525",
            cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit",
          }}
        >
          {loading ? "Envoi…" : "Téléverser une image"}
        </button>

        {preview && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            style={{
              padding: "9px 16px", background: "transparent",
              border: "1.5px solid #E2E8F0", borderRadius: 8,
              fontWeight: 700, fontSize: "0.84rem", color: "#EF4444",
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Supprimer
          </button>
        )}

        {msg && (
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: msg.type === "ok" ? "#16A34A" : "#EF4444" }}>
            {msg.type === "ok" ? "✓" : "✕"} {msg.text}
          </span>
        )}
      </div>
    </div>
  );
}
