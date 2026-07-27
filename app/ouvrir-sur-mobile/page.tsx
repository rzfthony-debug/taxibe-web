import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ouvrir sur mobile — TaxiBe",
  description: "TaxiBe est conçue pour mobile. Scannez le QR code ou envoyez le lien à votre téléphone.",
  robots: { index: false, follow: false },
};

export default function OuvrirSurMobilePage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#F8FAFC",
      fontFamily: "var(--font-inter, Inter, system-ui, sans-serif)",
    }}>
      {/* Header */}
      <header style={{
        borderBottom: "1px solid #E2E8F0",
        background: "white",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 900, fontSize: "1.1rem", color: "#0D1525" }}>
            Taxi<span style={{ color: "#FFB800" }}>Be</span>
          </span>
        </Link>
        <Link href="/" style={{
          fontSize: "0.82rem", color: "#64748B", textDecoration: "none",
          display: "flex", alignItems: "center", gap: 5,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Retour au site
        </Link>
      </header>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "48px 24px" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            width: 64, height: 64,
            background: "#FEF3C7",
            borderRadius: 18,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
            border: "1px solid #FDE68A",
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <path d="M8 21h8M12 17v4"/>
            </svg>
          </div>

          <h1 style={{
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: 900,
            color: "#0D1525",
            margin: "0 0 12px",
            lineHeight: 1.2,
          }}>
            Vous êtes sur ordinateur
          </h1>
          <p style={{
            color: "#64748B",
            fontSize: "1rem",
            lineHeight: 1.7,
            margin: 0,
            maxWidth: 400,
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            TaxiBe est optimisée pour mobile — GPS, accès hors ligne et toutes les fonctionnalités nécessitent un téléphone.
          </p>
        </div>

        {/* QR Card */}
        <div style={{
          background: "white",
          border: "1px solid #E2E8F0",
          borderRadius: 20,
          padding: "32px",
          marginBottom: 24,
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}>
          <p style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#94A3B8",
            marginBottom: 20,
          }}>
            Scannez avec votre téléphone
          </p>

          <div style={{
            background: "white",
            border: "2px solid #FFB800",
            borderRadius: 16,
            padding: 12,
            display: "inline-block",
            marginBottom: 20,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Fapp.taxibe.mg&color=0D1525&bgcolor=FFFFFF&qzone=1&format=png"
              alt="QR code — app.taxibe.mg"
              width={180}
              height={180}
              style={{ display: "block", borderRadius: 8 }}
            />
          </div>

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: 10,
            padding: "10px 18px",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0D1525", fontFamily: "monospace" }}>
              app.taxibe.mg
            </span>
          </div>
          <p style={{ color: "#94A3B8", fontSize: "0.72rem", margin: "8px 0 0" }}>
            Tapez ce lien dans le navigateur de votre téléphone
          </p>
        </div>

        {/* Deux options */}
        <p style={{
          fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em",
          textTransform: "uppercase", color: "#94A3B8",
          textAlign: "center", marginBottom: 12,
        }}>
          Choisissez votre méthode d'accès
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
          {/* APK */}
          <div style={{
            background: "white",
            border: "2px solid #FFB800",
            borderRadius: 16,
            padding: "20px 16px",
            boxShadow: "0 2px 8px rgba(255,184,0,0.08)",
          }}>
            <div style={{
              width: 40, height: 40,
              background: "#FEF3C7",
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 12,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <p style={{ color: "#0D1525", fontWeight: 800, fontSize: "0.85rem", margin: "0 0 3px" }}>APK Android</p>
            <p style={{ color: "#F59E0B", fontWeight: 700, fontSize: "0.68rem", margin: "0 0 12px" }}>Recommandé</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {["Ouvrez le lien sur mobile", "Téléchargez l'APK", "Installez et lancez"].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{
                    minWidth: 20, height: 20, borderRadius: "50%",
                    background: "#FFB800", color: "#0D1525",
                    fontSize: "0.65rem", fontWeight: 900,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 1,
                  }}>{i + 1}</span>
                  <span style={{ fontSize: "0.75rem", color: "#374151", lineHeight: 1.5 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* App Web */}
          <div style={{
            background: "white",
            border: "1px solid #E2E8F0",
            borderRadius: 16,
            padding: "20px 16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}>
            <div style={{
              width: 40, height: 40,
              background: "#F1F5F9",
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 12,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            </div>
            <p style={{ color: "#0D1525", fontWeight: 800, fontSize: "0.85rem", margin: "0 0 3px" }}>App Web</p>
            <p style={{ color: "#64748B", fontSize: "0.68rem", margin: "0 0 12px" }}>iOS & Android</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {["Ouvrez le lien sur mobile", "Ajoutez à l'écran d'accueil", "Lancez comme une app"].map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{
                    minWidth: 20, height: 20, borderRadius: "50%",
                    background: "#F1F5F9", color: "#0D1525",
                    fontSize: "0.65rem", fontWeight: 900,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 1,
                  }}>{i + 1}</span>
                  <span style={{ fontSize: "0.75rem", color: "#374151", lineHeight: 1.5 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div style={{
          textAlign: "center",
          paddingTop: 24,
          borderTop: "1px solid #E2E8F0",
        }}>
          <Link href="/telecharger" style={{
            fontSize: "0.82rem", color: "#64748B", textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 6,
          }}>
            En savoir plus sur les options de téléchargement →
          </Link>
        </div>
      </div>
    </main>
  );
}
