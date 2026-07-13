import { getEmplois, updateStatutEmploi, deleteEmploi } from "@/app/gestion/actions";

export default async function EmploisAdminPage() {
  const offres = await getEmplois();
  const enAttente = offres.filter((o: { statut: string }) => o.statut === "en_attente");

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Offres d&apos;emploi</h1>
        <span style={{ fontSize: "0.82rem", color: "#94A3B8" }}>
          {offres.length} offre{offres.length > 1 ? "s" : ""} &middot; {enAttente.length} en attente
        </span>
      </div>

      <div className="card">
        <div className="table-wrap"><table>
          <thead>
            <tr>
              <th>Poste</th>
              <th>Recruteur</th>
              <th>Lieu</th>
              <th>Date limite</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offres.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#94A3B8", padding: 40 }}>
                  Aucune offre pour l&apos;instant.
                </td>
              </tr>
            )}
            {offres.map((o: {
              id: string;
              type_poste: string;
              nom: string;
              telephone: string;
              lieu: string;
              description: string;
              statut: string;
              date_limite: string | null;
              created_at: string;
            }) => {
              const statutMap: Record<string, string> = {
                en_attente: "badge-orange",
                publie: "badge-green",
                rejete: "badge-red",
              };
              const statutLabels: Record<string, string> = {
                en_attente: "En attente",
                publie: "Publie",
                rejete: "Rejete",
              };

              return (
                <tr key={o.id}>
                  <td>
                    <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: "0.85rem" }}>{o.type_poste}</p>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>
                      {o.description}
                    </p>
                  </td>
                  <td style={{ fontSize: "0.82rem" }}>
                    <div style={{ fontWeight: 600 }}>{o.nom}</div>
                    <div style={{ color: "#64748B" }}>{o.telephone}</div>
                  </td>
                  <td style={{ fontSize: "0.82rem", color: "#64748B" }}>{o.lieu}</td>
                  <td style={{ fontSize: "0.8rem", color: "#64748B", whiteSpace: "nowrap" }}>
                    {o.date_limite ? new Date(o.date_limite).toLocaleDateString("fr-FR") : "-"}
                  </td>
                  <td>
                    <span className={`badge ${statutMap[o.statut] ?? "badge-gray"}`}>
                      {statutLabels[o.statut] ?? o.statut}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {o.statut !== "publie" && (
                        <form action={updateStatutEmploi.bind(null, o.id, "publie")} style={{ display: "inline" }}>
                          <button type="submit" className="btn-sm btn-green">Publier</button>
                        </form>
                      )}
                      {o.statut !== "rejete" && (
                        <form action={updateStatutEmploi.bind(null, o.id, "rejete")} style={{ display: "inline" }}>
                          <button type="submit" className="btn-sm btn-orange">Rejeter</button>
                        </form>
                      )}
                      <form action={deleteEmploi.bind(null, o.id)} style={{ display: "inline" }}>
                        <button type="submit" className="btn-sm btn-red">Supprimer</button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table></div>
      </div>
    </div>
  );
}
