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
    title: "Explorer",
    links: [
      { label: "Trouver une ligne",     href: "/recherche" },
      { label: "Tous les arrêts",       href: "/telecharger" },
      { label: "Itinéraire A vers B",   href: "/telecharger" },
      { label: "Correspondances",       href: "/telecharger" },
    ],
  },
  {
    title: "Communauté",
    links: [
      { label: "Blog",                    href: "/blog" },
      { label: "Aide & FAQ",              href: "/aide" },
      { label: "Signaler une erreur",     href: "/communaute" },
      { label: "Devenir contributeur",    href: "/communaute" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "Visibilité commerciale", href: "/entreprises" },
      { label: "Partenariats",           href: "/entreprises" },
      { label: "Carrières",              href: "/emplois" },
      { label: "Contact",                href: "/contact" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Informations légales",   href: "/legal" },
      { label: "Accès",                  href: "/gestion/login" },
    ],
  },
];

export default async function Footer() {
  const params = await getFooterParams();
  const { social_facebook_url: fbUrl, social_instagram_url: igUrl, social_linkedin_url: liUrl, contact_phone: contactPhone, contact_email: contactEmail } = params;

  const socialLinks = [
    {
      href: fbUrl ?? "#",
      icon: <svg key="fb" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    },
    {
      href: igUrl ?? "#",
      icon: <svg key="ig" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
    },
    {
      href: liUrl ?? "#",
      icon: <svg key="li" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
    },
  ];

  return (
    <footer style={{ background: "#0D1525" }}>
      <style>{`
        .footer-grid {
          max-width: 1100px; margin: 0 auto;
          padding: 44px 24px 28px;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1.3fr;
          gap: 32px;
          align-items: start;
        }
        .footer-col-title {
          font-size: 0.64rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: rgba(255,255,255,0.25);
          margin: 0 0 14px;
        }
        .footer-link {
          display: block; font-size: 0.8rem; color: rgba(255,255,255,0.48);
          text-decoration: none; margin-bottom: 9px; font-weight: 500;
        }
        .footer-link:hover { color: rgba(255,255,255,0.8); }
        .footer-store {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 12px; border-radius: 9px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          text-decoration: none; margin-bottom: 7px;
        }
        .footer-bottom {
          max-width: 1100px; margin: 0 auto; padding: 0 24px 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 20px;
          text-align: center;
          font-size: 0.73rem; color: rgba(255,255,255,0.2);
        }
        @media (max-width: 960px) {
          .footer-grid { grid-template-columns: 1fr 1fr 1fr; gap: 28px; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 24px; padding: 36px 20px 24px; }
        }
      `}</style>

      <div className="footer-grid">

        {/* Marque */}
        <div>
          <Image
            src="/logo_taxibe_noir.png"
            alt="TaxiBe"
            width={140} height={70}
            sizes="140px"
            style={{ height: 30, width: "auto", objectFit: "contain", marginBottom: 12 }}
          />
          <p style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, margin: "0 0 12px", maxWidth: 200 }}>
            TaxiBe Madagascar, votre allié pour tous vos déplacements à Antananarivo.
          </p>
          {(contactPhone || contactEmail) && (
            <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 14 }}>
              {contactPhone && (
                <a href={`tel:${contactPhone}`} style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.07 6.07l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.05z"/></svg>
                  {contactPhone}
                </a>
              )}
              {contactEmail && (
                <a href={`mailto:${contactEmail}`} style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  {contactEmail}
                </a>
              )}
            </div>
          )}
          <div style={{ display: "flex", gap: 7 }}>
            {socialLinks.map((s, i) => (
              <a key={i} href={s.href} target={s.href !== "#" ? "_blank" : undefined} rel="noopener noreferrer" style={{
                width: 30, height: 30, borderRadius: 7,
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.09)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.45)", textDecoration: "none",
              }}>{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Colonnes de liens */}
        {COLS.map((col) => (
          <div key={col.title}>
            <p className="footer-col-title">{col.title}</p>
            {col.links.map((l) => (
              <Link key={l.label} href={l.href} className="footer-link">{l.label}</Link>
            ))}
          </div>
        ))}

        {/* Télécharger */}
        <div>
          <p className="footer-col-title" style={{ color: "#FFB800" }}>Télécharger l&apos;app</p>
          <p style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.35)", margin: "0 0 14px", lineHeight: 1.6 }}>
            Disponible en téléchargement direct — Android, 100% gratuit.
          </p>
          <Link href="/telecharger" className="footer-store" style={{ background: "#FFB800", border: "none" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <div>
              <div style={{ fontSize: "0.54rem", color: "rgba(13,21,37,0.55)", lineHeight: 1, textTransform: "uppercase", letterSpacing: "0.04em" }}>Android · Gratuit</div>
              <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#0D1525", lineHeight: 1.3 }}>Télécharger TaxiBe</div>
            </div>
          </Link>
          <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.18)", margin: "10px 0 0", lineHeight: 1.4 }}>
            Google Play · bientôt disponible
          </p>
        </div>

      </div>

      <p className="footer-bottom">© {new Date().getFullYear()} TaxiBe Madagascar. Tous droits réservés.</p>
    </footer>
  );
}
