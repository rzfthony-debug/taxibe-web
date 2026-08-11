import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CtaApp from "@/app/components/CtaApp";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { safeJsonLd } from "@/lib/sanitize";
import HeroIllustration from "@/app/components/HeroIllustration";

const BASE = "https://taxibe.mg";

const leProjetJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": BASE },
        { "@type": "ListItem", "position": 2, "name": "Le Projet", "item": `${BASE}/le-projet` },
      ],
    },
    {
      "@type": "AboutPage",
      "name": "Le Projet TaxiBe",
      "url": `${BASE}/le-projet`,
      "description": "TaxiBe cartographie le réseau de taxi-be d'Antananarivo pour le rendre accessible à tous.",
      "about": { "@id": `${BASE}/#organization` },
    },
  ],
};

export const revalidate = 3600;

export const metadata = {
  title: "Le Projet — TaxiBe, la première carte du réseau taxi-be à Antananarivo",
  description: "TaxiBe cartographie le réseau de taxi-be d'Antananarivo pour le rendre accessible à tous. 67 lignes, 1 336 arrêts, 570 géolocalisés. Mission, solution, feuille de route.",
  alternates: { canonical: "/le-projet" },
  openGraph: {
    title: "Le Projet TaxiBe — La première carte intelligente du réseau taxi-be",
    description: "TaxiBe construit la première base de données du réseau de taxi-be d'Antananarivo. 67 lignes recensées, 570 arrêts géolocalisés.",
    url: "/le-projet",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Le Projet TaxiBe" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Le Projet TaxiBe — La première carte du réseau taxi-be à Antananarivo",
    description: "67 lignes recensées, 1 336 arrêts, 570 géolocalisés. TaxiBe aide les habitants à trouver leur ligne en quelques secondes.",
    images: ["/og-image.jpg"],
  },
};

async function getHeroImageUrl(): Promise<string | null> {
  try {
    const { data } = await supabase.from("parametres").select("valeur").eq("cle", "projet_hero_image_url").single();
    return data?.valeur ?? null;
  } catch { return null; }
}

const PROBLEMES = [
  {
    num: "01",
    titre: "Des lignes difficiles à lire",
    desc: "Les numéros de lignes ne suffisent pas toujours pour savoir où passe un taxi-be et dans quelle direction il va. L'information est dans les têtes, pas sur les murs.",
  },
  {
    num: "02",
    titre: "Des arrêts sans signalétique",
    desc: "La majorité des arrêts n'ont pas de panneau, pas de nom officiel. Monter ou descendre au bon endroit s'apprend avec le temps — ou en posant la question.",
  },
  {
    num: "03",
    titre: "Des trajets qui demandent des questions",
    desc: "Trouver la bonne correspondance nécessite souvent plusieurs échanges avec des passagers ou des chauffeurs. Une connaissance locale que tout le monde n'a pas.",
  },
  {
    num: "04",
    titre: "Aucun outil numérique local",
    desc: "Il n'existe pas de solution pensée pour le réseau taxi-be d'Antananarivo. TaxiBe est la première réponse construite à partir du terrain, pour le terrain.",
  },
];


