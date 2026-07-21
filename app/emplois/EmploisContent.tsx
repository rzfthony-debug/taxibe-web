"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";

type Offre = {
  id: string;
  nom: string;
  type_poste: string | null;
  lieu: string | null;
  description: string | null;
  date_limite: string | null;
  created_at: string;
};

const ICONS = {
  chauffeur: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13l1.5-5A2 2 0 0 1 6.4 6.5h11.2a2 2 0 0 1 1.9 1.5L21 13"/><path d="M3 13h18v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><circle cx="7" cy="16" r="1"/><circle cx="17" cy="16" r="1"/></svg>,
  developpeur: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  commercial: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
  marketing: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
  support: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
  design: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.2-.3-.4-.6-.4-1 0-.8.7-1.4 1.5-1.4H16c3.3 0 6-2.7 6-6 0-4.9-4.5-9-10-9z"/></svg>,
  default: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
};

function iconFor(typePoste: string | null) {
  const t = (typePoste || "").toLowerCase();
  if (t.includes("chauffeur") || t.includes("conducteur")) return ICONS.chauffeur;
  if (t.includes("dev") || t.includes("ingenieur") || t.includes("ingénieur") || t.includes("tech")) return ICONS.developpeur;
  if (t.includes("commercial") || t.includes("vente")) return ICONS.commercial;
  if (t.includes("marketing") || t.includes("communication")) return ICONS.marketing;
  if (t.includes("support") || t.includes("service client") || t.includes("relation")) return ICONS.support;
  if (t.includes("design") || t.includes("graphi")) return ICONS.design;
  return ICONS.default;
}

const FAQ_ITEMS = [
  {
    q: "Comment se déroule le recrutement ?",
    r: "Après réception de votre candidature via le formulaire, notre équipe RH l'étudie sous 5 jours ouvrés. Si votre profil correspond, vous êtes contacté pour un entretien.",
  },
  {
    q: "Proposez-vous des stages ou alternances ?",
    r: "Oui, selon les besoins des équipes. Précisez-le dans votre message si vous êtes en recherche de stage ou d'alternance.",
  },
  {
    q: "Le télétravail est-il possible ?",
    r: "Certains postes, notamment techniques, sont ouverts en mode hybride. C'est précisé directement dans le détail de chaque offre.",
  },
  {
    q: "Puis-je postuler sans offre correspondante ?",
    r: "Absolument. Envoyez-nous une candidature spontanée : nous conservons les profils intéressants pour nos prochains recrutements.",
  },
];

