import { Suspense } from "react";
import { safeJsonLd } from "@/lib/sanitize";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import SearchForm from "@/app/components/SearchForm";
import SpotlightSection from "@/app/components/SpotlightSection";
import WhySection from "@/app/components/WhySection";
import PourQuiSection from "@/app/components/PourQuiSection";
import { supabase } from "@/lib/supabase";

export const revalidate = 300;

type Article = {
  id: string;
  slug: string | null;
  image_url: string | null;
  texte: string;
  created_at: string;
};

async function getHomeParams() {
  try {
    const req = supabase
      .from("parametres")
      .select("cle, valeur")
      .in("cle", [
        "home_hero_image_url", "home_hero_image_mobile_url", "home_cta_phone_url",
        "home_video_url", "home_video_titre", "home_video_sous_texte",
        "home_why_illustration_url",
      ]);
    const { data } = await Promise.race([
      req,
      new Promise<{ data: null }>((r) => setTimeout(() => r({ data: null }), 8000)),
    ]);
    const map = Object.fromEntries(((data as { cle: string; valeur: string }[] | null) ?? []).map((r) => [r.cle, r.valeur]));
    return {
      desktop: map["home_hero_image_url"] ?? null,
      mobile: map["home_hero_image_mobile_url"] ?? null,
      ctaPhone: map["home_cta_phone_url"] ?? null,
      videoUrl: map["home_video_url"] ?? null,
      videoTitre: map["home_video_titre"] ?? "Voyez TaxiBe en action",
      videoSousTexte: map["home_video_sous_texte"] ?? "En 60 secondes, découvrez comment trouver votre ligne, localiser les arrêts et planifier vos trajets à Antananarivo — directement depuis votre téléphone.",
      whyIllustrationUrl: map["home_why_illustration_url"] ?? null,
    };
  } catch {
    return { desktop: null, mobile: null, ctaPhone: null, videoUrl: null, videoTitre: "Voyez TaxiBe en action", videoSousTexte: "En 60 secondes, découvrez comment trouver votre ligne, localiser les arrêts et planifier vos trajets à Antananarivo — directement depuis votre téléphone." };
  }
}

function getVideoEmbedSrc(url: string): { type: "youtube" | "mp4"; src: string } | null {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (yt) return { type: "youtube", src: `https://www.youtube.com/embed/${yt[1]}?rel=0&modestbranding=1` };
  if (/\.mp4/i.test(url)) return { type: "mp4", src: url };
  return null;
}

