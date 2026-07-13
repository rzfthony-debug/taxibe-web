"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Icônes ────────────────────────────────────────────────────────────────────

function IcoSearch() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
}
function IcoHash() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>;
}
function IcoMapPin() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function IcoNewspaper() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6z"/></svg>;
}
function IcoBriefcase() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
}
function IcoInfo() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
}
function IcoUsers() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
function IcoShield() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}
function IcoDoc() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
}
function IcoChevron({ open }: { open: boolean }) {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none", flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>;
}
function IcoLock() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
}

// ── Données ───────────────────────────────────────────────────────────────────

const sections = [
  {
    key: "rechercher",
    label: "Rechercher",
    headerIcon: <IcoSearch />,
    items: [
      { label: "Par numero de ligne",    desc: "Tapez 147, 135, 20B, 182...", href: "/recherche",  icon: <IcoHash /> },
      { label: "Par arret ou quartier",  desc: "Disponible dans l'application", href: "/telecharger", icon: <IcoMapPin />, badge: "APP" },
    ],
  },
  {
    key: "informations",
    label: "Informations",
    headerIcon: <IcoNewspaper />,
    items: [
      { label: "Actualites",    desc: "Nouvelles et annonces",      href: "/actualites", icon: <IcoNewspaper /> },
      { label: "Offres d'emploi", desc: "Postes disponibles a Tana", href: "/emplois",    icon: <IcoBriefcase /> },
    ],
  },
  {
    key: "apropos",
    label: "A propos",
    headerIcon: <IcoInfo />,
    items: [
      { label: "A propos de TaxiBe",      desc: "Notre mission et notre equipe", href: "/a-propos",        icon: <IcoUsers /> },
      { label: "Mentions legales",         desc: "Informations legales",          href: "/mentions-legales", icon: <IcoShield /> },
      { label: "Conditions d'utilisation", desc: "Regles d'usage du service",    href: "/conditions",       icon: <IcoDoc /> },
    ],
  },
];

