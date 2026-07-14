import { getMessages, updateStatutMessage, deleteMessage } from "@/app/gestion/actions";

const CATEGORIE_LABELS: Record<string, string> = {
  contact: "Contact",
  erreur: "Signalement",
  contribution: "Contribution",
  publicite: "Publicité",
  partenariat: "Partenariat",
};

const CATEGORIE_BADGES: Record<string, string> = {
  contact: "badge-gray",
  erreur: "badge-red",
  contribution: "badge-green",
  publicite: "badge-orange",
  partenariat: "badge-orange",
};

const STATUT_LABELS: Record<string, string> = {
  nouveau: "Nouveau",
  traite: "Traité",
  archive: "Archivé",
};

const STATUT_BADGES: Record<string, string> = {
  nouveau: "badge-orange",
  traite: "badge-green",
  archive: "badge-gray",
};

export default async function MessagesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie: filtre } = await searchParams;
  const messages = await getMessages();
  const nouveaux = messages.filter((m: { statut: string }) => m.statut === "nouveau");
  const affiches = filtre ? messages.filter((m: { categorie: string }) => m.categorie === filtre) : messages;

  const filtres = [
    { key: undefined, label: "Tous" },
    { key: "contact", label: "Contact" },
    { key: "erreur", label: "Signalements" },
    { key: "contribution", label: "Contributions" },
    { key: "publicite", label: "Publicité" },
    { key: "partenariat", label: "Partenariat" },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Messages</h1>
        <span style={{ fontSize: "0.82rem", color: "#94A3B8" }}>
          {messages.length} message{messages.length > 1 ? "s" : ""} &middot; {nouveaux.length} nouveau{nouveaux.length > 1 ? "x" : ""}
        </span>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
        {filtres.map((f) => (
          <a
            key={f.label}
            href={f.key ? `/gestion/messages?categorie=${f.key}` : "/gestion/messages"}
            className="btn-sm"
            style={{
              textDecoration: "none",
              background: filtre === f.key ? "#0D1525" : "#F1F5F9",
              color: filtre === f.key ? "#FFB800" : "#64748B",
            }}
          >
            {f.label}
          </a>
        ))}
      </div>

      <div className="card">
        <div className="table-wrap"><table>
          <thead>
            <tr>
              <th>Expéditeur</th>
              <th>Catégorie</th>
              <th>Message</th>
              <th>Reçu le</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {affiches.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#94A3B8", padding: 40 }}>
                  Aucun message pour l&apos;instant.
                </td>
              </tr>
            )}
            {affiches.map((m: {
              id: string;
              categorie: string;
              nom: string;
              email: string;
              telephone: string | null;
              sujet: string | null;
              message: string;
              ligne_numero: string | null;
              statut: string;
              created_at: string;
            }) => (
              <tr key={m.id}>
                <td>
                  <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: "0.85rem" }}>{m.nom}</p>
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748B" }}>{m.email}</p>
                  {m.telephone && <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748B" }}>{m.telephone}</p>}
                </td>
                <td>
                  <span className={`badge ${CATEGORIE_BADGES[m.categorie] ?? "badge-gray"}`}>
                    {CATEGORIE_LABELS[m.categorie] ?? m.categorie}
                  </span>
                  {m.ligne_numero && (
                    <div style={{ marginTop: 4, fontSize: "0.72rem", color: "#94A3B8" }}>Ligne {m.ligne_numero}</div>
                  )}
                </td>
                <td style={{ maxWidth: 280 }}>
                  {m.sujet && <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: "0.8rem" }}>{m.sujet}</p>}
                  <p style={{
                    margin: 0, fontSize: "0.78rem", color: "#64748B",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {m.message}
                  </p>
                </td>
                <td style={{ fontSize: "0.8rem", color: "#64748B", whiteSpace: "nowrap" }}>
                  {new Date(m.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                </td>
                <td>
                  <span className={`badge ${STATUT_BADGES[m.statut] ?? "badge-gray"}`}>
                    {STATUT_LABELS[m.statut] ?? m.statut}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {m.statut !== "traite" && (
                      <form action={updateStatutMessage.bind(null, m.id, "traite")} style={{ display: "inline" }}>
                        <button type="submit" className="btn-sm btn-green">Traité</button>
                      </form>
                    )}
                    {m.statut !== "archive" && (
                      <form action={updateStatutMessage.bind(null, m.id, "archive")} style={{ display: "inline" }}>
                        <button type="submit" className="btn-sm btn-gray">Archiver</button>
                      </form>
                    )}
                    <form action={deleteMessage.bind(null, m.id)} style={{ display: "inline" }}>
                      <button type="submit" className="btn-sm btn-red">Supprimer</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </div>
  );
}
