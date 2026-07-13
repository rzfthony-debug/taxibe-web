"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuKey = "rechercher" | "informations" | "apropos" | null;

const menus: Record<
  Exclude<MenuKey, null>,
  {
    label: string;
    items: { label: string; desc?: string; href: string; badge?: string }[];
  }
> = {
  rechercher: {
    label: "Rechercher",
    items: [
      { label: "Par numéro de ligne", desc: "Tapez 147, 135, 20B, 182…", href: "/recherche" },
      { label: "Par arrêt ou quartier", desc: "Disponible dans l'application", href: "/telecharger", badge: "APP" },
    ],
  },
  informations: {
    label: "Informations",
    items: [
      { label: "Actualités", desc: "Nouvelles et annonces", href: "/actualites" },
      { label: "Offres d'emploi", desc: "Postes disponibles à Tana", href: "/emplois" },
    ],
  },
  apropos: {
    label: "À propos",
    items: [
      { label: "À propos de TaxiBe", desc: "Notre mission et notre équipe", href: "/a-propos" },
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Conditions d'utilisation", href: "/conditions" },
    ],
  },
};

export default function Nav() {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<MenuKey>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <style>{`
        .nav-desktop-links { display: flex; align-items: center; gap: 2px; }
        .nav-burger-btn { display: none; }
        .nav-mobile-panel { display: none; }
        .mega-trigger { padding: 8px 12px; border-radius: 8px; font-size: 0.875rem; font-weight: 600;
          color: #64748B; background: none; border: none; cursor: pointer; display: flex; align-items: center;
          gap: 5px; font-family: var(--font-poppins), system-ui; }
        .mega-trigger:hover { color: #0D1525; background: #F8F9FB; }
        .mega-trigger.active { color: #0D1525; }
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-burger-btn { display: flex !important; }
          .nav-mobile-panel { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-panel { display: none !important; }
        }
      `}</style>

      <nav ref={navRef} style={{
        position: "sticky", top: 0, zIndex: 200,
        background: "white", borderBottom: "1px solid #E2E8F0",
        boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: "0 24px",
          height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "relative",
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0, zIndex: 1 }}>
            <Image src="/logo_taxibe_vertcal.png" alt="TaxiBe" width={360} height={180}
              style={{ height: 36, width: "auto", objectFit: "contain" }} priority />
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop-links">
            {(Object.keys(menus) as Exclude<MenuKey, null>[]).map((key) => (
              <div key={key} style={{ position: "relative" }}
                onMouseEnter={() => setOpenMenu(key)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  className={`mega-trigger${openMenu === key ? " active" : ""}`}
                  onClick={() => setOpenMenu(openMenu === key ? null : key)}
                  aria-expanded={openMenu === key}
                >
                  {menus[key].label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ transition: "transform 0.2s", transform: openMenu === key ? "rotate(180deg)" : "none" }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                {/* Dropdown panel */}
                {openMenu === key && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 8px)", left: "50%",
                    transform: "translateX(-50%)",
                    background: "white", borderRadius: 12,
                    border: "1px solid #E8ECF0",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                    padding: "8px", minWidth: 260, zIndex: 300,
                  }}>
                    {/* Arrow */}
                    <div style={{
                      position: "absolute", top: -6, left: "50%",
                      width: 12, height: 12, background: "white",
                      border: "1px solid #E8ECF0", borderRight: "none", borderBottom: "none",
                      transform: "translateX(-50%) rotate(45deg)",
                    }} />
                    {menus[key].items.map((item) => (
                      <Link key={item.href + item.label} href={item.href}
                        onClick={() => setOpenMenu(null)}
                        style={{
                          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                          gap: 10, padding: "10px 14px", borderRadius: 8,
                          textDecoration: "none", color: "#0D1525",
                          transition: "background 0.1s",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F8F9FB"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                      >
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.875rem", color: "#0D1525" }}>
                            {item.label}
                          </p>
                          {item.desc && (
                            <p style={{ margin: "2px 0 0", fontSize: "0.775rem", color: "#94A3B8", fontWeight: 500 }}>
                              {item.desc}
                            </p>
                          )}
                        </div>
                        {item.badge && (
                          <span style={{
                            flexShrink: 0, marginTop: 2,
                            background: "#0D1525", color: "#FFB800",
                            fontSize: "0.6rem", fontWeight: 800, padding: "2px 7px", borderRadius: 4,
                            letterSpacing: "0.06em",
                          }}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Bouton admin rond */}
            <Link href="/gestion/login" title="Espace administrateur" style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "#F1F5F9", border: "1.5px solid #E2E8F0",
              display: "flex", alignItems: "center", justifyContent: "center",
              textDecoration: "none", flexShrink: 0,
              transition: "border-color 0.15s, background 0.15s",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#0D1525";
                (e.currentTarget as HTMLElement).style.borderColor = "#0D1525";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#F1F5F9";
                (e.currentTarget as HTMLElement).style.borderColor = "#E2E8F0";
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </Link>

            {/* CTA télécharger */}
            <Link href="/telecharger" className="nav-desktop-links" style={{
              padding: "9px 20px", borderRadius: 8,
              background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "0.875rem", textDecoration: "none",
            }}>
              Télécharger l&apos;app
            </Link>

            {/* Burger mobile */}
            <button
              className="nav-burger-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 8, borderRadius: 8, color: "#0D1525" }}
              aria-label="Menu"
            >
              {mobileOpen
                ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
              }
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {mobileOpen && (
          <div className="nav-mobile-panel" style={{
            background: "white", borderTop: "1px solid #F1F5F9",
            padding: "8px 20px 20px",
          }}>
            {(Object.keys(menus) as Exclude<MenuKey, null>[]).map((key) => (
              <div key={key} style={{ borderBottom: "1px solid #F1F5F9" }}>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                  style={{
                    width: "100%", background: "none", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 0", fontWeight: 700, fontSize: "0.9375rem", color: "#0D1525",
                    fontFamily: "var(--font-poppins), system-ui",
                  }}
                >
                  {menus[key].label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5"
                    style={{ transform: mobileExpanded === key ? "rotate(180deg)" : "none" }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {mobileExpanded === key && (
                  <div style={{ paddingBottom: 10, display: "flex", flexDirection: "column", gap: 2 }}>
                    {menus[key].items.map((item) => (
                      <Link key={item.href + item.label} href={item.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "10px 12px", borderRadius: 8, textDecoration: "none",
                        }}
                      >
                        <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "#374151" }}>{item.label}</span>
                        {item.badge && (
                          <span style={{ background: "#0D1525", color: "#FFB800", fontSize: "0.58rem", fontWeight: 800, padding: "2px 7px", borderRadius: 4 }}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <Link href="/gestion/login" style={{
                flex: 1, padding: "12px", borderRadius: 8, textAlign: "center",
                background: "#F1F5F9", color: "#0D1525",
                fontWeight: 700, fontSize: "0.875rem", textDecoration: "none",
              }}>
                Espace admin
              </Link>
              <Link href="/telecharger" style={{
                flex: 2, padding: "12px", borderRadius: 8, textAlign: "center",
                background: "#FFB800", color: "#0D1525",
                fontWeight: 800, fontSize: "0.9375rem", textDecoration: "none",
              }}>
                Télécharger l&apos;app
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
