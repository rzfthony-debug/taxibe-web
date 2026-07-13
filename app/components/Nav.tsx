"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Icônes ────────────────────────────────────────────────────────────────────

const I = {
  search:       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  hash:         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>,
  mapPin:       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  list:         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  route:        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>,
  git:          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>,
  map:          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  compass:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
  book:         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  grid:         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  bell:         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  star:         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  help:         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  lightbulb:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>,
  users:        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  alert:        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  plusCircle:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  userPlus:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>,
  edit:         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  megaphone:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
  code:         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  link:         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  handshake:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>,
  mail:         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  info:         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  heart:        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  newspaper:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6z"/></svg>,
  shield:       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  briefcase:    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  chevron:      (open: boolean) => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none", flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>,
  lock:         <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
};

// ── Structure du menu (copie exacte du modèle de référence) ───────────────────

const NAV_SECTIONS = [
  {
    key: "rechercher",
    label: "Rechercher",
    headerIcon: I.search,
    items: [
      { label: "Trouver une ligne",    desc: "Recherchez par numero",         href: "/recherche",       icon: I.hash },
      { label: "Tous les arrets",      desc: "Trouvez un arret precis",       href: "#",                icon: I.mapPin },
      { label: "Toutes les lignes",    desc: "Liste complete des lignes",     href: "#",                icon: I.list },
      { label: "Itineraire A vers B",  desc: "Calculez votre trajet",         href: "#",                icon: I.route, badge: "APP" },
      { label: "Correspondances",      desc: "Trouvez vos correspondances",   href: "#",                icon: I.git,   badge: "APP" },
      { label: "Zones desservies",     desc: "Decouvrez nos zones",           href: "#",                icon: I.map },
    ],
  },
  {
    key: "decouvrir",
    label: "Decouvrir",
    headerIcon: I.compass,
    items: [
      { label: "Comment utiliser TaxiBe", desc: "Guide pas a pas",           href: "#",                icon: I.book },
      { label: "Les quartiers couverts",  desc: "Voir la couverture",         href: "#",                icon: I.grid },
      { label: "Les nouveautes",          desc: "Restez informe",             href: "/actualites",      icon: I.bell },
      { label: "Les lignes populaires",   desc: "Les plus empruntees",        href: "#",                icon: I.star },
      { label: "FAQ",                     desc: "Questions frequentes",       href: "#",                icon: I.help },
      { label: "Conseils de deplacement", desc: "Nos astuces",                href: "#",                icon: I.lightbulb },
    ],
  },
  {
    key: "communaute",
    label: "Communaute",
    headerIcon: I.users,
    items: [
      { label: "Signaler une erreur",    desc: "Aidez-nous a ameliorer",      href: "#",                icon: I.alert },
      { label: "Ajouter une ligne",      desc: "Proposez une nouvelle ligne", href: "#",                icon: I.plusCircle },
      { label: "Suggerer un arret",      desc: "Proposez un nouvel arret",    href: "#",                icon: I.mapPin },
      { label: "Devenir contributeur",   desc: "Rejoignez la communaute",     href: "#",                icon: I.userPlus },
      { label: "Blog",                   desc: "Actualites & conseils",       href: "#",                icon: I.edit },
    ],
  },
  {
    key: "entreprises",
    label: "Entreprises",
    headerIcon: I.briefcase,
    items: [
      { label: "Publicite",             desc: "Promouvez votre activite",     href: "#",                icon: I.megaphone },
      { label: "API",                   desc: "Accedez a nos donnees",        href: "#",                icon: I.code },
      { label: "Integration",           desc: "Integrez TaxiBe",              href: "#",                icon: I.link },
      { label: "Partenaires",           desc: "Nos partenaires",              href: "#",                icon: I.handshake },
      { label: "Contact commercial",    desc: "Discutons ensemble",           href: "/emplois",         icon: I.mail },
    ],
  },
  {
    key: "apropos",
    label: "A propos",
    headerIcon: I.info,
    items: [
      { label: "Notre mission",         desc: "Pourquoi TaxiBe ?",            href: "/a-propos",        icon: I.heart },
      { label: "Notre equipe",          desc: "Decouvrez-nous",               href: "#",                icon: I.users },
      { label: "Presse",                desc: "Espace presse",                href: "#",                icon: I.newspaper },
      { label: "Contact",               desc: "Parlez-nous",                  href: "#",                icon: I.mail },
      { label: "Mentions legales",      desc: "CGU & confidentialite",        href: "/mentions-legales", icon: I.shield },
    ],
  },
];

