import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Aide — TaxiBe",
  description: "Toutes les réponses sur l'utilisation de TaxiBe : recherche de ligne, correspondances, compte, favoris et signalement d'erreurs.",
};

const FAQ_SECTIONS = [
  {
    theme: "Utiliser l'application",
    questions: [
      {
        q: "Comment trouver une ligne de taxi-be avec TaxiBe ?",
        r: "Deux façons de faire : tapez directement le numéro de la ligne dans la barre de recherche, ou indiquez votre point de départ et votre destination pour que TaxiBe calcule le trajet et les correspondances à votre place.",
      },
      {
        q: "TaxiBe fonctionne-t-il sans connexion internet ?",
        r: "Les lignes que vous avez ajoutées en favori restent consultables hors connexion. La recherche en temps réel et la localisation GPS nécessitent en revanche une connexion internet.",
      },
      {
        q: "L'application propose-t-elle les horaires en temps réel ?",
        r: "Non — les taxi-be d'Antananarivo n'ont pas d'horaires fixes. TaxiBe indique les trajets, les arrêts et les correspondances, mais pas d'heure de passage en direct.",
      },
      {
        q: "Comment fonctionnent les correspondances automatiques ?",
        r: "Indiquez votre départ et votre arrivée : si aucune ligne directe n'existe, TaxiBe calcule le meilleur enchaînement de lignes, y compris avec une double correspondance si nécessaire.",
      },
    ],
  },
  {
    theme: "Compte et favoris",
    questions: [
      {
        q: "Ai-je besoin d'un compte pour utiliser TaxiBe ?",
        r: "La recherche de base est accessible sur le site web. Pour accéder à toutes les fonctionnalités de l'application — favoris, GPS, correspondances, jeux — un compte membre est requis. L'inscription est gratuite.",
      },
      {
        q: "Comment sauvegarder une ligne en favori ?",
        r: "Depuis la fiche d'une ligne dans l'application, appuyez sur l'icône étoile. Vos favoris sont accessibles d'un seul geste depuis l'écran d'accueil, même hors connexion.",
      },
    ],
  },
  {
    theme: "Fiabilité des données",
    questions: [
      {
        q: "Les informations sur les lignes sont-elles fiables ?",
        r: "Nous mettons à jour la base autant que possible, mais les itinéraires et arrêts des taxi-be peuvent évoluer sans préavis. Si vous constatez une erreur, signalez-la : elle nous aide à corriger la base pour tous les usagers.",
      },
      {
        q: "Une ligne ou un arrêt a changé, comment le signaler ?",
        r: "Utilisez la section « Signaler » dans l'application avec le numéro de ligne concerné. Notre équipe vérifie et met à jour la base dans les meilleurs délais.",
      },
      {
        q: "Puis-je contribuer à améliorer la base de données ?",
        r: "Oui. TaxiBe s'appuie en partie sur les usagers qui connaissent le terrain. Consultez la page « Communauté » pour proposer votre aide.",
      },
    ],
  },
  {
    theme: "Tarifs et disponibilité",
    questions: [
      {
        q: "TaxiBe est-il vraiment gratuit ?",
        r: "Oui, TaxiBe est gratuit. L'inscription est libre et donne accès à l'ensemble des fonctionnalités de l'application. L'expérience complète se trouve dans l'app mobile.",
      },
      {
        q: "Sur quels téléphones TaxiBe est-il disponible ?",
        r: "TaxiBe est disponible sur Android 6.0 et supérieur, via téléchargement direct du fichier APK depuis la page Télécharger.",
      },
    ],
  },
];

export default function AidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_SECTIONS.flatMap((s) =>
      s.questions.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.r },
      }))
    ),
  };

  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>

        <div style={{ background: "#0D1525", padding: "56px 24px 64px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
              Questions fréquentes
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "white", margin: 0, letterSpacing: "-0.02em" }}>
              Tout ce qu&apos;il faut savoir sur TaxiBe
            </h1>
          </div>
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {FAQ_SECTIONS.map((section) => (
              <div key={section.theme} style={{
                background: "white", borderRadius: 14, padding: "32px 36px",
                border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
              }}>
                <h2 style={{ fontSize: "1.05rem", fontWeight: 900, color: "#0D1525", marginBottom: 20, letterSpacing: "-0.01em" }}>
                  {section.theme}
                </h2>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {section.questions.map((item, i) => (
                    <div key={item.q} style={{
                      padding: "18px 0",
                      borderTop: i === 0 ? "none" : "1px solid #F1F5F9",
                    }}>
                      <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: "0.9rem", color: "#0D1525" }}>
                        {item.q}
                      </p>
                      <p style={{ margin: 0, fontSize: "0.86rem", color: "#64748B", lineHeight: 1.75 }}>
                        {item.r}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 32, background: "#0D1525", borderRadius: 14,
            padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 16,
          }}>
            <div>
              <p style={{ margin: "0 0 4px", fontWeight: 800, color: "white", fontSize: "0.95rem" }}>
                Vous ne trouvez pas votre réponse ?
              </p>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "rgba(255,255,255,0.55)" }}>
                Écrivez directement à l&apos;équipe TaxiBe.
              </p>
            </div>
            <Link href="/contact" style={{
              padding: "10px 24px", borderRadius: 8,
              background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "0.875rem", textDecoration: "none", flexShrink: 0,
            }}>
              Nous contacter →
            </Link>
          </div>
        </div>
      </main>
      <CtaApp />
      <Footer />
    </>
  );
}
