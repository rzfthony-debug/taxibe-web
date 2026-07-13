import Image from "next/image";
import Link from "next/link";

const COLS = [
  {
    title: "Explorer",
    links: [
      { label: "Trouver une ligne",     href: "/recherche" },
      { label: "Tous les arrêts",       href: "#" },
      { label: "Itinéraire A vers B",   href: "#" },
      { label: "Correspondances",       href: "#" },
    ],
  },
  {
    title: "Communauté",
    links: [
      { label: "Blog",                    href: "/blog" },
      { label: "FAQ",                     href: "#" },
      { label: "Conseils de déplacement", href: "#" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "Publicité",   href: "#" },
      { label: "Partenaires", href: "#" },
      { label: "Carrières",   href: "/emplois" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales",       href: "/mentions-legales" },
      { label: "CGU & confidentialité",  href: "/conditions" },
    ],
  },
];

export default function Footer() {
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
            style={{ height: 30, width: "auto", objectFit: "contain", marginBottom: 12 }}
          />
          <p style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, margin: "0 0 18px", maxWidth: 200 }}>
            TaxiBe Madagascar, votre allié pour tous vos déplacements à Antananarivo.
          </p>
          <div style={{ display: "flex", gap: 7 }}>
            {[
              <svg key="fb" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
              <svg key="ig" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
              <svg key="li" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
            ].map((icon, i) => (
              <a key={i} href="#" style={{
                width: 30, height: 30, borderRadius: 7,
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.09)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.45)", textDecoration: "none",
              }}>{icon}</a>
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
          <Link href="/telecharger" className="footer-store">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 20.5v-17c0-.83 1-.83 1.5-.35l14 8.5c.5.3.5 1 0 1.3l-14 8.5c-.5.48-1.5.48-1.5-.35z" fill="#34A853"/>
              <path d="M3 3.5l8.5 8.5-8.5 8.5V3.5z" fill="#EA4335"/>
              <path d="M11.5 12l8.5 8.5H3l8.5-8.5z" fill="#FBBC05"/>
              <path d="M3 3.5H20L11.5 12 3 3.5z" fill="#4285F4"/>
            </svg>
            <div>
              <div style={{ fontSize: "0.54rem", color: "rgba(255,255,255,0.38)", lineHeight: 1 }}>Disponible sur</div>
              <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "white" }}>Google Play</div>
            </div>
          </Link>
          <Link href="/telecharger" className="footer-store">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div>
              <div style={{ fontSize: "0.54rem", color: "rgba(255,255,255,0.38)", lineHeight: 1 }}>Télécharger dans</div>
              <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "white" }}>l&apos;App Store</div>
            </div>
          </Link>
        </div>

      </div>

      <p className="footer-bottom">© {new Date().getFullYear()} TaxiBe Madagascar. Tous droits réservés.</p>
    </footer>
  );
}
