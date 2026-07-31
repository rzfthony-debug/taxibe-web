import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Mentions légales — TaxiBe",
  description: "Mentions légales de TaxiBe : éditeur, hébergement, données personnelles et propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
  openGraph: {
    title: "Mentions légales — TaxiBe",
    description: "Mentions légales de TaxiBe : éditeur, hébergement et données personnelles.",
    url: "/mentions-legales",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "TaxiBe" }],
  },
  twitter: {
    card: "summary" as const,
    title: "Mentions légales — TaxiBe",
    description: "Mentions légales de TaxiBe.",
    images: ["/og-image.jpg"],
  },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Nav />
      <style>{`
        @media (max-width: 540px) {
          .legal-card { padding: 24px 18px !important; }
          .legal-section-body { padding-left: 20px !important; }
        }
      `}</style>
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>
        <div style={{ background: "#0D1525", padding: "56px 24px 64px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
              Légal
            </p>
            <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 900, color: "white", margin: 0, letterSpacing: "-0.02em" }}>
              Mentions légales
            </h1>
          </div>
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px" }}>
          <div className="legal-card" style={{
            background: "white", borderRadius: 14, padding: "40px",
            border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
            display: "flex", flexDirection: "column", gap: 32,
          }}>
            {[
              {
                titre: "Éditeur de l'application",
                contenu: [
                  "Nom de l'application : TaxiBe",
                  "Type : Application mobile et site web",
                  "Territoire de service : Antananarivo, Madagascar",
                ],
              },
              {
                titre: "Hébergement",
                contenu: [
                  "Site web : Vercel Inc., 340 Pine Street Suite 701, San Francisco, CA 94104, États-Unis",
                  "Base de données : Supabase Inc.",
                  "Application Android : distribuée directement via fichier APK",
                ],
              },
              {
                titre: "Propriété intellectuelle",
                contenu: [
                  "L'ensemble du contenu de ce site et de l'application — textes, visuels, logo, interface — est la propriété exclusive de TaxiBe.",
                  "Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.",
                ],
              },
              {
                titre: "Données personnelles",
                contenu: [
                  "TaxiBe collecte uniquement les données strictement nécessaires au fonctionnement de l'application (compte utilisateur optionnel, favoris, signalements).",
                  "Aucune donnée n'est vendue à des tiers.",
                  "Conformément à la loi malgache n° 2014-038 sur la protection des données personnelles, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.",
                ],
              },
              {
                titre: "Responsabilité",
                contenu: [
                  "Les informations sur les lignes de taxi-be sont fournies à titre indicatif. TaxiBe ne garantit pas leur exactitude en temps réel.",
                  "TaxiBe ne saurait être tenu responsable des dommages résultant de l'utilisation de l'application ou de l'inaccessibilité du service.",
                ],
              },
            ].map((section, idx) => (
              <section key={section.titre} style={{ borderTop: idx === 0 ? "none" : "1px solid #F1F5F9", paddingTop: idx === 0 ? 0 : 28 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                  <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 8, background: "#FFF8E1", border: "1px solid #FFE4A0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 900, color: "#B8860B", marginTop: 1 }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h2 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "#0D1525", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                    {section.titre}
                  </h2>
                </div>
                <div className="legal-section-body" style={{ paddingLeft: 40, display: "flex", flexDirection: "column", gap: 10 }}>
                  {section.contenu.map((ligne, i) => (
                    <p key={i} style={{ margin: 0, fontSize: "0.9rem", color: "#374151", lineHeight: 1.8 }}>
                      {ligne}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <p style={{ margin: 0, fontSize: "0.78rem", color: "#94A3B8", paddingTop: 16, borderTop: "1px solid #F1F5F9" }}>
              Dernière mise à jour : juillet 2026
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
