import Image from "next/image";
import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export const metadata = {
  title: "Télécharger TaxiBe — Gratuit sur Android",
  description: "Téléchargez TaxiBe sur Android. Gratuit, accès à toutes les fonctionnalités pour les membres.",
};

async function getApercuImage(): Promise<string | null> {
  const { data } = await supabase
    .from("parametres")
    .select("valeur")
    .eq("cle", "telecharger_apercu_image")
    .single();
  return data?.valeur ?? null;
}

export default async function TelechargerPage() {
  const apercuImageUrl = await getApercuImage();

  return (
    <>
    <Nav />
    <main style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>

      <style>{`
        .page-hero-inner { max-width: 1280px; margin: 0 auto; padding: 64px 40px; display: grid; grid-template-columns: 1fr 1.4fr; gap: 24px; align-items: center; }
        .page-hero-img { display: flex; align-items: center; justify-content: center; }
        @media (max-width: 768px) { .page-hero-inner { grid-template-columns: 1fr; padding: 40px 20px; } .page-hero-img { display: none; } }
      `}</style>
      {/* ── Hero ── */}
      <section style={{ background: "#F8F9FB", overflow: "hidden", borderBottom: "1px solid #E8ECF0" }}>
        <div className="page-hero-inner">
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
              Disponible sur Android · 100% Gratuit
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              Téléchargez TaxiBe sur votre téléphone
            </h1>
            <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: 480, margin: 0, lineHeight: 1.7 }}>
              Installez l&apos;application en quelques secondes. Gratuit — toutes les fonctionnalités accessibles aux membres.
            </p>
          </div>
          <div className="page-hero-img">
            <svg viewBox="0 0 380 230" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 360 }}>
              <rect width="380" height="230" fill="#EEF2F7" rx="12"/>
              <rect y="150" width="380" height="80" fill="#D8E2EE"/>
              <rect y="165" width="380" height="4" fill="#C8D2DF"/>
              <rect x="20" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
              <rect x="65" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
              <rect x="110" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
              <rect x="155" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
              <rect x="200" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
              <rect x="245" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
              <rect x="290" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
              <rect x="335" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
              <rect x="25" y="95" width="26" height="75" rx="2" fill="#C2CDD9"/>
              <rect x="56" y="78" width="30" height="92" rx="2" fill="#B5C3D2"/>
              <rect x="91" y="105" width="22" height="65" rx="2" fill="#C2CDD9"/>
              <rect x="280" y="88" width="28" height="82" rx="2" fill="#C2CDD9"/>
              <rect x="313" y="100" width="24" height="70" rx="2" fill="#B5C3D2"/>
              <rect x="342" y="82" width="28" height="88" rx="2" fill="#BCC8D6"/>
              <rect x="150" y="142" width="72" height="30" rx="8" fill="#FFB800"/>
              <rect x="158" y="134" width="56" height="22" rx="5" fill="#FFB800"/>
              <rect x="162" y="137" width="19" height="15" rx="2" fill="#E0F0FF" opacity="0.85"/>
              <rect x="190" y="137" width="19" height="15" rx="2" fill="#E0F0FF" opacity="0.85"/>
              <circle cx="165" cy="174" r="8" fill="#1a2535"/>
              <circle cx="165" cy="174" r="4" fill="#D0DAE6"/>
              <circle cx="207" cy="174" r="8" fill="#1a2535"/>
              <circle cx="207" cy="174" r="4" fill="#D0DAE6"/>
              <circle cx="78" cy="130" r="4" fill="#FFB800" opacity="0.5"/>
              <circle cx="115" cy="124" r="3.5" fill="#FFB800" opacity="0.35"/>
              <circle cx="148" cy="120" r="4.5" fill="#FFB800"/>
              <line x1="78" y1="130" x2="148" y2="120" stroke="#FFB800" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.45"/>
              <circle cx="250" cy="105" r="14" fill="#FFB800" opacity="0.1"/>
              <path d="M250 92C244.5 92 240 96.5 240 102C240 109 250 118 250 118C250 118 260 109 260 102C260 96.5 255.5 92 250 92Z" fill="#FFB800"/>
              <circle cx="250" cy="102" r="4.5" fill="white"/>
              <ellipse cx="55" cy="30" rx="26" ry="10" fill="white" opacity="0.65"/>
              <ellipse cx="73" cy="24" rx="19" ry="8" fill="white" opacity="0.75"/>
              <ellipse cx="305" cy="26" rx="24" ry="9" fill="white" opacity="0.65"/>
              <ellipse cx="323" cy="20" rx="17" ry="7.5" fill="white" opacity="0.75"/>
            </svg>
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

      {/* ── Installation APK ── */}
      <section style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.3rem, 3vw, 1.9rem)", fontWeight: 900, color: "#0D1525", marginBottom: 8, letterSpacing: "-0.01em" }}>
            Comment installer TaxiBe
          </h2>
          <p style={{ textAlign: "center", color: "#64748B", marginBottom: 48, fontSize: "0.9rem" }}>
            En moins d&apos;une minute, sur n&apos;importe quel téléphone Android.
          </p>

          <div style={{
            background: "white", borderRadius: 16, padding: "36px 32px",
            border: "1px solid #E8ECF0", boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 36 }}>
              {[
                { n: "1", text: "Téléchargez le fichier APK en appuyant sur le bouton ci-dessous" },
                { n: "2", text: "Ouvrez le fichier téléchargé depuis vos notifications ou votre dossier Téléchargements" },
                { n: "3", text: "Si le téléphone vous le demande, autorisez l'installation depuis cette source" },
                { n: "4", text: "Installez — l'icône TaxiBe apparaît sur votre écran d'accueil" },
              ].map((s) => (
                <div key={s.n} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                    background: "#FFB800", color: "#0D1525",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 900, fontSize: "0.85rem",
                  }}>
                    {s.n}
                  </div>
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "#374151", lineHeight: 1.6, paddingTop: 5 }}>{s.text}</p>
                </div>
              ))}
            </div>

            <a href="/taxibe.apk" style={{
              display: "block", padding: "16px", borderRadius: 10, textAlign: "center",
              background: "#0D1525", color: "#FFB800",
              fontWeight: 800, fontSize: "1rem", textDecoration: "none",
              letterSpacing: "-0.01em",
            }}>
              Télécharger TaxiBe — Gratuit
            </a>
            <p style={{ textAlign: "center", margin: "12px 0 0", fontSize: "0.75rem", color: "#94A3B8" }}>
              Android 6.0 et supérieur · Aucune donnée personnelle requise
            </p>
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
