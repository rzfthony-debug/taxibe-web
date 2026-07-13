import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Conditions d'utilisation — TaxiBe",
};

export default function ConditionsPage() {
  return (
    <>
      <Nav />
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
          <div style={{
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
            ].map((section) => (
              <section key={section.titre}>
                <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#0D1525", marginBottom: 14, letterSpacing: "-0.01em" }}>
                  {section.titre}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {section.contenu.map((ligne, i) => (
                    <p key={i} style={{ margin: 0, fontSize: "0.875rem", color: "#374151", lineHeight: 1.75 }}>
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
