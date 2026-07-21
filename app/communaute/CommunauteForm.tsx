"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { submitMessage } from "@/app/actions";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px", borderRadius: 9,
  border: "1.5px solid #E2E8F0", fontSize: "0.875rem",
  outline: "none", color: "#0D1525", fontFamily: "inherit", boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#64748B",
  textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 7,
};

const TYPES = [
  {
    value: "erreur",
    label: "Signaler une erreur de ligne",
    desc: "Un arrêt, un trajet ou une correspondance qui a changé",
    sujetLabel: "Numéro de ligne concernée",
    sujetPlaceholder: "Ex : 137, 188, 43…",
    messageLabel: "Décrivez l'erreur",
    messagePlaceholder: "Quel arrêt a changé ? Quel trajet est incorrect ?",
    submitLabel: "Envoyer le signalement",
  },
  {
    value: "contribution",
    label: "Devenir contributeur",
    desc: "Aidez à vérifier ou documenter des lignes de votre quartier",
    sujetLabel: "Quartier ou zone que vous connaissez bien",
    sujetPlaceholder: "Ex : Analakely, 67Ha, Ankorondrano…",
    messageLabel: "Présentez-vous",
    messagePlaceholder: "Dites-nous quelles lignes vous connaissez et comment vous aimeriez contribuer…",
    submitLabel: "Envoyer ma candidature",
  },
  {
    value: "contact",
    label: "Autre demande",
    desc: "Une idée, une remarque ou une question générale",
    sujetLabel: "Sujet",
    sujetPlaceholder: "En quelques mots…",
    messageLabel: "Votre message",
    messagePlaceholder: "Décrivez votre demande…",
    submitLabel: "Envoyer",
  },
] as const;

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
        opacity: pending ? 0.65 : 1, width: "100%",
      }}
    >
      {pending ? "Envoi en cours…" : label}
    </button>
  );
}

export default function CommunauteForm({ status }: { status?: string }) {
  const [selected, setSelected] = useState(0);
  const type = TYPES[selected];

  if (status === "envoye") {
    return (
      <div style={{
        background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 14,
        padding: "48px 32px", textAlign: "center",
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%", background: "#22C55E",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p style={{ margin: "0 0 6px", fontWeight: 800, fontSize: "1rem", color: "#0D1525" }}>
          Message bien reçu
        </p>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#166534", lineHeight: 1.6 }}>
          Merci, notre équipe le lit et revient vers vous par email dans les meilleurs délais.
        </p>
      </div>
    );
  }

  return (
    <form action={submitMessage} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <input type="hidden" name="categorie" value={type.value} />
      <input type="hidden" name="redirect_to" value="/communaute" />
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

      {/* Type de demande */}
      <div>
        <label style={labelStyle}>Type de demande</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {TYPES.map((t, i) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setSelected(i)}
              style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                padding: "12px 14px", borderRadius: 10, border: "none",
                background: selected === i ? "#FFFBEB" : "#F8F9FB",
                cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                outline: selected === i ? "2px solid #FFB800" : "2px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <div style={{
                width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                border: `2px solid ${selected === i ? "#FFB800" : "#CBD5E0"}`,
                background: selected === i ? "#FFB800" : "white",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {selected === i && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0D1525" }} />}
              </div>
              <div>
                <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: "0.86rem", color: "#0D1525" }}>
                  {t.label}
                </p>
                <p style={{ margin: 0, fontSize: "0.76rem", color: "#94A3B8" }}>
                  {t.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Nom + Téléphone */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
        <div>
          <label style={labelStyle}>Nom complet</label>
          <input name="nom" type="text" required placeholder="Votre nom" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Téléphone</label>
          <input name="telephone" type="text" placeholder="034 xx xxx xx" style={inputStyle} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Email</label>
        <input name="email" type="email" required placeholder="vous@exemple.com" style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle}>{type.sujetLabel}</label>
        <input name="sujet" type="text" placeholder={type.sujetPlaceholder} style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle}>{type.messageLabel}</label>
        <textarea
          name="message" required rows={4} placeholder={type.messagePlaceholder}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
        />
      </div>

      <SubmitButton label={type.submitLabel} />
    </form>
  );
}
