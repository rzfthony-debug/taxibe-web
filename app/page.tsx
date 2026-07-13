"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Fonctionnalités", href: "#fonctionnalites" },
    { label: "Comment ça marche", href: "#comment" },
    { label: "Actualités", href: "https://taxibemada.vercel.app/actualites" },
  ];

  return (
    <main style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>

      {/* ── Nav ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "white",
        borderBottom: "1px solid #E2E8F0",
        boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: "0 24px",
          height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
            <Image src="/logo_taxibe_vertcal.png" alt="TaxiBe" width={360} height={180}
              style={{ height: 36, width: "auto", objectFit: "contain" }} priority />
          </a>

          {/* Liens desktop */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }} className="nav-desktop">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} style={{
                padding: "8px 14px", borderRadius: 8,
                color: "#64748B", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
              }}>
                {l.label}
              </a>
            ))}
            <a href="https://taxibemada.vercel.app" style={{
              padding: "8px 16px", borderRadius: 8,
              color: "#0D1525", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
              border: "1.5px solid #E2E8F0",
            }}>
              Utiliser l&apos;app
            </a>
            <Link href="/telecharger" style={{
              marginLeft: 4, padding: "9px 20px", borderRadius: 50,
              background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "0.875rem", textDecoration: "none",
              boxShadow: "0 2px 10px rgba(255,184,0,0.3)",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              ⬇ Télécharger l&apos;app
              <span style={{ fontSize: "0.65rem", background: "rgba(13,21,37,0.12)", borderRadius: 20, padding: "1px 7px", fontWeight: 700 }}>
                Gratuit
              </span>
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
            <a href="https://taxibemada.vercel.app" onClick={() => setMenuOpen(false)} style={{
              display: "block", padding: "12px 0", color: "#64748B", fontSize: "1rem", fontWeight: 600,
              textDecoration: "none", borderBottom: "1px solid #F1F5F9",
            }}>Utiliser l&apos;app dans le navigateur</a>
            <Link href="/telecharger" style={{
              display: "block", marginTop: 16, padding: "13px", borderRadius: 50, textAlign: "center",
              background: "#FFB800", color: "#0D1525", fontWeight: 800, fontSize: "0.9375rem", textDecoration: "none",
            }}>
              ⬇ Télécharger l&apos;app — Gratuit
            </Link>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) { .nav-desktop { display: none !important; } .nav-burger { display: flex !important; } }
        @media (min-width: 769px) { .nav-mobile-menu { display: none !important; } }
      `}</style>

      {/* ── Hero ── */}
      <section style={{
        background: "linear-gradient(135deg, #0D1525 0%, #1a2f55 100%)",
        padding: "88px 24px 110px", textAlign: "center",
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <span style={{
            display: "inline-block", marginBottom: 22,
            background: "rgba(255,184,0,0.15)", color: "#FFB800",
            border: "1px solid rgba(255,184,0,0.3)",
            borderRadius: 50, padding: "6px 18px",
            fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            100% Gratuit · Antananarivo
          </span>

          <h1 style={{
            fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 900,
            color: "white", lineHeight: 1.15, marginBottom: 22,
          }}>
            Trouvez votre ligne de taxi-be
            <span style={{ color: "#FFB800" }}> en 2 secondes</span>
          </h1>

          <p style={{
            fontSize: "1.05rem", color: "rgba(255,255,255,0.65)",
            lineHeight: 1.75, maxWidth: 560, margin: "0 auto 20px",
          }}>
            Recherche par numéro, par arrêt, par GPS — avec correspondances incluses.
            Utilisez-la gratuitement dans votre navigateur ou téléchargez l&apos;app.
          </p>

          {/* Badge gratuit */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.06)", borderRadius: 50,
            padding: "8px 18px", marginBottom: 40, border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <span style={{ fontSize: "1rem" }}>🎁</span>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", fontWeight: 600 }}>
              Aucun abonnement · Aucune publicité intrusive · Toujours gratuit
            </span>
          </div>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/telecharger" style={{
              padding: "15px 36px", borderRadius: 50,
              background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "1rem", textDecoration: "none",
              boxShadow: "0 8px 30px rgba(255,184,0,0.4)",
            }}>
              ⬇ Télécharger l&apos;app
            </Link>
            <a href="https://taxibemada.vercel.app" style={{
              padding: "15px 36px", borderRadius: 50,
              background: "rgba(255,255,255,0.08)", color: "white",
              fontWeight: 700, fontSize: "1rem", textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.18)",
            }}>
              Essayer dans le navigateur →
            </a>
          </div>
        </div>
      </section>

      {/* ── Bannière "Essayez maintenant" ── */}
      <div style={{ background: "#FFF7E6", borderBottom: "1px solid #FDE68A", padding: "14px 24px", textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#92400E", fontWeight: 600 }}>
          🚌 Vous pouvez utiliser TaxiBe directement dans votre navigateur — gratuitement et sans télécharger.{" "}
          <a href="https://taxibemada.vercel.app" style={{ color: "#D97706", fontWeight: 800, textDecoration: "underline" }}>
            Essayer maintenant →
          </a>
        </p>
      </div>

      {/* ── Fonctionnalités ── */}
      <section id="fonctionnalites" style={{ padding: "88px 24px", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFB800", marginBottom: 12 }}>
            Fonctionnalités
          </p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 900, color: "#0D1525", marginBottom: 12 }}>
            Tout pour se déplacer à Tana
          </h2>
          <p style={{ textAlign: "center", color: "#64748B", fontSize: "0.95rem", marginBottom: 56, maxWidth: 500, margin: "0 auto 56px" }}>
            Toutes les fonctionnalités sont gratuites. Aucun compte requis pour chercher une ligne.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {[
              { emoji: "🔢", title: "Par numéro de ligne", desc: "Entrez le numéro et obtenez tous les arrêts, le trajet complet et les terminus.", color: "#FFB800", web: true },
              { emoji: "📍", title: "Par arrêt ou quartier", desc: "Indiquez votre départ et destination — TaxiBe calcule les correspondances automatiquement.", color: "#3b82f6", web: true },
              { emoji: "🛰️", title: "Arrêts près de moi", desc: "Activez le GPS pour voir toutes les lignes disponibles autour de vous en temps réel.", color: "#10b981", web: true },
              { emoji: "⭐", title: "Lignes favorites", desc: "Sauvegardez vos lignes du quotidien. Disponible après téléchargement ou connexion.", color: "#f59e0b", web: false },
              { emoji: "🎮", title: "Jeux & récompenses", desc: "Sudoku et Quiz sur les lignes de Tana. Gagnez des lots en jouant.", color: "#8b5cf6", web: false },
              { emoji: "📰", title: "Actualités & emplois", desc: "Restez informé des nouvelles et des offres d'emploi à Antananarivo.", color: "#06b6d4", web: true },
            ].map((f) => (
              <div key={f.title} style={{
                background: "white", borderRadius: 16, padding: "26px 22px",
                border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                position: "relative",
              }}>
                {!f.web && (
                  <span style={{
                    position: "absolute", top: 14, right: 14,
                    background: "#0D1525", color: "#FFB800",
                    fontSize: "0.6rem", fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                    letterSpacing: "0.05em",
                  }}>
                    APP
                  </span>
                )}
                <div style={{
                  width: 50, height: 50, borderRadius: 13,
                  background: `${f.color}18`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem", marginBottom: 16,
                }}>
                  {f.emoji}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: "0.95rem", color: "#0D1525", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: "0.84rem", color: "#64748B", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 32, fontSize: "0.82rem", color: "#94A3B8" }}>
            Les fonctionnalités marquées <strong style={{ color: "#0D1525" }}>APP</strong> sont disponibles après téléchargement — toujours gratuitement.
          </p>
        </div>
      </section>

      {/* ── CTA Téléchargement ── */}
      <section style={{
        background: "linear-gradient(135deg, #0D1525 0%, #1a2f55 100%)",
        padding: "72px 24px", textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: "3rem", marginBottom: 20 }}>📱</div>
          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900, color: "white", marginBottom: 14 }}>
            Téléchargez l&apos;app pour profiter de toutes les fonctionnalités
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 36 }}>
            Favoris, jeux, notifications, mode hors-ligne — tout ça gratuitement dans l&apos;app.
          </p>
          <Link href="/telecharger" style={{
            display: "inline-block", padding: "15px 40px", borderRadius: 50,
            background: "#FFB800", color: "#0D1525",
            fontWeight: 800, fontSize: "1rem", textDecoration: "none",
            boxShadow: "0 8px 30px rgba(255,184,0,0.35)",
          }}>
            ⬇ Voir comment télécharger — Gratuit
          </Link>
        </div>
      </section>

      {/* ── Comment ça marche ── */}
      <section id="comment" style={{ padding: "88px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFB800", marginBottom: 12 }}>
            Utilisation
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 900, color: "#0D1525", marginBottom: 56 }}>
            Comment ça marche ?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {[
              { num: "1", title: "Ouvrez l'application", desc: "Directement dans votre navigateur — gratuit, sans compte, sans télécharger." },
              { num: "2", title: "Choisissez votre mode de recherche", desc: "Par numéro de ligne, par arrêt/quartier, ou par votre position GPS." },
              { num: "3", title: "Consultez votre itinéraire", desc: "Lignes directes, correspondances et double correspondances calculées automatiquement." },
              { num: "4", title: "Téléchargez pour encore plus", desc: "Sauvegardez vos favoris, accédez hors-ligne, jouez et gagnez des lots — toujours gratuit." },
            ].map((step) => (
              <div key={step.num} style={{ display: "flex", alignItems: "flex-start", gap: 20, textAlign: "left" }}>
                <div style={{
                  flexShrink: 0, width: 48, height: 48, borderRadius: "50%",
                  background: "#0D1525", color: "#FFB800",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "1.1rem",
                }}>
                  {step.num}
                </div>
                <div style={{ paddingTop: 10 }}>
                  <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "#0D1525", marginBottom: 6 }}>{step.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "#64748B", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
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
            <div style={{ maxWidth: 280 }}>
              <Image src="/logo_taxibe_vertcal.png" alt="TaxiBe" width={160} height={80}
                style={{ height: 36, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", marginBottom: 14 }} />
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: 0 }}>
                L&apos;application de référence pour trouver vos lignes de taxi-be à Antananarivo. <strong style={{ color: "#FFB800" }}>Gratuit.</strong>
              </p>
            </div>
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>Application</p>
                {[
                  { label: "Fonctionnalités", href: "#fonctionnalites" },
                  { label: "Comment ça marche", href: "#comment" },
                  { label: "Télécharger l'app", href: "/telecharger" },
                  { label: "Utiliser dans le navigateur", href: "https://taxibemada.vercel.app" },
                ].map((l) => (
                  <a key={l.label} href={l.href} style={{ display: "block", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", marginBottom: 8, fontWeight: 500 }}>{l.label}</a>
                ))}
              </div>
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>Légal</p>
                {[
                  { label: "Confidentialité", href: "https://taxibemada.vercel.app/politique-confidentialite" },
                  { label: "Conditions d'utilisation", href: "https://taxibemada.vercel.app/conditions" },
                ].map((l) => (
                  <a key={l.label} href={l.href} style={{ display: "block", fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", marginBottom: 8, fontWeight: 500 }}>{l.label}</a>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>© {new Date().getFullYear()} TaxiBe. Tous droits réservés.</p>
            <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>Antananarivo, Madagascar</p>
          </div>
        </div>
      </footer>

    </main>
  );
}
