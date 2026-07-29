import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CtaApp from "@/app/components/CtaApp";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import HeroIllustration from "@/app/components/HeroIllustration";

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

const SOLUTION_STEPS = [
  {
    titre: "Rechercher une destination",
    desc: "L'utilisateur indique où il veut aller. TaxiBe propose les lignes les plus pertinentes, en clair.",
  },
  {
    titre: "Voir la ligne et les arrêts",
    desc: "La direction, les arrêts et le trajet sont affichés de façon compréhensible — même sans connaître la ville.",
  },
  {
    titre: "Se repérer sur la carte",
    desc: "Les arrêts géolocalisés permettent de visualiser où monter, où descendre, et comment marcher jusqu'à destination.",
  },
  {
    titre: "Un réseau qui s'améliore",
    desc: "Les données sont enrichies en continu grâce au travail terrain et aux retours des usagers. Chaque correction compte.",
  },
];

const PUBLICS = [
  {
    emoji: "🎓",
    titre: "Étudiants",
    desc: "Chaque matin, des milliers d'étudiants empruntent le taxi-be pour rejoindre leur université. TaxiBe leur permet de trouver la bonne ligne sans tâtonner, même dans un quartier qu'ils ne connaissent pas encore.",
    note: "Lignes vers les campus disponibles dès le pilote",
  },
  {
    emoji: "👷",
    titre: "Travailleurs",
    desc: "Le temps perdu dans les correspondances a un coût réel. Connaître à l'avance sa ligne, son arrêt et ses options de changement réduit l'incertitude — et le stress du matin.",
    note: "Trajets domicile-travail sur les grands axes",
  },
  {
    emoji: "🧭",
    titre: "Nouveaux arrivants",
    desc: "Comprendre le réseau taxi-be sans connaître la ville prend des semaines. TaxiBe compresse cette courbe d'apprentissage en quelques minutes — pour les arrivants, les visiteurs, comme pour les habitants qui découvrent un nouveau quartier.",
    note: "Disponible pour toute l'agglomération",
  },
];

const ROADMAP = [
  {
    period: "T3",
    label: "T3 2026 · En cours",
    titre: "70% de couverture GPS",
    desc: "Priorité aux lignes pilotes et aux grands axes structurants d'Antananarivo. Enrichissement continu des données terrain.",
    actif: true,
  },
  {
    period: "T4",
    label: "T4 2026",
    titre: "15 lignes ouvertes au public",
    desc: "Extension progressive après validation terrain. Amélioration de l'interface et premières contributions communautaires.",
    actif: false,
  },
  {
    period: "27",
    label: "2027",
    titre: "Couverture complète du réseau",
    desc: "Base de données consolidée sur l'ensemble des 67 lignes. Fonctionnalités avancées et ouverture à l'écosystème partenaires.",
    actif: false,
  },
];