function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div style={{
      background: "white", borderRadius: 14, padding: "22px 22px",
      border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
    }}>
      <p style={{ fontSize: "0.95rem", fontWeight: 900, color: "#0D1525", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
        Questions fréquentes
      </p>
      <p style={{ fontSize: "0.78rem", color: "#64748B", margin: "0 0 14px" }}>
        Sur le recrutement chez TaxiBe.
      </p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={item.q} style={{ borderTop: i === 0 ? "none" : "1px solid #F1F5F9" }}>
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                style={{
                  width: "100%", background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
                  padding: "13px 0", textAlign: "left", fontFamily: "inherit",
                }}
              >
                <span style={{ fontSize: "0.83rem", fontWeight: 700, color: "#0D1525" }}>{item.q}</span>
                <span style={{
                  flexShrink: 0, color: "#FFB800", fontWeight: 900, fontSize: "1rem",
                  transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.15s",
                }}>
                  +
                </span>
              </button>
              {isOpen && (
                <p style={{ margin: "0 0 14px", fontSize: "0.8rem", color: "#64748B", lineHeight: 1.7 }}>
                  {item.r}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FeaturedLineWidget() {
  return (
    <div style={{
      background: "white", borderRadius: 14, padding: "22px 22px",
      border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
    }}>
      <p style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFB800", margin: "0 0 4px" }}>
        Ligne la plus recherchée
      </p>
      <p style={{ fontSize: "0.62rem", fontWeight: 600, color: "#64748B", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        Aujourd&apos;hui
      </p>
      <div style={{ background: "#0D1525", borderRadius: 12, padding: "16px", marginBottom: 12 }}>
        <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "white", lineHeight: 1, marginBottom: 6 }}>147</div>
        <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "white", marginBottom: 4 }}>Ambatomaro &rarr; 67Ha</div>
        <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#FFB800", marginBottom: 12 }}>23 541 recherches</div>
        <a href="/recherche?q=147" style={{
          display: "block", padding: "8px 14px", borderRadius: 8, textAlign: "center",
          background: "#FFB800", color: "#0D1525", fontSize: "0.78rem", fontWeight: 800, textDecoration: "none",
        }}>
          Voir la ligne &rarr;
        </a>
      </div>
      <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#0D1525", margin: "0 0 2px" }}>
        Antananarivo et ses environs
      </p>
      <p style={{ fontSize: "0.7rem", color: "#64748B", margin: 0, fontWeight: 500 }}>
        + de 50 communes couvertes
      </p>
    </div>
  );
}

function DownloadAppCard() {
  return (
    <div style={{
      background: "#0D1525", borderRadius: 14, padding: "24px 22px", color: "white",
    }}>
      <p style={{ fontSize: "0.95rem", fontWeight: 900, margin: "0 0 6px", letterSpacing: "-0.01em" }}>
        Télécharger l&apos;application
      </p>
      <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", margin: "0 0 16px", lineHeight: 1.6 }}>
        Suivez nos offres et candidatez plus vite depuis votre téléphone.
      </p>
      <Link href="/telecharger" style={{
        display: "block", padding: "11px 14px", borderRadius: 9, textAlign: "center",
        background: "#FFB800", color: "#0D1525", fontSize: "0.83rem", fontWeight: 800, textDecoration: "none",
      }}>
        Télécharger — Gratuit
      </Link>
    </div>
  );
}

export default function EmploisContent({ offres }: { offres: Offre[] }) {
  const [q, setQ] = useState("");
  const [ville, setVille] = useState("");
  const [type, setType] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const villes = useMemo(
    () => Array.from(new Set(offres.map((o) => o.lieu).filter(Boolean))) as string[],
    [offres]
  );
  const types = useMemo(
    () => Array.from(new Set(offres.map((o) => o.type_poste).filter(Boolean))) as string[],
    [offres]
  );

  const filtered = useMemo(() => {
    return offres.filter((o) => {
      const matchQ = q.trim()
        ? (o.nom + " " + (o.description || "")).toLowerCase().includes(q.trim().toLowerCase())
        : true;
      const matchVille = ville ? o.lieu === ville : true;
      const matchType = type ? o.type_poste === type : true;
      return matchQ && matchVille && matchType;
    });
  }, [offres, q, ville, type]);

  const selectStyle: CSSProperties = {
    padding: "10px 12px", borderRadius: 8, border: "1.5px solid #E2E8F0",
    fontSize: "0.83rem", color: "#0D1525", fontFamily: "inherit", background: "white",
    outline: "none", minWidth: 0,
  };

  return (
    <>
      <style>{`
        .emplois-grid { display: grid; grid-template-columns: 1fr 300px; gap: 24px; align-items: start; }
        .emplois-filters { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 10px; }
        @media (max-width: 860px) {
          .emplois-grid { grid-template-columns: 1fr; }
          .emplois-filters { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Barre de recherche / filtres */}
      <div style={{
        background: "white", borderRadius: 14, padding: "18px 20px",
        border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
        marginBottom: 24,
      }}>
        <div className="emplois-filters">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un poste…"
            style={selectStyle}
          />
          <select value={ville} onChange={(e) => setVille(e.target.value)} style={selectStyle}>
            <option value="">Toutes les villes</option>
            {villes.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)} style={selectStyle}>
            <option value="">Tous les types de contrat</option>
            {types.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="emplois-grid">
        {/* Colonne offres */}
        <div id="offres">
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0D1525", margin: 0, letterSpacing: "-0.01em" }}>
              Nos offres d&apos;emploi
            </h2>
            <span style={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 600 }}>
              {filtered.length} poste{filtered.length > 1 ? "s" : ""}
            </span>
          </div>

          {filtered.length === 0 && (
            <div style={{
              background: "white", borderRadius: 12, padding: "48px 32px",
              border: "1px solid #E8ECF0", textAlign: "center",
            }}>
              <p style={{ fontWeight: 700, color: "#0D1525", marginBottom: 8 }}>Aucune offre ne correspond</p>
              <p style={{ fontSize: "0.875rem", color: "#64748B", margin: 0 }}>
                Essayez d&apos;élargir votre recherche, ou envoyez une candidature spontanée ci-dessous.
              </p>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {filtered.map((o) => {
              const isOpen = expandedId === o.id;
              const dateLimite = o.date_limite
                ? new Date(o.date_limite).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
                : null;

              return (
                <div key={o.id} style={{
                  background: "white", borderRadius: 14, border: "1px solid #E8ECF0",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.04)", padding: "22px 24px",
                }}>
                  <div style={{ display: "flex", gap: 14 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, background: "#FFF7E6",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      {iconFor(o.type_poste)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: "0 0 6px", fontWeight: 800, fontSize: "0.98rem", color: "#0D1525" }}>
                        {o.nom}
                      </p>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {o.type_poste && (
                          <span style={{
                            background: "#FFF7E6", color: "#92400E", border: "1px solid #FDE68A",
                            fontSize: "0.7rem", fontWeight: 700, padding: "3px 10px", borderRadius: 4,
                          }}>
                            {o.type_poste}
                          </span>
                        )}
                        {o.lieu && (
                          <span style={{
                            background: "#F1F5F9", color: "#475569",
                            fontSize: "0.7rem", fontWeight: 600, padding: "3px 10px", borderRadius: 4,
                          }}>
                            {o.lieu}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {o.description && (
                    <p style={{ margin: "14px 0 0", fontSize: "0.84rem", color: "#64748B", lineHeight: 1.65 }}>
                      {isOpen ? o.description : `${o.description.slice(0, 140).trim()}${o.description.length > 140 ? "…" : ""}`}
                    </p>
                  )}

                  {isOpen && dateLimite && (
                    <p style={{ margin: "12px 0 0", fontSize: "0.75rem", color: "#EF4444", fontWeight: 700 }}>
                      Date limite de candidature : {dateLimite}
                    </p>
                  )}

                  <div style={{ display: "flex", gap: 10, marginTop: 16, paddingTop: 16, borderTop: "1px solid #F1F5F9" }}>
                    <button
                      onClick={() => setExpandedId(isOpen ? null : o.id)}
                      style={{
                        padding: "9px 16px", borderRadius: 8, border: "1.5px solid #E2E8F0",
                        background: "white", color: "#0D1525", fontWeight: 700, fontSize: "0.82rem",
                        cursor: "pointer", fontFamily: "inherit",
                      }}
                    >
                      {isOpen ? "Réduire" : "Voir l'offre"}
                    </button>
                    {isOpen && (
                      <Link href={`/contact?poste=${encodeURIComponent(o.nom)}`} style={{
                        padding: "9px 16px", borderRadius: 8, background: "#FFB800", color: "#0D1525",
                        fontWeight: 800, fontSize: "0.82rem", textDecoration: "none",
                        display: "flex", alignItems: "center",
                      }}>
                        Postuler à ce poste →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Colonne sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <DownloadAppCard />
          <FeaturedLineWidget />
          <FaqAccordion />
        </div>
      </div>
    </>
  );
}