// ── Composant ─────────────────────────────────────────────────────────────────

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setOpen(false);
  }, [pathname]);

  function handleEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 80);
  }

  return (
    <>
      <style>{`
        .nav-trigger {
          display: flex; align-items: center; gap: 5px;
          padding: 8px 14px; border-radius: 8px;
          font-size: 0.875rem; font-weight: 600; color: #64748B;
          background: none; border: none; cursor: pointer;
          font-family: var(--font-poppins), system-ui;
          transition: color 0.15s, background 0.15s;
          white-space: nowrap;
        }
        .nav-trigger:hover, .nav-trigger.active { color: #0D1525; background: #F8F9FB; }
        .mega-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 10px 12px; border-radius: 10px; text-decoration: none;
          transition: background 0.15s; cursor: pointer;
        }
        .mega-item:hover { background: #FFFBEB; }
        .mega-item:hover .mega-icon { background: #FFB800; color: #0D1525; }
        .mega-item:hover .mega-label { color: #B45309; }
        .mega-icon {
          width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
          background: #F1F5F9; color: #64748B;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, color 0.15s;
        }
        .mega-label { font-weight: 700; font-size: 0.875rem; color: #0D1525; margin: 0 0 2px; transition: color 0.15s; }
        .mega-desc  { font-size: 0.775rem; color: #94A3B8; margin: 0; font-weight: 500; }
        .nav-desktop { display: flex; align-items: center; gap: 2px; }
        .nav-burger  { display: none; }
        .nav-mobile-panel { display: none; }
        .admin-btn { transition: background 0.15s, border-color 0.15s; }
        .admin-btn:hover { background: #0D1525 !important; border-color: #0D1525 !important; }
        .admin-btn:hover svg { stroke: #FFB800; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-burger  { display: flex !important; }
          .nav-mobile-panel { display: block !important; }
          .nav-cta { display: none !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-panel { display: none !important; }
        }
      `}</style>

      <nav ref={navRef} style={{ position: "sticky", top: 0, zIndex: 200, background: "white", borderBottom: "1px solid #E2E8F0", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>

        {/* ── Barre principale ── */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0, zIndex: 1 }}>
            <Image src="/logo_taxibe_vertcal.png" alt="TaxiBe" width={360} height={180}
              style={{ height: 36, width: "auto", objectFit: "contain" }} priority />
          </Link>

          {/* Triggers desktop */}
          <div className="nav-desktop" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            {sections.map((s) => (
              <button key={s.key} className={`nav-trigger${open ? " active" : ""}`}
                onMouseEnter={handleEnter} aria-expanded={open}>
                {s.label}
                <IcoChevron open={open} />
              </button>
            ))}
          </div>

          {/* Droite */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link href="/gestion/login" title="Espace administrateur" className="admin-btn" style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "#F1F5F9", border: "1.5px solid #E2E8F0",
              display: "flex", alignItems: "center", justifyContent: "center",
              textDecoration: "none", flexShrink: 0,
            }}>
              <IcoLock />
            </Link>

            <Link href="/telecharger" className="nav-cta" style={{
              padding: "9px 20px", borderRadius: 8,
              background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "0.875rem", textDecoration: "none", whiteSpace: "nowrap",
            }}>
              Telecharger l&apos;app
            </Link>

            <button className="nav-burger" onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 8, borderRadius: 8, color: "#0D1525" }}
              aria-label="Menu">
              {mobileOpen
                ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
              }
            </button>
          </div>
        </div>

        {/* ── Mega menu panel (desktop) ── */}
        {open && (
          <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} style={{
            position: "absolute", left: 0, right: 0,
            background: "white",
            borderTop: "1px solid #F1F5F9",
            borderBottom: "1px solid #E2E8F0",
            boxShadow: "0 16px 48px rgba(0,0,0,0.10)",
            zIndex: 300,
          }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {sections.map((s) => (
                <div key={s.key}>
                  {/* Header section */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, paddingLeft: 12 }}>
                    <span style={{ color: "#FFB800" }}>{s.headerIcon}</span>
                    <span style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0D1525" }}>
                      {s.label}
                    </span>
                  </div>

                  {/* Items */}
                  {s.items.map((item) => (
                    <Link key={item.href} href={item.href} className="mega-item" onClick={() => setOpen(false)}>
                      <div className="mega-icon">{item.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <p className="mega-label">{item.label}</p>
                          {"badge" in item && item.badge && (
                            <span style={{ flexShrink: 0, background: "#0D1525", color: "#FFB800", fontSize: "0.58rem", fontWeight: 800, padding: "2px 7px", borderRadius: 4, letterSpacing: "0.06em" }}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {"desc" in item && item.desc && <p className="mega-desc">{item.desc}</p>}
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Menu mobile ── */}
        {mobileOpen && (
          <div className="nav-mobile-panel" style={{ background: "white", borderTop: "1px solid #F1F5F9", padding: "8px 20px 20px" }}>
            {sections.map((s) => (
              <div key={s.key} style={{ borderBottom: "1px solid #F1F5F9" }}>
                <button onClick={() => setMobileExpanded(mobileExpanded === s.key ? null : s.key)}
                  style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", fontWeight: 700, fontSize: "0.9375rem", color: "#0D1525", fontFamily: "var(--font-poppins), system-ui" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#FFB800" }}>{s.headerIcon}</span>
                    {s.label}
                  </span>
                  <IcoChevron open={mobileExpanded === s.key} />
                </button>
                {mobileExpanded === s.key && (
                  <div style={{ paddingBottom: 10, display: "flex", flexDirection: "column", gap: 2 }}>
                    {s.items.map((item) => (
                      <Link key={item.href} href={item.href} className="mega-item" onClick={() => setMobileOpen(false)}>
                        <div className="mega-icon">{item.icon}</div>
                        <div>
                          <p className="mega-label">{item.label}</p>
                          {"desc" in item && item.desc && <p className="mega-desc">{item.desc}</p>}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <Link href="/gestion/login" style={{ flex: 1, padding: "12px", borderRadius: 8, textAlign: "center", background: "#F1F5F9", color: "#0D1525", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none" }}>
                Espace admin
              </Link>
              <Link href="/telecharger" style={{ flex: 2, padding: "12px", borderRadius: 8, textAlign: "center", background: "#FFB800", color: "#0D1525", fontWeight: 800, fontSize: "0.9375rem", textDecoration: "none" }}>
                Telecharger l&apos;app
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
