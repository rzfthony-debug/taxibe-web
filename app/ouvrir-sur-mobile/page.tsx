import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ouvrir sur mobile — TaxiBe",
  description: "TaxiBe est une application mobile. Scannez le QR code ou envoyez le lien à votre téléphone pour accéder à toutes les fonctionnalités.",
  robots: { index: false, follow: false },
};

export default function OuvrirSurMobilePage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#0D1525",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      fontFamily: "var(--font-inter, Inter, system-ui, sans-serif)",
    }}>
      {/* Logo / Brand */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(255,184,0,0.1)",
          border: "1px solid rgba(255,184,0,0.2)",
          borderRadius: 14,
          padding: "10px 18px",
          marginBottom: 24,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2"/>
            <line x1="12" y1="18" x2="12.01" y2="18"/>
          </svg>
          <span style={{ color: "#FFB800", fontWeight: 800, fontSize: "0.85rem", letterSpacing: "0.05em" }}>
            APP MOBILE
          </span>
        </div>

        {/* Desktop icon */}
        <div style={{
          width: 72, height: 72,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 20,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <path d="M8 21h8M12 17v4"/>
          </svg>
        </div>

        <h1 style={{
          color: "white",
          fontSize: "clamp(1.4rem, 4vw, 2rem)",
          fontWeight: 900,
          margin: "0 0 10px",
          lineHeight: 1.2,
          textAlign: "center",
        }}>
          Vous êtes sur ordinateur
        </h1>
        <p style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: "1rem",
          margin: 0,
          lineHeight: 1.6,
          maxWidth: 420,
          textAlign: "center",
        }}>
          TaxiBe est optimisée pour mobile — GPS, hors ligne et toutes les fonctionnalités ne sont disponibles que sur téléphone.
        </p>
      </div>

      {/* QR Code + instruction */}
      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        padding: "32px 32px 24px",
        maxWidth: 440,
        width: "100%",
        marginBottom: 24,
        textAlign: "center",
      }}>
        <p style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: "0.82rem",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 20,
        }}>
          Scannez avec votre téléphone
        </p>

        {/* QR Code */}
        <div style={{
          background: "white",
          borderRadius: 16,
          padding: 16,
          display: "inline-block",
          marginBottom: 20,
          boxShadow: "0 0 0 4px rgba(255,184,0,0.15)",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Fapp.taxibe.mg&color=0D1525&bgcolor=FFFFFF&qzone=1&format=png"
            alt="QR code pour ouvrir app.taxibe.mg sur mobile"
            width={180}
            height={180}
            style={{ display: "block", borderRadius: 8 }}
          />
        </div>

        {/* Link */}
        <div style={{
          background: "rgba(255,255,255,0.06)",
          borderRadius: 10,
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginBottom: 4,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <span style={{ color: "#FFB800", fontWeight: 700, fontSize: "0.9rem", fontFamily: "monospace" }}>
            app.taxibe.mg
          </span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", margin: 0 }}>
          Tapez ce lien dans le navigateur de votre téléphone
        </p>
      </div>

      {/* Deux options */}
      <div style={{ maxWidth: 440, width: "100%", marginBottom: 32 }}>
        <p style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "0.78rem",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: 12,
        }}>
          Choisissez votre méthode
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {/* Option APK */}
          <div style={{
            background: "rgba(255,184,0,0.06)",
            border: "1px solid rgba(255,184,0,0.25)",
            borderRadius: 16,
            padding: "20px 16px",
          }}>
            <div style={{
              width: 40, height: 40,
              background: "rgba(255,184,0,0.12)",
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 12,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <p style={{ color: "#FFB800", fontWeight: 800, fontSize: "0.85rem", margin: "0 0 4px" }}>
              APK Android
            </p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", margin: "0 0 12px", lineHeight: 1.4 }}>
              Recommandé · accès hors ligne · GPS
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {["1. Ouvrez le lien sur mobile", "2. Téléchargez l'APK", "3. Installez l'application"].map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                  <span style={{
                    color: "#FFB800", fontWeight: 800, fontSize: "0.65rem",
                    minWidth: 14, marginTop: 1,
                  }}>{i + 1}.</span>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.68rem", lineHeight: 1.4 }}>
                    {step.replace(/^\d+\. /, "")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Option App Web */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: "20px 16px",
          }}>
            <div style={{
              width: 40, height: 40,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 12,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            </div>
            <p style={{ color: "rgba(255,255,255,0.85)", fontWeight: 800, fontSize: "0.85rem", margin: "0 0 4px" }}>
              App Web
            </p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", margin: "0 0 12px", lineHeight: 1.4 }}>
              iOS & Android · sans téléchargement
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {["Ouvrez le lien sur mobile", "Ajoutez à l'écran d'accueil", "Lancez comme une app"].map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                  <span style={{
                    color: "rgba(255,255,255,0.3)", fontWeight: 800, fontSize: "0.65rem",
                    minWidth: 14, marginTop: 1,
                  }}>{i + 1}.</span>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.68rem", lineHeight: 1.4 }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <Link
        href="/"
        style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: "0.82rem",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: 6,
          transition: "color 0.2s",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Continuer sur le site web
      </Link>
    </main>
  );
}
