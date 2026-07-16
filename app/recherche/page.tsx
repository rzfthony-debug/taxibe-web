import { searchLignesByNumero } from "@/lib/search";
import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Recherche de ligne",
  description: "Recherchez une ligne de taxi-be à Antananarivo par numéro.",
  robots: { index: false, follow: true },
};

const LIGNES_POPULAIRES = ["147", "183", "D", "163", "133"];

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    titre: "Recherche rapide",
    desc: "Trouvez votre ligne en quelques secondes.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    titre: "Infos précises",
    desc: "Arrêts, itinéraires et correspondances à jour.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
    titre: "Notifications",
    desc: "Restez informé des changements en temps réel.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    titre: "Disponible sur l'app",
    desc: "Encore plus de fonctionnalités vous attendent.",
  },
];

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
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 48px 48px;
        }
        .search-bar-hero {
          display: flex;
          align-items: center;
          background: white;
          border: 1.5px solid #E2E8F0;
          border-radius: 14px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          overflow: hidden;
          height: 62px;
        }
        .search-bar-hero:focus-within {
          border-color: #FFB800;
          box-shadow: 0 4px 24px rgba(255,184,0,0.15);
        }
        .search-bar-hero input {
          flex: 1;
          border: none;
          outline: none;
          padding: 0 20px;
          font-size: 1rem;
          font-family: var(--font-inter), system-ui;
          color: #0D1525;
          background: transparent;
        }
        .search-bar-hero input::placeholder { color: #94A3B8; }
        .search-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 18px;
          flex-shrink: 0;
        }
        .search-btn-hero {
          flex-shrink: 0;
          padding: 0 28px;
          height: 100%;
          background: #FFB800;
          border: none;
          cursor: pointer;
          font-weight: 800;
          font-size: 0.95rem;
          color: #0D1525;
          font-family: var(--font-inter), system-ui;
          letter-spacing: -0.01em;
          transition: background 0.15s;
          border-radius: 0 12px 12px 0;
        }
        .search-btn-hero:hover { background: #F5AF00; }
        .ligne-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 72px;
          height: 72px;
          background: white;
          border: 1.5px solid #E8ECF0;
          border-radius: 14px;
          font-weight: 900;
          font-size: 1.15rem;
          color: #0D1525;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          transition: border-color 0.15s, box-shadow 0.15s, transform 0.1s;
        }
        .ligne-chip:hover {
          border-color: #FFB800;
          box-shadow: 0 4px 16px rgba(255,184,0,0.2);
          transform: translateY(-2px);
        }
        .feature-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          padding: 28px 24px;
          flex: 1;
        }
        .result-card { display: flex; align-items: center; gap: 16px; padding: 16px 20px; }
        .result-btn {
          flex-shrink: 0;
          padding: 8px 16px;
          border-radius: 8px;
          background: #F1F5F9;
          color: #0D1525;
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
        }
        .result-btn:hover { background: #FFB800; }
        .sticky-search-bar {
          position: sticky;
          top: 0;
          z-index: 40;
          background: white;
          border-bottom: 1px solid #E8ECF0;
          padding: 12px 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .hero-image-col { display: flex; justify-content: center; align-items: center; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; padding: 40px 24px 32px; }
          .hero-image-col { display: none; }
        }
        @media (max-width: 480px) {
          .result-card { flex-wrap: wrap; }
          .result-trajet { min-width: 0; flex: 1 1 calc(100% - 76px); }
          .result-btn { width: 100%; text-align: center; padding: 10px; margin-top: 4px; }
          .ligne-chip { width: 60px; height: 60px; font-size: 1rem; }
          .feature-card { padding: 20px 16px; }
        }
      `}</style>

      <div style={{ background: "white", minHeight: "100vh" }}>

        {/* ── Hero (affiché uniquement sans query) ── */}
        {!query && (
          <>
            <section style={{ background: "white", borderBottom: "1px solid #F1F5F9" }}>
              <div className="hero-grid">
                {/* Colonne gauche */}
                <div>
                  <h1 style={{
                    fontSize: "clamp(2rem, 4vw, 2.8rem)",
                    fontWeight: 900,
                    color: "#0D1525",
                    margin: "0 0 12px",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}>
                    Rechercher une ligne
                  </h1>
                  <div style={{ width: 48, height: 4, background: "#FFB800", borderRadius: 2, marginBottom: 20 }} />
                  <p style={{
                    fontSize: "1rem",
                    color: "#64748B",
                    margin: "0 0 36px",
                    lineHeight: 1.7,
                    maxWidth: 420,
                  }}>
                    Trouvez facilement votre ligne de taxi-be<br />
                    par numéro, arrêt ou quartier.
                  </p>

                  {/* Barre de recherche hero */}
                  <form action="/recherche" method="GET" style={{ marginBottom: 40 }}>
                    <div className="search-bar-hero">
                      <span className="search-icon-wrap">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round">
                          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                      </span>
                      <input
                        name="q"
                        placeholder="Numéro de ligne (ex : 147)"
                        autoFocus
                        autoComplete="off"
                      />
                      <button type="submit" className="search-btn-hero">Chercher</button>
                    </div>
                  </form>
                </div>

                {/* Colonne droite — image */}
                <div className="hero-image-col">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/header.png"
                    alt="Taxi-be Antananarivo"
                    style={{ width: "100%", height: "auto", maxHeight: 440, objectFit: "contain", display: "block" }}
                  />
                </div>
              </div>
            </section>

            {/* ── Lignes populaires ── */}
            <section style={{ background: "white", padding: "40px 48px" }}>
              <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <p style={{
                  fontSize: "0.72rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#0D1525",
                  margin: "0 0 6px",
                }}>
                  Lignes populaires
                </p>
                <div style={{ width: 32, height: 3, background: "#FFB800", borderRadius: 2, marginBottom: 20 }} />
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {LIGNES_POPULAIRES.map((n) => (
                    <a key={n} href={`/recherche?q=${n}`} className="ligne-chip">{n}</a>
                  ))}
                </div>
              </div>
            </section>

            {/* ── CTA dark ── */}
            <section style={{ background: "white", padding: "0 48px 40px" }}>
              <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{
                  background: "#0D1525",
                  borderRadius: 16,
                  padding: "28px 36px",
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  flexWrap: "wrap",
                }}>
                  {/* Icône */}
                  <div style={{
                    width: 52, height: 52, borderRadius: "50%",
                    background: "rgba(255,184,0,0.12)",
                    border: "1.5px solid rgba(255,184,0,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ margin: "0 0 4px", fontWeight: 800, color: "white", fontSize: "1rem" }}>
                      Chercher par arrêt ou quartier ?
                    </p>
                    <p style={{ margin: 0, fontSize: "0.84rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                      Localisation GPS, recherche par nom d&apos;arrêt, correspondances — dans l&apos;app.
                    </p>
                  </div>
                  <a href="/telecharger" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "12px 24px", background: "#FFB800", borderRadius: 10,
                    fontWeight: 800, fontSize: "0.9rem", color: "#0D1525",
                    textDecoration: "none", flexShrink: 0, whiteSpace: "nowrap",
                  }}>
                    Télécharger l&apos;app →
                  </a>
                </div>
              </div>
            </section>

            {/* ── Features row ── */}
            <section style={{ background: "white", padding: "0 48px 56px" }}>
              <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{
                  display: "flex",
                  border: "1px solid #E8ECF0",
                  borderRadius: 14,
                  overflow: "hidden",
                  flexWrap: "wrap",
                }}>
                  {FEATURES.map((f, i) => (
                    <div key={f.titre} className="feature-card" style={{
                      borderRight: i < FEATURES.length - 1 ? "1px solid #E8ECF0" : "none",
                    }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 12,
                        background: "rgba(255,184,0,0.08)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {f.icon}
                      </div>
                      <p style={{ margin: "0 0 4px", fontWeight: 800, fontSize: "0.9rem", color: "#0D1525" }}>{f.titre}</p>
                      <p style={{ margin: 0, fontSize: "0.78rem", color: "#94A3B8", lineHeight: 1.55 }}>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ── Barre sticky (affiché uniquement avec query) ── */}
        {query && (
          <div className="sticky-search-bar">
            <div style={{ maxWidth: 860, margin: "0 auto" }}>
              <form action="/recherche" method="GET">
                <div className="search-bar-hero" style={{ height: 48, borderRadius: 10 }}>
                  <span className="search-icon-wrap">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                  </span>
                  <input name="q" defaultValue={query} placeholder="Numéro de ligne (ex : 147)" autoFocus autoComplete="off" />
                  <button type="submit" className="search-btn-hero" style={{ borderRadius: "0 8px 8px 0", fontSize: "0.875rem", padding: "0 22px" }}>
                    Chercher
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── Résultats ── */}
        {query && (
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 24px" }}>
            <p style={{ fontSize: "0.82rem", color: "#94A3B8", marginBottom: 20, fontWeight: 500 }}>
              {results.length > 0
                ? `${results.length} ligne${results.length > 1 ? "s" : ""} pour « ${query} »`
                : `Aucune ligne trouvée pour « ${query} »`}
            </p>

            {results.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ background: "white", borderRadius: 12, padding: "32px", border: "1px solid #E8ECF0", textAlign: "center" }}>
                  <p style={{ fontWeight: 700, color: "#0D1525", marginBottom: 6, fontSize: "0.95rem" }}>Ligne introuvable</p>
                  <p style={{ fontSize: "0.84rem", color: "#64748B", margin: 0, lineHeight: 1.6 }}>
                    Vérifiez le numéro ou essayez une partie — ex : «&nbsp;14&nbsp;» pour trouver 147.
                  </p>
                </div>
                <div style={{ background: "#0D1525", borderRadius: 12, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <div>
                    <p style={{ margin: "0 0 4px", fontWeight: 800, color: "white", fontSize: "0.88rem" }}>Cherchez par arrêt ou quartier</p>
                    <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(255,255,255,0.45)" }}>Disponible dans l&apos;application TaxiBe.</p>
                  </div>
                  <a href="/telecharger" style={{
                    padding: "9px 18px", background: "#FFB800", borderRadius: 8,
                    fontWeight: 800, fontSize: "0.82rem", color: "#0D1525", textDecoration: "none", flexShrink: 0,
                  }}>
                    Télécharger →
                  </a>
                </div>
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

                    <div className="result-trajet" style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0D1525" }}>{ligne.terminus_debut}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CBD5E0" strokeWidth="2" strokeLinecap="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0D1525" }}>{ligne.terminus_fin}</span>
                      </div>
                      <div style={{ display: "flex", gap: 12, marginTop: 5 }}>
                        {ligne.cooperative && (
                          <span style={{ fontSize: "0.75rem", color: "#94A3B8", fontWeight: 500 }}>{ligne.cooperative}</span>
                        )}
                        <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                          {ligne.nb_arrets} arrêt{ligne.nb_arrets > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

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
        )}
      </div>

      <CtaApp />
      <Footer />
    </>
  );
}
