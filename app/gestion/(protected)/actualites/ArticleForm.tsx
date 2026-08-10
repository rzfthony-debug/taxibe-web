"use client";

import { useRef, useState } from "react";
import Link from "next/link";

type ArticleFormProps = {
  action: (formData: FormData) => void;
  backHref: string;
  submitLabel: string;
  defaultImageUrl?: string;
  defaultTexte?: string;
  defaultContenu?: string;
  defaultLien?: string;
  defaultVideoUrl?: string;
  defaultPublie?: boolean;
  defaultOrdre?: number;
};

/** Redimensionne et recompresse une image côté navigateur avant l'envoi,
 *  pour rester sous la limite de payload des fonctions serverless (~4,5 Mo)
 *  sans que l'éditeur ait à y penser. Les GIF sont laissés intacts (animation). */
function compressImage(file: File, maxWidth = 1600, quality = 0.82): Promise<File> {
  if (file.type === "image/gif") return Promise.resolve(file);

  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxWidth / img.width);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve(file); return; }
      ctx.drawImage(img, 0, 0, w, h);
      const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
      canvas.toBlob((blob) => {
        if (!blob || blob.size >= file.size) { resolve(file); return; }
        const ext = outputType === "image/png" ? "png" : "jpg";
        const newName = file.name.replace(/\.[^.]+$/, "") + "." + ext;
        resolve(new File([blob], newName, { type: outputType }));
      }, outputType, quality);
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file); };
    img.src = url;
  });
}

const TOOLBAR_ACTIONS = [
  { label: "Gras", open: "<strong>", close: "</strong>", placeholder: "texte en gras" },
  { label: "Citation", open: "\n<blockquote>\n", close: "\n</blockquote>\n", placeholder: "citation" },
  { label: "Titre", open: "\n<h2>", close: "</h2>\n", placeholder: "Titre de section" },
  { label: "Sous-titre", open: "\n<h3>", close: "</h3>\n", placeholder: "Sous-titre" },
] as const;

