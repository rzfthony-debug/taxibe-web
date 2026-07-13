import { createActualite } from "@/app/gestion/actions";
import Link from "next/link";

export default function NouvelArticlePage() {
  return (
    <div style={{ padding: "32px 36px", maxWidth: 760 }}>
      <div className="page-header">
        <h1 className="page-title">Nouvel article</h1>
        <Link href="/gestion/actualites">
          <button className="btn-sm btn-gray">? Retour</button>
        </Link>
      </div>

      <div className="card" style={{ padding: "28px 32px" }}>
        <form action={createActualite} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label>URL de l&apos;image principale *</label>
            <input name="image_url" type="url" placeholder="https://..." required />
          </div>
          <div>
            <label>Texte / Résumé *</label>
            <textarea name="texte" rows={2} placeholder="Court résumé affiché dans la liste..." required
              style={{ resize: "vertical" }} />
          </div>
          <div>
            <label>Contenu complet</label>
            <textarea name="contenu" rows={6} placeholder="Corps de l'article..."
              style={{ resize: "vertical" }} />
          </div>
          <div>
            <label>Lien externe (optionnel)</label>
            <input name="lien" type="url" placeholder="https://..." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label>Statut</label>
              <select name="publie">
                <option value="true">Publié</option>
                <option value="false">Brouillon</option>
              </select>
            </div>
            <div>
              <label>Ordre d&apos;affichage</label>
              <input name="ordre" type="number" defaultValue="0" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
            <button type="submit" className="btn-yellow">Créer l&apos;article ?</button>
            <Link href="/gestion/actualites">
              <button type="button" className="btn-sm btn-gray" style={{ padding: "10px 18px" }}>Annuler</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
