"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const navLinks = [
    { label: "Fonctionnalités", href: "#fonctionnalites" },
    { label: "Comment ça marche", href: "#comment" },
  ];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/recherche?q=${encodeURIComponent(query.trim())}`;
    }
  }

  return (
    <main style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}>

      {/* ── Nav ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "white",
        borderBottom: "1px solid #E2E8F0",
        boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: "0 24px",
          height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
            <Image src="/logo_taxibe_vertcal.png" alt="TaxiBe" width={360} height={180}
              style={{ height: 36, width: "auto", objectFit: "contain" }} priority />
          </a>

          {/* Liens desktop */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="nav-desktop">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} style={{
                padding: "8px 14px", borderRadius: 8,
                color: "#64748B", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
              }}>
                {l.label}
              </a>
            ))}
            <Link href="/telecharger" style={{
              marginLeft: 8, padding: "9px 22px", borderRadius: 8,
              background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "0.875rem", textDecoration: "none",
            }}>
              Télécharger l&apos;app
            </Link>
          </div>

          {/* Burger mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="nav-burger"
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, borderRadius: 8, color: "#0D1525" }}
            aria-label="Menu">
            {menuOpen
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
            }
          </button>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div style={{ background: "white", borderTop: "1px solid #F1F5F9", padding: "12px 24px 20px" }} className="nav-mobile-menu">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
                display: "block", padding: "12px 0", color: "#0D1525", fontSize: "1rem", fontWeight: 600,
                textDecoration: "none", borderBottom: "1px solid #F1F5F9",
              }}>{l.label}</a>
            ))}
            <Link href="/telecharger" style={{
              display: "block", marginTop: 16, padding: "13px", borderRadius: 8, textAlign: "center",
              background: "#FFB800", color: "#0D1525", fontWeight: 800, fontSize: "0.9375rem", textDecoration: "none",
            }}>
              Télécharger l&apos;app — Gratuit
            </Link>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) { .nav-desktop { display: none !important; } .nav-burger { display: flex !important; } }
        @media (min-width: 769px) { .nav-mobile-menu { display: none !important; } }
        .search-input:focus { border-color: #FFB800 !important; box-shadow: 0 0 0 3px rgba(255,184,0,0.15) !important; }
        .search-btn:hover { background: #e6a500 !important; }
      `}</style>

      {/* ── Hero ── */}
      <section style={{
        background: "#0D1525",
        padding: "80px 24px 96px",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#FFB800",
            marginBottom: 20,
          }}>
            Antananarivo · 100% Gratuit
          </p>

          <h1 style={{
            fontSize: "clamp(2rem, 6vw, 3.4rem)", fontWeight: 900,
            color: "white", lineHeight: 1.13, marginBottom: 20,
            letterSpacing: "-0.02em",
          }}>
            Trouvez votre ligne de{" "}
            <span style={{ color: "#FFB800" }}>taxi-be</span>
          </h1>

          <p style={{
            fontSize: "1rem", color: "rgba(255,255,255,0.55)",
            lineHeight: 1.8, marginBottom: 40, maxWidth: 480, margin: "0 auto 40px",
          }}>
            Tapez un numéro de ligne et obtenez tous les arrêts, le trajet complet, les correspondances.
          </p>

          {/* Barre de recherche principale */}
          <form onSubmit={handleSearch} style={{
            display: "flex", gap: 0, maxWidth: 500, margin: "0 auto 24px",
            background: "white", borderRadius: 12, overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
          }}>
            <input
              ref={inputRef}
              className="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Numéro de ligne — ex : 147"
              style={{
                flex: 1, padding: "16px 20px",
                border: "none", outline: "none",
                fontSize: "1rem", fontWeight: 500,
                fontFamily: "var(--font-poppins), system-ui",
                color: "#0D1525", minWidth: 0,
                background: "transparent",
              }}
            />
            <button
              type="submit"
              className="search-btn"
              style={{
                flexShrink: 0, padding: "16px 24px",
                background: "#FFB800", border: "none", cursor: "pointer",
                fontWeight: 800, fontSize: "0.875rem", color: "#0D1525",
                fontFamily: "var(--font-poppins), system-ui",
                display: "flex", alignItems: "center", gap: 8,
                transition: "background 0.15s",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              Chercher
            </button>
          </form>

          <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", margin: 0 }}>
            Essayez 147 · 135 · 20B · 165 · 182
          </p>
        </div>
      </section>

      {/* ── Fonctionnalités ── */}
      <section id="fonctionnalites" style={{ padding: "88px 24px", background: "#F8F9FB" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800", marginBottom: 12 }}>
            Fonctionnalités
          </p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 4vw, 2.1rem)", fontWeight: 900, color: "#0D1525", marginBottom: 12, letterSpacing: "-0.01em" }}>
            Tout pour se déplacer à Tana
          </h2>
          <p style={{ textAlign: "center", color: "#64748B", fontSize: "0.9rem", maxWidth: 480, margin: "0 auto 52px", lineHeight: 1.7 }}>
            Toutes les fonctionnalités sont gratuites. Aucun compte requis pour chercher une ligne.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {[
              { icon: "M", title: "Par numéro de ligne", desc: "Entrez le numéro et obtenez tous les arrêts, le trajet complet et les terminus.", color: "#FFB800", appOnly: false },
              { icon: "L", title: "Par arrêt ou quartier", desc: "Indiquez votre départ et votre destination — les correspondances sont calculées automatiquement.", color: "#3b82f6", appOnly: true },
              { icon: "G", title: "Arrêts près de moi", desc: "Activez la localisation pour voir toutes les lignes disponibles autour de vous.", color: "#10b981", appOnly: true },
              { icon: "F", title: "Lignes favorites", desc: "Sauvegardez vos lignes du quotidien pour y accéder d'un seul geste.", color: "#f59e0b", appOnly: true },
              { icon: "J", title: "Jeux & récompenses", desc: "Sudoku et quiz sur les lignes de Tana. Gagnez des lots en jouant.", color: "#8b5cf6", appOnly: true },
              { icon: "A", title: "Actualités & emplois", desc: "Restez informé des nouvelles et offres d'emploi à Antananarivo.", color: "#06b6d4", appOnly: true },
            ].map((f) => (
              <div key={f.title} style={{
                background: "white", borderRadius: 12, padding: "24px 20px",
                border: "1px solid #E8ECF0",
                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                position: "relative",
              }}>
                {f.appOnly && (
                  <span style={{
                    position: "absolute", top: 14, right: 14,
                    background: "#0D1525", color: "#FFB800",
                    fontSize: "0.6rem", fontWeight: 800, padding: "2px 8px", borderRadius: 4,
                    letterSpacing: "0.06em",
                  }}>
                    APP
                  </span>
                )}
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: `${f.color}18`,
                  border: `1.5px solid ${f.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 16,
                }}>
                  <div style={{ width: 18, height: 18, borderRadius: 3, background: f.color, opacity: 0.9 }} />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: "0.9rem", color: "#0D1525", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 28, fontSize: "0.78rem", color: "#94A3B8" }}>
            Les fonctionnalités <strong style={{ color: "#0D1525" }}>APP</strong> sont disponibles après téléchargement — toujours gratuitement.
          </p>
        </div>
      </section>

      {/* ── CTA Téléchargement ── */}
      <section style={{ background: "#FFB800", padding: "72px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900, color: "#0D1525", marginBottom: 14, letterSpacing: "-0.01em" }}>
            Toutes les fonctionnalités dans l&apos;app
          </h2>
          <p style={{ color: "rgba(13,21,37,0.65)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 32 }}>
            Favoris, GPS, correspondances, jeux — entièrement gratuit sur Android.
          </p>
          <Link href="/telecharger" style={{
            display: "inline-block", padding: "14px 36px", borderRadius: 8,
            background: "#0D1525", color: "#FFB800",
            fontWeight: 800, fontSize: "1rem", textDecoration: "none",
            letterSpacing: "-0.01em",
          }}>
            Télécharger l&apos;app
          </Link>
        </div>
      </section>

      {/* ── Comment ça marche ── */}
      <section id="comment" style={{ padding: "88px 24px", background: "white" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800", marginBottom: 12 }}>
            Utilisation
          </p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 4vw, 2.1rem)", fontWeight: 900, color: "#0D1525", marginBottom: 52, letterSpacing: "-0.01em" }}>
            Comment ça marche ?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {[
              { num: "1", title: "Ouvrez TaxiBe", desc: "Sur ce site ou sur l'application — accès immédiat, sans compte ni inscription." },
              { num: "2", title: "Cherchez par numéro de ligne", desc: "Tapez le numéro (ex : 147) pour voir tous les arrêts et le trajet complet en détail." },
              { num: "3", title: "Trouvez vos correspondances", desc: "Indiquez votre point de départ et votre destination — TaxiBe calcule les correspondances." },
              { num: "4", title: "Téléchargez pour plus", desc: "GPS, favoris, jeux et récompenses sont disponibles dans l'application — gratuitement." },
            ].map((step, i) => (
              <div key={step.num} style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                <div style={{
                  flexShrink: 0, width: 44, height: 44, borderRadius: 8,
                  background: i === 0 ? "#FFB800" : "#F1F5F9",
                  color: i === 0 ? "#0D1525" : "#94A3B8",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "1rem",
                }}>
                  {step.num}
                </div>
                <div style={{ paddingTop: 10 }}>
                  <h3 style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0D1525", marginBottom: 6 }}>{step.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#0D1525", padding: "48px 24px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
            <div style={{ maxWidth: 260 }}>
              <Image src="/logo_taxibe_vertcal.png" alt="TaxiBe" width={160} height={80}
                style={{ height: 34, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", marginBottom: 14 }} />
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: 0 }}>
                L&apos;application de référence pour trouver vos lignes de taxi-be à Antananarivo.{" "}
                <strong style={{ color: "#FFB800" }}>Gratuit.</strong>
              </p>
            </div>
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", marginBottom: 14 }}>Application</p>
                {[
                  { label: "Fonctionnalités", href: "#fonctionnalites" },
                  { label: "Comment ça marche", href: "#comment" },
                  { label: "Télécharger l'app", href: "/telecharger" },
                  { label: "Rechercher une ligne", href: "/recherche" },
                ].map((l) => (
                  <a key={l.label} href={l.href} style={{ display: "block", fontSize: "0.84rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: 8, fontWeight: 500 }}>{l.label}</a>
                ))}
              </div>
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", marginBottom: 14 }}>Légal</p>
                {[
                  { label: "Confidentialité", href: "/politique-confidentialite" },
                  { label: "Conditions d'utilisation", href: "/conditions" },
                ].map((l) => (
                  <a key={l.label} href={l.href} style={{ display: "block", fontSize: "0.84rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: 8, fontWeight: 500 }}>{l.label}</a>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>© {new Date().getFullYear()} TaxiBe. Tous droits réservés.</p>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>Antananarivo, Madagascar</p>
          </div>
        </div>
      </footer>

    </main>
  );
}
