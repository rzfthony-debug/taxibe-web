import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { supabase } from "@/lib/supabase";
import EmploisListe from "./EmploisListe";

export const metadata = {
  title: "Carrières — TaxiBe",
  description: "Rejoignez l'équipe TaxiBe et participez à la transformation de la mobilité à Madagascar.",
};

const FAQ = [
  { q: "Comment candidater ?", r: "Cliquez sur «Voir l’offre» pour chaque poste, puis remplissez le formulaire de candidature en ligne." },
  { q: "Quels documents fournir ?", r: "Un CV actualisé et une lettre de motivation. Des justificatifs pourront être demandés lors de l'entretien." },
  { q: "Quel est le processus de recrutement ?", r: "Étude du dossier → entretien téléphonique → entretien RH → proposition. Le délai moyen est de 2 à 3 semaines." },
  { q: "Vous ne trouvez pas votre métier ?", r: "Envoyez une candidature spontanée via le formulaire en bas de page. Nous gardons les profils en base pour les futures ouvertures." },
];

export default async function EmploisPage() {
  const { data: offres } = await supabase
    .from("offres_emploi")
    .select("id, nom, type_poste, lieu, description, date_limite, created_at")
    .eq("statut", "publie")
    .order("created_at", { ascending: false });

  const { count: totalOffres } = await supabase
    .from("offres_emploi")
    .select("*", { count: "exact", head: true })
    .eq("statut", "publie");

  const liste = offres ?? [];

  return (
    <>
      <Nav />
      <main>
        <style>{`
          /* ── Hero ── */
          .carriere-hero {
            background: linear-gradient(135deg, #0D1525 0%, #1A2540 60%, #0D1525 100%);
            position: relative; overflow: hidden;
          }
          .hero-dots {
            position: absolute; right: 0; top: 0; width: 420px; height: 100%;
            background-image: radial-gradient(circle, rgba(255,184,0,0.18) 1.5px, transparent 1.5px);
            background-size: 22px 22px; pointer-events: none;
            mask-image: linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 80%);
          }
          .hero-inner {
            max-width: 1100px; margin: 0 auto;
            padding: 64px 24px 72px;
            display: grid; grid-template-columns: 1fr;
            gap: 40px; position: relative;
          }
          @media (min-width: 780px) {
            .hero-inner { grid-template-columns: 1fr 1fr; align-items: center; }
          }
          .hero-illustration {
            display: none;
          }
          @media (min-width: 780px) {
            .hero-illustration { display: flex; justify-content: flex-end; align-items: center; }
          }

          /* ── Stats ── */
          .stats-bar {
            background: white; border-bottom: 1px solid #E8ECF0;
          }
          .stats-inner {
            max-width: 1100px; margin: 0 auto; padding: 0 24px;
            display: grid; grid-template-columns: repeat(2, 1fr);
          }
          @media (min-width: 640px) {
            .stats-inner { grid-template-columns: repeat(4, 1fr); }
          }
          .stat-item {
            padding: 24px 20px;
            border-right: 1px solid #E8ECF0;
            display: flex; flex-direction: column; align-items: center; text-align: center;
          }
          .stat-item:last-child { border-right: none; }

          /* ── Main layout ── */
          .emplois-layout {
            max-width: 1100px; margin: 0 auto;
            padding: 48px 24px;
            display: grid; grid-template-columns: 1fr;
            gap: 32px; align-items: start;
          }
          @media (min-width: 900px) {
            .emplois-layout { grid-template-columns: 1fr 320px; }
          }

          /* ── Sidebar widgets ── */
          .sidebar-widget {
            background: white; border-radius: 14px;
            border: 1px solid #E8ECF0; overflow: hidden;
          }
          .widget-header {
            padding: 14px 18px; background: #0D1525;
            font-size: 0.75rem; font-weight: 800; color: white;
            text-transform: uppercase; letter-spacing: 0.1em;
          }
          .widget-body { padding: 18px; }

          /* FAQ accordion */
          .faq-item { border-bottom: 1px solid #F1F5F9; }
          .faq-item:last-child { border-bottom: none; }
          .faq-item summary {
            list-style: none; cursor: pointer;
            padding: 14px 16px; font-size: 0.82rem; font-weight: 700;
            color: #0D1525; display: flex; justify-content: space-between; align-items: center;
          }
          .faq-item summary::-webkit-details-marker { display: none; }
          .faq-item[open] summary { color: #FFB800; }
          .faq-item summary svg { flex-shrink: 0; transition: transform 0.2s; color: #94A3B8; }
          .faq-item[open] summary svg { transform: rotate(180deg); color: #FFB800; }
          .faq-body { padding: 0 16px 14px; font-size: 0.8rem; color: #64748B; line-height: 1.7; }

          /* CTA bande */
          .cta-band {
            background: linear-gradient(135deg, #0D1525 0%, #1A2540 100%);
            padding: 48px 24px;
          }
          .cta-inner {
            max-width: 1100px; margin: 0 auto;
            display: flex; flex-direction: column; align-items: center; text-align: center;
            gap: 20px;
          }
          @media (min-width: 640px) {
            .cta-inner { flex-direction: row; text-align: left; justify-content: space-between; }
          }
        `}</style>

        {/* ── Hero ── */}
        <section className="carriere-hero">
          <div className="hero-dots" aria-hidden="true" />
          <div className="hero-inner">
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.3)",
                borderRadius: 8, padding: "5px 14px", marginBottom: 24,
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span style={{ fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#FFB800" }}>
                  Carrières TaxiBe
                </span>
              </div>

              <h1 style={{
                fontSize: "clamp(1.8rem, 5vw, 2.9rem)", fontWeight: 900,
                color: "white", margin: "0 0 16px", lineHeight: 1.12, letterSpacing: "-0.025em",
              }}>
                Rejoignez l&apos;équipe qui transforme la mobilité à Madagascar
              </h1>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", margin: "0 0 32px", lineHeight: 1.7, maxWidth: 500 }}>
                Construisons ensemble le futur du transport. Des postes ouverts dans tous nos départements à Antananarivo.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="#offres" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#FFB800", color: "#0D1525",
                  fontWeight: 900, fontSize: "0.9rem", padding: "13px 24px",
                  borderRadius: 10, textDecoration: "none",
                }}>
                  Voir les offres
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
                <a href="#candidature" style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                  color: "white", fontWeight: 700, fontSize: "0.9rem",
                  padding: "13px 24px", borderRadius: 10, textDecoration: "none",
                }}>
                  Candidature spontanée
                </a>
              </div>
            </div>

            <div className="hero-illustration">
              {/* Illustration décorative */}
              <svg width="380" height="280" viewBox="0 0 380 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Fond carte */}
                <rect x="30" y="20" width="320" height="240" rx="20" fill="rgba(255,184,0,0.06)" stroke="rgba(255,184,0,0.15)" strokeWidth="1"/>
                {/* Silhouettes personnes */}
                {[80, 140, 200, 260, 320].map((cx, i) => (
                  <g key={i} transform={`translate(${cx}, ${100 + (i % 2) * 20})`} opacity={0.7 - i * 0.05}>
                    <circle cx="0" cy="-28" r="14" fill={i === 2 ? "#FFB800" : "rgba(255,255,255,0.25)"}/>
                    <path d={`M-16 0 Q-16 -20 0 -14 Q16 -20 16 0 L16 40 Q0 50 -16 40 Z`}
                      fill={i === 2 ? "#FFB800" : "rgba(255,255,255,0.18)"}/>
                  </g>
                ))}
                {/* Badge stats */}
                <rect x="120" y="180" width="140" height="52" rx="12" fill="#FFB800"/>
                <text x="190" y="200" textAnchor="middle" fill="#0D1525" fontSize="11" fontWeight="800" fontFamily="system-ui">ÉQUIPE TAXIBE</text>
                <text x="190" y="220" textAnchor="middle" fill="rgba(13,21,37,0.7)" fontSize="10" fontFamily="system-ui">120+ collaborateurs</text>
                {/* Lignes de route stylisées */}
                <path d="M30 250 Q190 230 350 250" stroke="rgba(255,184,0,0.2)" strokeWidth="2" strokeDasharray="6 4"/>
              </svg>
            </div>
          </div>
          <div style={{ height: 3, background: "linear-gradient(90deg, #FFB800 0%, transparent 60%)" }} />
        </section>

        {/* ── Stats ── */}
        <div className="stats-bar">
          <div className="stats-inner">
            {[
              { value: totalOffres ?? 0, label: "Postes ouverts", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
              { value: "120+", label: "Collaborateurs", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
              { value: "5", label: "Départements", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { value: "4.8/5", label: "Satisfaction équipe", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFB800"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
            ].map((s, i) => (
              <div key={i} className="stat-item">
                <div style={{ marginBottom: 6 }}>{s.icon}</div>
                <span style={{ fontSize: "clamp(1.4rem, 4vw, 1.9rem)", fontWeight: 900, color: "#0D1525", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
                  {s.value}
                </span>
                <span style={{ fontSize: "0.72rem", color: "#94A3B8", fontWeight: 600, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main 2 colonnes ── */}
        <div style={{ background: "#F8F9FB" }}>
          <div className="emplois-layout">

            {/* Colonne gauche : offres */}
            <div id="offres">
              <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0D1525", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                  Nos offres d&apos;emploi
                </h2>
                <p style={{ fontSize: "0.82rem", color: "#94A3B8", margin: 0 }}>
                  Postes internes ouverts au sein de la société TaxiBe
                </p>
              </div>

              <EmploisListe offres={liste} />
            </div>

            {/* Colonne droite : sidebar */}
            <aside style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Widget app */}
              <div className="sidebar-widget">
                <div className="widget-header">Télécharger l&apos;app</div>
                <div className="widget-body" style={{ textAlign: "center" }}>
                  <div style={{
                    width: 52, height: 52, background: "rgba(255,184,0,0.1)", border: "1.5px solid rgba(255,184,0,0.22)",
                    borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 14px", color: "#FFB800",
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                  </div>
                  <p style={{ margin: "0 0 4px", fontWeight: 800, color: "#0D1525", fontSize: "0.9rem" }}>Application TaxiBe</p>
                  <p style={{ margin: "0 0 16px", fontSize: "0.77rem", color: "#94A3B8", lineHeight: 1.6 }}>
                    Téléchargez notre application pour trouver votre ligne de taxi-be à Tana.
                  </p>
                  <Link href="/telecharger" style={{
                    display: "block", textAlign: "center", background: "#0D1525", color: "white",
                    fontWeight: 800, fontSize: "0.82rem", padding: "10px 16px", borderRadius: 9,
                    textDecoration: "none",
                  }}>
                    Télécharger gratuitement
                  </Link>
                </div>
              </div>

              {/* Widget ligne 147 */}
              <div className="sidebar-widget">
                <div className="widget-header" style={{ background: "#FFB800", color: "#0D1525" }}>Ligne 147 — Appel RH</div>
                <div className="widget-body" style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{
                    width: 42, height: 42, background: "#FFF7E6", border: "1.5px solid #FDE68A",
                    borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, color: "#92400E",
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <p style={{ margin: "0 0 2px", fontWeight: 800, color: "#0D1525", fontSize: "0.9rem" }}>147</p>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748B", lineHeight: 1.5 }}>
                      Appelez notre équipe RH du lundi au vendredi, 8h–17h.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="sidebar-widget">
                <div className="widget-header">Questions fréquentes</div>
                <div>
                  {FAQ.map((item, i) => (
                    <details key={i} className="faq-item">
                      <summary>
                        {item.q}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </summary>
                      <p className="faq-body">{item.r}</p>
                    </details>
                  ))}
                </div>
              </div>

            </aside>
          </div>
        </div>

        {/* ── CTA candidature spontanée ── */}
        <div id="candidature" className="cta-band">
          <div className="cta-inner">
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{
                width: 54, height: 54, background: "rgba(255,184,0,0.12)", border: "1.5px solid rgba(255,184,0,0.25)",
                borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, color: "#FFB800",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <p style={{ margin: "0 0 4px", fontWeight: 900, color: "white", fontSize: "1rem" }}>
                  Vous ne trouvez pas le poste idéal ?
                </p>
                <p style={{ margin: 0, fontSize: "0.84rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                  Envoyez une candidature spontanée et rejoignez notre vivier de talents.
                </p>
              </div>
            </div>
            <a
              href="mailto:recrutement@taxibe.mg"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#FFB800", color: "#0D1525",
                fontWeight: 900, fontSize: "0.9rem", padding: "13px 28px",
                borderRadius: 10, textDecoration: "none", whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Candidature spontanée
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
