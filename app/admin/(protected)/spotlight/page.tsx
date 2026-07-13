import Link from "next/link";
import { getSpotlight, toggleSpotlight, deleteSpotlight } from "@/app/admin/actions";

export default async function SpotlightPage() {
  const items = await getSpotlight();

  return (
    <div style={{ padding: "32px 36px" }}>
      <div className="page-header">
        <h1 className="page-title">Spotlight / Publicités</h1>
        <Link href="/admin/spotlight/nouveau">
          <button className="btn-yellow">+ Nouveau spotlight</button>
        </Link>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Titre</th>
              <th>Bouton CTA</th>
              <th>Ordre</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#94A3B8", padding: "40px" }}>
                  Aucun spotlight pour l&apos;instant.
                </td>
              </tr>
            )}
            {items.map((s: { id: string; image_url: string; titre: string; cta_label: string | null; cta_url: string | null; ordre: number; publie: boolean }) => (
              <tr key={s.id}>
                <td style={{ width: 80 }}>
                  {s.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.image_url} alt="" style={{ width: 64, height: 44, objectFit: "cover", borderRadius: 6 }} />
                  )}
                </td>
                <td style={{ fontWeight: 600 }}>{s.titre}</td>
                <td style={{ fontSize: "0.8rem", color: "#64748B" }}>
                  {s.cta_label && <span>{s.cta_label}</span>}
                  {s.cta_url && <span style={{ display: "block", color: "#94A3B8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 180 }}>{s.cta_url}</span>}
                </td>
                <td style={{ textAlign: "center", fontWeight: 700 }}>{s.ordre}</td>
                <td>
                  <span className={`badge ${s.publie ? "badge-green" : "badge-gray"}`}>
                    {s.publie ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Link href={`/admin/spotlight/${s.id}`}>
                      <button className="btn-sm btn-gray">Modifier</button>
                    </Link>
                    <form action={toggleSpotlight.bind(null, s.id, !s.publie)} style={{ display: "inline" }}>
                      <button type="submit" className={`btn-sm ${s.publie ? "btn-orange" : "btn-green"}`}>
                        {s.publie ? "Désactiver" : "Activer"}
                      </button>
                    </form>
                    <form action={deleteSpotlight.bind(null, s.id)} style={{ display: "inline" }}>
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
