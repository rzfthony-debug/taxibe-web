import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Conditions d'utilisation — TaxiBe",
  description: "Conditions générales d'utilisation de TaxiBe, l'application de recherche de lignes de taxi-be à Antananarivo.",
  alternates: { canonical: "/conditions" },
  openGraph: {
    title: "Conditions d'utilisation — TaxiBe",
    description: "Conditions générales d'utilisation de TaxiBe à Antananarivo.",
    url: "/conditions",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "TaxiBe" }],
  },
  twitter: {
    card: "summary" as const,
    title: "Conditions d'utilisation — TaxiBe",
    description: "Conditions générales d'utilisation de TaxiBe.",
    images: ["/og-image.jpg"],
  },
};

export default function ConditionsPage() {
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
              Conditions d&apos;utilisation
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
                titre: "Acceptation des conditions",
                contenu: [
                  "En utilisant TaxiBe — que ce soit via l'application mobile ou le site web — vous acceptez sans réserve les présentes conditions d'utilisation.",
                  "Si vous n'acceptez pas ces conditions, veuillez cesser d'utiliser l'application et le site.",
                ],
              },
              {
                titre: "Description du service",
                contenu: [
                  "TaxiBe est un service d'information sur les lignes de taxi-be à Antananarivo. Il permet de rechercher des lignes par numéro, par arrêt, ou par localisation GPS.",
                  "Le service est fourni gratuitement, sans garantie de disponibilité continue ni d'exactitude absolue des données.",
                ],
              },
              {
                titre: "Utilisation du service",
                contenu: [
                  "Vous vous engagez à utiliser TaxiBe uniquement à des fins légales et personnelles.",
                  "Il est interdit d'extraire automatiquement les données de l'application (scraping), de les reproduire à des fins commerciales, ou de tenter d'accéder aux parties non publiques du service.",
                  "Tout signalement abusif ou contenu inapproprié soumis via l'application pourra entraîner la suspension de votre compte.",
                ],
              },
              {
                titre: "Compte utilisateur",
                contenu: [
                  "La création d'un compte n'est pas obligatoire pour utiliser les fonctionnalités de base de TaxiBe.",
                  "Si vous créez un compte, vous êtes responsable de la confidentialité de vos identifiants.",
                  "TaxiBe se réserve le droit de suspendre ou supprimer tout compte en cas de violation des présentes conditions.",
                ],
              },
              {
                titre: "Exactitude des informations",
                contenu: [
                  "TaxiBe met tout en œuvre pour maintenir des informations à jour sur les lignes de taxi-be. Cependant, les itinéraires, arrêts et horaires peuvent changer sans préavis.",
                  "TaxiBe ne peut être tenu responsable des conséquences d'une information inexacte ou obsolète.",
                ],
              },
              {
                titre: "Modification des conditions",
                contenu: [
                  "TaxiBe se réserve le droit de modifier les présentes conditions à tout moment. Les utilisateurs seront informés des changements importants via l'application.",
                  "La poursuite de l'utilisation du service après modification des conditions vaut acceptation des nouvelles conditions.",
                ],
              },
              {
                titre: "Droit applicable",
                contenu: [
                  "Les présentes conditions sont régies par le droit malgache.",
                  "En cas de litige, une solution amiable sera recherchée en priorité.",
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
