"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Icônes ────────────────────────────────────────────────────────────────────

const Ico = {
  chevron: (open: boolean) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none", flexShrink: 0 }}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  search: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  heart: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  barChart: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  map: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  users: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  building: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="9" width="18" height="12" rx="2"/><path d="M8 9V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"/><line x1="12" y1="12" x2="12" y2="15"/></svg>,
  globe: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  megaphone: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
  mail: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  lock: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  arrowRight: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  briefcase: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>,
  helpCircle: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  flag: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
  handshake: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.4 5.4 0 0 0 -.42-8.81"/><path d="m9 11 3 3 3-3"/></svg>,
};

// ── Contenu des panneaux ───────────────────────────────────────────────────────

type PanelItem = { label: string; desc: string; href: string; icon: React.ReactNode };
type PanelDef = {
  items: PanelItem[];
  featured?: {
    eyebrow?: string;
    title: string;
    cta: string;
    href: string;
    subtleLink?: { label: string; href: string };
  };
};

const PANELS: Record<string, PanelDef> = {
  projet: {
    items: [
      { label: "Notre mission",    desc: "Pourquoi TaxiBe existe",           href: "/le-projet#mission",  icon: Ico.heart },
      { label: "Impact & données", desc: "Ce qu'on construit et pourquoi",   href: "/le-projet#impact",   icon: Ico.barChart },
      { label: "Feuille de route", desc: "Les prochaines étapes du projet",  href: "/le-projet#roadmap",  icon: Ico.map },
      { label: "Carrières",        desc: "Rejoindre l'équipe TaxiBe",        href: "/emplois",             icon: Ico.briefcase },
    ],
    featured: {
      eyebrow: "Le projet",
      title: "Cartographier le transport collectif d'Antananarivo pour tous.",
      cta: "Découvrir le projet",
      href: "/le-projet",
    },
  },
  partenaires: {
    items: [
      { label: "Coopératives de transport",    desc: "Opérateurs du réseau taxi-be",          href: "/partenaires#cooperatives", icon: Ico.users },
      { label: "Institutions & collectivités", desc: "Mairies, ministères, bailleurs",         href: "/partenaires#institutions", icon: Ico.building },
      { label: "Acteurs de la mobilité",       desc: "ONG, startups, chercheurs",              href: "/partenaires#mobilite",     icon: Ico.globe },
      { label: "Collaborer avec nous",         desc: "Développeurs, designers, terrain",        href: "/contact#collaborer",       icon: Ico.handshake },
    ],
    featured: {
      eyebrow: "Partenaires",
      title: "Vous voulez contribuer à construire l'infrastructure du transport collectif à Tana ?",
      cta: "Nous rejoindre",
      href: "/contact",
      subtleLink: { label: "Vous êtes investisseur ?", href: "/partenaires#investisseurs" },
    },
  },
  communaute: {
    items: [
      { label: "Blog",                desc: "Actualités et conseils mobilité",     href: "/blog",                icon: Ico.megaphone },
      { label: "Aide & FAQ",         desc: "Questions fréquentes sur TaxiBe",      href: "/aide",              icon: Ico.helpCircle },
      { label: "Signaler une erreur", desc: "Ligne incorrecte, arrêt manquant…",   href: "/contact#signalement", icon: Ico.flag },
    ],
    featured: {
      eyebrow: "Communauté",
      title: "TaxiBe s'améliore grâce à ses utilisateurs. Signalez, questionnez, contribuez.",
      cta: "Nous contacter",
      href: "/contact",
    },
  },
};

// ── Éléments de navigation ────────────────────────────────────────────────────

const NAV_ITEMS = [
  { key: "rechercher",  label: "Rechercher",  href: "/recherche",   hasPanel: false },
  { key: "projet",      label: "Le Projet",   href: "/le-projet",   hasPanel: true  },
  { key: "partenaires", label: "Partenaires", href: "/partenaires", hasPanel: true  },
  { key: "communaute",  label: "Communauté",  href: "/communaute",  hasPanel: true  },
];

