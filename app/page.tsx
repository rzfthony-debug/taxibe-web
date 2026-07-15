import Link from "next/link";
import Image from "next/image";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import SearchForm from "@/app/components/SearchForm";
import SpotlightSection from "@/app/components/SpotlightSection";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

type Article = {
  id: string;
  image_url: string | null;
  texte: string;
  created_at: string;
};

async function getHeroImages(): Promise<{ desktop: string | null; mobile: string | null; ctaPhone: string | null }> {
  const { data } = await supabase
    .from("parametres")
    .select("cle, valeur")
    .in("cle", ["home_hero_image_url", "home_hero_image_mobile_url", "home_cta_phone_url"]);
  const map = Object.fromEntries((data ?? []).map((r: { cle: string; valeur: string }) => [r.cle, r.valeur]));
  return {
    desktop: map["home_hero_image_url"] ?? null,
    mobile: map["home_hero_image_mobile_url"] ?? null,
    ctaPhone: map["home_cta_phone_url"] ?? null,
  };
}

async function getActualites(): Promise<Article[]> {
  const { data } = await supabase
    .from("actualites")
    .select("id, image_url, texte, created_at")
    .eq("publie", true)
    .order("created_at", { ascending: false })
    .limit(3);
  return (data ?? []) as Article[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function Home() {
  const [articles, heroImages] = await Promise.all([getActualites(), getHeroImages()]);
  const { desktop: heroImageUrl, mobile: heroImageMobileUrl, ctaPhone: ctaPhoneUrl } = heroImages;

  return (
    <>
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
              <p style={{ fontSize: "0.75rem", marginTop: 10, marginBottom: 0, color: "#94A3B8" }}>
                Essayez 147 · 135 · 20B · 165 · 182
              </p>
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

      {/* ── Fonctionnalités ── */}
      <section id="fonctionnalites" style={{ padding: "88px 24px", background: "#F8F9FB" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800", marginBottom: 12 }}>
            Fonctionnalités
          </p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 4vw, 2.1rem)", fontWeight: 900, color: "#0D1525", marginBottom: 12, letterSpacing: "-0.01em" }}>
            Tout pour se déplacer à Tana
          </h2>
          <p style={{ textAlign: "center", color: "#64748B", fontSize: "0.9rem", maxWidth: 480, margin: "0 auto 52px", lineHeight: 1.7 }}>
            Recherche disponible sur le web. Toutes les fonctionnalités sont accessibles aux membres dans l&apos;application.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {[
              {
                title: "Par numéro de ligne",
                desc: "Entrez le numéro et obtenez tous les arrêts, le trajet complet et les terminus.",
                appOnly: false,
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>,
              },
              {
                title: "Par arrêt ou quartier",
                desc: "Indiquez votre départ et votre destination — les correspondances sont calculées automatiquement.",
                appOnly: true,
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>,
              },
              {
                title: "Arrêts près de moi",
                desc: "Activez la localisation pour voir toutes les lignes disponibles autour de vous.",
                appOnly: true,
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
              },
              {
                title: "Lignes favorites",
                desc: "Sauvegardez vos lignes du quotidien pour y accéder d'un seul geste.",
                appOnly: true,
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFB800" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
              },
              {
                title: "Jeux & récompenses",
                desc: "Sudoku et quiz sur les lignes de Tana. Gagnez des lots en jouant.",
                appOnly: true,
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>,
              },
              {
                title: "Actualités & emplois",
                desc: "Restez informé des nouvelles et offres d'emploi à Antananarivo.",
                appOnly: true,
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
              },
            ].map((f) => (
              <div key={f.title} style={{
                background: "white", borderRadius: 14, padding: "24px 22px",
                border: "1px solid #E8ECF0",
                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                position: "relative",
              }}>
                {f.appOnly && (
                  <span style={{
                    position: "absolute", top: 14, right: 14,
                    background: "#0D1525", color: "#FFB800",
                    fontSize: "0.6rem", fontWeight: 800, padding: "2px 8px", borderRadius: 4,
                    letterSpacing: "0.06em",
                  }}>
                    APP
                  </span>
                )}
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: "rgba(255,184,0,0.1)",
                  border: "1.5px solid rgba(255,184,0,0.22)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 18,
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: "0.92rem", color: "#0D1525", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 28, fontSize: "0.78rem", color: "#94A3B8" }}>
            Les fonctionnalités <strong style={{ color: "#0D1525" }}>APP</strong> sont accessibles aux membres après téléchargement de l&apos;application.
          </p>
        </div>
      </section>

      {/* ── Spotlight ── */}
      <SpotlightSection />

      {/* ── Actualités ── */}
      {articles.length > 0 && (
        <section style={{ padding: "88px 24px", background: "white" }}>
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
                <Link key={a.id} href={`/blog/${a.id}`} className="actu-card">
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
                    <p style={{ fontSize: "0.7rem", color: "#94A3B8", margin: "0 0 10px", fontWeight: 500 }}>
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
      )}

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
      <section id="comment" style={{ padding: "88px 24px", background: "#F8F9FB" }}>
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
