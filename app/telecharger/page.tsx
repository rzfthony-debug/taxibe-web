import Image from "next/image";
import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import { supabase } from "@/lib/supabase";
import HeroIllustration from "@/app/components/HeroIllustration";

export const revalidate = 0;

export const metadata = {
  title: "Télécharger TaxiBe — Gratuit sur Android",
  description: "Téléchargez TaxiBe sur Android. Gratuit, accès à toutes les fonctionnalités pour les membres.",
};

async function getHeroImageUrl(): Promise<string | null> {
  const { data } = await supabase
    .from("parametres")
    .select("valeur")
    .eq("cle", "telecharger_hero_image_url")
    .single();
  return data?.valeur ?? null;
}

async function getApercuImage(): Promise<string | null> {
  const { data } = await supabase
    .from("parametres")
    .select("valeur")
    .eq("cle", "telecharger_apercu_image")
    .single();
  return data?.valeur ?? null;
}

export default async function TelechargerPage() {
  const [heroImageUrl, apercuImageUrl] = await Promise.all([getHeroImageUrl(), getApercuImage()]);

  return (
    <>
    <Nav />
    <main style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>

      <style>{`
        .page-hero-inner { max-width: 1280px; margin: 0 auto; padding: 64px 40px; display: grid; grid-template-columns: 1fr 1.4fr; gap: 24px; align-items: center; }
        .page-hero-img { display: flex; align-items: center; justify-content: center; }
        @media (max-width: 768px) { .page-hero-inner { grid-template-columns: 1fr; padding: 40px 20px; } .page-hero-img { display: none; } }
        .dl-card { background: white; border-radius: 16px; border: 1px solid #E8ECF0; box-shadow: 0 6px 32px rgba(0,0,0,0.07); display: grid; grid-template-columns: 176px 1fr; overflow: hidden; margin-bottom: 40px; }
        .dl-qr { background: #F8F9FB; border-right: 1px solid #E8ECF0; padding: 28px 18px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .dl-main { padding: 28px 32px; }
        .dl-btn { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 15px 24px; background: #0D1525; color: #FFB800; border-radius: 10px; font-weight: 800; font-size: 0.98rem; text-decoration: none; letter-spacing: -0.01em; margin-bottom: 10px; transition: background 0.15s; }
        .dl-btn:hover { background: #1a2a40; }
        .dl-meta { margin: 0 0 18px; font-size: 0.74rem; color: #94A3B8; text-align: center; }
        .dl-trust { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 22px; }
        .dl-trust-chip { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 6px; font-size: 0.71rem; font-weight: 700; color: #166534; }
        .dl-stores { border-top: 1px solid #F1F5F9; padding-top: 18px; }
        .dl-stores-label { margin: 0 0 10px; font-size: 0.67rem; font-weight: 800; color: #CBD5E1; text-transform: uppercase; letter-spacing: 0.1em; }
        @media (max-width: 640px) { .dl-card { grid-template-columns: 1fr; } .dl-qr { display: none; } .dl-main { padding: 22px 18px; } }
      `}</style>
      {/* ── Hero ── */}
      <section style={{ background: "#F8F9FB", overflow: "hidden", borderBottom: "1px solid #E8ECF0" }}>
        <div className="page-hero-inner">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.4)", borderRadius: 8, padding: "5px 12px", marginBottom: 24 }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8860B" }}>
                Disponible sur Android · 100% Gratuit
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 16px", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
              Téléchargez <span style={{ color: "#FFB800" }}>TaxiBe</span> sur votre téléphone
            </h1>
            <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: 480, margin: 0, lineHeight: 1.75 }}>
              Installez l&apos;application en quelques secondes. Gratuit — toutes les fonctionnalités accessibles aux membres.
            </p>
          </div>
          <div className="page-hero-img">
            {heroImageUrl ? (
              <Image src={heroImageUrl} alt="Télécharger TaxiBe" width={600} height={420} sizes="(max-width: 768px) 0px, 50vw" style={{ width: "100%", height: "auto", maxHeight: 420, objectFit: "contain", mixBlendMode: "multiply" }} />
            ) : (
              <HeroIllustration />
            )}
          </div>
        </div>
      </section>

      {/* ── Aperçu ── */}
      <section style={{ padding: "72px 24px", background: "#F8F9FB" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 900, color: "#0D1525", marginBottom: 48, letterSpacing: "-0.01em" }}>
            Aperçu de l&apos;application
          </h2>

          {apercuImageUrl ? (
            <Image
              src={apercuImageUrl}
              alt="Aperçu de l'application TaxiBe"
              width={820}
              height={480}
              sizes="(max-width: 860px) calc(100vw - 48px), 820px"
              style={{ width: "100%", height: "auto", display: "block", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
            />
          ) : (
            <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", alignItems: "flex-end" }}>
              {/* Placeholder Accueil */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={{ width: 160, borderRadius: 24, background: "#0D1525", padding: "10px 6px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
                  <div style={{ width: 50, height: 8, background: "#1a2a40", borderRadius: 4, margin: "0 auto 8px" }} />
                  <div style={{ background: "#F8FAFC", borderRadius: 16, minHeight: 200, overflow: "hidden", padding: "4px 0 0" }}>
                    <div style={{ background: "#0D1525", padding: "4px 10px", display: "flex", justifyContent: "space-between" }}>
                      <div style={{ height: 5, width: 20, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
                      <div style={{ height: 5, width: 28, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
                    </div>
                    <div style={{ padding: "12px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
                      <div style={{ background: "#FFB800", borderRadius: 8, padding: "10px 12px" }}>
                        <div style={{ height: 8, background: "rgba(13,21,37,0.3)", borderRadius: 4, width: "60%", marginBottom: 6 }} />
                        <div style={{ height: 22, background: "rgba(13,21,37,0.15)", borderRadius: 6 }} />
                      </div>
                      {["#1a2f55", "#0369a1", "#065f46"].map((c, i) => (
                        <div key={i} style={{ background: c, borderRadius: 8, padding: "10px 12px", display: "flex", gap: 8, alignItems: "center" }}>
                          <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(255,255,255,0.12)", flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ height: 7, background: "rgba(255,255,255,0.5)", borderRadius: 3, width: "55%", marginBottom: 4 }} />
                            <div style={{ height: 6, background: "rgba(255,255,255,0.25)", borderRadius: 3, width: "80%" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ width: 40, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 2, margin: "8px auto 0" }} />
                </div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B" }}>Accueil</span>
              </div>
              {/* Placeholder Recherche — agrandi */}
              <div style={{ transform: "scale(1.1)", transformOrigin: "bottom center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={{ width: 160, borderRadius: 24, background: "#0D1525", padding: "10px 6px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
                  <div style={{ width: 50, height: 8, background: "#1a2a40", borderRadius: 4, margin: "0 auto 8px" }} />
                  <div style={{ background: "#F8FAFC", borderRadius: 16, minHeight: 200, overflow: "hidden" }}>
                    <div style={{ background: "#0D1525", padding: "4px 10px", display: "flex", justifyContent: "space-between" }}>
                      <div style={{ height: 5, width: 20, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
                      <div style={{ height: 5, width: 28, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
                    </div>
                    <div style={{ padding: "12px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
                      {[{ dot: "#CBD5E0" }, { dot: "#22c55e" }].map((r, i) => (
                        <div key={i} style={{ background: "#F1F5F9", borderRadius: 20, padding: "9px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 12, height: 12, borderRadius: "50%", background: r.dot, flexShrink: 0 }} />
                          <div style={{ height: 7, background: "#CBD5E0", borderRadius: 3, flex: 1 }} />
                        </div>
                      ))}
                      <div style={{ background: "#FFB800", borderRadius: 20, padding: "9px 12px", textAlign: "center" }}>
                        <div style={{ height: 8, background: "rgba(13,21,37,0.3)", borderRadius: 3, width: "50%", margin: "0 auto" }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ width: 40, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 2, margin: "8px auto 0" }} />
                </div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B" }}>Recherche</span>
              </div>
              {/* Placeholder Résultat */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={{ width: 160, borderRadius: 24, background: "#0D1525", padding: "10px 6px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
                  <div style={{ width: 50, height: 8, background: "#1a2a40", borderRadius: 4, margin: "0 auto 8px" }} />
                  <div style={{ background: "#F8FAFC", borderRadius: 16, minHeight: 200, overflow: "hidden" }}>
                    <div style={{ background: "#0D1525", padding: "4px 10px", display: "flex", justifyContent: "space-between" }}>
                      <div style={{ height: 5, width: 20, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
                      <div style={{ height: 5, width: 28, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
                    </div>
                    <div style={{ padding: "10px 8px", display: "flex", flexDirection: "column", gap: 6 }}>
                      {[{ c: "#FFB800", w: "70%" }, { c: "#0D1525", w: "85%" }, { c: "#1a2f55", w: "60%" }].map((r, i) => (
                        <div key={i} style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 8, padding: "8px 10px", display: "flex", gap: 8, alignItems: "center" }}>
                          <div style={{ width: 32, height: 22, borderRadius: 5, background: r.c, flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ height: 7, background: "#E2E8F0", borderRadius: 3, width: r.w, marginBottom: 4 }} />
                            <div style={{ height: 6, background: "#F1F5F9", borderRadius: 3, width: "50%" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ width: 40, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 2, margin: "8px auto 0" }} />
                </div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B" }}>Résultat</span>
              </div>
            </div>
          )}

          <p style={{ marginTop: 40, fontSize: "0.8rem", color: "#94A3B8" }}>
            Interface rapide, simple et lisible — conçue pour Antananarivo.
          </p>
        </div>
      </section>

      {/* ── Télécharger · Installation ── */}
      <section style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 900, color: "#0D1525", marginBottom: 8, letterSpacing: "-0.01em" }}>
            Installer TaxiBe en 1 minute
          </h2>
          <p style={{ textAlign: "center", color: "#64748B", marginBottom: 40, fontSize: "0.9rem" }}>
            Téléchargement direct — Android uniquement pour l&apos;instant.
          </p>

          {/* Download card */}
          <div className="dl-card">
            {/* QR side */}
            <div className="dl-qr">
              {/* Decorative QR placeholder — remplacer par un vrai QR pointant vers /taxibe.apk quand le domaine est fixé */}
              <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="112" height="112" fill="white" rx="6"/>
                {/* Top-left finder */}
                <rect x="6" y="6" width="28" height="28" fill="#0D1525"/>
                <rect x="10" y="10" width="20" height="20" fill="white"/>
                <rect x="14" y="14" width="12" height="12" fill="#0D1525"/>
                {/* Top-right finder */}
                <rect x="78" y="6" width="28" height="28" fill="#0D1525"/>
                <rect x="82" y="10" width="20" height="20" fill="white"/>
                <rect x="86" y="14" width="12" height="12" fill="#0D1525"/>
                {/* Bottom-left finder */}
                <rect x="6" y="78" width="28" height="28" fill="#0D1525"/>
                <rect x="10" y="82" width="20" height="20" fill="white"/>
                <rect x="14" y="86" width="12" height="12" fill="#0D1525"/>
                {/* Data modules (decorative) */}
                <rect x="40" y="6" width="6" height="6" fill="#0D1525"/><rect x="50" y="6" width="6" height="6" fill="#0D1525"/>
                <rect x="62" y="6" width="6" height="6" fill="#0D1525"/><rect x="70" y="6" width="6" height="6" fill="#0D1525"/>
                <rect x="40" y="16" width="6" height="6" fill="#0D1525"/><rect x="56" y="16" width="6" height="6" fill="#0D1525"/>
                <rect x="68" y="16" width="6" height="6" fill="#0D1525"/><rect x="44" y="26" width="6" height="6" fill="#0D1525"/>
                <rect x="58" y="26" width="6" height="6" fill="#0D1525"/><rect x="72" y="26" width="6" height="6" fill="#0D1525"/>
                <rect x="6" y="40" width="6" height="6" fill="#0D1525"/><rect x="18" y="40" width="6" height="6" fill="#0D1525"/>
                <rect x="28" y="40" width="6" height="6" fill="#0D1525"/><rect x="40" y="40" width="6" height="6" fill="#0D1525"/>
                <rect x="52" y="40" width="6" height="6" fill="#0D1525"/><rect x="64" y="40" width="6" height="6" fill="#0D1525"/>
                <rect x="76" y="40" width="6" height="6" fill="#0D1525"/><rect x="88" y="40" width="6" height="6" fill="#0D1525"/>
                <rect x="100" y="40" width="6" height="6" fill="#0D1525"/><rect x="6" y="50" width="6" height="6" fill="#0D1525"/>
                <rect x="22" y="50" width="6" height="6" fill="#0D1525"/><rect x="46" y="50" width="6" height="6" fill="#0D1525"/>
                <rect x="58" y="50" width="6" height="6" fill="#0D1525"/><rect x="72" y="50" width="6" height="6" fill="#0D1525"/>
                <rect x="84" y="50" width="6" height="6" fill="#0D1525"/><rect x="96" y="50" width="6" height="6" fill="#0D1525"/>
                <rect x="10" y="60" width="6" height="6" fill="#0D1525"/><rect x="28" y="60" width="6" height="6" fill="#0D1525"/>
                <rect x="42" y="60" width="6" height="6" fill="#0D1525"/><rect x="54" y="60" width="6" height="6" fill="#0D1525"/>
                <rect x="66" y="60" width="6" height="6" fill="#0D1525"/><rect x="78" y="60" width="6" height="6" fill="#0D1525"/>
                <rect x="92" y="60" width="6" height="6" fill="#0D1525"/><rect x="100" y="60" width="6" height="6" fill="#0D1525"/>
                <rect x="40" y="78" width="6" height="6" fill="#0D1525"/><rect x="54" y="78" width="6" height="6" fill="#0D1525"/>
                <rect x="66" y="78" width="6" height="6" fill="#0D1525"/><rect x="78" y="78" width="6" height="6" fill="#0D1525"/>
                <rect x="90" y="78" width="6" height="6" fill="#0D1525"/><rect x="100" y="78" width="6" height="6" fill="#0D1525"/>
                <rect x="44" y="88" width="6" height="6" fill="#0D1525"/><rect x="58" y="88" width="6" height="6" fill="#0D1525"/>
                <rect x="70" y="88" width="6" height="6" fill="#0D1525"/><rect x="84" y="88" width="6" height="6" fill="#0D1525"/>
                <rect x="96" y="88" width="6" height="6" fill="#0D1525"/><rect x="40" y="98" width="6" height="6" fill="#0D1525"/>
                <rect x="56" y="98" width="6" height="6" fill="#0D1525"/><rect x="68" y="98" width="6" height="6" fill="#0D1525"/>
                <rect x="82" y="98" width="6" height="6" fill="#0D1525"/><rect x="100" y="98" width="6" height="6" fill="#0D1525"/>
              </svg>
              <p style={{ margin: "12px 0 0", fontSize: "0.7rem", fontWeight: 700, color: "#64748B", textAlign: "center", lineHeight: 1.5 }}>
                Scanner depuis<br/>votre téléphone
              </p>
            </div>

            {/* Main download */}
            <div className="dl-main">
              <a href="/taxibe.apk" className="dl-btn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Télécharger TaxiBe — Gratuit
              </a>
              <p className="dl-meta">v1.0 · environ 25 Mo · Android 6.0+</p>

              <div className="dl-trust">
                {["Aucun compte requis", "Sans publicité", "100% gratuit", "Aucune donnée personnelle"].map((t) => (
                  <span key={t} className="dl-trust-chip">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {t}
                  </span>
                ))}
              </div>

              <div className="dl-stores">
                <p className="dl-stores-label">Bientôt disponible sur</p>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: "#1D1B20", borderRadius: 10, padding: "9px 16px",
                  opacity: 0.38, cursor: "not-allowed", userSelect: "none",
                }}>
                  <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                    <path d="M1 1.5L11.5 12L1 22.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M1 1.5L19 11L11.5 12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M1 22.5L19 13L11.5 12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <p style={{ margin: 0, fontSize: "0.56rem", color: "rgba(255,255,255,0.75)", letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1 }}>Bientôt sur</p>
                    <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 800, color: "white", lineHeight: 1.3, fontFamily: "system-ui" }}>Google Play</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#0D1525", margin: "0 0 18px", letterSpacing: "-0.01em" }}>
            Comment installer
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              "Appuyez sur le bouton de téléchargement ci-dessus",
              "Ouvrez le fichier APK depuis vos notifications ou votre dossier Téléchargements",
              "Si demandé, autorisez l'installation depuis cette source — c'est normal pour les APK hors store",
              "Installez — l'icône TaxiBe apparaît sur votre écran d'accueil",
            ].map((text, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  background: "#FFB800", color: "#0D1525",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "0.82rem",
                }}>
                  {i + 1}
                </div>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#374151", lineHeight: 1.65, paddingTop: 5 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ce qui est inclus ── */}
      <section style={{ padding: "72px 24px", background: "#F8F9FB" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 900, color: "#0D1525", marginBottom: 8, letterSpacing: "-0.01em" }}>
            Tout est dans l&apos;application
          </h2>
          <p style={{ color: "#64748B", marginBottom: 40, fontSize: "0.9rem" }}>Toutes les fonctionnalités sont accessibles aux membres de l&apos;application.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {[
              "Recherche par numéro de ligne",
              "Recherche par arrêt ou quartier",
              "Localisation GPS",
              "Correspondances automatiques",
              "Lignes favorites",
              "Actualités & informations",
              "Offres d'emploi",
              "Jeux & récompenses",
            ].map((label) => (
              <div key={label} style={{
                background: "white", borderRadius: 10, padding: "14px 16px",
                border: "1px solid #E8ECF0", display: "flex", alignItems: "center", gap: 10,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span style={{ fontSize: "0.84rem", fontWeight: 600, color: "#0D1525" }}>{label}</span>
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
