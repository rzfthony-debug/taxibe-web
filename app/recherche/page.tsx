import { searchLignesByNumero } from "@/lib/search";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export default async function RecherchePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? await searchLignesByNumero(query) : [];

  return (
    <>
    <Nav />
    <style>{`
      .result-card { display: flex; align-items: center; gap: 16px; padding: 16px 20px; }
      .result-btn { flex-shrink: 0; padding: 8px 16px; border-radius: 8px; background: #F1F5F9; color: #0D1525; font-size: 0.8rem; font-weight: 700; text-decoration: none; white-space: nowrap; }
      @media (max-width: 480px) {
        .result-card { flex-wrap: wrap; }
        .result-trajet { min-width: 0; flex: 1 1 calc(100% - 76px); }
        .result-btn { width: 100%; text-align: center; padding: 10px; margin-top: 4px; }
      }
    `}</style>
    <div style={{ minHeight: "80vh", background: "#F8F9FB" }}>

      {/* Barre de recherche sticky */}
      <div style={{
        background: "white", borderBottom: "1px solid #E8ECF0",
        padding: "12px 24px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <form action="/recherche" method="GET" style={{ display: "flex", gap: 8 }}>
            <input
              name="q"
              defaultValue={query}
              placeholder="Numéro de ligne (ex : 147)"
              autoFocus
              style={{
                flex: 1, padding: "8px 16px", borderRadius: 8,
                border: "1.5px solid #E2E8F0", fontSize: "0.9rem",
                fontFamily: "var(--font-inter), system-ui",
                outline: "none", color: "#0D1525",
              }}
            />
            <button type="submit" style={{
              padding: "8px 18px", borderRadius: 8,
              background: "#FFB800", border: "none", cursor: "pointer",
              fontWeight: 700, fontSize: "0.875rem", color: "#0D1525",
              fontFamily: "var(--font-inter), system-ui",
            }}>
              Chercher
            </button>
          </form>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "28px 24px" }}>

        {/* État vide */}
        {!query && (
          <div style={{ textAlign: "center", paddingTop: 80 }}>
            <p style={{ fontSize: "1rem", color: "#94A3B8", fontWeight: 500 }}>
              Entrez un numéro de ligne pour commencer.
            </p>
          </div>
        )}

        {/* Résultats */}
        {query && (
          <>
            <p style={{ fontSize: "0.82rem", color: "#94A3B8", marginBottom: 20, fontWeight: 500 }}>
              {results.length > 0
                ? `${results.length} ligne${results.length > 1 ? "s" : ""} pour « ${query} »`
                : `Aucune ligne trouvée pour « ${query} »`}
            </p>

            {results.length === 0 && (
              <div style={{
                background: "white", borderRadius: 12, padding: "40px 32px",
                border: "1px solid #E8ECF0", textAlign: "center",
              }}>
                <p style={{ fontWeight: 700, color: "#0D1525", marginBottom: 8 }}>Ligne introuvable</p>
                <p style={{ fontSize: "0.875rem", color: "#64748B", margin: 0 }}>
                  Vérifiez le numéro ou essayez avec une partie du numéro (ex : &quot;14&quot; pour trouver 147).
                </p>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {results.map((ligne) => {
                const color = ligne.couleur_bus && ligne.couleur_bus !== "" ? ligne.couleur_bus : "#FFB800";
                return (
                  <div key={ligne.id} className="result-card" style={{
                    background: "white", borderRadius: 12,
                    border: "1px solid #E8ECF0",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}>
                    {/* Badge numéro */}
                    <div style={{
                      flexShrink: 0,
                      background: color, color: "white",
                      fontWeight: 900, fontSize: "1rem",
                      padding: "8px 14px", borderRadius: 8,
                      minWidth: 60, textAlign: "center",
                      letterSpacing: "0.02em",
                      boxShadow: `0 2px 8px ${color}40`,
                    }}>
                      {ligne.numero}
                    </div>

                    {/* Trajet */}
                    <div className="result-trajet" style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0D1525" }}>
                          {ligne.terminus_debut}
                        </span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CBD5E0" strokeWidth="2" strokeLinecap="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0D1525" }}>
                          {ligne.terminus_fin}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 12, marginTop: 5 }}>
                        {ligne.cooperative && (
                          <span style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 500 }}>
                            {ligne.cooperative}
                          </span>
                        )}
                        <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                          {ligne.nb_arrets} arrêt{ligne.nb_arrets > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    {/* Voir le détail */}
                    <a
                      href={`https://taxibemada.vercel.app/ligne/${ligne.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="result-btn"
                    >
                      Voir le trajet →
                    </a>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Bannière téléchargement */}
        {results.length > 0 && (
          <div style={{
            marginTop: 32, background: "#0D1525", borderRadius: 14,
            padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 16,
          }}>
            <div>
              <p style={{ margin: "0 0 4px", fontWeight: 800, color: "white", fontSize: "0.95rem" }}>
                Recherche GPS, favoris, correspondances…
              </p>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "rgba(255,255,255,0.55)" }}>
                Toutes les fonctionnalités sont disponibles dans l&apos;application pour les membres.
              </p>
            </div>
            <Link href="/telecharger" style={{
              padding: "10px 24px", borderRadius: 8,
              background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "0.875rem", textDecoration: "none", flexShrink: 0,
            }}>
              Télécharger l&apos;app →
            </Link>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}
