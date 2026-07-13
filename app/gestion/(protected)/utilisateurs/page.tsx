import { getUtilisateurs, approuverUser, suspendreUser, deleteUser } from "@/app/gestion/actions";

export default async function UtilisateursPage() {
  const users = await getUtilisateurs();

  const enAttente = users.filter((u: { statut: string }) => u.statut === "en_attente");
  const autres = users.filter((u: { statut: string }) => u.statut !== "en_attente");

  function StatutBadge({ statut }: { statut: string }) {
    const map: Record<string, string> = {
      en_attente: "badge-orange",
      approuve: "badge-green",
      suspendu: "badge-red",
    };
    const labels: Record<string, string> = {
      en_attente: "En attente",
      approuve: "Approuve",
      suspendu: "Suspendu",
    };
    return <span className={`badge ${map[statut] ?? "badge-gray"}`}>{labels[statut] ?? statut}</span>;
  }

  function UserRow({ u }: { u: { id: string; nom: string; telephone: string | null; email: string | null; statut: string; cle: string | null; created_at: string } }) {
    return (
      <tr>
        <td>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", background: "#FFB800",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: "0.8rem", color: "#0D1525", flexShrink: 0,
            }}>
              {u.nom.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontWeight: 600 }}>{u.nom}</span>
          </div>
        </td>
        <td style={{ color: "#64748B", fontSize: "0.82rem" }}>
          {u.telephone && <div>{u.telephone}</div>}
          {u.email && <div>{u.email}</div>}
        </td>
        <td><StatutBadge statut={u.statut} /></td>
        <td style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#94A3B8" }}>
          {u.cle ?? "-"}
        </td>
        <td style={{ fontSize: "0.8rem", color: "#64748B", whiteSpace: "nowrap" }}>
          {new Date(u.created_at).toLocaleDateString("fr-FR")}
        </td>
        <td>
          <div style={{ display: "flex", gap: 6 }}>
            {u.statut === "en_attente" && (
              <form action={approuverUser.bind(null, u.id)} style={{ display: "inline" }}>
                <button type="submit" className="btn-sm btn-green">Approuver</button>
              </form>
            )}
            {u.statut === "approuve" && (
              <form action={suspendreUser.bind(null, u.id)} style={{ display: "inline" }}>
                <button type="submit" className="btn-sm btn-orange">Suspendre</button>
              </form>
            )}
            {u.statut === "suspendu" && (
              <form action={approuverUser.bind(null, u.id)} style={{ display: "inline" }}>
                <button type="submit" className="btn-sm btn-green">Reactiver</button>
              </form>
            )}
            <form action={deleteUser.bind(null, u.id)} style={{ display: "inline" }}>
              <button type="submit" className="btn-sm btn-red">Supprimer</button>
            </form>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Utilisateurs</h1>
        <span style={{ fontSize: "0.82rem", color: "#94A3B8" }}>
          {users.length} membre{users.length > 1 ? "s" : ""} &middot; {enAttente.length} en attente
        </span>
      </div>

      {enAttente.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#f59e0b", marginBottom: 10 }}>
            En attente d&apos;approbation ({enAttente.length})
          </p>
          <div className="card" style={{ border: "1.5px solid #fde68a" }}>
            <div className="table-wrap"><table>
              <thead>
                <tr><th>Nom</th><th>Contact</th><th>Statut</th><th>Cle</th><th>Date</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {enAttente.map((u: { id: string; nom: string; telephone: string | null; email: string | null; statut: string; cle: string | null; created_at: string }) => <UserRow key={u.id} u={u} />)}
              </tbody>
            </table></div>
          </div>
        </div>
      )}

      <div>
        <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94A3B8", marginBottom: 10 }}>
          Tous les membres
        </p>
        <div className="card">
          <div className="table-wrap"><table>
            <thead>
              <tr><th>Nom</th><th>Contact</th><th>Statut</th><th>Cle d&apos;acces</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {autres.length === 0 && enAttente.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: "center", color: "#94A3B8", padding: 40 }}>Aucun membre.</td></tr>
              )}
              {autres.map((u: { id: string; nom: string; telephone: string | null; email: string | null; statut: string; cle: string | null; created_at: string }) => <UserRow key={u.id} u={u} />)}
            </tbody>
          </table></div>
        </div>
      </div>
    </div>
  );
}
