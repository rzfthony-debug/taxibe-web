"use client";

import Link from "next/link";
import { useState, useMemo, type ReactNode } from "react";

type Offre = {
  id: string;
  nom: string;
  type_poste: string | null;
  lieu: string | null;
  description: string | null;
  date_limite: string | null;
  created_at: string;
};

// Icône + couleur selon les mots-clés du titre
function getJobStyle(nom: string, type: string | null): { icon: ReactNode; color: string } {
  const text = `${nom} ${type ?? ""}`.toLowerCase();
  if (text.match(/dev|code|tech|web|mobile|front|back|data|sys/))
    return { color: "#f97316", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> };
  if (text.match(/design|ux|ui|graph|créat|visual/))
    return { color: "#8b5cf6", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg> };
  if (text.match(/market|comm|digital|réseaux|content|rédact/))
    return { color: "#10b981", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg> };
  if (text.match(/support|client|service|assist|relation/))
    return { color: "#3b82f6", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> };
  if (text.match(/finance|compta|gestion|admin|rh|ressource/))
    return { color: "#FFB800", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> };
  if (text.match(/chauffeur|conducteur|transport|livraison/))
    return { color: "#ec4899", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> };
  return { color: "#64748B", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> };
}

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

const TYPES = ["Tous les contrats", "CDI", "CDD", "Stage", "Freelance", "Temps partiel"];

export default function EmploisListe({ offres }: { offres: Offre[] }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tous les contrats");

  const filtered = useMemo(() => {
    return offres.filter((o) => {
      const matchSearch = !search || `${o.nom} ${o.description ?? ""}`.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "Tous les contrats" || o.type_poste?.toLowerCase().includes(typeFilter.toLowerCase());
      return matchSearch && matchType;
    });
  }, [offres, search, typeFilter]);

  return (
    <>
      <style>{`
        .emploi-card { background: white; border-radius: 14px; border: 1px solid #E8ECF0; padding: 22px 24px; display: flex; flex-direction: column; gap: 14px; transition: box-shadow 0.2s; }
        .emploi-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .tag-chip { display: inline-flex; align-items: center; gap: 5px; font-size: 0.7rem; font-weight: 600; padding: 3px 10px; border-radius: 20px; }
        .voir-btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px; border-radius: 9px; background: #FFB800; color: #0D1525; font-size: 0.82rem; font-weight: 800; text-decoration: none; transition: background 0.15s; align-self: flex-start; }
        .voir-btn:hover { background: #e6a500; }
        .filter-input { padding: 10px 14px; border: 1.5px solid #E2E8F0; border-radius: 9px; font-size: 0.85rem; color: #0D1525; outline: none; background: white; font-family: inherit; width: 100%; box-sizing: border-box; }
        .filter-input:focus { border-color: #FFB800; box-shadow: 0 0 0 3px rgba(255,184,0,0.12); }
        .filter-select { padding: 10px 14px; border: 1.5px solid #E2E8F0; border-radius: 9px; font-size: 0.85rem; color: #0D1525; outline: none; background: white; font-family: inherit; cursor: pointer; }
        .filter-select:focus { border-color: #FFB800; }
        .filter-bar { background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 20px 24px; display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: end; }
        @media (max-width: 600px) { .filter-bar { grid-template-columns: 1fr; } }
      `}</style>

      {/* Barre de filtres */}
      <div className="filter-bar" style={{ marginBottom: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12 }}>
          <div>
            <label style={{ fontSize: "0.68rem", fontWeight: 700, color: "#94A3B8", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Que recherchez-vous ?
            </label>
            <div style={{ position: "relative" }}>
              <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                type="text"
                className="filter-input"
                placeholder="Un poste, un métier…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: 36 }}
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: "0.68rem", fontWeight: 700, color: "#94A3B8", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Type de contrat
            </label>
            <select className="filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <span style={{ fontSize: "0.82rem", color: "#64748B", fontWeight: 600, whiteSpace: "nowrap" }}>
            {filtered.length} offre{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Liste */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.length === 0 && (
          <div style={{ background: "white", borderRadius: 14, border: "1px solid #E8ECF0", padding: "48px 24px", textAlign: "center" }}>
            <p style={{ fontWeight: 700, color: "#0D1525", margin: "0 0 8px" }}>Aucune offre ne correspond à votre recherche</p>
            <p style={{ fontSize: "0.875rem", color: "#94A3B8", margin: 0 }}>Essayez d&apos;autres termes ou envoyez une candidature spontanée.</p>
          </div>
        )}
        {filtered.map((o) => {
          const { icon, color } = getJobStyle(o.nom, o.type_poste);
          return (
            <div key={o.id} className="emploi-card">
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                  background: `${color}15`, border: `1.5px solid ${color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color,
                }}>
                  {icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <h3 style={{ margin: 0, fontWeight: 800, fontSize: "1rem", color: "#0D1525", lineHeight: 1.3 }}>{o.nom}</h3>
                    {o.date_limite && (
                      <span style={{ fontSize: "0.7rem", color: "#EF4444", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>
                        Avant le {formatDate(o.date_limite)}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                    {o.lieu && (
                      <span className="tag-chip" style={{ background: "#F1F5F9", color: "#475569" }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {o.lieu}
                      </span>
                    )}
                    {o.type_poste && (
                      <span className="tag-chip" style={{ background: "#FFF7E6", color: "#92400E" }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                        {o.type_poste}
                      </span>
                    )}
                    <span className="tag-chip" style={{ background: "#F0FDF4", color: "#166534" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      Temps plein
                    </span>
                  </div>
                </div>
              </div>
              {o.description && (
                <p style={{ margin: 0, fontSize: "0.84rem", color: "#64748B", lineHeight: 1.65 }}>
                  {o.description.slice(0, 160)}{o.description.length > 160 ? "…" : ""}
                </p>
              )}
              <Link href={`/emplois/${o.id}`} className="voir-btn">
                Voir l&apos;offre
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
