import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const SOCIAL_KEYS = ["social_facebook_url", "social_instagram_url", "social_linkedin_url", "contact_phone", "contact_email"] as const;
type SocialKey = typeof SOCIAL_KEYS[number];

async function getFooterParams(): Promise<Record<SocialKey, string | null>> {
  const { data } = await supabase.from("parametres").select("cle, valeur").in("cle", [...SOCIAL_KEYS]);
  const map = Object.fromEntries((data ?? []).map((r: { cle: string; valeur: string }) => [r.cle, r.valeur]));
  return Object.fromEntries(SOCIAL_KEYS.map((k) => [k, map[k] ?? null])) as Record<SocialKey, string | null>;
}

const COLS = [
  {
    title: "Produit",
    links: [
      { label: "Trouver une ligne",   href: "/recherche" },
      { label: "Comment ça marche",   href: "/#comment" },
      { label: "Télécharger l'app",   href: "/telecharger" },
    ],
  },
  {
    title: "Le Projet",
    links: [
      { label: "Notre mission",    href: "/le-projet#mission" },
      { label: "Impact & données", href: "/le-projet#impact" },
      { label: "Feuille de route", href: "/le-projet#roadmap" },
    ],
  },
  {
    title: "Collaborer",
    links: [
      { label: "Coopératives de transport", href: "/partenaires#cooperatives" },
      { label: "Institutions",              href: "/partenaires#institutions" },
      { label: "Acteurs de la mobilité",    href: "/partenaires#mobilite" },
      { label: "Rejoindre l'équipe",        href: "/contact#collaborer" },
      { label: "Investir dans le projet",   href: "/partenaires#investisseurs" },
    ],
  },
  {
    title: "Communauté",
    links: [
      { label: "Blog",               href: "/blog" },
      { label: "Aide & FAQ",         href: "/aide" },
      { label: "Carrières",          href: "/emplois" },
      { label: "Signaler une erreur", href: "/contact#signalement" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Informations légales", href: "/legal" },
      { label: "Mentions légales",     href: "/mentions-legales" },
      { label: "Accès admin",          href: "/gestion/login" },
    ],
  },
];

export default async function Footer() {
  const params = await getFooterParams();
  const { social_facebook_url: fbUrl, social_instagram_url: igUrl, social_linkedin_url: liUrl, contact_phone: contactPhone, contact_email: contactEmail } = params;

  const socialLinks = [
    {
      href: fbUrl ?? "#",
      label: "Facebook",
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    },
    {
      href: igUrl ?? "#",
      label: "Instagram",
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
    },
    {
      href: liUrl ?? "#",
      label: "LinkedIn",
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
    },
  ];

  return (
    <footer style={{ background: "#0D1525" }}>
      <style>{`
        .footer-grid {
          max-width: 1200px; margin: 0 auto;
          padding: 52px 24px 32px;
          display: grid;
          grid-template-columns: 1.6fr repeat(5, 1fr);
          gap: 32px;
          align-items: start;
        }
        .footer-col-title {
          font-size: 0.62rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.1em; color: rgba(255,255,255,0.22);
          margin: 0 0 14px;
        }
        .footer-link {
          display: block; font-size: 0.8rem; color: rgba(255,255,255,0.42);
          text-decoration: none; margin-bottom: 9px; font-weight: 500;
          transition: color 0.15s;
        }
        .footer-link:hover { color: rgba(255,255,255,0.8); }
        .footer-bottom {
          max-width: 1200px; margin: 0 auto; padding: 20px 24px 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
          font-size: 0.72rem; color: rgba(255,255,255,0.2);
        }
        .footer-social {
          width: 30px; height: 30px; border-radius: 7px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.38); text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .footer-social:hover { background: #FFB800; color: #0D1525; }
        @media (max-width: 1000px) {
          .footer-grid { grid-template-columns: 1fr 1fr 1fr; gap: 28px; }
        }
        @media (max-width: 580px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 24px; padding: 36px 20px 24px; }
          .footer-grid > div:first-child { grid-column: 1 / -1; }
          .footer-bottom { flex-direction: column; text-align: center; }
        }
        footer { padding-bottom: var(--app-banner-h, 0px); }
      `}</style>

      <div className="footer-grid">

        {/* ── Colonne marque ── */}
        <div>
          <Image
            src="/logo_taxibe_noir.png"
            alt="TaxiBe"
            width={140} height={70}
            sizes="140px"
            style={{ height: 28, width: "auto", objectFit: "contain", marginBottom: 14 }}
          />
          <p style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.32)", lineHeight: 1.7, margin: "0 0 20px", maxWidth: 220 }}>
            L&apos;infrastructure digitale du transport collectif à Antananarivo.
          </p>

          {/* CTA projet */}
          <Link href="/le-projet" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "8px 14px", borderRadius: 8,
            background: "#FFB800", color: "#0D1525",
            fontWeight: 800, fontSize: "0.75rem", textDecoration: "none",
            marginBottom: 20,
          }}>
            Voir le projet →
          </Link>

          {/* Contact */}
          {(contactPhone || contactEmail) && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              {contactPhone && (
                <a href={`tel:${contactPhone}`} style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.07 6.07l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.05z"/></svg>
                  {contactPhone}
                </a>
              )}
              {contactEmail && (
                <a href={`mailto:${contactEmail}`} style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  {contactEmail}
                </a>
              )}
            </div>
          )}

          {/* Réseaux sociaux */}
          <div style={{ display: "flex", gap: 6 }}>
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href}
                target={s.href !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="footer-social"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Colonnes de liens ── */}
        {COLS.map((col) => (
          <div key={col.title}>
            <p className="footer-col-title">{col.title}</p>
            {col.links.map((l) => (
              <Link key={l.label} href={l.href} className="footer-link">{l.label}</Link>
            ))}
          </div>
        ))}

      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} TaxiBe Madagascar — Tous droits réservés.</span>
        <span style={{ color: "rgba(255,255,255,0.12)" }}>Antananarivo, Madagascar</span>
      </div>
    </footer>
  );
}
