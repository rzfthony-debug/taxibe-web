"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

type Offre = {
  id: string;
  slug: string | null;
  nom: string;
  type_poste: string | null;
  lieu: string | null;
  description: string | null;
  date_limite: string | null;
  created_at: string;
};

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

const TYPES = ["Tous", "CDI", "CDD", "Stage", "Freelance", "Temps partiel"];

export default function EmploisListe({ offres }: { offres: Offre[] }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tous");

  const filtered = useMemo(() => {
    return offres.filter((o) => {
      const matchSearch = !search || `${o.nom} ${o.description ?? ""}`.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "Tous" || o.type_poste?.toLowerCase().includes(typeFilter.toLowerCase());
      return matchSearch && matchType;
    });
  }, [offres, search, typeFilter]);

  return (
    <>
      <style>{`
        .job-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 24px; padding: 18px 20px;
          background: white; border: 1px solid #E8ECF0; border-radius: 10px;
          margin-bottom: 8px;
          transition: box-shadow 0.15s, border-color 0.15s;
        }
        .job-row:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.06); border-color: #CBD5E1; }
        .job-chip {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 3px 9px; border-radius: 5px;
          font-size: 0.69rem; font-weight: 600;
          background: #F1F5F9; color: #64748B;
        }
        .job-chip-urgent { background: #FEF2F2; color: #DC2626; }
        .job-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px; background: #FFB800; color: #0D1525;
          border-radius: 7px; font-size: 0.78rem; font-weight: 800;
          text-decoration: none; white-space: nowrap; flex-shrink: 0;
          transition: background 0.12s;
        }
        .job-btn:hover { background: #e6a500; }
        .search-wrap { position: relative; flex: 1; }
        .search-wrap svg { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #94A3B8; }
        .job-search {
          width: 100%; padding: 9px 12px 9px 34px;
          border: 1.5px solid #E2E8F0; border-radius: 8px;
          font-size: 0.84rem; font-family: inherit; color: #0D1525;
          background: white; outline: none; box-sizing: border-box;
        }
        .job-search:focus { border-color: #FFB800; box-shadow: 0 0 0 3px rgba(255,184,0,0.1); }
        .type-pill {
          padding: 6px 13px; border-radius: 20px;
          font-size: 0.73rem; font-weight: 700;
          border: 1.5px solid #E2E8F0; background: white;
          cursor: pointer; font-family: inherit; color: #64748B;
          transition: all 0.12s;
        }
        .type-pill:hover { border-color: #CBD5E1; color: #374151; }
        .type-pill.active { background: #0D1525; color: white; border-color: #0D1525; }
        @media (max-width: 580px) {
          .job-row { flex-direction: column; align-items: flex-start; gap: 14px; }
          .job-btn { align-self: stretch; justify-content: center; }
        }
      `}</style>

      {/* Filtres */}
      <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <div className="search-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              className="job-search"
              placeholder="Rechercher un poste…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {TYPES.map((t) => (
            <button
              key={t}
              className={`type-pill${typeFilter === t ? " active" : ""}`}
              onClick={() => setTypeFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <p style={{ fontSize: "0.75rem", color: "#94A3B8", margin: "0 0 14px", fontWeight: 600 }}>
        {filtered.length} poste{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Liste */}
      <div>
        {filtered.length === 0 && (
          <div style={{
            background: "white", borderRadius: 10, border: "1px solid #E8ECF0",
            padding: "40px 24px", textAlign: "center",
          }}>
            <p style={{ fontWeight: 700, color: "#0D1525", margin: "0 0 6px", fontSize: "0.9rem" }}>
              Aucun poste ne correspond
            </p>
            <p style={{ fontSize: "0.8rem", color: "#94A3B8", margin: 0 }}>
              Essayez d&apos;autres termes ou envoyez une candidature spontanée.
            </p>
          </div>
        )}

        {filtered.map((o) => {
          const deadline = formatDate(o.date_limite);
          const isUrgent = o.date_limite
            ? new Date(o.date_limite) < new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
            : false;
          const firstLine = o.description?.split("\n").find((l) => l.trim()) ?? "";

          return (
            <div key={o.id} className="job-row">
              {/* Infos */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{
                  margin: 0, fontWeight: 800, fontSize: "0.92rem",
                  color: "#0D1525", lineHeight: 1.3,
                }}>
                  {o.nom}
                </h3>

                {firstLine && (
                  <p style={{
                    margin: "5px 0 0", fontSize: "0.78rem", color: "#64748B",
                    lineHeight: 1.5, overflow: "hidden", display: "-webkit-box",
                    WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                  }}>
                    {firstLine}
                  </p>
                )}

                <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                  {o.type_poste && (
                    <span className="job-chip">{o.type_poste}</span>
                  )}
                  {o.lieu && (
                    <span className="job-chip">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      {o.lieu}
                    </span>
                  )}
                  {deadline && (
                    <span className={`job-chip${isUrgent ? " job-chip-urgent" : ""}`}>
                      Avant le {deadline}
                    </span>
                  )}
                </div>
              </div>

              {/* Bouton */}
              <Link href={`/emplois/${o.slug || o.id}`} className="job-btn">
                Voir l&apos;offre
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

