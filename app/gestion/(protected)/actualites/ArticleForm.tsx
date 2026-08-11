"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import RichTextEditor from "./RichTextEditor";
import { ARTICLE_BODY_CSS, renderContenu } from "@/lib/article";
import { sanitizeHtml } from "@/lib/sanitize";

type ArticleFormProps = {
  action: (formData: FormData) => void;
  backHref: string;
  submitLabel: string;
  defaultImageUrl?: string;
  defaultTitre?: string;
  defaultTexte?: string;
  defaultContenu?: string;
  defaultLien?: string;
  defaultVideoUrl?: string;
  defaultSlug?: string;
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

export default function ArticleForm({
  action,
  backHref,
  submitLabel,
  defaultImageUrl = "",
  defaultTitre = "",
  defaultTexte = "",
  defaultContenu = "",
  defaultLien = "",
  defaultVideoUrl = "",
  defaultSlug = "",
  defaultPublie = true,
  defaultOrdre = 0,
}: ArticleFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const [titre, setTitre] = useState(defaultTitre);
  const [contenuHtml, setContenuHtml] = useState(defaultContenu);
  const [showPreview, setShowPreview] = useState(false);
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
          <label>Titre *</label>
          <input name="titre" type="text" value={titre} onChange={(e) => setTitre(e.target.value)}
            placeholder="Ex : Comment trouver le bon taxi-be à Antananarivo ?" required />
          <p style={{ fontSize: "0.68rem", color: "#94A3B8", marginTop: 4 }}>
            Le titre affiché en haut de l&apos;article et dans les listes. Une phrase courte, pas un paragraphe.
          </p>
        </div>

        <div>
          <label>Description / résumé</label>
          <textarea name="texte" rows={2} defaultValue={defaultTexte}
            placeholder="1 à 2 phrases pour les moteurs de recherche et les partages sur les réseaux..." style={{ resize: "vertical" }} />
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
            <label style={{ margin: 0 }}>Contenu de l&apos;article</label>
            <button type="button" className="toolbar-btn" onClick={() => setShowPreview(true)}>
              👁 Aperçu
            </button>
          </div>
          <RichTextEditor name="contenu" defaultValue={defaultContenu} onChangeHtml={setContenuHtml} />
        </div>
      </div>

      {showPreview && (
        <ArticlePreview
          imageUrl={imageUrl}
          titre={titre || "Titre de l'article"}
          contenuHtml={contenuHtml}
          onClose={() => setShowPreview(false)}
        />
      )}

      <div className="card article-form-sidebar" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18, position: "sticky", top: 24 }}>
        <div>
          <label>URL de l&apos;article (slug)</label>
          <input name="slug" type="text" defaultValue={defaultSlug} placeholder="généré automatiquement si vide" />
          <p style={{ fontSize: "0.68rem", color: "#94A3B8", marginTop: 4 }}>
            taxibe.mg/blog/<strong>votre-slug</strong> — laissez vide pour le générer depuis le titre.
          </p>
        </div>

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

function ArticlePreview({
  imageUrl,
  titre,
  contenuHtml,
  onClose,
}: {
  imageUrl: string;
  titre: string;
  contenuHtml: string;
  onClose: () => void;
}) {
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(13,21,37,0.6)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      <div style={{
        background: "white", borderRadius: 16, width: "100%", maxWidth: 760,
        maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <style>{ARTICLE_BODY_CSS}</style>
        <div style={{
          position: "sticky", top: 0, zIndex: 1, background: "white",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 24px", borderBottom: "1px solid #E8ECF0",
        }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Aperçu — tel que vu sur le site
          </span>
          <button type="button" onClick={onClose} className="btn-sm btn-gray">Fermer</button>
        </div>

        {imageUrl.trim() && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="" style={{ width: "100%", maxHeight: 320, objectFit: "cover", display: "block" }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
        )}

        <div style={{ padding: "28px 32px 40px" }}>
          <h1 style={{ fontSize: "clamp(1.35rem, 5vw, 1.9rem)", fontWeight: 900, color: "#0D1525", lineHeight: 1.25, margin: "0 0 20px" }}>
            {titre}
          </h1>
          <div style={{ height: 3, width: 48, background: "#FFB800", borderRadius: 2, marginBottom: 24 }} />

          {contenuHtml.trim() ? (
            <div className="article-body" dangerouslySetInnerHTML={{ __html: sanitizeHtml(renderContenu(contenuHtml)) }} />
          ) : (
            <p style={{ color: "#94A3B8", fontStyle: "italic" }}>Le contenu apparaîtra ici au fur et à mesure de la rédaction.</p>
          )}
        </div>
      </div>
    </div>
  );
}
