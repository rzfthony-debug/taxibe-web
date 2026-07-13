import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import Link from "next/link";

// ── Données placeholder ────────────────────────────────────────────────────────

const FEATURED = {
  categorie: "CONSEILS",
  date: "08 JUILLET 2026",
  lecture: "6 min de lecture",
  titre: "Comment choisir la bonne ligne de TaxiBe selon votre destination ?",
  extrait: "Découvrez les astuces et bonnes pratiques pour sélectionner la ligne idéale et gagner du temps lors de vos trajets à Antananarivo.",
  href: "#",
  bg: "#1a2a1a",
};

const DERNIERES = [
  {
    categorie: "ACTUALITÉS", date: "06 JUILLET 2026", lecture: "4 min",
    titre: "Nouvelles lignes TaxiBe : ce qui change en juillet",
    extrait: "Plus de connexions, plus de flexibilité. Découvrez les nouvelles lignes mises en service ce mois-ci.",
    href: "#", bg: "#1a1a2a",
  },
  {
    categorie: "CONSEILS", date: "04 JUILLET 2026", lecture: "5 min",
    titre: "5 conseils pour un trajet rapide et sans stress",
    extrait: "Petites habitudes, grands résultats. Nos conseils pour optimiser vos déplacements au quotidien.",
    href: "#", bg: "#2a1a1a",
  },
  {
    categorie: "SÉCURITÉ", date: "02 JUILLET 2026", lecture: "3 min",
    titre: "Votre sécurité avant tout : nos engagements",
    extrait: "TaxiBe s'engage pour des trajets sûrs et fiables pour tous. Découvrez nos actions.",
    href: "#", bg: "#1a1a1a",
  },
];

const RECENTS = [
  { date: "01 JUILLET 2026", lecture: "4 min", titre: "Marchés d'Antananarivo : comment y aller facilement", href: "#", bg: "#2a2a1a" },
  { date: "28 JUIN 2026",   lecture: "3 min", titre: "Top 5 des itinéraires touristiques à découvrir",          href: "#", bg: "#1a2a2a" },
  { date: "27 JUIN 2026",   lecture: "4 min", titre: "Week-end à Tana : idées de sorties accessibles",      href: "#", bg: "#2a1a2a" },
];

const CATEGORIES = [
  { label: "Conseils pratiques", icon: "💡" },
  { label: "Actualités",         icon: "📰" },
  { label: "Lignes & trajets",   icon: "🚌" },
  { label: "Arrêts & correspondances", icon: "📍" },
  { label: "Sécurité",           icon: "🔒" },
  { label: "Application TaxiBe", icon: "📱" },
];

const POPULAIRES = [
  "Comment trouver rapidement la bonne ligne ?",
  "Les 10 erreurs fréquentes des nouveaux voyageurs",
  "Guide des correspondances à ne pas manquer",
  "Heures de pointe : comment éviter les bouchons",
  "Les nouveautés de l'app TaxiBe",
];

// ── Composant ──────────────────────────────────────────────────────────────────

export const metadata = { title: "Blog — TaxiBe" };

