import { safeJsonLd } from "@/lib/sanitize";
import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";

export const revalidate = 3600;

export const metadata = {
  title: "Télécharger l'app — Gratuit sur Android",
  description: "Installez TaxiBe sur votre téléphone Android ou accédez à l'application web. Gratuit, sans publicité.",
  alternates: { canonical: "/telecharger" },
  openGraph: {
    title: "Télécharger TaxiBe — Gratuit sur Android",
    description: "Installez TaxiBe sur votre téléphone Android ou accédez à l'application web. Gratuit, sans publicité.",
    url: "/telecharger",
    images: [{ url: "/logo_taxibe.png", width: 1842, height: 1466, alt: "Télécharger TaxiBe" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "TaxiBe",
  "operatingSystem": "Android",
  "applicationCategory": "TransportationApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "MGA" },
  "description": "Application de référence pour les lignes de taxi-be à Antananarivo, Madagascar.",
  "url": "https://taxibe.mg/telecharger",
};

const FEATURES = [
  { icon: "🔍", label: "Recherche par numéro de ligne" },
  { icon: "📍", label: "Recherche par arrêt ou quartier" },
  { icon: "🛰️", label: "Localisation GPS" },
  { icon: "🔄", label: "Correspondances automatiques" },
  { icon: "⭐", label: "Lignes favorites" },
  { icon: "📶", label: "Mode hors ligne (APK)" },
];

export default function TelechargerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <Nav />

      <main style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", background: "#F8FAFC", minHeight: "100vh" }}>
        <style>{`
          .tl-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .tl-card { background: white; border-radius: 20px; border: 1px solid #E8ECF0; overflow: hidden; }
          .tl-card-head { padding: 28px 28px 20px; border-bottom: 1px solid #F1F5F9; }
          .tl-card-body { padding: 24px 28px 28px; }
          .tl-step { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 16px; }
          .tl-step:last-child { margin-bottom: 0; }
          .tl-step-num {
            width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
            background: #FFB800; color: #0D1525;
            display: flex; align-items: center; justify-content: center;
            font-weight: 900; font-size: 0.8rem;
          }
          .tl-btn-primary {
            display: flex; align-items: center; justify-content: center; gap: 10px;
            width: 100%; padding: 15px 20px; border-radius: 12px;
            background: #0D1525; color: #FFB800;
            font-weight: 800; font-size: 0.95rem; text-decoration: none;
            transition: background 0.15s; margin-bottom: 10px;
          }
          .tl-btn-primary:hover { background: #1a2a40; }
          .tl-btn-secondary {
            display: flex; align-items: center; justify-content: center; gap: 10px;
            width: 100%; padding: 15px 20px; border-radius: 12px;
            background: #FFB800; color: #0D1525;
            font-weight: 800; font-size: 0.95rem; text-decoration: none;
            transition: background 0.15s; margin-bottom: 10px;
          }
          .tl-btn-secondary:hover { background: #F5AF00; }
          .tl-badge {
            display: inline-flex; align-items: center; gap: 5px;
            padding: 4px 10px; border-radius: 6px;
            font-size: 0.7rem; font-weight: 800; letter-spacing: 0.04em;
            text-transform: uppercase;
          }
          .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
          @media (max-width: 700px) {
            .tl-grid { grid-template-columns: 1fr; }
            .feat-grid { grid-template-columns: 1fr 1fr; }
          }
          @media (max-width: 420px) {
            .feat-grid { grid-template-columns: 1fr; }
            .tl-card-head { padding: 22px 20px 16px; }
            .tl-card-body { padding: 18px 20px 22px; }
          }
        `}</style>

        {/* ── Hero ── */}
        <section style={{ background: "white", borderBottom: "1px solid #E8ECF0", padding: "52px 24px 44px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.35)",
              borderRadius: 8, padding: "5px 14px", marginBottom: 20,
            }}>
              <span style={{ fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B8860B" }}>
                100% Gratuit · Sans publicité
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 14px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Installer TaxiBe<br />sur votre téléphone
            </h1>
            <p style={{ fontSize: "0.95rem", color: "#64748B", margin: 0, lineHeight: 1.75, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
              Deux façons d&apos;accéder à l&apos;application — choisissez celle qui vous convient.
            </p>
          </div>
        </section>

        {/* ── Deux options ── */}
        <section style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px" }}>
          <div className="tl-grid">

            {/* ── Option 1 : APK ── */}
            <div className="tl-card" style={{ border: "2px solid #FFB800" }}>
              <div className="tl-card-head">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "#FFB800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="none"/>
                      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
                    </svg>
                  </div>
                  <span className="tl-badge" style={{ background: "rgba(255,184,0,0.12)", color: "#92400e", border: "1px solid rgba(255,184,0,0.3)" }}>
                    ✦ Recommandé Android
                  </span>
                </div>
                <h2 style={{ margin: "0 0 6px", fontSize: "1.2rem", fontWeight: 900, color: "#0D1525" }}>
                  Application Android
                </h2>
                <p style={{ margin: 0, fontSize: "0.82rem", color: "#64748B", lineHeight: 1.6 }}>
                  Fichier APK à installer directement. Fonctionne hors connexion, icône sur l&apos;écran d&apos;accueil.
                </p>
              </div>

              <div className="tl-card-body">
                <a href="/taxibe.apk" className="tl-btn-primary">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Télécharger l&apos;APK — Gratuit
                </a>
                <p style={{ margin: "0 0 20px", fontSize: "0.72rem", color: "#94A3B8", textAlign: "center" }}>
                  Android 6.0+ · environ 25 Mo
                </p>

                {/* Étapes */}
                <p style={{ margin: "0 0 14px", fontSize: "0.7rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8" }}>
                  Comment installer
                </p>

                <div className="tl-step">
                  <div className="tl-step-num">1</div>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "#374151", lineHeight: 1.6 }}>
                    Appuyez sur <strong>Télécharger l&apos;APK</strong> ci-dessus
                  </p>
                </div>
                <div className="tl-step">
                  <div className="tl-step-num">2</div>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "#374151", lineHeight: 1.6 }}>
                    Ouvrez le fichier depuis vos <strong>Téléchargements</strong>
                  </p>
                </div>
                <div className="tl-step">
                  <div className="tl-step-num">3</div>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "#374151", lineHeight: 1.6 }}>
                    Si demandé, autorisez l&apos;installation depuis cette source — c&apos;est normal pour les APK hors store
                  </p>
                </div>
                <div className="tl-step">
                  <div className="tl-step-num">4</div>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "#374151", lineHeight: 1.6 }}>
                    Installez — l&apos;icône <strong>TaxiBe</strong> apparaît sur votre écran d&apos;accueil
                  </p>
                </div>
              </div>
            </div>

            {/* ── Option 2 : App Web ── */}
            <div className="tl-card">
              <div className="tl-card-head">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                  </div>
                  <span className="tl-badge" style={{ background: "#F1F5F9", color: "#475569", border: "1px solid #E2E8F0" }}>
                    iOS · Android · Desktop
                  </span>
                </div>
                <h2 style={{ margin: "0 0 6px", fontSize: "1.2rem", fontWeight: 900, color: "#0D1525" }}>
                  Application Web
                </h2>
                <p style={{ margin: 0, fontSize: "0.82rem", color: "#64748B", lineHeight: 1.6 }}>
                  Aucune installation requise. Ouvrez directement dans votre navigateur, sur n&apos;importe quel appareil.
                </p>
              </div>

              <div className="tl-card-body">
                <a href="https://app.taxibe.mg" className="tl-btn-secondary">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Ouvrir app.taxibe.mg
                </a>
                <p style={{ margin: "0 0 20px", fontSize: "0.72rem", color: "#94A3B8", textAlign: "center" }}>
                  Fonctionne sur iPhone, Android, et ordinateur
                </p>

                {/* Étapes */}
                <p style={{ margin: "0 0 14px", fontSize: "0.7rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8" }}>
                  Ajouter à l&apos;écran d&apos;accueil (optionnel)
                </p>

                <div className="tl-step">
                  <div className="tl-step-num" style={{ background: "#F1F5F9", color: "#0D1525" }}>1</div>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "#374151", lineHeight: 1.6 }}>
                    Ouvrez <strong>app.taxibe.mg</strong> dans votre navigateur
                  </p>
                </div>
                <div className="tl-step">
                  <div className="tl-step-num" style={{ background: "#F1F5F9", color: "#0D1525" }}>2</div>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "#374151", lineHeight: 1.6 }}>
                    <strong>Android Chrome</strong> : appuyez sur ⋮ → &quot;Ajouter à l&apos;écran d&apos;accueil&quot;<br />
                    <strong>iPhone Safari</strong> : appuyez sur <span style={{ fontSize: "0.9rem" }}>⎙</span> → &quot;Sur l&apos;écran d&apos;accueil&quot;
                  </p>
                </div>
                <div className="tl-step">
                  <div className="tl-step-num" style={{ background: "#F1F5F9", color: "#0D1525" }}>3</div>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "#374151", lineHeight: 1.6 }}>
                    L&apos;icône TaxiBe apparaît sur votre écran d&apos;accueil — comme une app normale
                  </p>
                </div>

                {/* Note iOS */}
                <div style={{ marginTop: 20, padding: "12px 14px", background: "#F8FAFC", borderRadius: 10, border: "1px solid #E8ECF0" }}>
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748B", lineHeight: 1.6 }}>
                    <strong style={{ color: "#0D1525" }}>Note :</strong> Sur iPhone, l&apos;app web est la seule option disponible. Le mode hors ligne est limité sur iOS.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Comparaison ── */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #E8ECF0", overflow: "hidden", marginTop: 20 }}>
            <div style={{ padding: "18px 24px", borderBottom: "1px solid #F1F5F9" }}>
              <p style={{ margin: 0, fontSize: "0.7rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8" }}>
                Comparaison rapide
              </p>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                <thead>
                  <tr style={{ background: "#F8FAFC" }}>
                    <th style={{ padding: "10px 24px", textAlign: "left", fontWeight: 700, color: "#64748B", width: "40%" }}></th>
                    <th style={{ padding: "10px 16px", textAlign: "center", fontWeight: 800, color: "#0D1525" }}>APK Android</th>
                    <th style={{ padding: "10px 16px", textAlign: "center", fontWeight: 800, color: "#0D1525" }}>App Web</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Fonctionne sur Android", "✅", "✅"],
                    ["Fonctionne sur iPhone", "❌", "✅"],
                    ["Mode hors ligne complet", "✅", "Partiel"],
                    ["Installation requise", "Oui (APK)", "Non"],
                    ["Toutes les fonctionnalités", "✅", "✅"],
                    ["Mises à jour automatiques", "✅", "✅"],
                  ].map(([label, apk, web], i) => (
                    <tr key={i} style={{ borderTop: "1px solid #F1F5F9" }}>
                      <td style={{ padding: "11px 24px", color: "#374151", fontWeight: 500 }}>{label}</td>
                      <td style={{ padding: "11px 16px", textAlign: "center", fontWeight: 600, color: "#0D1525" }}>{apk}</td>
                      <td style={{ padding: "11px 16px", textAlign: "center", fontWeight: 600, color: "#0D1525" }}>{web}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Fonctionnalités ── */}
        <section style={{ padding: "48px 24px 64px", background: "white", borderTop: "1px solid #E8ECF0" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: "clamp(1.2rem, 3vw, 1.7rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 8px", letterSpacing: "-0.01em" }}>
                Tout est dans l&apos;application
              </h2>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "#64748B" }}>
                Disponible pour tous les membres — inscription gratuite.
              </p>
            </div>
            <div className="feat-grid">
              {FEATURES.map(({ icon, label }) => (
                <div key={label} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: "#F8FAFC", borderRadius: 12, padding: "14px 16px",
                  border: "1px solid #E8ECF0",
                }}>
                  <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{icon}</span>
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
