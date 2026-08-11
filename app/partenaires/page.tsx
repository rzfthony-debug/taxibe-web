import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { safeJsonLd } from "@/lib/sanitize";

const BASE = "https://taxibe.mg";

const partenairesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": BASE },
        { "@type": "ListItem", "position": 2, "name": "Partenaires", "item": `${BASE}/partenaires` },
      ],
    },
    {
      "@type": "WebPage",
      "name": "Partenaires — TaxiBe",
      "url": `${BASE}/partenaires`,
      "description": "Coopératives de transport, institutions et acteurs de la mobilité : collaborer avec TaxiBe à Antananarivo.",
      "about": { "@id": `${BASE}/#organization` },
    },
  ],
};

export const revalidate = 3600;

export const metadata = {
  title: "Partenaires — TaxiBe",
  description: "Coopératives de transport, institutions et acteurs de la mobilité : découvrez comment collaborer avec TaxiBe pour améliorer la mobilité à Antananarivo.",
  alternates: { canonical: "/partenaires" },
  openGraph: {
    title: "Partenaires — TaxiBe",
    description: "Coopératives de transport, institutions et acteurs de la mobilité : collaborer avec TaxiBe à Antananarivo.",
    url: "/partenaires",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Partenaires TaxiBe" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Partenaires — TaxiBe",
    description: "Coopératives de transport, institutions et acteurs de la mobilité.",
    images: ["/og-image.jpg"],
  },
};

const PROFILS = [
  {
    id: "cooperatives",
    titre: "Coopératives de transport",
    desc: "Vous gérez des lignes de taxi-be à Antananarivo ? Partagez vos données officielles et gagnez en visibilité auprès de milliers d'usagers.",
    note: "Données de lignes, horaires, tarifs",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <circle cx="8" cy="13" r="1" fill="currentColor"/>
        <circle cx="16" cy="13" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "institutions",
    titre: "Institutions & collectivités",
    desc: "Projets de mobilité urbaine, sensibilisation au transport public, planification de réseau — collaborons sur des initiatives à impact à Antananarivo.",
    note: "Projets urbains, études, partenariats publics",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
        <line x1="3" y1="22" x2="21" y2="22"/>
        <line x1="6" y1="18" x2="6" y2="11"/>
        <line x1="10" y1="18" x2="10" y2="11"/>
        <line x1="14" y1="18" x2="14" y2="11"/>
        <line x1="18" y1="18" x2="18" y2="11"/>
        <polygon points="12 2 20 7 4 7"/>
      </svg>
    ),
  },
  {
    id: "mobilite",
    titre: "Acteurs de la mobilité",
    desc: "Startup, ONG, projet de recherche ou initiative autour du transport à Madagascar — si vos projets touchent à la mobilité urbaine, parlons-en.",
    note: "Startups, ONG, recherche, tech",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
];

