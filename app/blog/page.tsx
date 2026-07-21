import { safeJsonLd } from "@/lib/sanitize";
import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import SpotlightSection from "@/app/components/SpotlightSection";
import HeroIllustration from "@/app/components/HeroIllustration";

type Article = {
  id: string;
  slug: string | null;
  image_url: string | null;
  texte: string;
  lien: string | null;
  publie: boolean;
  ordre: number;
  created_at: string;
};

async function getHeroImageUrl(): Promise<string | null> {
  try {
    const { data } = await Promise.race([
      supabase.from("parametres").select("valeur").eq("cle", "blog_hero_image_url").single(),
      new Promise<{ data: null }>((r) => setTimeout(() => r({ data: null }), 8000)),
    ]);
    return (data as { valeur: string } | null)?.valeur ?? null;
  } catch {
    return null;
  }
}

async function getArticles(q?: string): Promise<Article[]> {
  let req = supabase
    .from("actualites")
    .select("id, slug, image_url, texte, lien, publie, ordre, created_at")
    .eq("publie", true)
    .order("created_at", { ascending: false })
    .limit(50);

  if (q) req = req.or(`texte.ilike.%${q}%`);

  return Promise.race([
    Promise.resolve(req).then((r) => (r.data as Article[]) ?? []).catch(() => []),
    new Promise<Article[]>((res) => setTimeout(() => res([]), 8000)),
  ]);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" }).toUpperCase();
}

const CATEGORIES = [
  { label: "Conseils pratiques", icon: "💡", q: "conseils" },
  { label: "Actualités",         icon: "📰", q: "actualités" },
  { label: "Lignes & trajets",   icon: "🚌", q: "ligne" },
  { label: "Arrêts",             icon: "📍", q: "arrêt" },
  { label: "Sécurité",           icon: "🔑", q: "sécurité" },
  { label: "Application TaxiBe", icon: "📱", q: "application" },
];