export default async function LeProjetPage() {
  const heroImageUrl = await getHeroImageUrl();

  return (
    <>
      <Nav />
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>
        <style>{`
          .lp-hero-inner { max-width: 1200px; margin: 0 auto; padding: 52px 40px 44px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
          .lp-hero-img   { display: flex; align-items: center; justify-content: center; }
          .lp-stat-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid #E8ECF0; }
          .lp-stat-card  { padding: 28px 32px; border-right: 1px solid #E8ECF0; position: relative; background: white; }
          .lp-stat-card:last-child { border-right: none; }
          .lp-stat-card::before { content: ""; position: absolute; top: 0; left: 32px; right: 32px; height: 3px; background: #FFB800; border-radius: 0 0 3px 3px; }
          .lp-section    { max-width: 1100px; margin: 0 auto; padding: 72px 32px; }
          .lp-pb-grid    { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .lp-sol-grid   { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .lp-pub-grid   { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
          .lp-roadmap    { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
          @media (max-width: 900px) {
            .lp-hero-inner { grid-template-columns: 1fr; padding: 40px 20px 32px; }
            .lp-hero-img   { display: none; }
            .lp-stat-cards { grid-template-columns: 1fr 1fr; }
            .lp-stat-card:nth-child(2) { border-right: none; }
            .lp-stat-card:nth-child(3) { border-top: 1px solid #E8ECF0; grid-column: 1 / -1; }
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

          {/* 3 cartes badge stats */}
          <div className="lp-stat-cards">
            {[
              { val: "67",    label: "Lignes recensées",    sub: "Réseau complet d'Antananarivo",  icon: "🗺️" },
              { val: "1 336", label: "Points d'arrêt",      sub: "Aller et retour confondus",       icon: "📍" },
              { val: "570",   label: "Arrêts géolocalisés", sub: "43 % de couverture GPS actuelle", icon: "📡" },
            ].map((s) => (
              <div key={s.label} className="lp-stat-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: "1.1rem" }}>{s.icon}</span>
                  <span style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFB800", background: "rgba(255,184,0,0.1)", padding: "3px 8px", borderRadius: 4 }}>
                    Données réelles
                  </span>
                </div>
                <div style={{ fontSize: "2.6rem", fontWeight: 900, color: "#0D1525", lineHeight: 1, marginBottom: 6, fontVariantNumeric: "tabular-nums" }}>{s.val}</div>
                <div style={{ fontWeight: 800, fontSize: "0.88rem", color: "#0D1525", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: "0.72rem", color: "#94A3B8", fontWeight: 500 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pourquoi TaxiBe existe ── */}
        <section id="mission" style={{ scrollMarginTop: 80 }}>
          <div className="lp-section">
            <div style={{ marginBottom: 48 }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800" }}>Pourquoi TaxiBe existe</span>
              <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900, color: "#0D1525", margin: "12px 0 0", letterSpacing: "-0.02em", lineHeight: 1.2, maxWidth: 560 }}>
                Se déplacer à Tana ne devrait pas<br />demander autant d&apos;effort.
              </h2>
            </div>
            <div className="lp-pb-grid">
              {PROBLEMES.map((p) => (
                <div key={p.num} style={{ background: "white", borderRadius: 16, border: "1px solid #E8ECF0", padding: "28px 28px 28px 24px", display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, fontWeight: 900, fontSize: "1.1rem", color: "#E2E8F0", lineHeight: 1, paddingTop: 2, fontVariantNumeric: "tabular-nums" }}>{p.num}</div>
                  <div>
                    <h3 style={{ margin: "0 0 10px", fontWeight: 800, fontSize: "0.95rem", color: "#0D1525", lineHeight: 1.3 }}>{p.titre}</h3>
                    <p style={{ margin: 0, fontSize: "0.83rem", color: "#64748B", lineHeight: 1.7 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Notre solution ── */}
        <section style={{ background: "#0D1525" }}>
          <div className="lp-section">
            <div style={{ marginBottom: 48 }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800" }}>Notre solution</span>
              <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900, color: "white", margin: "12px 0 0", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Simple.<br /><span style={{ color: "#FFB800" }}>Local.</span><br />Progressif.
              </h2>
            </div>
            <div className="lp-sol-grid">
              {SOLUTION_STEPS.map((s, i) => (
                <div key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0, color: "#FFB800", fontWeight: 900, fontSize: "1rem", lineHeight: 1, paddingTop: 2 }}>→</span>
                  <div>
                    <h3 style={{ margin: "0 0 8px", fontWeight: 800, fontSize: "0.92rem", color: "white", lineHeight: 1.3 }}>{s.titre}</h3>
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Où en sommes-nous ── */}
        <section id="impact" style={{ scrollMarginTop: 80 }}>
          <div className="lp-section">
            <div style={{ marginBottom: 40 }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800" }}>Où en sommes-nous</span>
              <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900, color: "#0D1525", margin: "12px 0 0", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Un projet construit<br />lignes par lignes.
              </h2>
            </div>
            <div style={{ background: "white", borderRadius: 16, border: "1px solid #E8ECF0", overflow: "hidden" }}>
              <div style={{ padding: "32px 36px 28px" }}>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <p style={{ margin: "0 0 4px", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8" }}>
                      Couverture GPS du réseau
                    </p>
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "#64748B" }}>
                      570 arrêts géolocalisés sur 1 336 points d&apos;arrêt
                    </p>
                  </div>
                  <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#FFB800", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>43%</div>
                </div>
                {/* Barre de progression */}
                <div style={{ height: 10, background: "#F1F5F9", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "43%", background: "#FFB800", borderRadius: 99, position: "relative" }}>
                    <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: 4, height: 18, background: "#FFB800", borderRadius: 2 }} />
                  </div>
                </div>
                {/* Cibles */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                  <span style={{ fontSize: "0.68rem", color: "#94A3B8", fontWeight: 600 }}>Démarré · 6 mois de terrain</span>
                  <span style={{ fontSize: "0.68rem", color: "#FFB800", fontWeight: 800 }}>Objectif T3 2026 : 70%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── À qui ça sert ── */}
        <section style={{ background: "white", borderTop: "1px solid #E8ECF0", borderBottom: "1px solid #E8ECF0" }}>
          <div className="lp-section">
            <div style={{ marginBottom: 48 }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800" }}>À qui ça sert</span>
              <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900, color: "#0D1525", margin: "12px 0 0", letterSpacing: "-0.02em", lineHeight: 1.2, maxWidth: 600 }}>
                Le taxi-be transporte<br />la majorité des Tananariviens.<br /><span style={{ color: "#FFB800" }}>TaxiBe leur rend l&apos;info.</span>
              </h2>
            </div>
            <div className="lp-pub-grid">
              {PUBLICS.map((p) => (
                <div key={p.titre} style={{ background: "#F8F9FB", borderRadius: 16, border: "1px solid #E8ECF0", padding: "28px 24px" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: 16 }}>{p.emoji}</div>
                  <h3 style={{ margin: "0 0 12px", fontWeight: 900, fontSize: "1.05rem", color: "#0D1525" }}>{p.titre}</h3>
                  <p style={{ margin: "0 0 16px", fontSize: "0.83rem", color: "#64748B", lineHeight: 1.75 }}>{p.desc}</p>
                  <p style={{ margin: 0, fontSize: "0.73rem", color: "#FFB800", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                    <span>→</span> {p.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Feuille de route ── */}
        <section id="roadmap" style={{ scrollMarginTop: 80 }}>
          <div className="lp-section">
            <div style={{ marginBottom: 48 }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800" }}>Feuille de route</span>
              <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900, color: "#0D1525", margin: "12px 0 0", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Ce qui vient ensuite.
              </h2>
            </div>
            <div className="lp-roadmap">
              {ROADMAP.map((r) => (
                <div key={r.period} style={{
                  background: r.actif ? "#0D1525" : "white",
                  borderRadius: 16,
                  border: r.actif ? "none" : "1px solid #E8ECF0",
                  padding: "28px 24px",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {r.actif && (
                    <div style={{ position: "absolute", top: 20, right: 20, background: "#FFB800", color: "#0D1525", fontSize: "0.58rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", padding: "3px 8px", borderRadius: 4 }}>
                      En cours
                    </div>
                  )}
                  <div style={{ fontSize: "2.5rem", fontWeight: 900, color: r.actif ? "rgba(255,184,0,0.15)" : "#F1F5F9", lineHeight: 1, marginBottom: 20, fontVariantNumeric: "tabular-nums" }}>
                    {r.period}
                  </div>
                  <p style={{ margin: "0 0 6px", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: r.actif ? "rgba(255,255,255,0.35)" : "#94A3B8" }}>
                    {r.label}
                  </p>
                  <h3 style={{ margin: "0 0 12px", fontWeight: 800, fontSize: "0.95rem", color: r.actif ? "white" : "#0D1525", lineHeight: 1.3 }}>
                    {r.titre}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: r.actif ? "rgba(255,255,255,0.5)" : "#64748B", lineHeight: 1.7 }}>
                    {r.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA final */}
            <div style={{ marginTop: 48, background: "#F1F5F9", borderRadius: 16, padding: "32px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
              <div>
                <p style={{ margin: "0 0 6px", fontWeight: 800, fontSize: "1rem", color: "#0D1525" }}>Vous voulez contribuer au projet ?</p>
                <p style={{ margin: 0, fontSize: "0.83rem", color: "#64748B" }}>Développeur, designer, connaisseur du terrain — toutes les compétences sont utiles.</p>
              </div>
              <Link href="/contact#collaborer" style={{ padding: "12px 22px", borderRadius: 9, background: "#FFB800", color: "#0D1525", fontWeight: 800, fontSize: "0.875rem", textDecoration: "none", whiteSpace: "nowrap" }}>
                Rejoindre l&apos;équipe →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <CtaApp />
      <Footer />
    </>
  );
}
