import { searchLignesByNumero } from "@/lib/search";
import Link from "next/link";
import Image from "next/image";
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
        /* ── Hero ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px 48px 48px;
          gap: 32px;
        }
        .hero-image-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* ── Barre de recherche ── */
        .search-form-wrap { width: 100%; max-width: 520px; box-sizing: border-box; }
        .search-bar-hero {
          display: flex;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
          background: white;
          border: 1.5px solid #E2E8F0;
          border-radius: 14px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.07);
          overflow: hidden;
          height: 60px;
        }
        .search-bar-hero:focus-within {
          border-color: #FFB800;
          box-shadow: 0 0 0 3px rgba(255,184,0,0.15);
        }
        .search-bar-hero input {
          flex: 1 1 0;
          min-width: 0;
          width: 0;
          border: none;
          outline: none;
          padding: 0 12px;
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
          padding: 0 12px;
          flex-shrink: 0;
        }
        .search-btn {
          flex-shrink: 0;
          padding: 0 22px;
          height: 100%;
          background: #FFB800;
          border: none;
          cursor: pointer;
          font-weight: 800;
          font-size: 0.9rem;
          color: #0D1525;
          font-family: var(--font-inter), system-ui;
          transition: background 0.15s;
          white-space: nowrap;
        }
        .search-btn:hover { background: #F5AF00; }

        /* ── Chips lignes populaires ── */
        .ligne-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 64px;
          height: 64px;
          padding: 0 14px;
          background: white;
          border: 1.5px solid #E8ECF0;
          border-radius: 14px;
          font-weight: 900;
          font-size: 1.1rem;
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
        .chips-wrap {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* ── Section features ── */
        .features-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid #E8ECF0;
          border-radius: 14px;
          overflow: hidden;
        }
        .feature-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 28px 22px;
          border-right: 1px solid #E8ECF0;
        }
        .feature-card:last-child { border-right: none; }
        .feature-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: rgba(255,184,0,0.08);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        /* ── Cards résultats ── */
        .result-card {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 18px;
          background: white; border-radius: 12px;
          border: 1px solid #E8ECF0;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .result-num {
          flex-shrink: 0;
          font-weight: 900; font-size: 1rem;
          padding: 8px 14px; border-radius: 8px;
          min-width: 56px; text-align: center;
          letter-spacing: 0.02em; color: white;
        }
        .result-info { flex: 1; min-width: 0; }
        .result-trajet {
          display: flex; align-items: center;
          gap: 6px; flex-wrap: wrap;
        }
        .result-trajet span {
          font-weight: 700; font-size: 0.9rem; color: #0D1525;
        }
        .result-meta {
          display: flex; gap: 10px; margin-top: 4px; flex-wrap: wrap;
        }
        .result-meta span { font-size: 0.73rem; color: #94A3B8; font-weight: 500; }
        .result-btn {
          flex-shrink: 0; padding: 9px 16px; border-radius: 8px;
          background: #F1F5F9; color: #0D1525; font-size: 0.8rem;
          font-weight: 700; text-decoration: none; white-space: nowrap;
          transition: background 0.12s;
        }
        .result-btn:hover { background: #FFB800; }

        /* ── Sticky bar (avec résultats) ── */
        .sticky-bar {
          position: sticky; top: 0; z-index: 40;
          background: white; border-bottom: 1px solid #E8ECF0;
          padding: 10px 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          width: 100%; box-sizing: border-box; overflow: hidden;
        }
        .sticky-inner { max-width: 860px; margin: 0 auto; }
        .search-bar-sticky {
          display: flex; align-items: center;
          width: 100%; box-sizing: border-box;
          background: #F8F9FB;
          border: 1.5px solid #E2E8F0;
          border-radius: 12px;
          overflow: hidden;
          height: 50px;
        }
        .search-bar-sticky:focus-within {
          border-color: #FFB800;
          box-shadow: 0 0 0 3px rgba(255,184,0,0.12);
          background: white;
        }
        .search-bar-sticky input {
          flex: 1 1 0; min-width: 0; width: 0; border: none; outline: none;
          padding: 0 12px; font-size: 0.95rem;
          font-family: var(--font-inter), system-ui;
          color: #0D1525; background: transparent;
        }
        .search-bar-sticky input::placeholder { color: #94A3B8; }
        .search-bar-sticky button {
          flex-shrink: 0; height: 100%; padding: 0 20px;
          background: #FFB800; border: none; cursor: pointer;
          font-weight: 800; font-size: 0.88rem; color: #0D1525;
          font-family: var(--font-inter), system-ui;
          transition: background 0.15s;
        }
        .search-bar-sticky button:hover { background: #F5AF00; }

        /* ── Section paddings ── */
        .section-pad  { padding: 0 48px 40px; }
        .section-hero-pop { padding: 32px 48px 28px; }

        /* ── Responsive 900px ── */
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; padding: 36px 20px 28px; gap: 0; }
          .hero-image-col { display: none; }
          .search-form-wrap { max-width: 100%; }
          .features-row { grid-template-columns: 1fr 1fr; }
          .feature-card { border-bottom: 1px solid #E8ECF0; }
          .section-pad { padding: 0 16px 28px; }
          .section-hero-pop { padding: 24px 16px 20px; }
        }

        /* ── Responsive 600px ── */
        @media (max-width: 600px) {
          .search-bar-hero { height: 56px; border-radius: 12px; }
          .search-bar-hero input { font-size: 0.95rem; padding: 0 10px; }
          .search-icon-wrap { padding: 0 10px; }
          .search-btn { padding: 0 16px; font-size: 0.85rem; }
          .ligne-chip { min-width: 58px; height: 58px; font-size: 1rem; }
          .features-row { grid-template-columns: 1fr; }
        }

        /* ── Responsive 420px ── */
        @media (max-width: 420px) {
          .result-card { flex-wrap: wrap; gap: 10px; padding: 14px; }
          .result-btn { width: 100%; text-align: center; padding: 11px; }
          .search-btn { padding: 0 14px; font-size: 0.82rem; }
          .chips-wrap { gap: 8px; }
          .ligne-chip { min-width: 52px; height: 52px; font-size: 0.95rem; border-radius: 10px; }
        }
      `}</style>

      <div style={{ background: "white", minHeight: "100vh" }}>

        {/* ── HERO (sans query) ─────────────────────────────────── */}
        {!query && (
          <section style={{ borderBottom: "1px solid #F1F5F9", overflow: "hidden" }}>
            <div className="hero-grid">

              {/* Gauche : titre + search */}
              <div>
                <h1 style={{
                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
                  fontWeight: 900, color: "#0D1525",
                  margin: "0 0 10px", lineHeight: 1.1, letterSpacing: "-0.02em",
                }}>
                  Rechercher une ligne
                </h1>
                <div style={{ width: 48, height: 4, background: "#FFB800", borderRadius: 2, marginBottom: 18 }} />
                <p style={{ fontSize: "0.95rem", color: "#64748B", margin: "0 0 36px", lineHeight: 1.7, maxWidth: 400 }}>
                  Trouvez facilement votre ligne de taxi-be<br />par numéro, arrêt ou quartier.
                </p>

                <form action="/recherche" method="GET" className="search-form-wrap">
                  <div className="search-bar-hero">
                    <span className="search-icon-wrap">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                      </svg>
                    </span>
                    <input name="q" placeholder="Numéro de ligne (ex : 147)" autoComplete="off" inputMode="search" />
                    <button type="submit" className="search-btn">Chercher</button>
                  </div>
                </form>
              </div>

              {/* Droite : image */}
              <div className="hero-image-col">
                <Image
                  src="/header.png"
                  alt="Application taxi-be Antananarivo"
                  width={600}
                  height={430}
                  priority
                  sizes="(max-width: 900px) 0px, 50vw"
                  style={{ width: "100%", height: "auto", maxHeight: 440, objectFit: "contain" }}
                />
              </div>
            </div>
          </section>
        )}

        {/* ── LIGNES POPULAIRES ────────────────────────────────── */}
        {!query && (
          <section style={{ background: "white" }} className="section-hero-pop">
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.12em", color: "#0D1525", margin: "0 0 6px" }}>
                Lignes populaires
              </p>
              <div style={{ width: 32, height: 3, background: "#FFB800", borderRadius: 2, marginBottom: 18 }} />
              <div className="chips-wrap">
                {LIGNES_POPULAIRES.map((n) => (
                  <a key={n} href={`/recherche?q=${n}`} className="ligne-chip">{n}</a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA DARK ─────────────────────────────────────────── */}
        {!query && (
          <section className="section-pad">
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <div style={{
                background: "#0D1525", borderRadius: 16,
                padding: "28px 36px", display: "flex",
                alignItems: "center", gap: 24, flexWrap: "wrap",
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: "rgba(255,184,0,0.12)",
                  border: "1.5px solid rgba(255,184,0,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        )}

        {/* ── FEATURES ROW ─────────────────────────────────────── */}
        {!query && (
          <section className="section-pad">
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <div className="features-row">

                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                  </div>
                  <p style={{ margin: "0 0 3px", fontWeight: 800, fontSize: "0.88rem", color: "#0D1525" }}>Recherche rapide</p>
                  <p style={{ margin: 0, fontSize: "0.76rem", color: "#64748B", lineHeight: 1.55 }}>Trouvez votre ligne en quelques secondes.</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <p style={{ margin: "0 0 3px", fontWeight: 800, fontSize: "0.88rem", color: "#0D1525" }}>Infos précises</p>
                  <p style={{ margin: 0, fontSize: "0.76rem", color: "#64748B", lineHeight: 1.55 }}>Arrêts, itinéraires et correspondances à jour.</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                    </svg>
                  </div>
                  <p style={{ margin: "0 0 3px", fontWeight: 800, fontSize: "0.88rem", color: "#0D1525" }}>Notifications</p>
                  <p style={{ margin: 0, fontSize: "0.76rem", color: "#64748B", lineHeight: 1.55 }}>Restez informé des changements en temps réel.</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
                    </svg>
                  </div>
                  <p style={{ margin: "0 0 3px", fontWeight: 800, fontSize: "0.88rem", color: "#0D1525" }}>Disponible sur l&apos;app</p>
                  <p style={{ margin: 0, fontSize: "0.76rem", color: "#64748B", lineHeight: 1.55 }}>Encore plus de fonctionnalités vous attendent.</p>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* ── BARRE STICKY (avec query) ────────────────────────── */}
        {query && (
          <div className="sticky-bar">
            <div className="sticky-inner">
              <form action="/recherche" method="GET">
                <div className="search-bar-sticky">
                  <span style={{ display: "flex", alignItems: "center", padding: "0 12px", flexShrink: 0 }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                  </span>
                  <input name="q" defaultValue={query} placeholder="Numéro de ligne…" autoFocus autoComplete="off" inputMode="search" />
                  <button type="submit">Chercher</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── RÉSULTATS ────────────────────────────────────────── */}
        {query && (
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 24px" }}>
            <p style={{ fontSize: "0.82rem", color: "#64748B", marginBottom: 20, fontWeight: 500 }}>
              {results.length > 0
                ? `${results.length} ligne${results.length > 1 ? "s" : ""} pour « ${query} »`
                : `Aucune ligne trouvée pour « ${query} »`}
            </p>

            {results.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ background: "white", borderRadius: 12, padding: "32px", border: "1px solid #E8ECF0", textAlign: "center" }}>
                  <p style={{ fontWeight: 700, color: "#0D1525", marginBottom: 6, fontSize: "0.95rem" }}>Ligne introuvable</p>
                  <p style={{ fontSize: "0.84rem", color: "#64748B", margin: 0, lineHeight: 1.6 }}>
                    Vérifiez le numéro ou essayez une partie — ex :&nbsp;«&nbsp;14&nbsp;» pour trouver 147.
                  </p>
                </div>
                <div style={{ background: "#0D1525", borderRadius: 12, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <div>
                    <p style={{ margin: "0 0 4px", fontWeight: 800, color: "white", fontSize: "0.88rem" }}>Cherchez par arrêt ou quartier</p>
                    <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(255,255,255,0.45)" }}>Disponible dans l&apos;application TaxiBe.</p>
                  </div>
                  <a href="/telecharger" style={{ padding: "9px 18px", background: "#FFB800", borderRadius: 8, fontWeight: 800, fontSize: "0.82rem", color: "#0D1525", textDecoration: "none", flexShrink: 0 }}>
                    Télécharger →
                  </a>
                </div>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {results.map((ligne) => {
                const color = ligne.couleur_bus && ligne.couleur_bus !== "" ? ligne.couleur_bus : "#FFB800";
                return (
                  <div key={ligne.id} className="result-card">
                    <div className="result-num" style={{ background: color, boxShadow: `0 2px 8px ${color}40` }}>
                      {ligne.numero}
                    </div>
                    <div className="result-info">
                      <div className="result-trajet">
                        <span>{ligne.terminus_debut}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CBD5E0" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}>
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                        <span>{ligne.terminus_fin}</span>
                      </div>
                      <div className="result-meta">
                        {ligne.cooperative && <span>{ligne.cooperative}</span>}
                        <span>{ligne.nb_arrets} arrêt{ligne.nb_arrets > 1 ? "s" : ""}</span>
                      </div>
                    </div>
                    <a href={`https://taxibemada.vercel.app/ligne/${ligne.id}`} target="_blank" rel="noopener noreferrer" className="result-btn">
                      Voir le trajet →
                    </a>
                  </div>
                );
              })}
            </div>

            {results.length > 0 && (
              <div style={{ marginTop: 32, background: "#0D1525", borderRadius: 14, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <div>
                  <p style={{ margin: "0 0 4px", fontWeight: 800, color: "white", fontSize: "0.95rem" }}>Recherche GPS, favoris, correspondances…</p>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "rgba(255,255,255,0.55)" }}>Toutes les fonctionnalités sont disponibles dans l&apos;application pour les membres.</p>
                </div>
                <Link href="/telecharger" style={{ padding: "10px 24px", borderRadius: 8, background: "#FFB800", color: "#0D1525", fontWeight: 800, fontSize: "0.875rem", textDecoration: "none", flexShrink: 0 }}>
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
