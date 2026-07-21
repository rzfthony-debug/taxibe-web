import Link from "next/link";
import { getActualites, toggleActualite, deleteActualite } from "@/app/gestion/actions";

export default async function ActualitesAdminPage() {
  const articles = await getActualites();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Actualites</h1>
        <Link href="/gestion/actualites/nouveau">
          <button className="btn-yellow">+ Nouvel article</button>
        </Link>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Resume</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", color: "#64748B", padding: "40px" }}>
                  Aucun article pour l&apos;instant.
                </td>
              </tr>
            )}
            {articles.map((a: { id: string; image_url: string; texte: string; publie: boolean; created_at: string }) => (
              <tr key={a.id}>
                <td style={{ width: 80 }}>
                  {a.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.image_url} alt="" style={{ width: 64, height: 44, objectFit: "cover", borderRadius: 6 }} />
                  )}
                </td>
                <td style={{ maxWidth: 320 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: "0.85rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {a.texte}
                  </p>
                </td>
                <td>
                  <span className={`badge ${a.publie ? "badge-green" : "badge-gray"}`}>
                    {a.publie ? "Publie" : "Brouillon"}
                  </span>
                </td>
                <td style={{ color: "#64748B", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                  {new Date(a.created_at).toLocaleDateString("fr-FR")}
                </td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Link href={`/gestion/actualites/${a.id}`}>
                      <button className="btn-sm btn-gray">Modifier</button>
                    </Link>
                    <form action={toggleActualite.bind(null, a.id, !a.publie)} style={{ display: "inline" }}>
                      <button type="submit" className={`btn-sm ${a.publie ? "btn-orange" : "btn-green"}`}>
                        {a.publie ? "Depublier" : "Publier"}
                      </button>
                    </form>
                    <form action={deleteActualite.bind(null, a.id)} style={{ display: "inline" }}>
                      <button type="submit" className="btn-sm btn-red">Supprimer</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
