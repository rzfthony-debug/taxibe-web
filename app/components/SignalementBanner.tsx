"use client";

import { useState, useEffect } from "react";
import { submitSignalement } from "@/app/actions-signalement";

type Status = "idle" | "sending" | "done" | "error";

const DISMISS_KEY = "txb:signalement-banner-dismissed";

export default function SignalementBanner() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [ligne, setLigne] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    try { setDismissed(sessionStorage.getItem(DISMISS_KEY) === "true"); } catch { setDismissed(false); }
  }, []);

  function dismiss() {
    setDismissed(true);
    try { sessionStorage.setItem(DISMISS_KEY, "true"); } catch {}
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    setStatus("sending");
    const res = await submitSignalement({ ligne, type_erreur: type, description, contact, source: "web" });
    setStatus(res.ok ? "done" : "error");
  }

  function reset() {
    setOpen(false);
    setLigne(""); setType(""); setDescription(""); setContact("");
    setTimeout(() => setStatus("idle"), 300);
  }

  return (
    <>
      {/* Bannière */}
      {!dismissed && (
        <div style={{
          background: "#FFFBEB",
          borderBottom: "1px solid #FDE68A",
          padding: "7px 36px 7px 16px",
          position: "relative",
        }}>
          <style>{`
            .signalement-row { display: flex; align-items: center; justify-content: center; flex-wrap: nowrap; gap: 12px; max-width: 100%; }
            .signalement-text { font-size: 0.78rem; color: #78350F; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
            .signalement-text .signalement-text-full { display: inline; }
            .signalement-text .signalement-text-short { display: none; }
            @media (max-width: 640px) {
              .signalement-text .signalement-text-full { display: none; }
              .signalement-text .signalement-text-short { display: inline; }
            }
          `}</style>
          <div className="signalement-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span className="signalement-text">
              <span className="signalement-text-full">Données en cours de consolidation — vos signalements nous aident à améliorer les informations</span>
              <span className="signalement-text-short">Données en cours de consolidation</span>
            </span>
            <button
              onClick={() => setOpen(true)}
              style={{
                background: "#FFB800", border: "none", borderRadius: 20,
                padding: "5px 12px", fontSize: "0.7rem", fontWeight: 800,
                color: "#0D1525", cursor: "pointer", flexShrink: 0,
                fontFamily: "inherit", whiteSpace: "nowrap",
              }}
            >
              Signaler
            </button>
          </div>
          <button
            onClick={dismiss}
            aria-label="Masquer ce message"
            style={{
              position: "absolute", top: "50%", right: 10, transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer",
              color: "#B45309", padding: 6, display: "flex",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      )}

      {/* Overlay modal */}
      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) reset(); }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(13,21,37,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20,
          }}
        >
          <div style={{
            background: "white", borderRadius: 18,
            width: "100%", maxWidth: 480,
            padding: 28,
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          }}>
            {status === "done" ? (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#FFF8E1", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <p style={{ margin: "0 0 8px", fontWeight: 800, fontSize: "1rem", color: "#0D1525" }}>Merci pour votre signalement !</p>
                <p style={{ margin: "0 0 24px", fontSize: "0.85rem", color: "#64748B", lineHeight: 1.55 }}>Votre retour nous aide à consolider les données des lignes.</p>
                <button onClick={reset} style={{ background: "#FFB800", border: "none", borderRadius: 10, padding: "11px 32px", fontWeight: 800, fontSize: "0.88rem", color: "#0D1525", cursor: "pointer", fontFamily: "inherit" }}>
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "#0D1525" }}>Signaler une erreur</h2>
                  <button type="button" onClick={reset} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#94A3B8", padding: 4 }}>✕</button>
                </div>
                <p style={{ margin: "0 0 18px", fontSize: "0.8rem", color: "#64748B", lineHeight: 1.55 }}>
                  Les données sont en phase de validation. Votre signalement nous aidera à les corriger rapidement.
                </p>

                <label style={labelStyle}>Numéro de ligne <span style={{ color: "#CBD5E0", fontWeight: 400 }}>(optionnel)</span></label>
                <input value={ligne} onChange={e => setLigne(e.target.value)} placeholder="Ex: 147, 36B…" style={inputStyle} />

                <label style={labelStyle}>Type d&apos;erreur</label>
                <select value={type} onChange={e => setType(e.target.value)} style={inputStyle}>
                  <option value="">Sélectionner…</option>
                  <option value="terminus">Terminus incorrect</option>
                  <option value="arret">Arrêt manquant ou incorrect</option>
                  <option value="inexistante">Ligne inexistante</option>
                  <option value="trajet">Trajet ou itinéraire incorrect</option>
                  <option value="autre">Autre</option>
                </select>

                <label style={labelStyle}>Description <span style={{ color: "#ef4444" }}>*</span></label>
                <textarea
                  value={description} onChange={e => setDescription(e.target.value)}
                  placeholder="Décrivez l'erreur constatée…"
                  required rows={3}
                  style={{ ...inputStyle, resize: "none", lineHeight: 1.5 }}
                />

                <label style={labelStyle}>Contact <span style={{ color: "#CBD5E0", fontWeight: 400 }}>(optionnel — pour qu&apos;on vous réponde)</span></label>
                <input value={contact} onChange={e => setContact(e.target.value)} placeholder="Téléphone ou email" style={inputStyle} />

                {status === "error" && (
                  <p style={{ margin: "8px 0 0", fontSize: "0.75rem", color: "#ef4444" }}>Une erreur est survenue, veuillez réessayer.</p>
                )}

                <button
                  type="submit" disabled={status === "sending" || !description.trim()}
                  style={{
                    width: "100%", marginTop: 18, padding: "13px", borderRadius: 12, border: "none",
                    background: description.trim() ? "#FFB800" : "#F1F5F9",
                    color: description.trim() ? "#0D1525" : "#CBD5E0",
                    fontWeight: 800, fontSize: "0.9rem", cursor: description.trim() ? "pointer" : "default",
                    fontFamily: "inherit", transition: "background 0.15s",
                  }}
                >
                  {status === "sending" ? "Envoi en cours…" : "Envoyer le signalement"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.72rem", fontWeight: 700,
  color: "#475569", marginBottom: 5, marginTop: 14,
  textTransform: "uppercase", letterSpacing: "0.04em",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 12px", borderRadius: 9,
  border: "1.5px solid #E2E8F0", fontSize: "0.84rem",
  fontFamily: "inherit", color: "#0D1525", outline: "none",
  boxSizing: "border-box", background: "white",
};
