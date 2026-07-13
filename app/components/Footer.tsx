import Image from "next/image";
import Link from "next/link";

const COLS = [
  {
    title: "Explorer",
    links: [
      { label: "Trouver une ligne",    href: "/recherche" },
      { label: "Tous les arrêts",      href: "#" },
      { label: "Itinéraire A vers B",  href: "#" },
      { label: "Correspondances",      href: "#" },
    ],
  },
  {
    title: "Communauté",
    links: [
      { label: "Blog",                   href: "/blog" },
      { label: "FAQ",                    href: "#" },
      { label: "Conseils de déplacement",href: "#" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "Publicité",  href: "#" },
      { label: "Partenaires",href: "#" },
      { label: "Carrières",  href: "/emplois" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales",      href: "/mentions-legales" },
      { label: "CGU & confidentialité", href: "/conditions" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0D1525", padding: "52px 24px 28px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ── Colonnes ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1.4fr",
          gap: 40,
          marginBottom: 44,
        }}>

          {/* Logo + tagline + réseaux */}
          <div>
            <Image
              src="/logo_taxibe_vertcal.png"
              alt="TaxiBe"
              width={160}
              height={80}
              style={{ height: 34, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", marginBottom: 14 }}
            />
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: "0 0 20px", maxWidth: 220 }}>
              TaxiBe Madagascar, votre allié pour tous vos déplacements à Antananarivo.
            </p>
            {/* Réseaux sociaux */}
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "Facebook",  icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                )},
                { label: "Instagram", icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                )},
                { label: "LinkedIn",  icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                )},
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label} style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.5)", textDecoration: "none",
                  transition: "background 0.15s",
                }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Colonnes de liens */}
          {COLS.map((col) => (
            <div key={col.title}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", marginBottom: 16, marginTop: 0 }}>
                {col.title}
              </p>
              {col.links.map((l) => (
                <Link key={l.label} href={l.href} style={{
                  display: "block", fontSize: "0.84rem", color: "rgba(255,255,255,0.5)",
                  textDecoration: "none", marginBottom: 10, fontWeight: 500,
                  transition: "color 0.15s",
                }}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}

          {/* Télécharger l'app */}
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFB800", marginBottom: 16, marginTop: 0 }}>
              Télécharger l&apos;app
            </p>
            <Link href="/telecharger" style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10, textDecoration: "none", marginBottom: 8,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 20.5v-17c0-.83 1-.83 1.5-.35l14 8.5c.5.3.5 1 0 1.3l-14 8.5c-.5.48-1.5.48-1.5-.35z" fill="#34A853"/>
                <path d="M3 3.5l8.5 8.5-8.5 8.5V3.5z" fill="#EA4335"/>
                <path d="M11.5 12l8.5 8.5H3l8.5-8.5z" fill="#FBBC05"/>
                <path d="M3 3.5H20L11.5 12 3 3.5z" fill="#4285F4"/>
              </svg>
              <div>
                <div style={{ fontSize: "0.56rem", color: "rgba(255,255,255,0.4)", lineHeight: 1 }}>Disponible sur</div>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "white", lineHeight: 1.3 }}>Google Play</div>
              </div>
            </Link>
            <Link href="/telecharger" style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10, textDecoration: "none",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div>
                <div style={{ fontSize: "0.56rem", color: "rgba(255,255,255,0.4)", lineHeight: 1 }}>Télécharger dans</div>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "white", lineHeight: 1.3 }}>l&apos;App Store</div>
              </div>
            </Link>
          </div>
        </div>

        {/* ── Responsive grid ── */}
        <style>{`
          @media (max-width: 860px) {
            footer > div > div:first-child {
              grid-template-columns: 1fr 1fr !important;
            }
          }
          @media (max-width: 500px) {
            footer > div > div:first-child {
              grid-template-columns: 1fr !important;
              gap: 28px !important;
            }
          }
        `}</style>

        {/* ── Copyright ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 22, display: "flex", justifyContent: "center" }}>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.2)", textAlign: "center" }}>
            © {new Date().getFullYear()} TaxiBe Madagascar. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
