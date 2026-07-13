import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";

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

// ── Data ──────────────────────────────────────────────────────────────────────

async function getArticle(id: string): Promise<Article | null> {
  const { data } = await supabase
    .from("actualites")
    .select("id, image_url, texte, contenu, lien, publie, ordre, created_at")
    .eq("id", id)
    .eq("publie", true)
    .single();
  return data ?? null;
}

type ArticleMini = Pick<Article, "id" | "image_url" | "texte" | "created_at">;

async function getAutresArticles(excludeId: string): Promise<ArticleMini[]> {
  const { data } = await supabase
    .from("actualites")
    .select("id, image_url, texte, created_at")
    .eq("publie", true)
    .neq("id", excludeId)
    .order("created_at", { ascending: false })
    .limit(4);
  return (data ?? []) as ArticleMini[];
}

// ── Metadata dynamique ────────────────────────────────────────────────────────

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) return { title: "Article introuvable — TaxiBe" };
  return {
    title: `${article.texte} — TaxiBe`,
    description: article.contenu?.slice(0, 160) ?? article.texte,
    openGraph: {
      title: article.texte,
      description: article.contenu?.slice(0, 160) ?? article.texte,
      images: article.image_url ? [article.image_url] : [],
    },
  };
}

// ── Helper ────────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [article, autres] = await Promise.all([
    getArticle(id),
    getAutresArticles(id),
  ]);

  if (!article) notFound();

  return (
    <>
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
          .share-btn { display: inline-flex; align-items: center; gap: 7px; padding: 8px 16px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer; border: none; text-decoration: none; }
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
          <span style={{ color: "#0D1525", fontWeight: 600 }}>Article</span>
        </div>

        {/* Image hero */}
        {article.image_url && (
          <div style={{ maxWidth: 1100, margin: "24px auto 0", padding: "0 24px", background: "#F1F5F9", borderRadius: 16, overflow: "hidden" }}>
            <Image
              src={article.image_url}
              alt={article.texte}
              width={0} height={0}
              sizes="(max-width: 1100px) 100vw, 1060px"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        )}

        {/* Layout */}
        <div className="article-layout" style={{ marginTop: 32 }}>

          {/* ── Article ── */}
          <article>
            {/* En-tête */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{
                  fontSize: "0.65rem", fontWeight: 900, textTransform: "uppercase",
                  letterSpacing: "0.08em", color: "#FFB800",
                }}>ACTUALITÉS</span>
                <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>·</span>
                <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>{formatDate(article.created_at)}</span>
              </div>
              <h1 style={{ fontSize: "1.9rem", fontWeight: 900, color: "#0D1525", lineHeight: 1.25, margin: "0 0 20px" }}>
                {article.texte}
              </h1>
              <div style={{ height: 3, width: 48, background: "#FFB800", borderRadius: 2 }} />
            </div>

            {/* Contenu */}
            <div className="article-body">
              {article.contenu ? (
                <div dangerouslySetInnerHTML={{ __html: article.contenu.replace(/\n/g, "<br/>") }} />
              ) : (
                <p style={{ color: "#94A3B8", fontStyle: "italic" }}>Aucun contenu disponible pour cet article.</p>
              )}
            </div>

            {/* Lien externe */}
            {article.lien && (
              <div style={{ marginTop: 32, padding: "20px 24px", background: "#FFFBEB", borderRadius: 12, border: "1px solid #FDE68A" }}>
                <p style={{ margin: "0 0 10px", fontSize: "0.85rem", fontWeight: 700, color: "#92400E" }}>
                  En savoir plus
                </p>
                <a
                  href={article.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#FFB800", fontWeight: 700, fontSize: "0.9rem", wordBreak: "break-all" }}
                >
                  {article.lien}
                </a>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 40, paddingTop: 24, borderTop: "1px solid #E8ECF0" }}>
              <Link href="/blog" style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "9px 18px", borderRadius: 9, background: "#F1F5F9",
                fontSize: "0.84rem", fontWeight: 700, color: "#0D1525", textDecoration: "none",
              }}>
                ← Retour au blog
              </Link>
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside>

            {/* Articles associés */}
            {autres.length > 0 && (
              <div className="sidebar-widget">
                <p className="sidebar-title">À lire aussi</p>
                {autres.map((a) => (
                  <Link key={a.id} href={`/blog/${a.id}`} className="rel-item">
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

            {/* Télécharger l'app */}
            <div style={{ background: "#0D1525", borderRadius: 14, padding: "20px 18px", marginBottom: 20 }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFB800", margin: "0 0 8px" }}>
                Télécharger l&apos;application
              </p>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", margin: "0 0 16px", lineHeight: 1.5 }}>
                Tous vos trajets, arrêts et lignes dans votre poche.
              </p>
              <Link href="/telecharger" style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                background: "rgba(255,255,255,0.08)", borderRadius: 10, textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.1)", marginBottom: 8,
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

            {/* Ligne widget */}
            <div style={{ background: "white", borderRadius: 14, border: "1px solid #E8ECF0", padding: "18px" }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFB800", margin: "0 0 14px" }}>
                Ligne la plus recherchée
              </p>
              <div style={{ background: "#0D1525", borderRadius: 10, padding: "14px 16px" }}>
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
            </div>

          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}
