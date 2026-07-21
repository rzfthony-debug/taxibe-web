import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import { sanitizeHtml, safeJsonLd } from "@/lib/sanitize";
import { isUuid } from "@/lib/slugify";
import ShareButtons from "@/app/blog/ShareButtons";

type Article = {
  id: string;
  slug: string | null;
  image_url: string | null;
  texte: string;
  contenu: string | null;
  lien: string | null;
  publie: boolean;
  ordre: number;
  created_at: string;
};

const SELECT = "id, slug, image_url, texte, contenu, lien, publie, ordre, created_at";

async function getArticle(slugOrId: string): Promise<Article | null> {
  const bySlug = await supabase
    .from("actualites")
    .select(SELECT)
    .eq("slug", slugOrId)
    .eq("publie", true)
    .single();
  if (bySlug.data) return bySlug.data as Article;
  if (!isUuid(slugOrId)) return null;
  const byId = await supabase
    .from("actualites")
    .select(SELECT)
    .eq("id", slugOrId)
    .eq("publie", true)
    .single();
  return (byId.data as Article) ?? null;
}

type ArticleMini = Pick<Article, "id" | "slug" | "image_url" | "texte" | "created_at">;

async function getAutresArticles(excludeId: string): Promise<ArticleMini[]> {
  const { data } = await supabase
    .from("actualites")
    .select("id, slug, image_url, texte, created_at")
    .eq("publie", true)
    .neq("id", excludeId)
    .order("created_at", { ascending: false })
    .limit(4);
  return (data ?? []) as ArticleMini[];
}

