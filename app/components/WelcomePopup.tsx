"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "txb_welcome_seen_v1";

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  function close() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9997,
        background: "rgba(13,21,37,0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
        animation: "fadeIn 0.3s ease",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <style>{`@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes popIn { from { transform:scale(0.92) translateY(16px); opacity:0 } to { transform:scale(1) translateY(0); opacity:1 } }`}
      </style>
      <div style={{
        background: "white", borderRadius: 24,
        width: "100%", maxWidth: 460, padding: 36,
        boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
        animation: "popIn 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* Logo/icône */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{
            width: 68, height: 68, borderRadius: 22,
            background: "linear-gradient(135deg, #FFD000 0%, #FFB800 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 28px rgba(255,184,0,0.4)",
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
        </div>

        <h2 style={{ margin: "0 0 12px", textAlign: "center", fontSize: "1.25rem", fontWeight: 900, color: "#0D1525", lineHeight: 1.3 }}>
          Bienvenue sur TaxiBe 🎉
        </h2>

        <p style={{ margin: "0 0 12px", fontSize: "0.9rem", color: "#334155", lineHeight: 1.75, textAlign: "center" }}>
          TaxiBe est un projet <strong>100% gratuit</strong>, conçu avec cœur pour vous aider à retrouver facilement votre ligne de taxi-be à Antananarivo.
        </p>

        <div style={{
          background: "#FFF8E1", borderRadius: 14, padding: "14px 18px",
          margin: "16px 0 14px", borderLeft: "4px solid #FFB800",
        }}>
          <p style={{ margin: 0, fontSize: "0.84rem", color: "#78350F", lineHeight: 1.7 }}>
            ⚠️ Nos informations sont en cours de consolidation — il peut y avoir des imprécisions. Un bouton <strong>« Signaler une erreur »</strong> est disponible en haut de chaque page pour nous aider à les corriger.
          </p>
        </div>

        <p style={{ margin: "0 0 24px", fontSize: "0.84rem", color: "#64748B", lineHeight: 1.7, textAlign: "center" }}>
          Chaque signalement compte. Merci de contribuer à améliorer les transports à Tana. 🙏
        </p>

        <button
          onClick={close}
          style={{
            width: "100%", padding: "15px", borderRadius: 14, border: "none",
            background: "#0D1525", color: "white",
            fontWeight: 800, fontSize: "0.97rem", cursor: "pointer",
            fontFamily: "inherit",
            boxShadow: "0 4px 18px rgba(13,21,37,0.25)",
          }}
        >
          Je comprends, allons-y ! 🚌
        </button>
      </div>
    </div>
  );
}
