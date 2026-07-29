"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type Feature = { title: string; desc: string; icon: React.ReactNode };

function Ico(children: React.ReactNode) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const LEFT: Feature[] = [
  {
    title: "Rechercher une ligne",
    desc: "Trouvez n'importe quelle ligne par son numéro.",
    icon: Ico(<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>),
  },
  {
    title: "Rechercher un arrêt",
    desc: "Explorez les arrêts autour d'un quartier.",
    icon: Ico(<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>),
  },
  {
    title: "Correspondances",
    desc: "Calculez votre trajet avec les changements de ligne.",
    icon: Ico(<><path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10"/><path d="M3.51 15a9 9 0 0 0 14.85 3.36L23 14"/></>),
  },
  {
    title: "Mes favoris",
    desc: "Retrouvez vos lignes préférées en un geste.",
    icon: Ico(<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>),
  },
];

const RIGHT: Feature[] = [
  {
    title: "Carte interactive",
    desc: "Visualisez tout le réseau sur une carte.",
    icon: Ico(<><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>),
  },
  {
    title: "Partager ma position",
    desc: "Partagez votre position avec vos proches.",
    icon: Ico(<><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>),
  },
  {
    title: "Actualités & emplois",
    desc: "Toutes les actualités du transport à Tana.",
    icon: Ico(<><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>),
  },
  {
    title: "Et bien plus à venir",
    desc: "TaxiBe s'améliore continuellement pour vous.",
    icon: Ico(<><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></>),
  },
];

export default function FonctionnalitesSection() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>(Array(8).fill(null));

  function radarStyle(delay: string) {
    return {
      position: "absolute" as const,
      inset: 0,
      borderRadius: "50%",
      border: "1.5px solid #FFB800",
      opacity: 0,
      animation: `fnc-radar 2.2s ease-out infinite`,
      animationDelay: delay,
    };
  }

  function renderCard(f: Feature, side: "left" | "right", i: number) {
    const globalIdx = side === "left" ? i : i + 4;
    const isLeft = side === "left";
    return (
      <div
        key={f.title}
        style={{
          display: "flex", alignItems: "center", gap: 14,
          flexDirection: isLeft ? "row-reverse" : "row",
          padding: "14px 16px", borderRadius: 14,
          background: "#F8F9FB", border: "1px solid #E8ECF0",
        }}
      >
        <div style={{ flex: 1, minWidth: 0, textAlign: isLeft ? "right" : "left" }}>
          <h3 style={{ fontWeight: 800, fontSize: "0.86rem", color: "#0D1525", margin: "0 0 3px", lineHeight: 1.3 }}>
            {f.title}
          </h3>
          <p style={{ fontSize: "0.74rem", color: "#64748B", margin: 0, lineHeight: 1.5 }}>
            {f.desc}
          </p>
        </div>

        <div style={{ position: "relative", width: 44, height: 44, flexShrink: 0 }}>
          <div style={radarStyle(`${i * 0.55}s`)} />
          <div style={radarStyle(`${i * 0.55 + 0.9}s`)} />
          <div
            ref={(el) => { iconRefs.current[globalIdx] = el; }}
            style={{
              position: "relative", zIndex: 1,
              width: 44, height: 44, borderRadius: "50%",
              background: "#FFB800",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {f.icon}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="fonctionnalites" style={{ background: "white" }}>
      <style>{`
        @keyframes fnc-radar {
          0%   { transform: scale(1);   opacity: 0.55; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .fnc-desktop { display: block; }
        .fnc-mobile  { display: none; }
        @media (max-width: 860px) {
          .fnc-desktop { display: none !important; }
          .fnc-mobile  { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        }
        @media (max-width: 480px) {
          .fnc-mobile { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "88px 40px" }}>

        {/* En-tête centré */}
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 64px" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800", marginBottom: 12 }}>
            Fonctionnalités
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.3rem)", fontWeight: 900, color: "#0D1525", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 16 }}>
            Votre compagnon pour <span style={{ color: "#FFB800" }}>tous vos déplacements.</span>
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#64748B", lineHeight: 1.75, margin: 0 }}>
            Tout ce qu&apos;il vous faut pour trouver votre ligne, préparer votre trajet et découvrir les correspondances à Antananarivo.
          </p>
        </div>

        {/* ── Desktop : 3 colonnes ── */}
        <div className="fnc-desktop">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px 1fr", gap: 28, alignItems: "center" }}>
            {/* Gauche */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {LEFT.map((f, i) => renderCard(f, "left", i))}
            </div>

            {/* Téléphone central */}
            <div ref={phoneRef} style={{ display: "flex", justifyContent: "center" }}>
              <Image
                src="/phone_function.png"
                alt="Application TaxiBe"
                width={300}
                height={600}
                sizes="300px"
                style={{ width: "100%", height: "auto", objectFit: "contain", filter: "drop-shadow(0 28px 52px rgba(0,0,0,0.15))" }}
              />
            </div>

            {/* Droite */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {RIGHT.map((f, i) => renderCard(f, "right", i))}
            </div>
          </div>
        </div>

        {/* ── Mobile : grille simple ── */}
        <div className="fnc-mobile">
          {[...LEFT, ...RIGHT].map((f, i) => (
            <div key={f.title} style={{ padding: "14px 16px", borderRadius: 14, background: "#F8F9FB", border: "1px solid #E8ECF0" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#FFB800", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 800, fontSize: "0.84rem", color: "#0D1525", margin: "0 0 4px" }}>{f.title}</h3>
              <p style={{ fontSize: "0.74rem", color: "#64748B", margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 56, textAlign: "center" }}>
          <Link
            href="/telecharger"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 36px", background: "#FFB800", borderRadius: 10,
              fontWeight: 800, fontSize: "0.95rem", color: "#0D1525", textDecoration: "none",
            }}
          >
            Essayer TaxiBe gratuitement →
          </Link>
        </div>

      </div>
    </section>
  );
}