export const metadata = {
  title: "Blog",
  description: "Actualités, conseils et nouveautés sur TaxiBe et les transports en commun à Antananarivo.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — TaxiBe",
    description: "Actualités, conseils et nouveautés sur TaxiBe et les transports en commun à Antananarivo.",
    url: "/blog",
    images: [{ url: "/logo_taxibe.png", width: 1842, height: 1466, alt: "TaxiBe — Blog" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Blog — TaxiBe",
    description: "Actualités, conseils et nouveautés sur TaxiBe et les transports en commun à Antananarivo.",
    images: ["/logo_taxibe.png"],
  },
};

export const revalidate = 60;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const [articles, heroImageUrl] = await Promise.all([getArticles(query || undefined), getHeroImageUrl()]);

  const featured = articles[0] ?? null;
  const dernieres = articles.slice(1, 4);
  const recents = articles.slice(4, 7);
  const populaires = articles.slice(0, 5);

  const BASE = "https://taxibemada.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Accueil", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/blog` },
        ],
      },
      {
        "@type": "ItemList",
        "name": "Articles du blog TaxiBe",
        "url": `${BASE}/blog`,
        "itemListElement": articles.slice(0, 10).map((a, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": a.texte.length > 110 ? a.texte.slice(0, 107) + "…" : a.texte,
          "url": `${BASE}/blog/${a.slug || a.id}`,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <Nav />
      <div style={{ background: "#F8F9FB", minHeight: "100vh" }}>
        <style>{`
          .blog-layout   { display: grid; grid-template-columns: 1fr 320px; gap: 32px; max-width: 1100px; margin: 0 auto; padding: 0 24px 60px; }
          .blog-hero     { max-width: 1280px; margin: 0 auto; padding: 64px 40px; display: grid; grid-template-columns: 1fr 1.4fr; gap: 24px; align-items: center; }
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
            .blog-hero    { grid-template-columns: 1fr; padding: 40px 20px; }
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

        {/* Hero */}
        <section style={{ borderBottom: "1px solid #E8ECF0" }}>
          <div className="blog-hero">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.4)", borderRadius: 8, padding: "5px 12px", marginBottom: 24 }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8860B" }}>
                  Blog
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 16px", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
                Le média de la <span style={{ color: "#FFB800" }}>mobilité</span> à Antananarivo
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#64748B", lineHeight: 1.75, margin: 0, maxWidth: 480 }}>
                Actualités, conseils et guides pour mieux comprendre et optimiser vos déplacements au quotidien.
              </p>
            </div>
          <div className="blog-hero-img">
            {heroImageUrl ? (
              <Image src={heroImageUrl} alt="Blog TaxiBe" width={600} height={420} sizes="(max-width: 768px) 0px, 600px" priority style={{ width: "100%", height: "auto", maxHeight: 420, objectFit: "contain", mixBlendMode: "multiply" }} />
            ) : (
              <HeroIllustration />
            )}
          </div>
        </div>
        </section>

        {/* Spotlight */}
        <SpotlightSection />

        {/* Contenu + Sidebar */}
        <div className="blog-layout">

          {/* Contenu principal */}
          <div>

            {/* Indicateur de recherche */}
            {query && (
              <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <p style={{ margin: 0, fontSize: "0.84rem", color: "#64748B" }}>
                  <strong>{articles.length}</strong> résultat{articles.length !== 1 ? "s" : ""} pour <strong>«&nbsp;{query}&nbsp;»</strong>
                </p>
                <a href="/blog" style={{ fontSize: "0.75rem", color: "#64748B", textDecoration: "none", border: "1px solid #E2E8F0", padding: "2px 9px", borderRadius: 5, background: "white" }}>
                  ✕ Effacer
                </a>
              </div>
            )}

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
                    <span style={{ fontSize: "0.75rem", color: "#64748B" }}>{formatDate(featured.created_at)}</span>
                  </div>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#0D1525", lineHeight: 1.3, margin: "0 0 20px" }}>
                    {featured.texte}
                  </h2>
                  <Link href={`/blog/${featured.slug || featured.id}`} className="lire-link">Lire l&apos;article →</Link>
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
                          <span style={{ fontSize: "0.72rem", color: "#64748B" }}>{formatDate(a.created_at)}</span>
                        </div>
                        <h3 style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0D1525", margin: "0 0 8px", lineHeight: 1.35 }}>{a.texte}</h3>
                        <Link href={`/blog/${a.slug || a.id}`} className="lire-link" style={{ fontSize: "0.78rem" }}>Lire l&apos;article →</Link>
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
                    <Link key={a.id} href={`/blog/${a.slug || a.id}`} className="article-card">
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
                          <span style={{ fontSize: "0.7rem", color: "#64748B" }}>{formatDate(a.created_at)}</span>
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
                <p style={{ fontSize: "1rem", color: "#64748B" }}>Aucun article publié pour l&apos;instant.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside>

            {/* Recherche */}
            <div className="sidebar-widget">
              <p className="sidebar-title">Rechercher</p>
              <div style={{ padding: "0 18px 16px" }}>
                <form action="/blog" method="get" style={{ position: "relative" }}>
                  <input
                    type="text"
                    name="q"
                    defaultValue={query}
                    placeholder="Rechercher un article…"
                    style={{
                      width: "100%", padding: "9px 36px 9px 12px", borderRadius: 8,
                      border: "1.5px solid #E2E8F0", fontSize: "0.84rem",
                      outline: "none", boxSizing: "border-box", color: "#0D1525",
                    }}
                  />
                  <button type="submit" style={{
                    position: "absolute", right: 0, top: 0, height: "100%",
                    background: "none", border: "none", cursor: "pointer",
                    padding: "0 10px", color: "#64748B", display: "flex", alignItems: "center",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            {/* Catégories */}
            <div className="sidebar-widget">
              <p className="sidebar-title">Catégories</p>
              {CATEGORIES.map((c) => (
                <Link key={c.label} href={`/blog?q=${encodeURIComponent(c.q)}`} className="cat-item">
                  <span style={{ fontSize: "1rem" }}>{c.icon}</span>
                  {c.label}
                </Link>
              ))}
            </div>

            {/* Articles populaires */}
            {populaires.length > 0 && (
              <div className="sidebar-widget">
                <p className="sidebar-title">Articles récents</p>
                {populaires.map((a, i) => (
                  <Link key={a.id} href={`/blog/${a.slug || a.id}`} className="pop-item">
                    <span className="pop-num">{i + 1}</span>
                    <span className="pop-title">{a.texte}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Télécharger l'app */}
            <div style={{ background: "#0D1525", borderRadius: 14, padding: "20px 18px", marginBottom: 20 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFB800", margin: "0 0 8px" }}>
                Application TaxiBe
              </p>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", margin: "0 0 16px", lineHeight: 1.55 }}>
                Arrêts GPS, favoris, itinéraires, correspondances — tout dans votre poche.
              </p>
              <Link href="/telecharger" style={{
                display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
                background: "#FFB800", borderRadius: 10, textDecoration: "none",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <div>
                  <div style={{ fontSize: "0.56rem", color: "rgba(13,21,37,0.55)", lineHeight: 1, textTransform: "uppercase", letterSpacing: "0.06em" }}>Android · Gratuit</div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#0D1525", lineHeight: 1.3 }}>Télécharger TaxiBe</div>
                </div>
              </Link>
              <p style={{ margin: "8px 0 0", fontSize: "0.68rem", color: "rgba(255,255,255,0.2)" }}>
                Google Play · bientôt disponible
              </p>
            </div>

            {/* Ligne la plus recherchée */}
            <div style={{ background: "white", borderRadius: 14, border: "1px solid #E8ECF0", padding: "18px" }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFB800", margin: "0 0 2px" }}>
                Ligne la plus recherchée
              </p>
              <p style={{ fontSize: "0.62rem", fontWeight: 600, color: "#64748B", margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
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
              <p style={{ fontSize: "0.7rem", color: "#64748B", margin: 0 }}>+ de 50 communes couvertes</p>
            </div>

          </aside>
        </div>
      </div>
      <CtaApp />
      <Footer />
    </>
  );
}
