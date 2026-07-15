import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import PageHeader from "@/app/components/PageHeader";
import SpotlightSection from "@/app/components/SpotlightSection";

// ── Types ──────────────────────────────────────────────────────────────────────

type Article = {
  id: string;
  image_url: string | null;
  texte: string;
  contenu: string | null;
  lien: string | null;
  publie: boolean;
  ordre: number;
  created_at: string;
};

// ── Données Supabase ───────────────────────────────────────────────────────────

async function getArticles(): Promise<Article[]> {
  const { data } = await supabase
    .from("actualites")
    .select("id, image_url, texte, contenu, lien, publie, ordre, created_at")
    .eq("publie", true)
    .order("created_at", { ascending: false });
  return data ?? [];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" }).toUpperCase();
}

const CATEGORIES = [
  { label: "Conseils pratiques", icon: "💡" },
  { label: "Actualités",         icon: "📰" },
  { label: "Lignes & trajets",   icon: "🚌" },
  { label: "Arrêts & correspondances", icon: "📍" },
  { label: "Sécurité",           icon: "🔒" },
  { label: "Application TaxiBe", icon: "📱" },
];

// ── Composant ──────────────────────────────────────────────────────────────────

export const metadata = { title: "Blog — TaxiBe" };

export default async function BlogPage() {
  const articles = await getArticles();

  const featured = articles[0] ?? null;
  const dernieres = articles.slice(1, 4);
  const recents = articles.slice(4, 7);
  const populaires = articles.slice(0, 5);

  return (
    <>
      <Nav />
      <div style={{ background: "#F8F9FB", minHeight: "100vh" }}>
        <style>{`
          .blog-layout   { display: grid; grid-template-columns: 1fr 320px; gap: 32px; max-width: 1100px; margin: 0 auto; padding: 0 24px 60px; }
          .blog-hero     { max-width: 1100px; margin: 0 auto; padding: 28px 24px 36px; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center; }
          .blog-hero-img { display: flex; align-items: center; justify-content: center; }
          .featured-img-wrap { width: 100%; background: #F1F5F9; border-radius: 14px 14px 0 0; overflow: hidden; }
          .featured-img-ph { width: 100%; aspect-ratio: 16/9; display:flex; align-items:center; justify-content:center; background: linear-gradient(135deg, #1a2a1a 0%, #2a3a2a 100%); border-radius: 14px 14px 0 0; }
          .article-mini  { display: grid; grid-template-columns: 120px 1fr; gap: 16px; align-items: start; padding: 20px 0; border-bottom: 1px solid #E8ECF0; }
          .article-mini:last-child { border-bottom: none; }
          .mini-img-wrap { position: relative; width: 120px; min-width: 120px; height: 80px; border-radius: 10px; overflow: hidden; background: #F1F5F9; flex-shrink: 0; }
          .mini-img-ph   { width: 120px; min-width: 120px; height: 80px; border-radius: 10px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
          .article-grid  { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
          .article-card  { background: white; border-radius: 12px; border: 1px solid #E8ECF0; overflow: hidden; text-decoration: none; display: block; }
          .article-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); transform: translateY(-1px); transition: all 0.2s; }
          .card-img-wrap { width: 100%; background: #F1F5F9; overflow: hidden; }
          .card-img-ph   { width: 100%; aspect-ratio: 16/9; display:flex; align-items:center; justify-content:center; }
          .sidebar-widget { background: white; border-radius: 14px; border: 1px solid #E8ECF0; overflow: hidden; margin-bottom: 20px; }
          .sidebar-title  { font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #94A3B8; padding: 16px 18px 10px; margin: 0; }
          .cat-item  { display: flex; align-items: center; gap: 10px; padding: 9px 18px; font-size: 0.84rem; font-weight: 500; color: #374151; border-top: 1px solid #F1F5F9; text-decoration: none; }
          .cat-item:hover { background: #FFFBEB; color: #92400E; }
          .pop-item  { display: flex; align-items: flex-start; gap: 12px; padding: 10px 18px; border-top: 1px solid #F1F5F9; text-decoration: none; }
          .pop-item:hover .pop-title { color: #FFB800; }
          .pop-num   { width: 24px; height: 24px; border-radius: 50%; background: #FFB800; color: #0D1525; font-size: 0.72rem; font-weight: 900; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top: 2px; }
          .pop-title { font-size: 0.8rem; color: #374151; line-height: 1.4; font-weight: 500; }
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
            .article-mini { grid-template-columns: 1fr; gap: 0; padding: 16px 0; }
            .mini-img-wrap { width: 100%; min-width: unset; height: 160px; margin-bottom: 14px; }
            .mini-img-ph   { width: 100%; min-width: unset; height: 160px; margin-bottom: 14px; }
            .article-grid { grid-template-columns: 1fr; }
            .blog-layout  { padding: 0 16px 40px; }
          }
        `}</style>

        <PageHeader
          tag="Blog"
          title="Le média de la mobilité à Antananarivo"
          subtitle="Actualités, conseils et guides pour mieux comprendre et optimiser vos déplacements."
          breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Blog" }]}
        />

        {/* Spotlight */}
        <SpotlightSection />

        {/* Hero illustration */}
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
            <svg viewBox="0 0 460 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 440 }}>
              <rect width="460" height="280" fill="#F8F9FB" rx="16"/>
              <ellipse cx="230" cy="230" rx="240" ry="90" fill="#E8ECF0"/>
              <ellipse cx="110" cy="210" rx="130" ry="60" fill="#EEF1F5"/>
              <ellipse cx="370" cy="220" rx="120" ry="55" fill="#E8ECF0"/>
              <rect x="40"  y="130" width="30" height="90" rx="3" fill="#D1D9E6"/>
              <rect x="75"  y="110" width="35" height="110" rx="3" fill="#C8D2E0"/>
              <rect x="115" y="125" width="25" height="95" rx="3" fill="#D1D9E6"/>
              <rect x="320" y="115" width="35" height="105" rx="3" fill="#C8D2E0"/>
              <rect x="360" y="130" width="28" height="90" rx="3" fill="#D1D9E6"/>
              <rect x="393" y="118" width="32" height="102" rx="3" fill="#C8D2E0"/>
              <rect x="200" y="60" width="60" height="160" rx="4" fill="#B8C5D6"/>
              <rect x="210" y="40" width="40" height="30" rx="3" fill="#A8B8CC"/>
              <rect x="224" y="28" width="12" height="20" rx="2" fill="#94A3B8"/>
              {[75,95,115,135,155,175].map((y, i) => (
                <g key={i}>
                  <rect x="210" y={y} width="10" height="12" rx="1" fill="#E2E8F0" opacity="0.8"/>
                  <rect x="240" y={y} width="10" height="12" rx="1" fill="#E2E8F0" opacity="0.8"/>
                </g>
              ))}
              <rect x="0" y="230" width="460" height="50" rx="0" fill="#D8E0EA"/>
              <rect x="0" y="248" width="460" height="6" fill="#C8D2DF"/>
              {[20,80,140,200,260,320,380].map((x, i) => (
                <rect key={i} x={x} y="252" width="30" height="3" rx="1" fill="white" opacity="0.6"/>
              ))}
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
              <g transform="translate(290, 130)">
                <circle cx="20" cy="20" r="20" fill="#FFB800" opacity="0.15"/>
                <path d="M20 4C13.4 4 8 9.4 8 16C8 24 20 36 20 36C20 36 32 24 32 16C32 9.4 26.6 4 20 4Z" fill="#FFB800"/>
                <circle cx="20" cy="16" r="6" fill="white"/>
              </g>
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
            {featured && (
              <div style={{ background: "white", borderRadius: 16, border: "1px solid #E8ECF0", overflow: "hidden", marginBottom: 40 }}>
                {featured.image_url ? (
                  <div className="featured-img-wrap">
                    <Image
                      src={featured.image_url}
                      alt={featured.texte}
                      width={0} height={0}
                      sizes="(max-width: 900px) 100vw, 700px"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                ) : (
                  <div className="featured-img-ph">
                    <span style={{ fontSize: "3rem", opacity: 0.3 }}>🚌</span>
                  </div>
                )}
                <div style={{ padding: "24px 28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
                    <span className="badge-cat">ACTUALITÉS</span>
                    <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>{formatDate(featured.created_at)}</span>
                  </div>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0D1525", lineHeight: 1.3, margin: "0 0 12px" }}>
                    {featured.texte}
                  </h2>
                  {featured.contenu && (
                    <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.65, margin: "0 0 20px" }}>
                      {featured.contenu.slice(0, 180)}{featured.contenu.length > 180 ? "…" : ""}
                    </p>
                  )}
                  <Link href={`/blog/${featured.id}`} className="lire-link">Lire l&apos;article →</Link>
                </div>
              </div>
            )}

            {/* Dernières actualités */}
            {dernieres.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0D1525", margin: 0 }}>Dernières actualités</h2>
                </div>
                <div style={{ background: "white", borderRadius: 14, border: "1px solid #E8ECF0", padding: "0 24px" }}>
                  {dernieres.map((a) => (
                    <div key={a.id} className="article-mini">
                      {a.image_url ? (
                        <div className="mini-img-wrap">
                          <Image src={a.image_url} alt={a.texte} fill sizes="120px" style={{ objectFit: "contain" }} />
                        </div>
                      ) : (
                        <div className="mini-img-ph" style={{ background: "linear-gradient(135deg, #1a1a2a 0%, #2a2a3a 100%)" }}>
                          <span style={{ fontSize: "1.5rem", opacity: 0.4 }}>🚌</span>
                        </div>
                      )}
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                          <span className="badge-cat">ACTUALITÉS</span>
                          <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>{formatDate(a.created_at)}</span>
                        </div>
                        <h3 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0D1525", margin: "0 0 6px", lineHeight: 1.35 }}>{a.texte}</h3>
                        {a.contenu && (
                          <p style={{ fontSize: "0.8rem", color: "#64748B", margin: "0 0 8px", lineHeight: 1.55 }}>
                            {a.contenu.slice(0, 120)}{a.contenu.length > 120 ? "…" : ""}
                          </p>
                        )}
                        <Link href={`/blog/${a.id}`} className="lire-link" style={{ fontSize: "0.78rem" }}>Lire l&apos;article →</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Articles récents */}
            {recents.length > 0 && (
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0D1525", margin: 0 }}>Articles récents</h2>
                </div>
                <div className="article-grid">
                  {recents.map((a) => (
                    <Link key={a.id} href={`/blog/${a.id}`} className="article-card">
                      {a.image_url ? (
                        <div className="card-img-wrap">
                          <Image
                            src={a.image_url} alt={a.texte}
                            width={0} height={0}
                            sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 33vw"
                            style={{ width: "100%", height: "auto", display: "block" }}
                          />
                        </div>
                      ) : (
                        <div className="card-img-ph" style={{ background: "linear-gradient(135deg, #1a2a2a 0%, #2a3a3a 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: "2rem", opacity: 0.35 }}>🚌</span>
                        </div>
                      )}
                      <div style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                          <span style={{ fontSize: "0.7rem", color: "#94A3B8" }}>{formatDate(a.created_at)}</span>
                        </div>
                        <h3 style={{ fontSize: "0.85rem", fontWeight: 800, color: "#0D1525", margin: "0 0 12px", lineHeight: 1.35 }}>{a.texte}</h3>
                        <span className="lire-link" style={{ fontSize: "0.78rem" }}>Lire l&apos;article →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {articles.length === 0 && (
              <div style={{ background: "white", borderRadius: 14, border: "1px solid #E8ECF0", padding: "60px 24px", textAlign: "center" }}>
                <p style={{ fontSize: "1rem", color: "#94A3B8" }}>Aucun article publié pour l&apos;instant.</p>
              </div>
            )}
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
            </div>

            {/* Articles populaires (les plus récents) */}
            {populaires.length > 0 && (
              <div className="sidebar-widget">
                <p className="sidebar-title">Articles récents</p>
                {populaires.map((a, i) => (
                  <Link key={a.id} href={`/blog/${a.id}`} className="pop-item">
                    <span className="pop-num">{i + 1}</span>
                    <span className="pop-title">{a.texte}</span>
                  </Link>
                ))}
              </div>
            )}

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
