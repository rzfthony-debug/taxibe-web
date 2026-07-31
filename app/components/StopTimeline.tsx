"use client";

import { useState } from "react";
import type { ArretItem } from "@/lib/search";

export default function StopTimeline({ arrets, label }: { arrets: ArretItem[]; label: string }) {
  const [expanded, setExpanded] = useState(false);

  if (!arrets.length) return null;

  const total = arrets.length;
  const intermediaires = total - 2;
  const visible = expanded || intermediaires <= 2
    ? arrets
    : [arrets[0], arrets[total - 1]];

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{ margin: 0, fontSize: "0.7rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748B" }}>
          {label}
        </p>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#0D1525", background: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: 6, padding: "2px 10px" }}>
          {total} arrêts
        </span>
      </div>

      <div style={{ background: "white", borderRadius: 14, border: "1px solid #E8ECF0", overflow: "hidden" }}>
        {visible.map((arret, i) => {
          const globalIndex = expanded || intermediaires <= 2 ? i : (i === 0 ? 0 : total - 1);
          const isFirst = globalIndex === 0;
          const isLast = globalIndex === total - 1;
          const isTerm = isFirst || isLast;
          return (
            <div key={arret.id} style={{
              display: "flex", alignItems: "stretch",
              padding: "0 20px",
              borderBottom: (i === visible.length - 1) ? "none" : "1px solid #F8FAFC",
            }}>
              {/* Rail */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20, flexShrink: 0, marginRight: 14 }}>
                <div style={{ width: 2, flex: 1, minHeight: 12, background: isFirst ? "transparent" : "#0D1525" }} />
                {isTerm ? (
                  <div style={{ width: 11, height: 11, borderRadius: 3, background: "#0D1525", border: "2.5px solid #FFB800", flexShrink: 0, zIndex: 1 }} />
                ) : (
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "white", border: "2px solid #CBD5E0", flexShrink: 0, zIndex: 1 }} />
                )}
                <div style={{ width: 2, flex: 1, minHeight: 12, background: isLast ? "transparent" : "#0D1525" }} />
              </div>

              {/* Contenu */}
              <div style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
                paddingTop: isFirst ? 18 : 9, paddingBottom: isLast ? 18 : 9,
              }}>
                <div>
                  <span style={{
                    display: "block",
                    fontSize: isTerm ? "0.92rem" : "0.82rem",
                    fontWeight: isTerm ? 800 : 400,
                    color: isTerm ? "#0D1525" : "#475569",
                    lineHeight: 1.3,
                  }}>
                    {arret.arret}
                  </span>
                  {arret.denomination && (
                    <span style={{ display: "block", fontSize: "0.65rem", color: "#94A3B8", marginTop: 1 }}>
                      {arret.denomination}
                    </span>
                  )}
                </div>
                {isTerm && (
                  <span style={{
                    fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em",
                    color: "white", background: isFirst ? "#22c55e" : "#FFB800",
                    padding: "2px 8px", borderRadius: 4, flexShrink: 0,
                  }}>
                    {isFirst ? "Départ" : "Arrivée"}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Toggle intermédiaires */}
        {intermediaires > 2 && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              width: "100%", padding: "13px 20px",
              background: "none", border: "none", borderTop: "1px solid #F1F5F9",
              fontSize: "0.8rem", fontWeight: 700, color: "#FFB800",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              fontFamily: "inherit",
            }}
          >
            {expanded ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
                Masquer les arrêts intermédiaires
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                Voir les {intermediaires} arrêts intermédiaires
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
