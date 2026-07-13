import { adminDb } from "@/lib/supabase";
import Link from "next/link";

async function getLignes() {
  const { data } = await adminDb
    .from("lignes")
    .select("id, numero, terminus_debut, terminus_fin, couleur_bus, cooperative, nb_arrets, actif")
    .order("numero", { ascending: true });
  return data ?? [];
}

export default async function LignesPage() {
  const lignes = await getLignes();

  return (
    <div style={{ padding: "32px 36px" }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Lignes</h1>
          <p style={{ margin: "4px 0 0", fontSize: "0.82rem", color: "#94A3B8" }}>
            {lignes.length} ligne{lignes.length !== 1 ? "s" : ""} au total
          </p>
        </div>
        <Link href="/gestion/lignes/nouvelle">
          <button className="btn-yellow">+ Nouvelle ligne</button>
        </Link>
      </div>

      <div className="card">
        <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Numero</th>
              <th>Trajet</th>
              <th>Cooperative</th>
              <th>Arrets</th>
              <th>Statut</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lignes.map((l) => (
              <tr key={l.id}>
                <td>
                  <span style={{
                    display: "inline-block",
                    background: l.couleur_bus || "#FFB800",
                    color: "white", fontWeight: 900,
                    padding: "4px 10px", borderRadius: 6, fontSize: "0.85rem",
                  }}>
                    {l.numero}
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>
                  {l.terminus_debut} &rarr; {l.terminus_fin}
                </td>
                <td style={{ color: "#64748B" }}>{l.cooperative ?? "-"}</td>
                <td style={{ color: "#64748B" }}>{l.nb_arrets ?? "-"}</td>
                <td>
                  <span className={`badge ${l.actif !== false ? "badge-green" : "badge-gray"}`}>
                    {l.actif !== false ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <Link href={`/gestion/lignes/${l.id}`}>
                    <button className="btn-sm btn-gray">Modifier</button>
                  </Link>
                </td>
              </tr>
            ))}
            {lignes.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#94A3B8", padding: "40px" }}>
                  Aucune ligne enregistree
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