const PUBLICS = [
  {
    titre: "Étudiants",
    desc: "Trouver la ligne du campus, même dans un quartier inconnu.",
    note: "Lignes campus disponibles dès le pilote",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  },
  {
    titre: "Travailleurs",
    desc: "Moins d'incertitude le matin : ligne connue, arrêt repéré, correspondance anticipée.",
    note: "Grands axes domicile-travail couverts",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
  },
  {
    titre: "Nouveaux arrivants",
    desc: "Comprendre le réseau taxi-be en minutes, pas en semaines.",
    note: "Couverture sur toute l'agglomération",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
];


export default async function LeProjetPage() {
  const heroImageUrl = await getHeroImageUrl();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(leProjetJsonLd) }} />
      <Nav />
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>
        <style>{`
          .lp-hero-inner { max-width: 1200px; margin: 0 auto; padding: 52px 40px 44px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
          .lp-hero-img   { display: flex; align-items: center; justify-content: center; }
          .lp-stat-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 1200px; margin: 0 auto; padding: 0 40px 48px; }
          .lp-stat-card  { padding: 24px 24px 20px; border-radius: 16px; background: white; border: 1px solid #E8ECF0; position: relative; overflow: hidden; cursor: default; transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease, border-color 0.18s; }
          .lp-stat-card:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 16px 40px rgba(0,0,0,0.09); border-color: #FFB800; }
          .lp-stat-card::after { content: ""; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: #FFB800; transition: height 0.2s; }
          .lp-stat-card:hover::after { height: 4px; }
          .lp-stat-icon { width: 44px; height: 44px; border-radius: 50%; background: #0D1525; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1); }
          .lp-stat-card:hover .lp-stat-icon { transform: scale(1.15) rotate(-6deg); }
          .lp-section    { max-width: 1100px; margin: 0 auto; padding: 72px 32px; }
          .lp-pb-grid    { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .lp-sol-grid   { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .lp-pub-grid   { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
          .lp-roadmap    { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
          @media (max-width: 900px) {
            .lp-hero-inner { grid-template-columns: 1fr; padding: 40px 20px 32px; }
            .lp-hero-img   { display: none; }
            .lp-stat-cards { grid-template-columns: 1fr; padding: 0 20px 36px; }

            .lp-section    { padding: 48px 20px; }
            .lp-pb-grid    { grid-template-columns: 1fr; }
            .lp-sol-grid   { grid-template-columns: 1fr; }
            .lp-pub-grid   { grid-template-columns: 1fr; }
            .lp-roadmap    { grid-template-columns: 1fr; }
          }
        `}</style>

        {/* ── Hero ── */}
        <section style={{ background: "white", borderBottom: "1px solid #E8ECF0", overflow: "hidden" }}>
          <div className="lp-hero-inner">

            {/* Texte */}
            <div>
              {/* Badge unique punchy */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0D1525", borderRadius: 99, padding: "6px 14px 6px 8px", marginBottom: 28 }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#FFB800", borderRadius: 99, padding: "2px 10px", fontSize: "0.6rem", fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0D1525" }}>
                  Pilote
                </span>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.02em" }}>
                  Antananarivo · 2026
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 18px", lineHeight: 1.08, letterSpacing: "-0.025em" }}>
                La première carte<br />
                <span style={{ color: "#FFB800" }}>intelligente</span> du réseau<br />
                taxi-be
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#64748B", lineHeight: 1.8, margin: "0 0 28px", maxWidth: 460 }}>
                TaxiBe aide les habitants à comprendre les lignes, trouver les arrêts et choisir le bon trajet — en quelques secondes, sans devoir demander à personne.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/contact#collaborer" style={{ padding: "12px 22px", borderRadius: 9, background: "#FFB800", color: "#0D1525", fontWeight: 800, fontSize: "0.875rem", textDecoration: "none" }}>
                  Collaborer avec nous →
                </Link>
                <Link href="/recherche" style={{ padding: "12px 22px", borderRadius: 9, border: "1.5px solid #E2E8F0", color: "#64748B", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none", background: "white" }}>
                  Essayer TaxiBe
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="lp-hero-img">
              {heroImageUrl ? (
                <Image src={heroImageUrl} alt="TaxiBe — Réseau taxi-be Antananarivo" width={600} height={420} sizes="(max-width: 900px) 0px, 560px" style={{ width: "100%", height: "auto", maxHeight: 420, objectFit: "contain", mixBlendMode: "multiply" }} priority />
              ) : (
                <HeroIllustration />
              )}
            </div>
          </div>

        </section>

        {/* 3 cartes badge stats — hors hero */}
        <div style={{ background: "#F8F9FB", borderBottom: "1px solid #E8ECF0", paddingTop: 32 }}>
          <div className="lp-stat-cards">
            {[
              {
                val: "67", label: "Lignes recensées", sub: "Réseau complet d'Antananarivo",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
              },
              {
                val: "1 336", label: "Points d'arrêt", sub: "Aller et retour confondus",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
              },
              {
                val: "570", label: "Arrêts géolocalisés", sub: "43 % de couverture GPS — terrain",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/></svg>,
              },
            ].map((s) => (
              <div key={s.label} className="lp-stat-card">
                <div className="lp-stat-icon">{s.icon}</div>
                <div style={{ fontSize: "2.8rem", fontWeight: 900, color: "#FFB800", lineHeight: 1, marginBottom: 8, fontVariantNumeric: "tabular-nums" }}>{s.val}</div>
                <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#0D1525", marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Pourquoi TaxiBe existe ── */}
        <section id="mission" style={{ scrollMarginTop: 80, background: "white" }}>
          <style>{`
            .lp-pb-header { max-width: 1200px; margin: 0 auto; padding: 64px 40px 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
            .lp-pb-map    { border-radius: 16px; overflow: hidden; background: #F1F5F9; aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; }
            .lp-pb-cards  { max-width: 1200px; margin: 0 auto; padding: 0 40px; display: grid; grid-template-columns: 1fr 48px 1fr; gap: 0; align-items: stretch; }
            .lp-pb-col    { display: flex; flex-direction: column; gap: 16px; }
            .lp-pb-card   { background: #F8F9FB; border: 1px solid #E8ECF0; border-radius: 16px; padding: 24px; position: relative; overflow: hidden; }
            .lp-pb-num    { font-size: 4.5rem; font-weight: 900; color: #E8ECF0; line-height: 1; position: absolute; top: 12px; right: 16px; font-variant-numeric: tabular-nums; pointer-events: none; }
            .lp-pb-title  { font-size: 1rem; font-weight: 900; color: #0D1525; margin: 0 0 8px; line-height: 1.25; }
            .lp-pb-line   { width: 32px; height: 3px; background: #FFB800; border-radius: 2px; margin-bottom: 16px; }
            .lp-pb-illu   { margin-bottom: 14px; }
            .lp-pb-desc   { font-size: 0.82rem; color: #64748B; line-height: 1.7; margin: 0; }
            .lp-pb-spine  { display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 28px 0; }
            .lp-pb-dot    { width: 14px; height: 14px; border-radius: 50%; background: #FFB800; border: 3px solid white; box-shadow: 0 0 0 2px #FFB800; flex-shrink: 0; }
            .lp-pb-vline  { flex: 1; width: 2px; background: #E8ECF0; }
            .lp-pb-banner { max-width: 1200px; margin: 40px auto 0; border-radius: 16px; background: #0D1525; padding: 20px 28px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
            @media (max-width: 900px) {
              .lp-pb-header { grid-template-columns: 1fr; padding: 40px 20px 32px; }
              .lp-pb-map    { display: none; }
              .lp-pb-cards  { grid-template-columns: 1fr; padding: 0 20px; }
              .lp-pb-spine  { display: none; }
              .lp-pb-col    { gap: 12px; }
              .lp-pb-banner { flex-direction: column; text-align: center; margin: 24px 20px 0; }
            }
          `}</style>

          {/* Header 2 colonnes */}
          <div className="lp-pb-header">
            <div>
              <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800" }}>Pourquoi TaxiBe existe</span>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, color: "#0D1525", margin: "14px 0 0", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                Se déplacer à Antananarivo<br />ne devrait pas demander<br />autant d&apos;efforts.
              </h2>
              <div style={{ width: 40, height: 4, background: "#FFB800", borderRadius: 2, margin: "20px 0 18px" }} />
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748B", lineHeight: 1.75, maxWidth: 440 }}>
                Le réseau taxi-be est essentiel à la mobilité quotidienne.<br />Pourtant, s&apos;y retrouver reste compliqué pour la majorité des usagers.
              </p>
            </div>
            <div className="lp-pb-map">
              <Image src="/img_cartes.png" alt="Carte du réseau taxi-be à Antananarivo" width={600} height={450} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>

          {/* 2×2 cartes + spine central */}
          <div className="lp-pb-cards" style={{ paddingBottom: 0 }}>

            {/* Colonne gauche */}
            <div className="lp-pb-col">
              {/* Card 01 */}
              <div className="lp-pb-card">
                <span className="lp-pb-num">01</span>
                <div className="lp-pb-illu">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <rect x="18" y="6" width="20" height="26" rx="4" fill="#FFB800" stroke="#0D1525" strokeWidth="2"/>
                    <text x="28" y="24" textAnchor="middle" fontSize="10" fontWeight="900" fill="#0D1525" fontFamily="system-ui">123</text>
                    <line x1="28" y1="32" x2="28" y2="50" stroke="#0D1525" strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1="20" y1="50" x2="36" y2="50" stroke="#0D1525" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="lp-pb-title">Des lignes difficiles à lire</h3>
                <div className="lp-pb-line"/>
                <p className="lp-pb-desc">{PROBLEMES[0].desc}</p>
              </div>

              {/* Card 03 */}
              <div className="lp-pb-card">
                <span className="lp-pb-num">03</span>
                <div className="lp-pb-illu">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <circle cx="22" cy="32" r="12" fill="#FFB800" stroke="#0D1525" strokeWidth="2"/>
                    <text x="22" y="37" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0D1525" fontFamily="system-ui">?</text>
                    <circle cx="36" cy="22" r="10" fill="white" stroke="#0D1525" strokeWidth="2"/>
                    <circle cx="32" cy="22" r="1.5" fill="#0D1525"/>
                    <circle cx="36" cy="22" r="1.5" fill="#0D1525"/>
                    <circle cx="40" cy="22" r="1.5" fill="#0D1525"/>
                  </svg>
                </div>
                <h3 className="lp-pb-title">Des trajets qui demandent des questions</h3>
                <div className="lp-pb-line"/>
                <p className="lp-pb-desc">{PROBLEMES[2].desc}</p>
              </div>
            </div>

            {/* Spine vertical */}
            <div className="lp-pb-spine">
              <div className="lp-pb-dot"/>
              <div className="lp-pb-vline"/>
              <div className="lp-pb-dot"/>
              <div className="lp-pb-vline"/>
              <div className="lp-pb-dot"/>
            </div>

            {/* Colonne droite */}
            <div className="lp-pb-col">
              {/* Card 02 */}
              <div className="lp-pb-card">
                <span className="lp-pb-num">02</span>
                <div className="lp-pb-illu">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <rect x="10" y="28" width="36" height="20" rx="3" fill="#FFB800" stroke="#0D1525" strokeWidth="2"/>
                    <rect x="16" y="20" width="24" height="12" rx="2" fill="white" stroke="#0D1525" strokeWidth="2"/>
                    <circle cx="22" cy="26" r="3" fill="#0D1525"/>
                    <line x1="28" y1="8" x2="28" y2="20" stroke="#0D1525" strokeWidth="2.5" strokeLinecap="round"/>
                    <line x1="8" y1="48" x2="48" y2="48" stroke="#0D1525" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="lp-pb-title">Des arrêts sans signalétique</h3>
                <div className="lp-pb-line"/>
                <p className="lp-pb-desc">{PROBLEMES[1].desc}</p>
              </div>

              {/* Card 04 */}
              <div className="lp-pb-card">
                <span className="lp-pb-num">04</span>
                <div className="lp-pb-illu">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <rect x="16" y="6" width="24" height="40" rx="5" fill="white" stroke="#0D1525" strokeWidth="2"/>
                    <circle cx="28" cy="42" r="2" fill="#0D1525"/>
                    <path d="M28 16c-4 0-7 3-7 7 0 5 7 12 7 12s7-7 7-12c0-4-3-7-7-7z" fill="#FFB800" stroke="#0D1525" strokeWidth="1.5"/>
                    <circle cx="28" cy="23" r="2.5" fill="white"/>
                  </svg>
                </div>
                <h3 className="lp-pb-title">Aucun outil numérique local</h3>
                <div className="lp-pb-line"/>
                <p className="lp-pb-desc">{PROBLEMES[3].desc}</p>
              </div>
            </div>
          </div>

          {/* Bannière bas */}
          <div style={{ padding: "0 40px 56px", maxWidth: 1280, margin: "0 auto" }}>
            <div className="lp-pb-banner" style={{ marginTop: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 50, background: "#FFB800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2.2" strokeLinecap="round"><rect x="2" y="7" width="20" height="13" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><circle cx="8" cy="13" r="1" fill="#0D1525"/><circle cx="16" cy="13" r="1" fill="#0D1525"/></svg>
                </div>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "white", lineHeight: 1.55, maxWidth: 480 }}>
                  TaxiBe construit une <span style={{ color: "#FFB800", fontWeight: 800 }}>carte intelligente</span> du réseau taxi-be pour simplifier les déplacements de tous les Antananariviens.
                </p>
              </div>
              <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", fontWeight: 700, whiteSpace: "nowrap" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFB800", display: "inline-block" }}/>
                Projet pilote en cours &nbsp;•&nbsp; Antananarivo
              </div>
            </div>
          </div>
        </section>

        {/* ── À qui ça sert ── */}
        <section style={{ background: "#F8F9FB", borderTop: "1px solid #E8ECF0" }}>
          <style>{`
            .lp-pub-card { background: white; border: 1.5px solid #E8ECF0; border-radius: 18px; padding: 28px 24px; display: flex; flex-direction: column; gap: 0; transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease, border-color 0.18s; cursor: default; }
            .lp-pub-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); border-color: #FFB800; }
            .lp-pub-ico { width: 52px; height: 52px; border-radius: 14px; background: #0D1525; display: flex; align-items: center; justify-content: center; color: #FFB800; margin-bottom: 20px; transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1); }
            .lp-pub-card:hover .lp-pub-ico { transform: scale(1.12) rotate(-4deg); }
          `}</style>
          <div className="lp-section">
            <div style={{ marginBottom: 48 }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800" }}>Pour qui</span>
              <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900, color: "#0D1525", margin: "12px 0 0", letterSpacing: "-0.02em", lineHeight: 1.2, maxWidth: 520 }}>
                Le taxi-be transporte tout Antananarivo.<br /><span style={{ color: "#FFB800" }}>TaxiBe rend l&apos;info accessible.</span>
              </h2>
            </div>
            <div className="lp-pub-grid">
              {PUBLICS.map((p) => (
                <div key={p.titre} className="lp-pub-card">
                  <div className="lp-pub-ico">{p.icon}</div>
                  <h3 style={{ margin: "0 0 10px", fontWeight: 900, fontSize: "1rem", color: "#0D1525" }}>{p.titre}</h3>
                  <p style={{ margin: "0 0 20px", fontSize: "0.83rem", color: "#64748B", lineHeight: 1.7, flex: 1 }}>{p.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "#FFF8E6", borderRadius: 8 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ fontSize: "0.73rem", color: "#92400E", fontWeight: 700 }}>{p.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <CtaApp />
      <Footer />
    </>
  );
}
