"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { logoutAdmin } from "../actions";

const NAV_SECTIONS = [
  {
    label: "Vue d'ensemble",
    items: [
      { href: "/gestion",              label: "Dashboard",    icon: "▦" },
    ],
  },
  {
    label: "Site web",
    items: [
      { href: "/gestion/actualites",   label: "Actualités",   icon: "📰" },
      { href: "/gestion/spotlight",    label: "Spotlight",    icon: "📣" },
      { href: "/gestion/emplois",      label: "Carrières",    icon: "💼" },
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
      { href: "/gestion/utilisateurs", label: "Accès & rôles", icon: "🔑" },
    ],
  },
];

export default function AdminSidebar({ nom }: { nom: string }) {
  const [open, setOpen] = useState(false);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Image
            src="/logo_taxibe_vertcal.png"
            alt="TaxiBe"
            width={120}
            height={60}
            style={{ height: 36, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }}
            priority
          />
          {/* Bouton fermer sur mobile */}
          <button
            onClick={() => setOpen(false)}
            className="admin-close-btn"
            aria-label="Fermer le menu"
            style={{
              display: "none", background: "none", border: "none",
              color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "1.4rem", padding: 4,
            }}
          >
            ✕
          </button>
        </div>
        <p style={{ margin: "8px 0 0", fontSize: "0.62rem", color: "rgba(255,255,255,0.3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Administration
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} style={{ marginBottom: 18 }}>
            <p style={{
              margin: "0 0 4px 10px", fontSize: "0.6rem", fontWeight: 800,
              textTransform: "uppercase", letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.25)",
            }}>
              {section.label}
            </p>
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="admin-nav-item"
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 12px", borderRadius: 9, marginBottom: 2,
                  textDecoration: "none", color: "rgba(255,255,255,0.65)",
                  fontSize: "0.85rem", fontWeight: 600, transition: "background 0.15s",
                }}
              >
                <span style={{ fontSize: "1rem", flexShrink: 0 }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Utilisateur + déconnexion */}
      <div style={{ padding: "16px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%", background: "#FFB800",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: "0.8rem", color: "#0D1525", flexShrink: 0,
          }}>
            {nom.charAt(0).toUpperCase()}
          </div>
          <span style={{
            fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", fontWeight: 600,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {nom}
          </span>
        </div>
        <form action={logoutAdmin}>
          <button type="submit" style={{
            width: "100%", padding: "8px", borderRadius: 8,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
          }}>
            Se déconnecter
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        /* ── Sidebar desktop ── */
        .admin-sidebar {
          width: 240px; flex-shrink: 0;
          background: #0D1525;
          display: flex; flex-direction: column;
          position: sticky; top: 0; height: 100vh;
        }
        /* ── Topbar mobile ── */
        .admin-topbar {
          display: none;
          position: sticky; top: 0; z-index: 40;
          background: #0D1525;
          padding: 12px 16px;
          align-items: center; justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        /* ── Drawer overlay mobile ── */
        .admin-overlay {
          display: none;
          position: fixed; inset: 0; z-index: 50;
          background: rgba(0,0,0,0.5);
        }
        .admin-drawer {
          position: fixed; top: 0; left: 0; bottom: 0;
          width: 260px; background: #0D1525;
          display: flex; flex-direction: column;
          z-index: 51;
          transform: translateX(-100%);
          transition: transform 0.25s ease;
        }
        .admin-nav-item:hover { background: rgba(255,255,255,0.07) !important; color: white !important; }

        @media (max-width: 768px) {
          .admin-sidebar { display: none !important; }
          .admin-topbar { display: flex !important; }
          .admin-overlay { display: block !important; }
          .admin-close-btn { display: block !important; }
          .admin-drawer { transform: ${open ? "translateX(0)" : "translateX(-100%)"}; }
          .admin-main { padding: 16px !important; }
          .page-header { flex-wrap: wrap; gap: 10px; }
          .page-title { font-size: 1.1rem !important; }
          .card { border-radius: 10px !important; }
          .card > div[style*="overflow-x"] { overflow-x: auto; }
        }
      `}</style>

      {/* ── Desktop sidebar ── */}
      <aside className="admin-sidebar">
        {sidebarContent}
      </aside>

      {/* ── Mobile topbar ── */}
      <div className="admin-topbar">
        <button
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
          style={{ background: "none", border: "none", cursor: "pointer", color: "white", padding: 4 }}
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
          style={{ height: 28, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }}
        />
        <div style={{ width: 30 }} />
      </div>

      {/* ── Mobile overlay + drawer ── */}
      {open && (
        <div
          className="admin-overlay"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}
      <aside className="admin-drawer">
        {sidebarContent}
      </aside>
    </>
  );
}
