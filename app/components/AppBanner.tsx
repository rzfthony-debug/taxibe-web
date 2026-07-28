"use client";

import { useEffect, useState } from "react";

export default function AppBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("app_banner_dismissed");
    if (dismissed) return;

    const isMobile = /android|iphone|ipad|mobile/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

    if (isMobile && !isStandalone) {
      setVisible(true);
      document.body.style.setProperty("--app-banner-h", "76px");
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("app_banner_dismissed", "1");
    setVisible(false);
    document.body.style.setProperty("--app-banner-h", "0px");
  };

  if (!visible) return null;

  const isAndroid = /android/i.test(typeof navigator !== "undefined" ? navigator.userAgent : "");

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
      background: "#0D1525",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      padding: "14px 16px",
      display: "flex", alignItems: "center", gap: 12,
      boxShadow: "0 -4px 24px rgba(0,0,0,0.25)",
    }}>
      {/* Icône */}
      <div style={{
        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
        background: "#FFB800",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
      </div>

      {/* Texte */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 800, fontSize: "0.82rem", color: "white", lineHeight: 1.3 }}>
          Toutes les fonctionnalités dans l&apos;app
        </p>
        <p style={{ margin: "2px 0 0", fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>
          GPS · favoris · correspondances · hors ligne
        </p>
      </div>

      {/* Bouton principal */}
      {isAndroid ? (
        <a
          href="/telecharger"
          style={{
            flexShrink: 0, padding: "9px 14px", borderRadius: 9,
            background: "#FFB800", color: "#0D1525",
            fontWeight: 800, fontSize: "0.78rem", textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Installer
        </a>
      ) : (
        <a
          href="https://app.taxibe.mg"
          style={{
            flexShrink: 0, padding: "9px 14px", borderRadius: 9,
            background: "#FFB800", color: "#0D1525",
            fontWeight: 800, fontSize: "0.78rem", textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Ouvrir l&apos;app
        </a>
      )}

      {/* Fermer */}
      <button
        onClick={dismiss}
        style={{
          flexShrink: 0, background: "none", border: "none", cursor: "pointer",
          color: "rgba(255,255,255,0.4)", padding: 4,
        }}
        aria-label="Fermer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
}