export default function ArticleForm({
  action,
  backHref,
  submitLabel,
  defaultImageUrl = "",
  defaultTexte = "",
  defaultContenu = "",
  defaultLien = "",
  defaultVideoUrl = "",
  defaultPublie = true,
  defaultOrdre = 0,
}: ArticleFormProps) {
  const contenuRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const [compressing, setCompressing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadMsg, setUploadMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function uploadFile(rawFile: File) {
    if (!rawFile.type.startsWith("image/")) {
      setUploadMsg({ type: "err", text: "Veuillez sélectionner une image (JPG, PNG, WebP)." });
      return;
    }

    setUploadMsg(null);
    setCompressing(true);
    const file = await compressImage(rawFile);
    setCompressing(false);

    // Vercel limite le corps des requêtes de fonctions serverless à ~4,5 Mo :
    // au-delà, la requête est rejetée avant même d'atteindre la route API.
    if (file.size > 4 * 1024 * 1024) {
      setUploadMsg({ type: "err", text: "Image toujours trop volumineuse après compression (max 4 Mo). Essayez une photo plus petite." });
      return;
    }

    setUploadProgress(0);

    const fd = new FormData();
    fd.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setUploadProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      setUploadProgress(null);
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const json = JSON.parse(xhr.responseText);
          setImageUrl(json.url);
          setUploadMsg({ type: "ok", text: "Image téléversée avec succès." });
        } catch {
          setUploadMsg({ type: "err", text: "Réponse invalide du serveur." });
        }
        return;
      }
      if (xhr.status === 413) {
        setUploadMsg({ type: "err", text: "Image trop lourde pour le serveur (max ~4 Mo). Compressez-la et réessayez." });
        return;
      }
      try {
        const json = JSON.parse(xhr.responseText);
        setUploadMsg({ type: "err", text: `Erreur : ${json.error ?? "Échec de l'upload."}` });
      } catch {
        setUploadMsg({ type: "err", text: `Échec de l'upload (code ${xhr.status}).` });
      }
    };
    xhr.onerror = () => {
      setUploadProgress(null);
      setUploadMsg({ type: "err", text: "Erreur réseau. Réessayez." });
    };
    xhr.open("POST", "/api/upload-image");
    xhr.send(fd);
  }

  function applyFormat(open: string, close: string, placeholder: string) {
    const ta = contenuRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const value = ta.value;
    const selected = value.slice(start, end) || placeholder;
    const before = value.slice(0, start);
    const after = value.slice(end);
    ta.value = before + open + selected + close + after;
    const cursorStart = before.length + open.length;
    const cursorEnd = cursorStart + selected.length;
    ta.focus();
    ta.setSelectionRange(cursorStart, cursorEnd);
  }

  return (
    <form action={action} className="article-form">
      <style>{`
        .article-form { display: grid; grid-template-columns: 1fr 300px; gap: 24px; align-items: start; }
        @media (max-width: 900px) {
          .article-form { grid-template-columns: 1fr; }
          .article-form .article-form-sidebar { position: static !important; }
        }
        .toolbar-btn {
          padding: 6px 12px; border-radius: 7px; border: 1px solid #E2E8F0;
          background: white; color: #374151; font-size: 0.78rem; font-weight: 700;
          cursor: pointer;
        }
        .toolbar-btn:hover { background: #F1F5F9; }
      `}</style>

      <div className="card" style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 22 }}>
        <div>
          <label>URL de l&apos;image principale *</label>
          <input name="image_url" type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..." required />

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
            <button type="button" className="toolbar-btn" disabled={compressing || uploadProgress !== null}
              onClick={() => fileInputRef.current?.click()}>
              {compressing ? "Compression…" : uploadProgress !== null ? `Envoi… ${uploadProgress}%` : "📁 Téléverser une image"}
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f); e.target.value = ""; }} />
            <span style={{ fontSize: "0.68rem", color: "#94A3B8" }}>JPG, PNG, WebP — compression automatique si nécessaire</span>
            {uploadMsg && (
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: uploadMsg.type === "ok" ? "#16A34A" : "#EF4444" }}>
                {uploadMsg.text}
              </span>
            )}
          </div>

          {imageUrl.trim() && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="" style={{ marginTop: 10, height: 140, borderRadius: 8, objectFit: "cover", display: "block" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.3"; }} />
          )}
        </div>

        <div>
          <label>Texte / Résumé *</label>
          <textarea name="texte" rows={2} defaultValue={defaultTexte}
            placeholder="Court résumé affiché dans la liste..." required style={{ resize: "vertical" }} />
        </div>

        <div>
          <label>Contenu de l&apos;article</label>
          <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            {TOOLBAR_ACTIONS.map((a) => (
              <button key={a.label} type="button" className="toolbar-btn"
                onClick={() => applyFormat(a.open, a.close, a.placeholder)}>
                {a.label}
              </button>
            ))}
          </div>
          <textarea ref={contenuRef} name="contenu" rows={16} defaultValue={defaultContenu}
            placeholder="Écrivez le corps de l'article ici. Sélectionnez du texte puis cliquez sur un bouton pour le mettre en forme."
            style={{ resize: "vertical", lineHeight: 1.6, fontFamily: "inherit" }} />
          <p style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: 6 }}>
            Sélectionnez du texte puis cliquez sur Gras, Citation, Titre ou Sous-titre pour le mettre en forme.
            Vous pouvez aussi écrire ou coller du HTML directement (listes, liens, images...).
          </p>
        </div>
      </div>

      <div className="card article-form-sidebar" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18, position: "sticky", top: 24 }}>
        <div>
          <label>Lien vidéo (optionnel)</label>
          <input name="video_url" type="url" defaultValue={defaultVideoUrl} placeholder="YouTube, Vimeo ou .mp4..." />
          <p style={{ fontSize: "0.68rem", color: "#94A3B8", marginTop: 4 }}>
            Affiché comme un lecteur vidéo en haut de l&apos;article.
          </p>
        </div>

        <div>
          <label>Lien externe (optionnel)</label>
          <input name="lien" type="url" defaultValue={defaultLien} placeholder="https://..." />
        </div>

        <div>
          <label>Statut</label>
          <select name="publie" defaultValue={defaultPublie ? "true" : "false"}>
            <option value="true">Publié</option>
            <option value="false">Brouillon</option>
          </select>
        </div>

        <div>
          <label>Ordre d&apos;affichage</label>
          <input name="ordre" type="number" defaultValue={defaultOrdre} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 8 }}>
          <button type="submit" className="btn-yellow">{submitLabel}</button>
          <Link href={backHref}>
            <button type="button" className="btn-sm btn-gray" style={{ width: "100%", padding: "10px 18px" }}>Annuler</button>
          </Link>
        </div>
      </div>
    </form>
  );
}