// ── Widget "Ligne la plus recherchee" ─────────────────────────────────────────

function FeaturedLine() {
  return (
    <div style={{ borderLeft: "1px solid #F1F5F9", paddingLeft: 20, minWidth: 200 }}>
      <p style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFB800", margin: "0 0 4px" }}>
        Ligne la plus recherchee
      </p>
      <p style={{ fontSize: "0.62rem", fontWeight: 600, color: "#94A3B8", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        Aujourd&apos;hui
      </p>

      <div style={{ background: "#0D1525", borderRadius: 12, padding: "16px", marginBottom: 12 }}>
        <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "white", lineHeight: 1, marginBottom: 6 }}>
          147
        </div>
        <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "white", marginBottom: 4 }}>
          Ivato &rarr; Analakely
        </div>
        <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#FFB800", marginBottom: 12 }}>
          23 541 recherches
        </div>
        <a href="https://taxibemada.vercel.app/ligne/147" target="_blank" rel="noopener noreferrer" style={{
          display: "block", padding: "8px 14px", borderRadius: 8, textAlign: "center",
          background: "#FFB800", color: "#0D1525",
          fontSize: "0.78rem", fontWeight: 800, textDecoration: "none",
        }}>
          Voir la ligne &rarr;
        </a>
      </div>

      <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#0D1525", margin: "0 0 2px" }}>
        Antananarivo et ses environs
      </p>
      <p style={{ fontSize: "0.7rem", color: "#94A3B8", margin: 0, fontWeight: 500 }}>
        + de 50 communes couvertes
      </p>
    </div>
  );
}

