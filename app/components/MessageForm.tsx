"use client";

import type { CSSProperties } from "react";
import { useFormStatus } from "react-dom";
import { submitMessage, type MessageCategorie } from "@/app/actions";

const inputStyle: CSSProperties = {
  width: "100%", padding: "11px 14px", borderRadius: 9,
  border: "1.5px solid #E2E8F0", fontSize: "0.875rem",
  outline: "none", color: "#0D1525", fontFamily: "inherit", boxSizing: "border-box",
};

const labelStyle: CSSProperties = {
  display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#64748B",
  textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 7,
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding: "13px", borderRadius: 10, border: "none",
        background: "#FFB800", color: "#0D1525",
        fontWeight: 800, fontSize: "0.9375rem", cursor: pending ? "default" : "pointer",
        fontFamily: "inherit", letterSpacing: "-0.01em",
        opacity: pending ? 0.65 : 1,
      }}
    >
      {pending ? "Envoi en cours…" : label}
    </button>
  );
}

export default function MessageForm({
  categorie,
  redirectTo,
  sujetLabel = "Sujet",
  sujetPlaceholder = "En quelques mots",
  showSujet = true,
  showLigneNumero = false,
  messageLabel = "Votre message",
  messagePlaceholder = "Decrivez votre demande le plus precisement possible…",
  submitLabel = "Envoyer",
  status,
}: {
  categorie: MessageCategorie;
  redirectTo: string;
  sujetLabel?: string;
  sujetPlaceholder?: string;
  showSujet?: boolean;
  showLigneNumero?: boolean;
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  status?: string;
}) {
  if (status === "envoye") {
    return (
      <div style={{
        background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 14,
        padding: "40px 32px", textAlign: "center",
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%", background: "#22C55E",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p style={{ margin: "0 0 6px", fontWeight: 800, fontSize: "1rem", color: "#0D1525" }}>
          Message bien reçu
        </p>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#166534", lineHeight: 1.6 }}>
          Merci, notre equipe le lit et revient vers vous par email dans les meilleurs delais.
        </p>
      </div>
    );
  }

  return (
    <form action={submitMessage} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <input type="hidden" name="categorie" value={categorie} />
      <input type="hidden" name="redirect_to" value={redirectTo} />
      {/* Piege a robots — laisse vide, masque visuellement */}
      <input
        type="text" name="site_web" tabIndex={-1} autoComplete="off"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        aria-hidden="true"
      />

      {status === "erreur" && (
        <div style={{
          background: "#FEF2F2", color: "#DC2626", borderRadius: 8,
          padding: "11px 14px", fontSize: "0.83rem", fontWeight: 600,
        }}>
          Merci de renseigner votre nom, votre email et votre message avant d&apos;envoyer.
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
        <div>
          <label style={labelStyle}>Nom complet</label>
          <input name="nom" type="text" required placeholder="Votre nom" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Telephone</label>
          <input name="telephone" type="text" placeholder="034 xx xxx xx" style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Email</label>
        <input name="email" type="email" required placeholder="vous@exemple.com" style={inputStyle} />
      </div>

      {showLigneNumero && (
        <div>
          <label style={labelStyle}>Numero de ligne concernee</label>
          <input name="ligne_numero" type="text" placeholder="Ex : 147" style={inputStyle} />
        </div>
      )}

      {showSujet && (
        <div>
          <label style={labelStyle}>{sujetLabel}</label>
          <input name="sujet" type="text" placeholder={sujetPlaceholder} style={inputStyle} />
        </div>
      )}

      <div>
        <label style={labelStyle}>{messageLabel}</label>
        <textarea
          name="message" required rows={5} placeholder={messagePlaceholder}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
        />
      </div>

      <SubmitButton label={submitLabel} />
    </form>
  );
}
