import { getEmplois, updateStatutEmploi, deleteEmploi, createEmploiInterne, toggleInterneEmploi } from "@/app/gestion/actions";
import { adminDb } from "@/lib/supabase";
import HeroImageUpload from "./HeroImageUpload";

async function getHeroImageUrl(): Promise<string | null> {
  const { data } = await adminDb
    .from("parametres")
    .select("valeur")
    .eq("cle", "emplois_hero_image_url")
    .single();
  return data?.valeur ?? null;
}

const TYPES_CONTRAT = ["CDI", "CDD", "Stage", "Freelance", "Temps partiel"];

export default async function EmploisAdminPage() {
  const [offres, heroImageUrl] = await Promise.all([getEmplois(), getHeroImageUrl()]);

  const internes = offres.filter((o: { interne: boolean }) => o.interne === true);
  const clients = offres.filter((o: { interne: boolean }) => o.interne !== true);
  const enAttente = clients.filter((o: { statut: string }) => o.statut === "en_attente");

  return (
    <div>
      <HeroImageUpload currentUrl={heroImageUrl} />

      {/* ── Postes internes TaxiBe ── */}
      <div className="page-header" style={{ marginTop: 32 }}>
        <h1 className="page-title">Postes TaxiBe</h1>
        <span style={{ fontSize: "0.82rem", color: "#94A3B8" }}>
          Visibles sur le site web — {internes.length} poste{internes.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Formulaire de création */}
      <div className="card" style={{ marginBottom: 20 }}>
        <p style={{ margin: "0 0 16px", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8" }}>
          Nouveau poste interne
        </p>
        <form action={createEmploiInterne} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#64748B", marginBottom: 4 }}>
              Intitulé du poste *
            </label>
            <input
              name="nom"
              required
              placeholder="Ex : Développeur Front-End, Agent recenseur…"
              style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: "0.875rem", fontFamily: "inherit", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#64748B", marginBottom: 4 }}>
              Type de contrat
            </label>
            <select
              name="type_poste"
              style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: "0.875rem", fontFamily: "inherit", background: "white", boxSizing: "border-box" }}
            >
              <option value="">— Choisir —</option>
              {TYPES_CONTRAT.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#64748B", marginBottom: 4 }}>
              Lieu
            </label>
            <input
              name="lieu"
              defaultValue="Antananarivo"
              style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: "0.875rem", fontFamily: "inherit", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#64748B", marginBottom: 4 }}>
              Date limite (optionnel)
            </label>
            <input
              name="date_limite"
              type="date"
              style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: "0.875rem", fontFamily: "inherit", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#64748B", marginBottom: 4 }}>
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Missions, profil recherché…"
              style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #E2E8F0", borderRadius: 8, fontSize: "0.875rem", fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <button type="submit" style={{
              padding: "10px 24px", background: "#FFB800", border: "none", borderRadius: 8,
              fontWeight: 800, fontSize: "0.875rem", color: "#0D1525", cursor: "pointer", fontFamily: "inherit",
            }}>
              + Publier le poste sur le site
            </button>
          </div>
        </form>
      </div>

      {/* Liste postes internes */}
      <div className="card" style={{ marginBottom: 40 }}>
        <div className="table-wrap"><table>
          <thead>
            <tr>
              <th>Poste</th>
              <th>Contrat</th>
              <th>Lieu</th>
              <th>Date limite</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {internes.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#94A3B8", padding: 32 }}>
                  Aucun poste interne publié. Créez-en un ci-dessus.
                </td>
              </tr>
            )}
            {internes.map((o: {
              id: string; nom: string; type_poste: string; lieu: string;
              description: string; statut: string; date_limite: string | null; created_at: string;
            }) => {
              const statutMap: Record<string, string> = { en_attente: "badge-orange", publie: "badge-green", rejete: "badge-red" };
              const statutLabels: Record<string, string> = { en_attente: "En attente", publie: "Publié", rejete: "Rejeté" };
              return (
                <tr key={o.id}>
                  <td>
                    <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: "0.85rem" }}>{o.nom}</p>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>
                      {o.description}
                    </p>
                  </td>
                  <td style={{ fontSize: "0.82rem", color: "#64748B" }}>{o.type_poste || "—"}</td>
                  <td style={{ fontSize: "0.82rem", color: "#64748B" }}>{o.lieu}</td>
                  <td style={{ fontSize: "0.8rem", color: "#64748B", whiteSpace: "nowrap" }}>
                    {o.date_limite ? new Date(o.date_limite).toLocaleDateString("fr-FR") : "—"}
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
                      {o.statut === "publie" && (
                        <form action={updateStatutEmploi.bind(null, o.id, "rejete")} style={{ display: "inline" }}>
                          <button type="submit" className="btn-sm btn-orange">Dépublier</button>
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

      {/* ── Offres partenaires / clients ── */}
      <div className="page-header">
        <h1 className="page-title" style={{ fontSize: "1.05rem" }}>Offres partenaires</h1>
        <span style={{ fontSize: "0.82rem", color: "#94A3B8" }}>
          App uniquement — {clients.length} offre{clients.length !== 1 ? "s" : ""} · {enAttente.length} en attente
        </span>
      </div>
      <div style={{ marginBottom: 12, padding: "10px 14px", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 8, fontSize: "0.8rem", color: "#92400E" }}>
        Ces offres sont soumises par des clients ou partenaires et sont visibles <strong>uniquement dans l&apos;application mobile</strong>. Elles n&apos;apparaissent pas sur le site web.
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
            {clients.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#94A3B8", padding: 40 }}>
                  Aucune offre partenaire pour l&apos;instant.
                </td>
              </tr>
            )}
            {clients.map((o: {
              id: string; type_poste: string; nom: string; telephone: string;
              lieu: string; description: string; statut: string; date_limite: string | null; created_at: string;
            }) => {
              const statutMap: Record<string, string> = { en_attente: "badge-orange", publie: "badge-green", rejete: "badge-red" };
              const statutLabels: Record<string, string> = { en_attente: "En attente", publie: "Publié", rejete: "Rejeté" };
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
                    {o.date_limite ? new Date(o.date_limite).toLocaleDateString("fr-FR") : "—"}
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
                      <form action={toggleInterneEmploi.bind(null, o.id, true)} style={{ display: "inline" }}>
                        <button type="submit" className="btn-sm" style={{ background: "#F0FDF4", color: "#166534", border: "1px solid #BBF7D0" }}>
                          → Site web
                        </button>
                      </form>
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
