"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { submitMessage } from "@/app/actions";

const CATEGORIES = [
  {
    id: "contact",
    titre: "Une question",
    desc: "L'application, le réseau, une info générale.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    placeholder: "Décrivez votre question en quelques lignes…",
    sujet: "Question générale",
  },
  {
    id: "erreur",
    titre: "Signaler une erreur",
    desc: "Un arrêt, une ligne ou un trajet incorrect.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
        <line x1="4" y1="22" x2="4" y2="15"/>
      </svg>
    ),
    placeholder: "Numéro de ligne concernée, ce qui est incorrect, ce qui devrait être affiché…",
    sujet: "Signalement erreur",
  },
  {
    id: "partenariat",
    titre: "Collaborer",
    desc: "Partenariat, institution, projet urbain ou mobilité.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    placeholder: "Décrivez votre organisation et votre idée de collaboration…",
    sujet: "Collaboration",
  },
  {
    id: "contribution",
    titre: "Rejoindre l'équipe",
    desc: "Développeur, designer, connaisseur du terrain.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    placeholder: "Décrivez vos compétences et comment vous souhaitez contribuer…",
    sujet: "Contribution équipe",
  },
] as const;

type CatId = (typeof CATEGORIES)[number]["id"];

function SubmitBtn({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        width: "100%", padding: "14px", borderRadius: 10, border: "none",
        background: "#FFB800", color: "#0D1525", fontWeight: 800,
        fontSize: "0.95rem", cursor: pending ? "default" : "pointer",
        fontFamily: "inherit", opacity: pending ? 0.65 : 1,
        transition: "opacity 0.15s",
      }}
    >
      {pending ? "Envoi en cours…" : label}
    </button>
  );
}

export default function ContactForm({ status }: { status?: string }) {
  const [selected, setSelected] = useState<CatId>("contact");
  const cat = CATEGORIES.find((c) => c.id === selected)!;

  const inputStyle = {
    width: "100%", padding: "12px 14px", borderRadius: 10,
    border: "1.5px solid #E2E8F0", fontSize: "0.875rem",
    outline: "none", color: "#0D1525", fontFamily: "inherit",
    boxSizing: "border-box" as const, background: "white",
  };

  if (status === "envoye") {
    return (
      <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 16, padding: "48px 32px", textAlign: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <p style={{ margin: "0 0 6px", fontWeight: 800, fontSize: "1.05rem", color: "#0D1525" }}>Message bien reçu !</p>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#166534", lineHeight: 1.65 }}>
          Notre équipe vous répond par email dans les 2 à 3 jours ouvrés.
        </p>
      </div>
    );
  }

  return (
    <div>
      <style>{`
        .cc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .cc-card { border: 1.5px solid #E8ECF0; border-radius: 14px; padding: 14px 16px; cursor: pointer; background: white; display: flex; align-items: center; gap: 12px; transition: border-color 0.15s, box-shadow 0.15s, transform 0.18s cubic-bezier(0.34,1.56,0.64,1); text-align: left; width: 100%; font-family: inherit; }
        .cc-card:hover { border-color: #FFB800; transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.06); }
        .cc-card.active { border-color: #FFB800; border-width: 2px; background: #FFFBF0; box-shadow: 0 4px 16px rgba(255,184,0,0.14); }
        .cc-icon { width: 38px; height: 38px; border-radius: 10px; background: #F1F5F9; color: #64748B; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.15s, color 0.15s; }
        .cc-card.active .cc-icon { background: #FFB800; color: #0D1525; }
        input[type="text"]:focus, input[type="email"]:focus, textarea:focus { border-color: #FFB800; box-shadow: 0 0 0 3px rgba(255,184,0,0.12); }
        @media (max-width: 480px) { .cc-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* Cartes de choix */}
      <div className="cc-grid" style={{ marginBottom: 28 }}>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelected(c.id)}
            className={`cc-card${selected === c.id ? " active" : ""}`}
          >
            <div className="cc-icon">{c.icon}</div>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: "0 0 2px", fontWeight: 800, fontSize: "0.84rem", color: "#0D1525", lineHeight: 1.2 }}>{c.titre}</p>
              <p style={{ margin: 0, fontSize: "0.72rem", color: "#64748B", lineHeight: 1.4 }}>{c.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Formulaire unique */}
      <form action={submitMessage} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <input type="hidden" name="categorie" value={selected} />
        <input type="hidden" name="redirect_to" value="/contact" />
        <input type="hidden" name="sujet" value={cat.sujet} />
        {/* Piège anti-robots */}
        <input type="text" name="site_web" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} aria-hidden="true" />

        {status === "erreur" && (
          <div style={{ background: "#FEF2F2", color: "#DC2626", borderRadius: 8, padding: "11px 14px", fontSize: "0.83rem", fontWeight: 600 }}>
            Renseignez votre nom, votre email et votre message.
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Nom</label>
            <input name="nom" type="text" required placeholder="Votre nom" style={inputStyle} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Email</label>
            <input name="email" type="email" required placeholder="vous@exemple.com" style={inputStyle} />
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Message</label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder={cat.placeholder}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.65 }}
          />
        </div>

        <SubmitBtn label="Envoyer →" />
        <p style={{ margin: 0, textAlign: "center", fontSize: "0.72rem", color: "#94A3B8" }}>
          Réponse par email sous 2 à 3 jours ouvrés.
        </p>
      </form>
    </div>
  );
}
