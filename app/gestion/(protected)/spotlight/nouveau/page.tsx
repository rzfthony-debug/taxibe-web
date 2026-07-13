import { createSpotlight } from "@/app/gestion/actions";
import Link from "next/link";

export default function NouveauSpotlightPage() {
  return (
    <div style={{ padding: "32px 36px", maxWidth: 760 }}>
      <div className="page-header">
        <h1 className="page-title">Nouveau spotlight</h1>
        <Link href="/gestion/spotlight">
          <button className="btn-sm btn-gray">? Retour</button>
        </Link>
      </div>

      <div className="card" style={{ padding: "28px 32px" }}>
        <form action={createSpotlight} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label>URL de l&apos;image *</label>
            <input name="image_url" type="url" placeholder="https://..." required />
          </div>
          <div>
            <label>Titre *</label>
            <input name="titre" type="text" placeholder="Titre du spotlight..." required />
          </div>
          <div>
            <label>Sous-titre</label>
            <input name="sous_titre" type="text" placeholder="Description courte..." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label>Texte du bouton (CTA)</label>
              <input name="cta_label" type="text" placeholder="En savoir plus" />
            </div>
            <div>
              <label>URL du bouton</label>
              <input name="cta_url" type="url" placeholder="https://..." />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label>Statut</label>
              <select name="publie">
                <option value="true">Actif</option>
                <option value="false">Inactif</option>
              </select>
            </div>
            <div>
              <label>Ordre d&apos;affichage</label>
              <input name="ordre" type="number" defaultValue="0" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
            <button type="submit" className="btn-yellow">Créer ?</button>
            <Link href="/gestion/spotlight">
              <button type="button" className="btn-sm btn-gray" style={{ padding: "10px 18px" }}>Annuler</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
