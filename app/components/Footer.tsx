import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#0D1525", padding: "48px 24px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          flexWrap: "wrap", gap: 40, marginBottom: 40,
        }}>
          <div style={{ maxWidth: 260 }}>
            <Image src="/logo_taxibe_vertcal.png" alt="TaxiBe" width={160} height={80}
              style={{ height: 32, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", marginBottom: 14 }} />
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.75, margin: 0 }}>
              L&apos;application de référence pour trouver vos lignes de taxi-be à Antananarivo.{" "}
              <strong style={{ color: "#FFB800" }}>Gratuit.</strong>
            </p>
          </div>

          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", marginBottom: 14 }}>
                Application
              </p>
              {[
                { label: "Rechercher une ligne", href: "/recherche" },
                { label: "Télécharger l'app", href: "/telecharger" },
              ].map((l) => (
                <Link key={l.label} href={l.href} style={{ display: "block", fontSize: "0.84rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: 9, fontWeight: 500 }}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", marginBottom: 14 }}>
                Informations
              </p>
              {[
                { label: "Actualités", href: "/actualites" },
                { label: "Offres d'emploi", href: "/emplois" },
                { label: "À propos de TaxiBe", href: "/a-propos" },
              ].map((l) => (
                <Link key={l.label} href={l.href} style={{ display: "block", fontSize: "0.84rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: 9, fontWeight: 500 }}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", marginBottom: 14 }}>
                Légal
              </p>
              {[
                { label: "Mentions légales", href: "/mentions-legales" },
                { label: "Conditions d'utilisation", href: "/conditions" },
              ].map((l) => (
                <Link key={l.label} href={l.href} style={{ display: "block", fontSize: "0.84rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: 9, fontWeight: 500 }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} TaxiBe. Tous droits réservés.
          </p>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>
            Antananarivo, Madagascar
          </p>
        </div>
      </div>
    </footer>
  );
}