// Préfixes de route couverts par chaque section, pour l'indicateur de page active.
const SECTION_PREFIXES: Record<string, string[]> = {
  rechercher:  ["/recherche", "/ligne"],
  projet:      ["/le-projet", "/emplois"],
  partenaires: ["/partenaires"],
  communaute:  ["/blog", "/aide", "/contact", "/communaute"],
};

function currentSectionKey(pathname: string): string | null {
  for (const item of NAV_ITEMS) {
    if (SECTION_PREFIXES[item.key]?.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
      return item.key;
    }
  }
  return null;
}

// ── Panel desktop ─────────────────────────────────────────────────────────────

function Panel({ sectionKey, onClose }: { sectionKey: string; onClose: () => void }) {
  const panel = PANELS[sectionKey];
  if (!panel) return null;
  const hasFeatured = !!panel.featured;
  const cols = panel.items.length;

  return (
    <div style={{
      maxWidth: 1200, margin: "0 auto",
      padding: "32px 24px 28px",
      display: "grid",
      gridTemplateColumns: hasFeatured ? "1fr 260px" : "1fr",
      gap: 40,
      alignItems: "start",
    }}>

      {/* Items en colonnes */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 4,
      }}>
        {panel.items.map((item) => (
          <Link key={item.label} href={item.href} onClick={onClose} className="nav-panel-card">
            <div className="nav-panel-icon">{item.icon}</div>
            <div>
              <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: "0.85rem", color: "#0D1525", lineHeight: 1.3 }}>{item.label}</p>
              <p style={{ margin: 0, fontSize: "0.73rem", color: "#94A3B8", lineHeight: 1.45 }}>{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured */}
      {panel.featured && (
        <div style={{
          background: "#0D1525", borderRadius: 14, padding: "24px 20px",
          display: "flex", flexDirection: "column", gap: 14,
        }}>
          {panel.featured.eyebrow && (
            <span style={{ fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800" }}>
              {panel.featured.eyebrow}
            </span>
          )}
          <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 700, color: "white", lineHeight: 1.55 }}>
            {panel.featured.title}
          </p>
          <Link href={panel.featured.href} onClick={onClose} style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "9px 16px", borderRadius: 8,
            background: "#FFB800", color: "#0D1525",
            fontWeight: 800, fontSize: "0.78rem", textDecoration: "none", alignSelf: "flex-start",
          }}>
            {panel.featured.cta}
            {Ico.arrowRight}
          </Link>
          {panel.featured.subtleLink && (
            <Link href={panel.featured.subtleLink.href} onClick={onClose} style={{
              fontSize: "0.7rem", color: "rgba(255,255,255,0.35)",
              textDecoration: "none", textAlign: "center", transition: "color 0.15s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
            >
              {panel.featured.subtleLink.label}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

// ── Nav principal ─────────────────────────────────────────────────────────────

export default function Nav() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setActiveSection(null);
  }, [pathname]);

  function openSection(key: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveSection(key);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setActiveSection(null), 220);
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  const isPanelOpen = activeSection !== null;
  const currentKey = currentSectionKey(pathname);

  return (
    <>
      <style>{`
        @keyframes nav-icon-pop {
          0%   { transform: scale(1)    rotate(0deg); }
          35%  { transform: scale(1.22) rotate(-8deg); }
          65%  { transform: scale(1.15) rotate(4deg); }
          100% { transform: scale(1)    rotate(0deg); }
        }
        .nav-panel-card {
          display: flex; flex-direction: column; gap: 16px;
          padding: 20px 16px; border-radius: 14px;
          text-decoration: none; transition: background 0.15s;
        }
        .nav-panel-card:hover { background: #F8F9FB; }
        .nav-panel-icon {
          width: 56px; height: 56px; border-radius: 14px;
          background: #F1F5F9; color: #64748B;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .nav-panel-icon svg { width: 24px; height: 24px; }
        .nav-panel-card:hover .nav-panel-icon {
          background: #FFB800; color: #0D1525;
          animation: nav-icon-pop 0.38s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .nav-trigger {
          display: flex; align-items: center; gap: 5px;
          padding: 8px 12px; border-radius: 8px;
          font-size: 0.875rem; font-weight: 600; color: #64748B;
          background: none; border: none; cursor: pointer;
          font-family: inherit; position: relative;
          transition: color 0.15s, background 0.15s; white-space: nowrap;
        }
        .nav-trigger:hover, .nav-trigger.active { color: #0D1525; background: #F8F9FB; }
        .nav-trigger.current, .nav-link.current { color: #0D1525; background: rgba(255,184,0,0.1); }
        .nav-trigger.current::after, .nav-link.current::after {
          content: ""; position: absolute; left: 12px; right: 12px; bottom: 1px;
          height: 2px; border-radius: 2px; background: #FFB800;
        }
        .nav-link {
          display: flex; align-items: center; gap: 5px;
          padding: 8px 12px; border-radius: 8px;
          font-size: 0.875rem; font-weight: 600; color: #64748B;
          text-decoration: none; position: relative;
          transition: color 0.15s, background 0.15s; white-space: nowrap;
        }
        .nav-link:hover { color: #0D1525; background: #F8F9FB; }
        .nav-desktop { display: flex; align-items: center; gap: 1px; }
        .nav-burger  { display: none; }
        .nav-ctas    { display: flex; align-items: center; gap: 8px; }
        @media (max-width: 940px) {
          .nav-desktop { display: none !important; }
          .nav-burger  { display: flex !important; }
          .nav-ctas    { display: none !important; }
        }
      `}</style>

      <nav style={{ position: "sticky", top: 0, zIndex: 200, background: "white", borderBottom: "1px solid #E2E8F0", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>

        {/* ── Barre principale ── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
            <Image src="/logo_taxibe_vertcal.png" alt="TaxiBe" width={360} height={180}
              sizes="180px"
              style={{ height: 36, width: "auto", objectFit: "contain" }} priority />
          </Link>

          {/* Navigation desktop */}
          <div className="nav-desktop">
            {NAV_ITEMS.map((item) =>
              item.hasPanel ? (
                <button
                  key={item.key}
                  className={`nav-trigger${activeSection === item.key ? " active" : ""}${currentKey === item.key ? " current" : ""}`}
                  onMouseEnter={() => openSection(item.key)}
                  onMouseLeave={scheduleClose}
                  onClick={() => activeSection === item.key ? setActiveSection(null) : openSection(item.key)}
                  aria-expanded={activeSection === item.key}
                  aria-haspopup="true"
                  aria-current={currentKey === item.key ? "page" : undefined}
                >
                  {item.label}
                  {Ico.chevron(activeSection === item.key)}
                </button>
              ) : (
                <Link key={item.key} href={item.href} className={`nav-link${currentKey === item.key ? " current" : ""}`}
                  aria-current={currentKey === item.key ? "page" : undefined}>
                  {Ico.search}
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* CTAs droite */}
          <div className="nav-ctas">
            <Link href="/le-projet" style={{
              padding: "9px 20px", borderRadius: 8,
              background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "0.875rem", textDecoration: "none", whiteSpace: "nowrap",
            }}>
              Voir le projet
            </Link>
            <Link href="/telecharger" style={{
              padding: "8px 18px", borderRadius: 8,
              border: "1.5px solid #E2E8F0", color: "#64748B",
              fontWeight: 700, fontSize: "0.875rem", textDecoration: "none", whiteSpace: "nowrap",
              background: "white",
            }}>
              Ouvrir l&apos;app
            </Link>
          </div>

          {/* Burger mobile */}
          <button className="nav-burger" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, borderRadius: 8, color: "#0D1525", display: "none" }}
            aria-label="Menu">
            {mobileOpen
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
            }
          </button>
        </div>

        {/* ── Panneau mega menu ── */}
        {isPanelOpen && (
          <div
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            style={{
              position: "absolute", left: 0, right: 0,
              background: "white",
              borderTop: "1px solid #F1F5F9",
              borderBottom: "1px solid #E2E8F0",
              boxShadow: "0 20px 60px rgba(0,0,0,0.09)",
              zIndex: 300,
            }}
          >
            <Panel sectionKey={activeSection!} onClose={() => setActiveSection(null)} />
          </div>
        )}

        {/* ── Menu mobile ── */}
        {mobileOpen && (
          <div style={{ background: "white", borderTop: "1px solid #F1F5F9", padding: "8px 20px 20px", maxHeight: "85vh", overflowY: "auto" }}>

            {/* Lien direct Rechercher */}
            <Link href="/recherche" onClick={() => setMobileOpen(false)}
              aria-current={currentKey === "rechercher" ? "page" : undefined}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 0", borderBottom: "1px solid #F1F5F9", fontWeight: 700, fontSize: "0.9rem", color: "#0D1525", textDecoration: "none" }}>
              <span style={{ color: "#FFB800", display: "flex" }}>{Ico.search}</span>
              Rechercher
              {currentKey === "rechercher" && (
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFB800", flexShrink: 0 }} />
              )}
            </Link>

            {/* Sections avec sous-menus */}
            {NAV_ITEMS.filter((i) => i.hasPanel).map((item) => {
              const panel = PANELS[item.key];
              return (
                <div key={item.key} style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === item.key ? null : item.key)}
                    aria-current={currentKey === item.key ? "page" : undefined}
                    style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", fontWeight: 700, fontSize: "0.9rem", color: "#0D1525", fontFamily: "inherit" }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {item.label}
                      {currentKey === item.key && (
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFB800", flexShrink: 0 }} />
                      )}
                    </span>
                    {Ico.chevron(mobileExpanded === item.key)}
                  </button>
                  {mobileExpanded === item.key && (
                    <div style={{ paddingBottom: 12, display: "flex", flexDirection: "column", gap: 2 }}>
                      {panel.items.map((pItem) => (
                        <Link key={pItem.label} href={pItem.href} onClick={() => setMobileOpen(false)}
                          style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", borderRadius: 8, textDecoration: "none" }}>
                          <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: "#F1F5F9", color: "#64748B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {pItem.icon}
                          </div>
                          <div>
                            <p style={{ margin: 0, fontWeight: 700, fontSize: "0.82rem", color: "#0D1525" }}>{pItem.label}</p>
                            <p style={{ margin: 0, fontSize: "0.7rem", color: "#94A3B8" }}>{pItem.desc}</p>
                          </div>
                        </Link>
                      ))}
                      {panel.featured?.subtleLink && (
                        <Link href={panel.featured.subtleLink.href} onClick={() => setMobileOpen(false)}
                          style={{ padding: "8px 8px", fontSize: "0.78rem", color: "#64748B", textDecoration: "none", fontWeight: 600 }}>
                          {panel.featured.subtleLink.label} →
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* CTAs mobile */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
              <Link href="/le-projet" onClick={() => setMobileOpen(false)}
                style={{ padding: "13px", borderRadius: 8, textAlign: "center", background: "#FFB800", color: "#0D1525", fontWeight: 800, fontSize: "0.95rem", textDecoration: "none" }}>
                Voir le projet
              </Link>
              <Link href="https://app.taxibe.mg" target="_blank" rel="noopener" onClick={() => setMobileOpen(false)}
                style={{ padding: "12px", borderRadius: 8, textAlign: "center", background: "#0D1525", color: "white", fontWeight: 800, fontSize: "0.875rem", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3"/></svg>
                Ouvrir l&apos;app
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
