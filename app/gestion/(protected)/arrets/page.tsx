import { adminDb } from "@/lib/supabase";

async function getArrets() {
  const { data } = await adminDb
    .from("arrets")
    .select("id, nom, ligne_id, ordre, latitude, longitude, actif")
    .order("nom", { ascending: true });
  return data ?? [];
}

export default async function ArretsPage() {
  const arrets = await getArrets();

  return (
    <div style={{ padding: "32px 36px" }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Arrets</h1>
          <p style={{ margin: "4px 0 0", fontSize: "0.82rem", color: "#94A3B8" }}>
            {arrets.length} arret{arrets.length !== 1 ? "s" : ""} au total
          </p>
        </div>
        <button className="btn-yellow">+ Nouvel arret</button>
      </div>

      <div className="card">
        <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Ligne</th>
              <th>Ordre</th>
              <th>GPS</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {arrets.map((a) => (
              <tr key={a.id}>
                <td style={{ fontWeight: 600 }}>{a.nom}</td>
                <td style={{ color: "#64748B" }}>{a.ligne_id ?? "-"}</td>
                <td style={{ color: "#64748B" }}>{a.ordre ?? "-"}</td>
                <td style={{ color: "#64748B", fontSize: "0.78rem" }}>
                  {a.latitude && a.longitude
                    ? `${Number(a.latitude).toFixed(4)}, ${Number(a.longitude).toFixed(4)}`
                    : "-"}
                </td>
                <td>
                  <span className={`badge ${a.actif !== false ? "badge-green" : "badge-gray"}`}>
                    {a.actif !== false ? "Actif" : "Inactif"}
                  </span>
                </td>
              </tr>
            ))}
            {arrets.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", color: "#94A3B8", padding: "40px" }}>
                  Aucun arret enregistre
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
