import { createLigne } from "@/app/gestion/actions";
import Link from "next/link";

export default function NouvelleLignePage() {
  return (
    <div style={{ padding: "32px 36px", maxWidth: 640 }}>
      <div className="page-header">
        <h1 className="page-title">Nouvelle ligne</h1>
        <Link href="/gestion/lignes">
          <button className="btn-sm btn-gray">← Retour</button>
        </Link>
      </div>

      <div className="card" style={{ padding: "28px 32px" }}>
        <form action={createLigne} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label>Numéro *</label>
              <input name="numero" type="text" placeholder="ex: 147" required maxLength={20} />
            </div>
            <div>
              <label>Slug URL *</label>
              <input name="slug" type="text" placeholder="ex: 147" required maxLength={100} />
              <p style={{ margin: "4px 0 0", fontSize: "0.7rem", color: "#94A3B8" }}>
                Minuscules, chiffres, tirets uniquement
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label>Coopérative</label>
              <input name="cooperative" type="text" placeholder="ex: KOFIMANGA" maxLength={200} />
            </div>
            <div>
              <label>Téléphone</label>
              <input name="telephone" type="text" placeholder="ex: +261 34 00 000 00" maxLength={50} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <label>Couleur du bus</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input name="couleur_bus" type="color" defaultValue="#FFB800" style={{ width: 44, height: 36, padding: 2, borderRadius: 8, border: "1px solid #E2E8F0", cursor: "pointer" }} />
                <input name="couleur_bus_hex" type="text" defaultValue="#FFB800" placeholder="#FFB800" maxLength={7} style={{ flex: 1 }} />
              </div>
            </div>
            <div>
              <label>Type de circuit</label>
              <select name="type_circuit" defaultValue="aller_retour">
                <option value="aller_retour">Aller-retour</option>
                <option value="aller_simple">Aller simple</option>
                <option value="unique">Unique</option>
              </select>
            </div>
            <div>
              <label>Statut</label>
              <select name="statut" defaultValue="a_verifier">
                <option value="a_verifier">À vérifier</option>
                <option value="verifie">Vérifié</option>
                <option value="obsolete">Obsolète</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
            <button type="submit" className="btn-yellow">Créer la ligne →</button>
            <Link href="/gestion/lignes">
              <button type="button" className="btn-sm btn-gray" style={{ padding: "10px 18px" }}>Annuler</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
