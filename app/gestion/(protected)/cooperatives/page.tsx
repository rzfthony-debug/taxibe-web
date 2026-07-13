import { adminDb } from "@/lib/supabase";

async function getCooperatives() {
  const { data } = await adminDb
    .from("cooperatives")
    .select("id, nom, telephone, email, actif, created_at")
    .order("nom", { ascending: true });
  return data ?? [];
}

export default async function CooperativesPage() {
  const coops = await getCooperatives();

  return (
    <div style={{ padding: "32px 36px" }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Cooperatives</h1>
          <p style={{ margin: "4px 0 0", fontSize: "0.82rem", color: "#94A3B8" }}>
            {coops.length} cooperative{coops.length !== 1 ? "s" : ""} au total
          </p>
        </div>
        <button className="btn-yellow">+ Nouvelle cooperative</button>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Telephone</th>
              <th>Email</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {coops.map((c) => (
              <tr key={c.id}>
                <td style={{ fontWeight: 700 }}>{c.nom}</td>
                <td style={{ color: "#64748B" }}>{c.telephone ?? "-"}</td>
                <td style={{ color: "#64748B" }}>{c.email ?? "-"}</td>
                <td>
                  <span className={`badge ${c.actif !== false ? "badge-green" : "badge-gray"}`}>
                    {c.actif !== false ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
            {coops.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", color: "#94A3B8", padding: "40px" }}>
                  Aucune cooperative enregistree
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
