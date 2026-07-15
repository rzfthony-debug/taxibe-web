"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { logoutAdmin } from "../actions";

const NAV_SECTIONS = [
  {
    label: "Vue d'ensemble",
    items: [{ href: "/gestion", label: "Dashboard", icon: "▦" }],
  },
  {
    label: "Site web",
    items: [
      { href: "/gestion/actualites", label: "Actualités",  icon: "📰" },
      { href: "/gestion/spotlight",  label: "Spotlight",   icon: "📣" },
      { href: "/gestion/emplois",    label: "Carrières",   icon: "💼" },
      { href: "/gestion/messages",   label: "Messages",    icon: "✉️" },
    ],
  },
  {
    label: "Application",
    items: [
      { href: "/gestion/lignes",       label: "Lignes",       icon: "🚌" },
      { href: "/gestion/arrets",       label: "Arrêts",       icon: "📍" },
      { href: "/gestion/cooperatives", label: "Coopératives", icon: "🏢" },
      { href: "/gestion/signalements", label: "Signalements", icon: "⚠️" },
    ],
  },
  {
    label: "Administration",
    items: [
      { href: "/gestion/parametres",   label: "Paramètres",   icon: "⚙️" },
      { href: "/gestion/utilisateurs", label: "Accès & rôles", icon: "🔑" },
    ],
  },
];

function NavContent({ nom, onClose }: { nom: string; onClose?: () => void }) {
  return (
    <>
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Image
            src="/logo_taxibe_noir.png"
            alt="TaxiBe"
            width={120}
            height={60}
            style={{ height: 34, width: "auto", objectFit: "contain" }}
            priority
          />
          {onClose && (
            <button onClick={onClose} style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.45)",
              cursor: "pointer", fontSize: "1.3rem", padding: 4, lineHeight: 1,
            }}>✕</button>
          )}
        </div>
        <p style={{ margin: "8px 0 0", fontSize: "0.6rem", color: "rgba(255,255,255,0.28)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Administration
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} style={{ marginBottom: 18 }}>
            <p style={{ margin: "0 0 4px 10px", fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.22)" }}>
              {section.label}
            </p>
            {section.items.map((item) => (
              <Link key={item.href} href={item.href} onClick={onClose} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: 9, marginBottom: 2,
                textDecoration: "none", color: "rgba(255,255,255,0.65)",
                fontSize: "0.85rem", fontWeight: 600,
              }}
              className="admin-nav-item"
              >
                <span style={{ fontSize: "1rem", flexShrink: 0 }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* User + logout */}
      <div style={{ padding: "14px", borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%", background: "#FFB800",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: "0.78rem", color: "#0D1525", flexShrink: 0,
          }}>
            {nom.charAt(0).toUpperCase()}
          </div>
          <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {nom}
          </span>
        </div>
        <form action={logoutAdmin}>
          <button type="submit" style={{
            width: "100%", padding: "7px", borderRadius: 8,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)",
            color: "rgba(255,255,255,0.45)", fontSize: "0.76rem", fontWeight: 600, cursor: "pointer",
          }}>
            Se déconnecter
          </button>
        </form>
      </div>
    </>
  );
}

export default function AdminSidebar({ nom }: { nom: string }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <style>{`
        .admin-nav-item:hover { background: rgba(255,255,255,0.08) !important; color: white !important; }

        /* ── Desktop sidebar ── */
        .admin-sidebar-desktop {
          width: 240px;
          flex-shrink: 0;
          background: #0D1525;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
        }

        /* ── Mobile topbar (fixed) ── */
        .admin-topbar-mobile {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          height: 52px;
          background: white;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          border-bottom: 1px solid #E2E8F0;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }

        /* ── Drawer overlay ── */
        .admin-drawer-overlay {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 110;
          background: rgba(0,0,0,0.55);
        }
        .admin-drawer-overlay.open { display: block; }

        /* ── Drawer panel ── */
        .admin-drawer-panel {
          position: fixed;
          top: 0; left: 0; bottom: 0;
          width: 260px;
          background: #0D1525;
          display: flex;
          flex-direction: column;
          z-index: 120;
          transform: translateX(-100%);
          transition: transform 0.22s ease;
        }
        .admin-drawer-panel.open { transform: translateX(0); }

        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-topbar-mobile   { display: flex !important; }
        }
      `}</style>

      {/* ── Desktop sidebar ── */}
      <aside className="admin-sidebar-desktop">
        <NavContent nom={nom} />
      </aside>

      {/* ── Mobile topbar ── */}
      <div className="admin-topbar-mobile">
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Menu"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#0D1525", padding: 4, display: "flex" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <Image
          src="/logo_taxibe_vertcal.png"
          alt="TaxiBe"
          width={90}
          height={45}
          style={{ height: 26, width: "auto", objectFit: "contain" }}
        />
        <div style={{ width: 30 }} />
      </div>

      {/* ── Drawer overlay ── */}
      <div
        className={`admin-drawer-overlay${drawerOpen ? " open" : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden
      />

      {/* ── Drawer panel ── */}
      <aside className={`admin-drawer-panel${drawerOpen ? " open" : ""}`}>
        <NavContent nom={nom} onClose={() => setDrawerOpen(false)} />
      </aside>
    </>
  );
}