const VALEURS = [
  {
    titre: "Données terrain",
    desc: "67 lignes recensées manuellement. Des données réelles, vérifiées sur le terrain.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  },
  {
    titre: "Audience locale",
    desc: "Usagers quotidiens du taxi-be à Antananarivo — une audience ciblée et engagée.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    titre: "Impact réel",
    desc: "Chaque collaboration améliore directement l'expérience de déplacement des Tananariviens.",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  },
];

export default function PartenairesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(partenairesJsonLd) }} />
      <Nav />
      <style>{`
        .pt-hero   { max-width: 1100px; margin: 0 auto; padding: 64px 40px 56px; }
        .pt-section { max-width: 1100px; margin: 0 auto; padding: 64px 40px; }
        .pt-cards  { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .pt-card   { background: white; border: 1.5px solid #E8ECF0; border-radius: 18px; padding: 28px 24px; display: flex; flex-direction: column; gap: 0; transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease, border-color 0.18s; cursor: default; scroll-margin-top: 100px; }
        .pt-card:hover { transform: translateY(-6px); box-shadow: 0 14px 36px rgba(0,0,0,0.08); border-color: #FFB800; }
        .pt-icon   { width: 52px; height: 52px; border-radius: 14px; background: #0D1525; color: #FFB800; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1); }
        .pt-card:hover .pt-icon { transform: scale(1.1) rotate(-4deg); }
        .pt-vals   { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .pt-val    { background: #F8F9FB; border: 1px solid #E8ECF0; border-radius: 14px; padding: 20px; display: flex; gap: 14px; align-items: flex-start; }
        @media (max-width: 900px) {
          .pt-hero    { padding: 40px 20px 36px; }
          .pt-section { padding: 48px 20px; }
          .pt-cards   { grid-template-columns: 1fr; }
          .pt-vals    { grid-template-columns: 1fr; }
        }
      `}</style>
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>

        {/* ── Hero ── */}
        <section style={{ background: "white", borderBottom: "1px solid #E8ECF0" }}>
          <div className="pt-hero">
            <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.4)", borderRadius: 8, padding: "5px 12px", marginBottom: 24 }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8860B" }}>Partenaires</span>
            </div>
            <h1 style={{ fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 16px", letterSpacing: "-0.025em", lineHeight: 1.1, maxWidth: 600 }}>
              Construisons ensemble<br />une meilleure mobilité<br /><span style={{ color: "#FFB800" }}>à Antananarivo.</span>
            </h1>
            <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: 500, margin: "0 0 32px", lineHeight: 1.75 }}>
              TaxiBe collabore avec les coopératives, institutions et acteurs de la mobilité qui font vivre le transport public à Tana.
            </p>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px", borderRadius: 10, background: "#FFB800", color: "#0D1525", fontWeight: 800, fontSize: "0.9rem", textDecoration: "none" }}>
              Nous contacter →
            </Link>
          </div>
        </section>

        {/* ── Profils ── */}
        <section style={{ background: "#F8F9FB", borderBottom: "1px solid #E8ECF0" }}>
          <div className="pt-section">
            <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800" }}>Avec qui nous collaborons</span>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 900, color: "#0D1525", margin: "12px 0 36px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Trois types de partenaires,<br />un objectif commun.
            </h2>
            <div className="pt-cards">
              {PROFILS.map((p) => (
                <div key={p.id} id={p.id} className="pt-card">
                  <div className="pt-icon">{p.icon}</div>
                  <h3 style={{ margin: "0 0 10px", fontWeight: 900, fontSize: "1rem", color: "#0D1525", lineHeight: 1.25 }}>{p.titre}</h3>
                  <p style={{ margin: "0 0 20px", fontSize: "0.83rem", color: "#64748B", lineHeight: 1.7, flex: 1 }}>{p.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 13px", background: "#FFF8E6", borderRadius: 8 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ fontSize: "0.72rem", color: "#92400E", fontWeight: 700 }}>{p.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pourquoi TaxiBe ── */}
        <section style={{ background: "white", borderBottom: "1px solid #E8ECF0" }}>
          <div className="pt-section">
            <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800" }}>Pourquoi collaborer</span>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 900, color: "#0D1525", margin: "12px 0 32px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Ce que TaxiBe apporte.
            </h2>
            <div className="pt-vals">
              {VALEURS.map((v) => (
                <div key={v.titre} className="pt-val">
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: "#0D1525", color: "#FFB800", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {v.icon}
                  </div>
                  <div>
                    <p style={{ margin: "0 0 5px", fontWeight: 800, fontSize: "0.88rem", color: "#0D1525" }}>{v.titre}</p>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748B", lineHeight: 1.65 }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: "#F8F9FB" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 40px" }}>
            <div style={{ background: "white", borderRadius: 20, border: "1px solid #E8ECF0", padding: "40px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28, flexWrap: "wrap" }}>
              <div>
                <h2 style={{ margin: "0 0 8px", fontWeight: 900, fontSize: "1.15rem", color: "#0D1525", letterSpacing: "-0.01em" }}>
                  Une idée de collaboration ?
                </h2>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748B", lineHeight: 1.65, maxWidth: 440 }}>
                  Décrivez votre structure et votre projet — notre équipe vous répond sous 2 à 3 jours ouvrés.
                </p>
              </div>
              <Link
                href="/contact"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", borderRadius: 10, background: "#FFB800", color: "#0D1525", fontWeight: 800, fontSize: "0.9rem", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}
              >
                Proposer un partenariat →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