const BASE = "https://taxibemada.vercel.app";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article introuvable" };
  const canonicalSlug = article.slug || article.id;
  const desc = article.contenu?.slice(0, 160) ?? article.texte;
  return {
    title: `${article.texte} — TaxiBe Blog`,
    description: desc,
    alternates: { canonical: `/blog/${canonicalSlug}` },
    openGraph: {
      title: `${article.texte} — TaxiBe`,
      description: desc,
      url: `/blog/${canonicalSlug}`,
      type: "article",
      publishedTime: article.created_at,
      images: article.image_url
        ? [{ url: article.image_url, width: 1200, height: 630, alt: article.texte }]
        : [{ url: "/logo_taxibe.png", width: 1200, height: 630, alt: "TaxiBe Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.texte} — TaxiBe`,
      description: desc,
      images: [article.image_url ?? "/logo_taxibe.png"],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  // Redirect UUID URLs to slug URLs
  if (isUuid(slug) && article.slug) redirect(`/blog/${article.slug}`);

  const autres = await getAutresArticles(article.id);

  const articleUrl = `${BASE}/blog/${article.slug || article.id}`;
  const headline = article.texte.length > 110 ? article.texte.slice(0, 107) + "…" : article.texte;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "headline": headline,
        "description": article.contenu?.slice(0, 200) ?? article.texte,
        "image": article.image_url ? [article.image_url] : [`${BASE}/logo_taxibe.png`],
        "datePublished": article.created_at,
        "dateModified": article.created_at,
        "author": { "@type": "Organization", "name": "TaxiBe", "url": BASE },
        "publisher": { "@type": "Organization", "name": "TaxiBe", "logo": { "@type": "ImageObject", "url": `${BASE}/logo_taxibe.png` } },
        "url": articleUrl,
        "mainEntityOfPage": { "@type": "WebPage", "@id": articleUrl },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Accueil", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/blog` },
          { "@type": "ListItem", "position": 3, "name": headline, "item": articleUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <Nav />
      <div style={{ background: "#F8F9FB", minHeight: "100vh" }}>
        <style>{`
          .article-layout { display: grid; grid-template-columns: 1fr 300px; gap: 36px; max-width: 1100px; margin: 0 auto; padding: 0 24px 60px; }
          .article-body   { font-size: 1rem; color: #374151; line-height: 1.8; }
          .article-body p { margin: 0 0 1.4em; }
          .article-body h2 { font-size: 1.35rem; font-weight: 800; color: #0D1525; margin: 2em 0 0.8em; }
          .article-body h3 { font-size: 1.1rem; font-weight: 700; color: #0D1525; margin: 1.8em 0 0.6em; }
          .article-body ul, .article-body ol { padding-left: 1.5em; margin: 0 0 1.4em; }
          .article-body li { margin-bottom: 0.4em; }
          .article-body a  { color: #FFB800; font-weight: 600; }
          .article-body blockquote { border-left: 4px solid #FFB800; margin: 1.5em 0; padding: 12px 20px; background: #FFFBEB; border-radius: 0 8px 8px 0; font-style: italic; color: #64748B; }
          .sidebar-widget { background: white; border-radius: 14px; border: 1px solid #E8ECF0; overflow: hidden; margin-bottom: 20px; }
          .sidebar-title  { font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #94A3B8; padding: 16px 18px 10px; margin: 0; }
          .rel-item { display: grid; grid-template-columns: 80px 1fr; gap: 12px; align-items: start; padding: 14px 18px; border-top: 1px solid #F1F5F9; text-decoration: none; }
          .rel-item:hover .rel-title { color: #FFB800; }
          .rel-title { font-size: 0.82rem; font-weight: 700; color: #0D1525; line-height: 1.35; }
          .rel-date  { font-size: 0.72rem; color: #94A3B8; margin-top: 4px; }
          .breadcrumb { max-width: 1100px; margin: 0 auto; padding: 14px 24px 0; font-size: 0.8rem; color: #94A3B8; }
          .breadcrumb a { color: #64748B; text-decoration: none; font-weight: 500; }
          .breadcrumb a:hover { color: #0D1525; }
          @media (max-width: 860px) {
            .article-layout { grid-template-columns: 1fr; }
          }
          @media (max-width: 540px) {
            .article-layout { padding: 0 16px 40px; }
          }
        `}</style>

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">Accueil</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <Link href="/blog">Blog</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: "#0D1525", fontWeight: 600 }}>{article.texte}</span>
        </div>

        {/* Image hero */}
        {article.image_url && (
          <div style={{ maxWidth: 1100, margin: "24px auto 0", padding: "0 24px", borderRadius: 16, overflow: "hidden" }}>
            <Image
              src={article.image_url}
              alt={article.texte}
              width={0} height={0}
              sizes="(max-width: 1100px) 100vw, 1060px"
              style={{ width: "100%", height: "auto", display: "block", borderRadius: 16 }}
            />
          </div>
        )}

        {/* Layout */}
        <div className="article-layout" style={{ marginTop: 32 }}>

          {/* ── Article ── */}
          <article>
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#FFB800" }}>ACTUALITÉS</span>
                <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>·</span>
                <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>{formatDate(article.created_at)}</span>
              </div>
              <h1 style={{ fontSize: "1.9rem", fontWeight: 900, color: "#0D1525", lineHeight: 1.25, margin: "0 0 20px" }}>
                {article.texte}
              </h1>
              <div style={{ height: 3, width: 48, background: "#FFB800", borderRadius: 2, marginBottom: 20 }} />
              <ShareButtons url={articleUrl} title={article.texte} />
            </div>

            <div className="article-body">
              {article.contenu ? (
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.contenu.replace(/\n/g, "<br/>")) }} />
              ) : (
                <p style={{ color: "#64748B", fontStyle: "italic" }}>Aucun contenu disponible pour cet article.</p>
              )}
            </div>

            {article.lien && (
              <div style={{ marginTop: 32, padding: "20px 24px", background: "#FFFBEB", borderRadius: 12, border: "1px solid #FDE68A" }}>
                <p style={{ margin: "0 0 10px", fontSize: "0.85rem", fontWeight: 700, color: "#92400E" }}>En savoir plus</p>
                <a href={article.lien} target="_blank" rel="noopener noreferrer"
                  style={{ color: "#FFB800", fontWeight: 700, fontSize: "0.9rem", wordBreak: "break-all" }}>
                  {article.lien}
                </a>
              </div>
            )}

            <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid #E8ECF0", display: "flex", flexDirection: "column", gap: 16 }}>
              <ShareButtons url={articleUrl} title={article.texte} />
              <div>
                <Link href="/blog" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "9px 18px", borderRadius: 9, background: "#F1F5F9",
                  fontSize: "0.84rem", fontWeight: 700, color: "#0D1525", textDecoration: "none",
                }}>
                  ← Retour au blog
                </Link>
              </div>
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside>

            {autres.length > 0 && (
              <div className="sidebar-widget">
                <p className="sidebar-title">À lire aussi</p>
                {autres.map((a) => (
                  <Link key={a.id} href={`/blog/${a.slug || a.id}`} className="rel-item">
                    {a.image_url ? (
                      <div style={{ position: "relative", width: 80, minWidth: 80, height: 56, borderRadius: 8, overflow: "hidden", background: "#F1F5F9", flexShrink: 0 }}>
                        <Image src={a.image_url} alt={a.texte} fill sizes="80px" style={{ objectFit: "contain" }} />
                      </div>
                    ) : (
                      <div style={{ width: 80, minWidth: 80, height: 56, borderRadius: 8, background: "#E8ECF0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: "1.2rem" }}>🚌</span>
                      </div>
                    )}
                    <div>
                      <p className="rel-title">{a.texte}</p>
                      <p className="rel-date">{formatDate(a.created_at)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div style={{ background: "#0D1525", borderRadius: 14, padding: "20px 18px", marginBottom: 20 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFB800", margin: "0 0 8px" }}>
                Application TaxiBe
              </p>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", margin: "0 0 16px", lineHeight: 1.55 }}>
                Arrêts GPS, favoris, itinéraires, correspondances — tout dans votre poche.
              </p>
              <Link href="/telecharger" style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: "#FFB800", borderRadius: 10, textDecoration: "none" }}>
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
              <p style={{ margin: "8px 0 0", fontSize: "0.68rem", color: "rgba(255,255,255,0.2)" }}>Google Play · bientôt disponible</p>
            </div>

            <div style={{ background: "white", borderRadius: 14, border: "1px solid #E8ECF0", padding: "18px" }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFB800", margin: "0 0 14px" }}>
                Ligne la plus recherchée
              </p>
              <div style={{ background: "#0D1525", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "white", lineHeight: 1, marginBottom: 4 }}>147</div>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "white", marginBottom: 4 }}>Ambatomaro → 67Ha</div>
                <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#FFB800", marginBottom: 12 }}>23 541 recherches</div>
                <Link href="/recherche?q=147" style={{ display: "block", padding: "8px", borderRadius: 8, textAlign: "center", background: "#FFB800", color: "#0D1525", fontSize: "0.78rem", fontWeight: 800, textDecoration: "none" }}>
                  Voir la ligne →
                </Link>
              </div>
            </div>

          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}