export default function BlogPage() {
  return (
    <>
      <Nav />
      <div style={{ background: "#F8F9FB", minHeight: "100vh" }}>
        <style>{`
          .blog-layout   { display: grid; grid-template-columns: 1fr 320px; gap: 32px; max-width: 1100px; margin: 0 auto; padding: 0 24px 60px; }
          .blog-hero     { max-width: 1100px; margin: 0 auto; padding: 28px 24px 36px; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center; }
          .blog-hero-img { display: flex; align-items: center; justify-content: center; }
          .featured-img  { width: 100%; aspect-ratio: 16/9; border-radius: 14px; object-fit: cover; }
          .featured-img-ph { width: 100%; aspect-ratio: 16/9; border-radius: 14px; display:flex; align-items:center; justify-content:center; }
          .article-mini  { display: grid; grid-template-columns: 120px 1fr; gap: 16px; align-items: start; padding: 20px 0; border-bottom: 1px solid #E8ECF0; }
          .article-mini:last-child { border-bottom: none; }
          .article-mini-img { width: 120px; height: 80px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
          .article-mini-img-ph { width: 120px; height: 80px; border-radius: 10px; flex-shrink: 0; }
          .article-grid  { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
          .article-card  { background: white; border-radius: 12px; border: 1px solid #E8ECF0; overflow: hidden; }
          .article-card-img { width: 100%; aspect-ratio: 16/9; object-fit: cover; display:block; }
          .article-card-img-ph { width: 100%; aspect-ratio: 16/9; display:block; }
          .sidebar-widget { background: white; border-radius: 14px; border: 1px solid #E8ECF0; overflow: hidden; margin-bottom: 20px; }
          .sidebar-title  { font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #94A3B8; padding: 16px 18px 10px; }
          .cat-item  { display: flex; align-items: center; gap: 10px; padding: 9px 18px; font-size: 0.84rem; font-weight: 500; color: #374151; border-top: 1px solid #F1F5F9; text-decoration: none; }
          .cat-item:hover { background: #FFFBEB; color: #92400E; }
          .pop-item  { display: flex; align-items: flex-start; gap: 12px; padding: 10px 18px; border-top: 1px solid #F1F5F9; }
          .pop-num   { width: 24px; height: 24px; border-radius: 50%; background: #FFB800; color: #0D1525; font-size: 0.72rem; font-weight: 900; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
          .lire-link { font-size: 0.82rem; font-weight: 700; color: #FFB800; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; }
          .lire-link:hover { text-decoration: underline; }
          .badge-cat { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #FFB800; }
          .breadcrumb { max-width: 1100px; margin: 0 auto; padding: 14px 24px 0; font-size: 0.8rem; color: #94A3B8; }
          .breadcrumb a { color: #64748B; text-decoration: none; font-weight: 500; }
          .breadcrumb a:hover { color: #0D1525; }

          @media (max-width: 900px) {
            .blog-layout  { grid-template-columns: 1fr; }
            .blog-hero    { grid-template-columns: 1fr; }
            .blog-hero-img { display: none; }
            .article-grid { grid-template-columns: 1fr 1fr; }
          }
          @media (max-width: 540px) {
            .article-mini { grid-template-columns: 90px 1fr; gap: 12px; }
            .article-mini-img, .article-mini-img-ph { width: 90px; height: 60px; }
            .article-grid { grid-template-columns: 1fr; }
            .blog-layout  { padding: 0 16px 40px; }
          }
        `}</style>

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">Accueil</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#0D1525", fontWeight: 600 }}>Blog</span>
        </div>

        {/* Hero */}
        <div className="blog-hero">
          <div>
            <span style={{
              display: "inline-block", background: "#FFB800", color: "#0D1525",
              fontSize: "0.65rem", fontWeight: 900, textTransform: "uppercase",
              letterSpacing: "0.1em", padding: "4px 12px", borderRadius: 6, marginBottom: 18,
            }}>
              Le blog TaxiBe
            </span>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 900, color: "#0D1525", lineHeight: 1.2, margin: "0 0 16px" }}>
              Le média de la mobilité<br />à Antananarivo
            </h1>
            <p style={{ fontSize: "0.95rem", color: "#64748B", lineHeight: 1.65, margin: 0, maxWidth: 420 }}>
              Actualités, conseils et guides pour mieux comprendre et optimiser vos déplacements au quotidien.
            </p>
          </div>
          <div className="blog-hero-img">
            {/* Illustration SVG ville */}
            <svg viewBox="0 0 460 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 440 }}>
              {/* Ciel */}
              <rect width="460" height="280" fill="#F8F9FB" rx="16"/>
              {/* Collines */}
              <ellipse cx="230" cy="230" rx="240" ry="90" fill="#E8ECF0"/>
              <ellipse cx="110" cy="210" rx="130" ry="60" fill="#EEF1F5"/>
              <ellipse cx="370" cy="220" rx="120" ry="55" fill="#E8ECF0"/>
              {/* Bâtiments fond */}
              <rect x="40"  y="130" width="30" height="90" rx="3" fill="#D1D9E6"/>
              <rect x="75"  y="110" width="35" height="110" rx="3" fill="#C8D2E0"/>
              <rect x="115" y="125" width="25" height="95" rx="3" fill="#D1D9E6"/>
              <rect x="320" y="115" width="35" height="105" rx="3" fill="#C8D2E0"/>
              <rect x="360" y="130" width="28" height="90" rx="3" fill="#D1D9E6"/>
              <rect x="393" y="118" width="32" height="102" rx="3" fill="#C8D2E0"/>
              {/* Tour centrale */}
              <rect x="200" y="60" width="60" height="160" rx="4" fill="#B8C5D6"/>
              <rect x="210" y="40" width="40" height="30" rx="3" fill="#A8B8CC"/>
              <rect x="224" y="28" width="12" height="20" rx="2" fill="#94A3B8"/>
              {/* Fenêtres tour */}
              {[75,95,115,135,155,175].map((y, i) => (
                <g key={i}>
                  <rect x="210" y={y} width="10" height="12" rx="1" fill="#E2E8F0" opacity="0.8"/>
                  <rect x="240" y={y} width="10" height="12" rx="1" fill="#E2E8F0" opacity="0.8"/>
                </g>
              ))}
              {/* Route */}
              <rect x="0" y="230" width="460" height="50" rx="0" fill="#D8E0EA"/>
              <rect x="0" y="248" width="460" height="6" fill="#C8D2DF"/>
              {[20,80,140,200,260,320,380].map((x, i) => (
                <rect key={i} x={x} y="252" width="30" height="3" rx="1" fill="white" opacity="0.6"/>
              ))}
              {/* Taxi-be */}
              <g transform="translate(160, 210)">
                <rect x="0" y="8" width="80" height="36" rx="8" fill="#FFB800"/>
                <rect x="8"  y="2"  width="64" height="26" rx="6" fill="#FFB800"/>
                <rect x="12" y="5"  width="24" height="18" rx="3" fill="#E8F4FF" opacity="0.9"/>
                <rect x="44" y="5"  width="24" height="18" rx="3" fill="#E8F4FF" opacity="0.9"/>
                <circle cx="16" cy="46" r="9" fill="#1a2a3a"/>
                <circle cx="16" cy="46" r="5" fill="#E2E8F0"/>
                <circle cx="64" cy="46" r="9" fill="#1a2a3a"/>
                <circle cx="64" cy="46" r="5" fill="#E2E8F0"/>
                <rect x="2" y="12" width="8" height="6" rx="2" fill="#FFF9E6" opacity="0.9"/>
                <rect x="70" y="12" width="8" height="6" rx="2" fill="#FF6B6B" opacity="0.8"/>
              </g>
              {/* Pin GPS */}
              <g transform="translate(290, 130)">
                <circle cx="20" cy="20" r="20" fill="#FFB800" opacity="0.15"/>
                <path d="M20 4C13.4 4 8 9.4 8 16C8 24 20 36 20 36C20 36 32 24 32 16C32 9.4 26.6 4 20 4Z" fill="#FFB800"/>
                <circle cx="20" cy="16" r="6" fill="white"/>
              </g>
              {/* Nuages */}
              <ellipse cx="80"  cy="50" rx="30" ry="12" fill="white" opacity="0.7"/>
              <ellipse cx="100" cy="44" rx="22" ry="10" fill="white" opacity="0.8"/>
              <ellipse cx="350" cy="40" rx="28" ry="11" fill="white" opacity="0.7"/>
              <ellipse cx="370" cy="34" rx="20" ry="9"  fill="white" opacity="0.8"/>
            </svg>
          </div>
        </div>

        {/* Contenu + Sidebar */}
        <div className="blog-layout">

          {/* ── Contenu principal ── */}
          <div>

            {/* Article à la une */}
            <div style={{ background: "white", borderRadius: 16, border: "1px solid #E8ECF0", overflow: "hidden", marginBottom: 40 }}>
              <div className="featured-img-ph" style={{ background: `linear-gradient(135deg, ${FEATURED.bg} 0%, #2a3a2a 100%)` }}>
                <span style={{ fontSize: "3rem", opacity: 0.3 }}>🚌</span>
              </div>
              <div style={{ padding: "24px 28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
                  <span className="badge-cat">{FEATURED.categorie}</span>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>{FEATURED.date}</span>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>·</span>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>{FEATURED.lecture}</span>
                </div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0D1525", lineHeight: 1.3, margin: "0 0 12px" }}>
                  {FEATURED.titre}
                </h2>
                <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.65, margin: "0 0 20px" }}>
                  {FEATURED.extrait}
                </p>
                <Link href={FEATURED.href} className="lire-link">Lire l&apos;article →</Link>
              </div>
            </div>

            {/* Dernières actualités */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0D1525", margin: 0 }}>Dernières actualités</h2>
                <Link href="#" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#FFB800", textDecoration: "none" }}>Voir tous les articles →</Link>
              </div>
              <div style={{ background: "white", borderRadius: 14, border: "1px solid #E8ECF0", padding: "0 24px" }}>
                {DERNIERES.map((a, i) => (
                  <div key={i} className="article-mini">
                    <div className="article-mini-img-ph" style={{ background: `linear-gradient(135deg, ${a.bg} 0%, #3a3a3a 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "1.5rem", opacity: 0.4 }}>🚌</span>
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                        <span className="badge-cat">{a.categorie}</span>
                        <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>{a.date}</span>
                        <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>·</span>
                        <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>{a.lecture}</span>
                      </div>
                      <h3 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0D1525", margin: "0 0 6px", lineHeight: 1.35 }}>{a.titre}</h3>
                      <p style={{ fontSize: "0.8rem", color: "#64748B", margin: "0 0 8px", lineHeight: 1.55 }}>{a.extrait}</p>
                      <Link href={a.href} className="lire-link" style={{ fontSize: "0.78rem" }}>Lire l&apos;article →</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Articles récents */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0D1525", margin: 0 }}>Articles récents</h2>
                <Link href="#" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#FFB800", textDecoration: "none" }}>Voir tous les articles →</Link>
              </div>
              <div className="article-grid">
                {RECENTS.map((a, i) => (
                  <div key={i} className="article-card">
                    <div className="article-card-img-ph" style={{ background: `linear-gradient(135deg, ${a.bg} 0%, #3a3a3a 100%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "2rem", opacity: 0.35 }}>🚌</span>
                    </div>
                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: "0.7rem", color: "#94A3B8" }}>{a.date}</span>
                        <span style={{ fontSize: "0.7rem", color: "#94A3B8" }}>·</span>
                        <span style={{ fontSize: "0.7rem", color: "#94A3B8" }}>{a.lecture}</span>
                      </div>
                      <h3 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0D1525", margin: "0 0 12px", lineHeight: 1.35 }}>{a.titre}</h3>
                      <Link href={a.href} className="lire-link" style={{ fontSize: "0.78rem" }}>Lire l&apos;article →</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside>

            {/* Recherche */}
            <div className="sidebar-widget">
              <p className="sidebar-title">Rechercher</p>
              <div style={{ padding: "0 18px 16px" }}>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Rechercher un article…"
                    style={{
                      width: "100%", padding: "9px 36px 9px 12px", borderRadius: 8,
                      border: "1.5px solid #E2E8F0", fontSize: "0.84rem",
                      outline: "none", boxSizing: "border-box", color: "#0D1525",
                    }}
                  />
                  <svg style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }}
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Catégories */}
            <div className="sidebar-widget">
              <p className="sidebar-title">Catégories</p>
              {CATEGORIES.map((c) => (
                <Link key={c.label} href="#" className="cat-item">
                  <span style={{ fontSize: "1rem" }}>{c.icon}</span>
                  {c.label}
                </Link>
              ))}
              <div style={{ padding: "12px 18px" }}>
                <Link href="#" className="lire-link" style={{ fontSize: "0.8rem" }}>Voir toutes les catégories →</Link>
              </div>
            </div>

            {/* Articles populaires */}
            <div className="sidebar-widget">
              <p className="sidebar-title">Articles populaires</p>
              {POPULAIRES.map((titre, i) => (
                <Link key={i} href="#" className="pop-item" style={{ textDecoration: "none" }}>
                  <span className="pop-num">{i + 1}</span>
                  <span style={{ fontSize: "0.8rem", color: "#374151", lineHeight: 1.4, fontWeight: 500 }}>{titre}</span>
                </Link>
              ))}
            </div>

            {/* Télécharger l'app */}
            <div style={{ background: "#0D1525", borderRadius: 14, padding: "20px 18px", marginBottom: 20 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFB800", margin: "0 0 8px" }}>
                Télécharger l&apos;application
              </p>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", margin: "0 0 16px", lineHeight: 1.5 }}>
                Tous vos trajets, arrêts et lignes dans votre poche.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Link href="/telecharger" style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                  background: "rgba(255,255,255,0.08)", borderRadius: 10, textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 20.5v-17c0-.83 1-.83 1.5-.35l14 8.5c.5.3.5 1 0 1.3l-14 8.5c-.5.48-1.5.48-1.5-.35z" fill="#34A853"/><path d="M3 3.5l8.5 8.5-8.5 8.5V3.5z" fill="#EA4335"/><path d="M11.5 12l8.5 8.5H3l8.5-8.5z" fill="#FBBC05"/><path d="M3 3.5H20L11.5 12 3 3.5z" fill="#4285F4"/></svg>
                  <div>
                    <div style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.5)", lineHeight: 1 }}>Disponible sur</div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "white", lineHeight: 1.3 }}>Google Play</div>
                  </div>
                </Link>
                <Link href="/telecharger" style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                  background: "rgba(255,255,255,0.08)", borderRadius: 10, textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  <div>
                    <div style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.5)", lineHeight: 1 }}>Télécharger dans</div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "white", lineHeight: 1.3 }}>l&apos;App Store</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Ligne la plus recherchée */}
            <div style={{ background: "white", borderRadius: 14, border: "1px solid #E8ECF0", padding: "18px" }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFB800", margin: "0 0 2px" }}>
                Ligne la plus recherchée
              </p>
              <p style={{ fontSize: "0.62rem", fontWeight: 600, color: "#94A3B8", margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Aujourd&apos;hui
              </p>
              <div style={{ background: "#0D1525", borderRadius: 10, padding: "14px 16px", marginBottom: 12 }}>
                <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "white", lineHeight: 1, marginBottom: 4 }}>147</div>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "white", marginBottom: 4 }}>Ambatomaro → 67Ha</div>
                <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#FFB800", marginBottom: 12 }}>23 541 recherches</div>
                <Link href="/recherche?q=147" style={{
                  display: "block", padding: "8px", borderRadius: 8, textAlign: "center",
                  background: "#FFB800", color: "#0D1525", fontSize: "0.78rem", fontWeight: 800, textDecoration: "none",
                }}>
                  Voir la ligne →
                </Link>
              </div>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#0D1525", margin: "0 0 2px" }}>Antananarivo et ses environs</p>
              <p style={{ fontSize: "0.7rem", color: "#94A3B8", margin: 0 }}>+ de 50 communes couvertes</p>
            </div>

          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}