// ── Nav principal ─────────────────────────────────────────────────────────────

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setOpen(false);
  }, [pathname]);

  function openMenu() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpen(false), 100);
  }

  return (
    <>
      <style>{`
        .nav-trigger {
          display: flex; align-items: center; gap: 5px;
          padding: 8px 12px; border-radius: 8px;
          font-size: 0.875rem; font-weight: 600; color: #64748B;
          background: none; border: none; cursor: pointer;
          font-family: var(--font-inter), system-ui;
          transition: color 0.15s, background 0.15s; white-space: nowrap;
        }
        .nav-trigger:hover, .nav-trigger.open { color: #0D1525; background: #F8F9FB; }
        .mega-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 8px 10px; border-radius: 8px; text-decoration: none;
          transition: background 0.12s;
        }
        .mega-item:hover { background: #FFFBEB; }
        .mega-item:hover .mico { background: #FFB800 !important; color: #0D1525 !important; }
        .mega-item:hover .mlabel { color: #92400E !important; }
        .mico {
          width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
          background: #F1F5F9; color: #64748B;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.12s, color 0.12s;
        }
        .mlabel { font-weight: 700; font-size: 0.8rem; color: #0D1525; margin: 0 0 1px; transition: color 0.12s; line-height: 1.3; }
        .mdesc  { font-size: 0.7rem; color: #94A3B8; margin: 0; font-weight: 500; line-height: 1.3; }
        .sec-header {
          display: flex; align-items: center; gap: 7px;
          padding: 0 10px 10px; margin-bottom: 4px;
          border-bottom: 1px solid #F1F5F9;
        }
        .sec-label { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #0D1525; }
        .nav-desktop { display: flex; align-items: center; gap: 1px; }
        .nav-burger  { display: none; }
        .nav-mobile-panel { display: none; }
        .nav-cta-btn { display: flex; }
        .admin-btn { transition: background 0.15s, border-color 0.15s; }
        .admin-btn:hover { background: #0D1525 !important; border-color: #0D1525 !important; }
        .admin-btn:hover svg { stroke: #FFB800; }
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-burger  { display: flex !important; }
          .nav-mobile-panel { display: block !important; }
          .nav-cta-btn { display: none !important; }
        }
        @media (min-width: 901px) {
          .nav-mobile-panel { display: none !important; }
        }
      `}</style>

      <nav style={{ position: "sticky", top: 0, zIndex: 200, background: "white", borderBottom: "1px solid #E2E8F0", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>

        {/* ── Barre principale ── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
            <Image src="/logo_taxibe_vertcal.png" alt="TaxiBe" width={360} height={180}
              style={{ height: 36, width: "auto", objectFit: "contain" }} priority />
          </Link>

          {/* Triggers desktop */}
          <div className="nav-desktop" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
            {NAV_SECTIONS.map((s) => (
              <button key={s.key} className={`nav-trigger${open ? " open" : ""}`}
                onMouseEnter={openMenu} aria-expanded={open}>
                {s.label}
                {I.chevron(open)}
              </button>
            ))}
          </div>

          {/* Droite */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <Link href="/gestion/login" title="Espace administrateur" className="admin-btn" style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "#F1F5F9", border: "1.5px solid #E2E8F0",
              display: "flex", alignItems: "center", justifyContent: "center",
              textDecoration: "none",
            }}>
              {I.lock}
            </Link>

            <Link href="/telecharger" className="nav-cta-btn" style={{
              padding: "9px 20px", borderRadius: 8,
              background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "0.875rem", textDecoration: "none", whiteSpace: "nowrap",
            }}>
              Telecharger l&apos;app
            </Link>

            {/* Burger */}
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

        {/* ── Mega menu panel ── */}
        {open && (
          <div onMouseEnter={openMenu} onMouseLeave={scheduleClose} style={{
            position: "absolute", left: 0, right: 0,
            background: "white",
            borderTop: "1px solid #F1F5F9",
            borderBottom: "1px solid #E2E8F0",
            boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
            zIndex: 300,
          }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 20px", display: "flex", gap: 0 }}>

              {/* 5 colonnes */}
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
                {NAV_SECTIONS.map((s) => (
                  <div key={s.key}>
                    <div className="sec-header">
                      <span style={{ color: "#FFB800", display: "flex" }}>{s.headerIcon}</span>
                      <span className="sec-label">{s.label}</span>
                    </div>
                    {s.items.map((item) => (
                      <Link key={item.label} href={item.href} className="mega-item" onClick={() => setOpen(false)}>
                        <div className="mico">{item.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                            <p className="mlabel">{item.label}</p>
                            {"badge" in item && item.badge && (
                              <span style={{ background: "#0D1525", color: "#FFB800", fontSize: "0.55rem", fontWeight: 800, padding: "1px 5px", borderRadius: 3, letterSpacing: "0.06em", flexShrink: 0 }}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="mdesc">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              {/* Widget ligne la plus recherchee */}
              <FeaturedLine />
            </div>
          </div>
        )}

        {/* ── Menu mobile ── */}
        {mobileOpen && (
          <div className="nav-mobile-panel" style={{ background: "white", borderTop: "1px solid #F1F5F9", padding: "8px 20px 20px", maxHeight: "80vh", overflowY: "auto" }}>
            {NAV_SECTIONS.map((s) => (
              <div key={s.key} style={{ borderBottom: "1px solid #F1F5F9" }}>
                <button onClick={() => setMobileExpanded(mobileExpanded === s.key ? null : s.key)}
                  style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", fontWeight: 700, fontSize: "0.9rem", color: "#0D1525", fontFamily: "var(--font-inter), system-ui" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#FFB800", display: "flex" }}>{s.headerIcon}</span>
                    {s.label}
                  </span>
                  {I.chevron(mobileExpanded === s.key)}
                </button>
                {mobileExpanded === s.key && (
                  <div style={{ paddingBottom: 8, display: "flex", flexDirection: "column", gap: 2 }}>
                    {s.items.map((item) => (
                      <Link key={item.label} href={item.href} className="mega-item" onClick={() => setMobileOpen(false)}>
                        <div className="mico">{item.icon}</div>
                        <div>
                          <p className="mlabel">{item.label}</p>
                          <p className="mdesc">{item.desc}</p>
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
