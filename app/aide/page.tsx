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
        <style>{`
          .page-hero-inner { max-width: 1280px; margin: 0 auto; padding: 64px 40px; display: grid; grid-template-columns: 1fr 1.4fr; gap: 24px; align-items: center; }
          .page-hero-img { display: flex; align-items: center; justify-content: center; }
          @media (max-width: 768px) { .page-hero-inner { grid-template-columns: 1fr; padding: 40px 20px; } .page-hero-img { display: none; } }
        `}</style>
        <section style={{ background: "#F8F9FB", overflow: "hidden", borderBottom: "1px solid #E8ECF0" }}>
          <div className="page-hero-inner">
            <div>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
                Questions fréquentes
              </p>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
                Tout ce qu&apos;il faut savoir sur TaxiBe
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: 480, margin: 0, lineHeight: 1.7 }}>
                Recherche de ligne, correspondances, compte, favoris — toutes les réponses pour bien utiliser TaxiBe.
              </p>
            </div>
            <div className="page-hero-img">
              <svg viewBox="0 0 380 230" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 360 }}>
                <rect width="380" height="230" fill="#EEF2F7" rx="12"/>
                <rect y="150" width="380" height="80" fill="#D8E2EE"/>
                <rect y="165" width="380" height="4" fill="#C8D2DF"/>
                <rect x="20" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
                <rect x="65" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
                <rect x="110" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
                <rect x="155" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
                <rect x="200" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
                <rect x="245" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
                <rect x="290" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
                <rect x="335" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
                <rect x="25" y="95" width="26" height="75" rx="2" fill="#C2CDD9"/>
                <rect x="56" y="78" width="30" height="92" rx="2" fill="#B5C3D2"/>
                <rect x="91" y="105" width="22" height="65" rx="2" fill="#C2CDD9"/>
                <rect x="280" y="88" width="28" height="82" rx="2" fill="#C2CDD9"/>
                <rect x="313" y="100" width="24" height="70" rx="2" fill="#B5C3D2"/>
                <rect x="342" y="82" width="28" height="88" rx="2" fill="#BCC8D6"/>
                <rect x="150" y="142" width="72" height="30" rx="8" fill="#FFB800"/>
                <rect x="158" y="134" width="56" height="22" rx="5" fill="#FFB800"/>
                <rect x="162" y="137" width="19" height="15" rx="2" fill="#E0F0FF" opacity="0.85"/>
                <rect x="190" y="137" width="19" height="15" rx="2" fill="#E0F0FF" opacity="0.85"/>
                <circle cx="165" cy="174" r="8" fill="#1a2535"/>
                <circle cx="165" cy="174" r="4" fill="#D0DAE6"/>
                <circle cx="207" cy="174" r="8" fill="#1a2535"/>
                <circle cx="207" cy="174" r="4" fill="#D0DAE6"/>
                <circle cx="78" cy="130" r="4" fill="#FFB800" opacity="0.5"/>
                <circle cx="115" cy="124" r="3.5" fill="#FFB800" opacity="0.35"/>
                <circle cx="148" cy="120" r="4.5" fill="#FFB800"/>
                <line x1="78" y1="130" x2="148" y2="120" stroke="#FFB800" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.45"/>
                <circle cx="250" cy="105" r="14" fill="#FFB800" opacity="0.1"/>
                <path d="M250 92C244.5 92 240 96.5 240 102C240 109 250 118 250 118C250 118 260 109 260 102C260 96.5 255.5 92 250 92Z" fill="#FFB800"/>
                <circle cx="250" cy="102" r="4.5" fill="white"/>
                <ellipse cx="55" cy="30" rx="26" ry="10" fill="white" opacity="0.65"/>
                <ellipse cx="73" cy="24" rx="19" ry="8" fill="white" opacity="0.75"/>
                <ellipse cx="305" cy="26" rx="24" ry="9" fill="white" opacity="0.65"/>
                <ellipse cx="323" cy="20" rx="17" ry="7.5" fill="white" opacity="0.75"/>
              </svg>
            </div>
          </div>
        </section>

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