async function getActualites(): Promise<Article[]> {
  try {
    const req = supabase
      .from("actualites")
      .select("id, slug, image_url, texte, created_at")
      .eq("publie", true)
      .order("created_at", { ascending: false })
      .limit(3);
    const { data } = await Promise.race([
      req,
      new Promise<{ data: null }>((r) => setTimeout(() => r({ data: null }), 8000)),
    ]);
    return ((data as Article[] | null) ?? []);
  } catch { return []; }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

async function ActualitesSection() {
  const articles = await getActualites();
  if (articles.length === 0) return null;

  return (
    <section className="sec" style={{ background: "white" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800", marginBottom: 10 }}>
              Actualités
            </p>
            <h2 style={{ fontSize: "clamp(1.4rem, 4vw, 2.1rem)", fontWeight: 900, color: "#0D1525", margin: 0, letterSpacing: "-0.01em" }}>
              Les dernières nouvelles
            </h2>
          </div>
          <Link href="/blog" style={{
            fontSize: "0.84rem", fontWeight: 700, color: "#FFB800",
            textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
            whiteSpace: "nowrap",
          }}>
            Voir tous les articles →
          </Link>
        </div>

        <div className="actu-grid">
          {articles.map((a) => (
            <Link key={a.id} href={`/blog/${a.slug || a.id}`} className="actu-card">
              {a.image_url ? (
                <div style={{ width: "100%", background: "#F1F5F9", overflow: "hidden" }}>
                  <Image
                    src={a.image_url}
                    alt={a.texte}
                    width={0} height={0}
                    sizes="(max-width: 540px) 100vw, (max-width: 860px) 50vw, 33vw"
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              ) : (
                <div style={{
                  width: "100%", aspectRatio: "16/9",
                  background: "linear-gradient(135deg, #0D1525 0%, #1a2a3a 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: "2rem", opacity: 0.25 }}>🚌</span>
                </div>
              )}
              <div style={{ padding: "18px 20px 22px" }}>
                <p style={{ fontSize: "0.7rem", color: "#64748B", margin: "0 0 10px", fontWeight: 500 }}>
                  {formatDate(a.created_at)}
                </p>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0D1525", margin: "0 0 14px", lineHeight: 1.4 }}>
                  {a.texte}
                </h3>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#FFB800" }}>
                  Lire l&apos;article →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    title: "Rechercher une ligne",
    desc: "Retrouvez rapidement une ligne grâce à son numéro.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B8860B" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  },
  {
    title: "Rechercher un arrêt ou un quartier",
    desc: "Trouvez les arrêts et les lignes disponibles autour d'un quartier ou d'un point d'intérêt.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B8860B" strokeWidth="2.2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  },
  {
    title: "Correspondances",
    desc: "Identifiez facilement les changements de ligne nécessaires pour atteindre votre destination.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B8860B" strokeWidth="2.2" strokeLinecap="round"><path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10"/><path d="M3.51 15a9 9 0 0 0 14.85 3.36L23 14"/></svg>,
  },
  {
    title: "Mes favoris",
    desc: "Enregistrez vos lignes et arrêts favoris pour y accéder en un instant.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="rgba(184,134,11,0.15)" stroke="#B8860B" strokeWidth="2.2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  },
  {
    title: "Carte interactive",
    desc: "Explorez les lignes, les arrêts et le réseau directement sur une carte interactive.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B8860B" strokeWidth="2.2" strokeLinecap="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  },
  {
    title: "Partager ma position",
    desc: "Partagez facilement votre position avec vos proches ou pour obtenir de l'aide.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B8860B" strokeWidth="2.2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  },
  {
    title: "Actualités & emplois",
    desc: "Restez informé des nouvelles et offres d'emploi liées au transport collectif.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B8860B" strokeWidth="2.2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  },
  {
    title: "Et bien plus à venir",
    desc: "TaxiBe évolue continuellement pour proposer de nouvelles fonctionnalités adaptées à vos besoins.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B8860B" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>,
  },
];

export default async function Home() {
  const params = await getHomeParams();
  const { desktop: heroImageUrl, mobile: heroImageMobileUrl, ctaPhone: ctaPhoneUrl, videoUrl, videoTitre, videoSousTexte, whyIllustrationUrl } = params;
  const videoEmbed = videoUrl ? getVideoEmbedSrc(videoUrl) : null;

  const BASE = "https://taxibe.mg";

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        "name": "TaxiBe",
        "url": BASE,
        "description": "Application de référence pour les lignes de taxi-be à Antananarivo, Madagascar.",
        "inLanguage": "fr-MG",
        "potentialAction": {
          "@type": "SearchAction",
          "target": { "@type": "EntryPoint", "urlTemplate": `${BASE}/recherche?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${BASE}/#organization`,
        "name": "TaxiBe",
        "url": BASE,
        "logo": { "@type": "ImageObject", "url": `${BASE}/logo_taxibe.png` },
        "description": "TaxiBe est l'application de référence pour trouver les lignes de taxi-be à Antananarivo, Madagascar.",
        "areaServed": { "@type": "City", "name": "Antananarivo", "addressCountry": "MG" },
        "knowsAbout": ["taxi-be", "transport en commun", "Antananarivo", "lignes de bus Madagascar", "mobilité urbaine Madagascar"],
        "sameAs": [BASE],
        "contactPoint": { "@type": "ContactPoint", "contactType": "customer support", "url": `${BASE}/contact`, "availableLanguage": "French" },
      },
      {
        "@type": "WebApplication",
        "@id": `${BASE}/#app`,
        "name": "TaxiBe",
        "url": BASE,
        "applicationCategory": "TransportationApplication",
        "operatingSystem": "Android",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "MGA" },
        "description": "Recherchez les lignes de taxi-be d'Antananarivo. Gratuit, sans compte, disponible sur Android.",
        "author": { "@id": `${BASE}/#organization` },
      },
    ],
  };

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLdGraph) }} />
    <Nav />
    <main style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>

      <style>{`
        .search-input:focus { outline: none; box-shadow: 0 0 0 3px rgba(255,184,0,0.15); }
        .search-btn:hover { background: #e6a500 !important; }
        .actu-card { background: white; border-radius: 14px; border: 1px solid #E8ECF0; overflow: hidden; text-decoration: none; display: block; transition: box-shadow 0.2s, transform 0.2s; }
        .actu-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.09); transform: translateY(-2px); }
        .actu-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 860px) { .actu-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 540px) { .actu-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ background: "#F8F9FB", overflow: "hidden", borderBottom: "1px solid #E8ECF0" }}>
        <style>{`
          .hero-grid {
            max-width: 1280px; margin: 0 auto; padding: 64px 40px 0;
            display: grid; grid-template-columns: 1fr 1.4fr;
            gap: 24px; align-items: flex-end;
          }
          .hero-text-col { min-width: 0; padding-bottom: 64px; }
          .hero-search-wrap { width: 100%; max-width: 460px; }
          .hero-img-col {
            display: flex; align-items: flex-end; justify-content: center; min-width: 0;
          }
          .hero-img-col img { width: 100%; height: auto; display: block; }
          .hero-img-mobile-wrap { display: none; }
          @media (max-width: 768px) {
            .hero-grid {
              grid-template-columns: 1fr;
              padding: 40px 20px 32px;
              gap: 24px;
            }
            .hero-search-wrap { max-width: 100%; }
            .hero-img-col { display: none; }
            .hero-img-col.has-mobile {
              display: flex; align-items: center; justify-content: center;
              overflow: hidden; max-height: 320px;
            }
            .hero-img-desktop-wrap { display: none; }
            .hero-img-mobile-wrap { display: block; }
          }
        `}</style>

        <div className="hero-grid">
          {/* Colonne gauche — texte */}
          <div className="hero-text-col">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.4)",
              borderRadius: 8, padding: "5px 12px", marginBottom: 24,
            }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8860B" }}>
                Antananarivo · 100% Gratuit
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(1.8rem, 5vw, 3.4rem)", fontWeight: 900,
              color: "#0D1525", lineHeight: 1.13, marginBottom: 20, letterSpacing: "-0.02em",
            }}>
              Trouvez votre ligne de{" "}
              <span style={{ color: "#FFB800" }}>taxi-be</span>
            </h1>

            <p style={{
              fontSize: "0.95rem", lineHeight: 1.75, marginBottom: 32,
              color: "#64748B", maxWidth: 420,
            }}>
              Tapez un numéro de ligne et obtenez tous les arrêts, le trajet complet, les correspondances.
            </p>

            <div className="hero-search-wrap">
              <SearchForm />
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                <span style={{ fontSize: "0.72rem", color: "#64748B" }}>Essayez :</span>
                {["147", "183", "D", "163", "133"].map((n) => (
                  <a key={n} href={`/recherche?q=${n}`} style={{
                    display: "inline-block", padding: "3px 10px", borderRadius: 6,
                    background: "#F1F5F9", color: "#64748B", textDecoration: "none",
                    fontSize: "0.75rem", fontWeight: 700, border: "1px solid #E2E8F0",
                  }}>{n}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite — image desktop / mobile */}
          {(heroImageUrl || heroImageMobileUrl) ? (
            <div className={`hero-img-col${heroImageMobileUrl ? " has-mobile" : ""}`}>
              {/* Wrapper desktop — le div est caché sur mobile via CSS, pas l'img */}
              {heroImageUrl && (
                <div className="hero-img-desktop-wrap" style={{ width: "100%" }}>
                  <Image
                    src={heroImageUrl}
                    alt="Application TaxiBe"
                    width={680}
                    height={520}
                    sizes="50vw"
                    style={{ width: "100%", height: "auto", objectFit: "contain", mixBlendMode: "multiply" }}
                    priority
                  />
                </div>
              )}
              {/* Wrapper mobile — le div est caché sur desktop via CSS, pas l'img */}
              {heroImageMobileUrl && (
                <div className="hero-img-mobile-wrap" style={{ width: "100%" }}>
                  <Image
                    src={heroImageMobileUrl}
                    alt="Application TaxiBe"
                    width={480}
                    height={360}
                    sizes="calc(100vw - 40px)"
                    style={{ width: "100%", height: "auto", objectFit: "contain", mixBlendMode: "multiply" }}
                    priority
                  />
                </div>
              )}
            </div>
          ) : (
            <div aria-hidden="true" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "clamp(5rem,12vw,9rem)", fontWeight: 900, color: "#FFB800",
              opacity: 0.06, letterSpacing: "-0.05em", userSelect: "none",
            }}>TXB</div>
          )}
        </div>
      </section>

      {/* ── Points forts ── */}
      <div style={{ background: "white", borderBottom: "1px solid #E8ECF0" }}>
        <style>{`
          .points-forts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
          .point-fort { display: flex; align-items: center; gap: 14px; padding: 20px 28px; border-right: 1px solid #E8ECF0; }
          .point-fort:last-child { border-right: none; }
          @media (max-width: 720px) {
            .points-forts { grid-template-columns: repeat(2, 1fr); }
            .point-fort { border-right: none; border-bottom: 1px solid #E8ECF0; padding: 16px 20px; }
            .point-fort:nth-child(odd) { border-right: 1px solid #E8ECF0; }
            .point-fort:nth-last-child(-n+2) { border-bottom: none; }
          }
        `}</style>
        <div style={{ maxWidth: 1100, margin: "0 auto" }} className="points-forts">
          <div className="point-fort">
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#FFB800", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2.2" strokeLinecap="round">
                <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0D1525", lineHeight: 1.35 }}>Informations sur les lignes</span>
          </div>
          <div className="point-fort">
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#FFB800", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2.2" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0D1525", lineHeight: 1.35 }}>Consultation des arrêts</span>
          </div>
          <div className="point-fort">
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#FFB800", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2.5" strokeLinecap="round">
                <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            </div>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0D1525", lineHeight: 1.35 }}>Disponible sur le web et mobile</span>
          </div>
          <div className="point-fort">
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#FFB800", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2.2" strokeLinecap="round">
                <path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/>
                <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01"/>
              </svg>
            </div>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0D1525", lineHeight: 1.35 }}>Projet développé à Madagascar</span>
          </div>
        </div>
      </div>

      {/* ── Notre mission ── */}
      <WhySection illustrationUrl={whyIllustrationUrl} />

      {/* ── Pour qui ? ── */}
      <PourQuiSection />

      {/* ── Fonctionnalités ── */}
      <section id="fonctionnalites" style={{ background: "#FFFDF5" }}>
        <style>{`
          .fonc-wrap { max-width: 1200px; margin: 0 auto; padding: 88px 40px; }
          .fonc-layout { display: grid; grid-template-columns: 320px 1fr; gap: 64px; align-items: start; }
          .fonc-sticky { position: sticky; top: 80px; }
          .fonc-phone { width: 100%; height: auto; display: block; margin-top: 28px; filter: drop-shadow(0 28px 48px rgba(0,0,0,0.14)); }
          .fonc-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
          .fonc-card {
            background: white; border-radius: 16px; padding: 22px 18px 20px;
            border: 1px solid #EDE8D8;
            box-shadow: 0 1px 4px rgba(0,0,0,0.04);
            transition: transform 0.22s ease, box-shadow 0.22s ease;
          }
          .fonc-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
          .fonc-icon { width: 48px; height: 48px; border-radius: 50%; background: rgba(255,184,0,0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
          .fonc-card-title { font-weight: 800; font-size: 0.87rem; color: #0D1525; margin: 0 0 8px; line-height: 1.3; }
          .fonc-dash { width: 22px; height: 3px; background: #FFB800; border-radius: 2px; margin-bottom: 10px; }
          .fonc-card-desc { font-size: 0.76rem; color: #64748B; line-height: 1.65; margin: 0; }
          @media (max-width: 980px) {
            .fonc-layout { grid-template-columns: 1fr; gap: 40px; }
            .fonc-sticky { position: static; display: flex; gap: 32px; align-items: flex-start; }
            .fonc-phone { margin-top: 0; max-width: 180px; flex-shrink: 0; }
            .fonc-cards { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 560px) {
            .fonc-wrap { padding: 52px 20px; }
            .fonc-sticky { flex-direction: column; }
            .fonc-phone { max-width: 100%; }
            .fonc-cards { grid-template-columns: 1fr 1fr; gap: 10px; }
          }
        `}</style>
        <div className="fonc-wrap">
          <div className="fonc-layout">

            {/* Colonne gauche */}
            <div className="fonc-sticky">
              <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800", marginBottom: 12 }}>
                Fonctionnalités
              </p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.3rem)", fontWeight: 900, color: "#0D1525", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 18 }}>
                Votre compagnon pour tous vos déplacements.
              </h2>
              <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.75, margin: 0 }}>
                Retrouvez facilement une ligne, un arrêt ou un quartier, préparez votre trajet, découvrez les correspondances et accédez à toutes les informations utiles, où que vous soyez.
              </p>
              <Image
                src="/phone_function.png"
                alt="Application TaxiBe"
                width={320}
                height={580}
                className="fonc-phone"
                sizes="(max-width: 980px) 180px, 320px"
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Colonne droite */}
            <div>
              <div className="fonc-cards">
                {FEATURES.map((f) => (
                  <div key={f.title} className="fonc-card">
                    <div className="fonc-icon">{f.icon}</div>
                    <h3 className="fonc-card-title">{f.title}</h3>
                    <div className="fonc-dash" />
                    <p className="fonc-card-desc">{f.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28, textAlign: "center" }}>
                <Link href="/telecharger" style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "14px 36px", background: "#FFB800", borderRadius: 10,
                  fontWeight: 800, fontSize: "0.95rem", color: "#0D1525", textDecoration: "none",
                }}>
                  Essayer TaxiBe gratuitement →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Spotlight ── */}
      <Suspense fallback={null}>
        <SpotlightSection />
      </Suspense>

      {/* ── Vidéo ── */}
      {videoEmbed && (
        <section className="sec" style={{ background: "white" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <p style={{ textAlign: "center", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800", marginBottom: 12 }}>
              Découvrir
            </p>
            <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 4vw, 2.1rem)", fontWeight: 900, color: "#0D1525", marginBottom: 14, letterSpacing: "-0.01em" }}>
              {videoTitre}
            </h2>
            <p style={{ textAlign: "center", color: "#64748B", fontSize: "0.9rem", maxWidth: 560, margin: "0 auto 44px", lineHeight: 1.75 }}>
              {videoSousTexte}
            </p>
            <div style={{
              position: "relative", width: "100%", paddingTop: "56.25%",
              borderRadius: 18, overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              border: "1px solid #E8ECF0",
            }}>
              {videoEmbed.type === "youtube" ? (
                <iframe
                  src={videoEmbed.src}
                  title={videoTitre}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                />
              ) : (
                <video
                  src={videoEmbed.src}
                  controls
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Actualités ── */}
      <Suspense fallback={null}>
        <ActualitesSection />
      </Suspense>

      {/* ── CTA Téléchargement ── */}
      <div style={{ position: "relative", zIndex: 0 }}>
        <style>{`
          .cta-section {
            background: #FFB800;
            position: relative;
            overflow: visible;
          }
          .cta-inner {
            max-width: 1200px; margin: 0 auto;
            padding: 72px 40px;
            display: grid; grid-template-columns: 1fr 1fr;
            gap: 40px; align-items: center;
            position: relative;
          }
          .cta-phone-col {
            display: flex; justify-content: center; align-items: flex-end;
            position: relative;
          }
          .cta-phone-img {
            width: 100%; max-width: 320px;
            margin-bottom: -72px;
            margin-top: -72px;
            filter: drop-shadow(0 32px 48px rgba(0,0,0,0.22));
          }
          @media (max-width: 720px) {
            .cta-inner { grid-template-columns: 1fr; padding: 56px 24px; }
            .cta-phone-col { display: none; }
          }
        `}</style>
        <section className="cta-section">
          <div className="cta-inner">
            {/* Texte */}
            <div>
              <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900, color: "#0D1525", marginBottom: 16, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                Toutes les fonctionnalités dans l&apos;app
              </h2>
              <p style={{ color: "rgba(13,21,37,0.65)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: 36, maxWidth: 400 }}>
                Favoris, GPS, correspondances, jeux — toutes les fonctionnalités pour les membres, sur Android.
              </p>
              <Link href="/telecharger" style={{
                display: "inline-block", padding: "15px 36px", borderRadius: 10,
                background: "#0D1525", color: "#FFB800",
                fontWeight: 800, fontSize: "1rem", textDecoration: "none",
                letterSpacing: "-0.01em",
              }}>
                Télécharger l&apos;app
              </Link>
            </div>

            {/* Téléphone */}
            <div className="cta-phone-col">
              {ctaPhoneUrl ? (
                <Image
                  src={ctaPhoneUrl}
                  alt="Application TaxiBe sur téléphone"
                  width={320}
                  height={580}
                  sizes="320px"
                  className="cta-phone-img"
                  style={{ objectFit: "contain" }}
                />
              ) : (
                /* Placeholder si pas d'image uploadée */
                <div className="cta-phone-img" style={{
                  width: 220, background: "#0D1525", borderRadius: 32,
                  padding: "12px 8px", boxShadow: "0 32px 48px rgba(0,0,0,0.22)",
                }}>
                  <div style={{ width: 60, height: 10, background: "#1a2a40", borderRadius: 5, margin: "0 auto 10px" }} />
                  <div style={{ background: "#F8FAFC", borderRadius: 20, height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "2rem", fontWeight: 900, color: "#FFB800", opacity: 0.3 }}>TXB</span>
                  </div>
                  <div style={{ width: 50, height: 5, background: "rgba(255,255,255,0.2)", borderRadius: 3, margin: "10px auto 0" }} />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* ── Comment ça marche ── */}
      <section id="comment" className="sec" style={{ background: "#F8F9FB" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800", marginBottom: 12 }}>
            Utilisation
          </p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 4vw, 2.1rem)", fontWeight: 900, color: "#0D1525", marginBottom: 52, letterSpacing: "-0.01em" }}>
            Comment ça marche ?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {[
              { num: "1", title: "Ouvrez TaxiBe", desc: "Sur ce site pour la recherche rapide, ou dans l'application pour l'expérience complète." },
              { num: "2", title: "Cherchez par numéro de ligne", desc: "Tapez le numéro (ex : 147) pour voir tous les arrêts et le trajet complet en détail." },
              { num: "3", title: "Trouvez vos correspondances", desc: "Indiquez votre point de départ et votre destination — TaxiBe calcule les correspondances." },
              { num: "4", title: "Téléchargez pour plus", desc: "GPS, favoris, jeux et récompenses — toutes les fonctionnalités sont dans l'application pour les membres." },
            ].map((step, i) => (
              <div key={step.num} style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                <div style={{
                  flexShrink: 0, width: 44, height: 44, borderRadius: 8,
                  background: i === 0 ? "#FFB800" : "#F1F5F9",
                  color: i === 0 ? "#0D1525" : "#94A3B8",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "1rem",
                }}>
                  {step.num}
                </div>
                <div style={{ paddingTop: 10 }}>
                  <h3 style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0D1525", marginBottom: 6 }}>{step.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
    <Footer />
    </>
  );
}



