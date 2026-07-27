import { safeJsonLd } from "@/lib/sanitize";
import Image from "next/image";
import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import HeroIllustration from "@/app/components/HeroIllustration";
import FaqAccordion from "@/app/components/FaqAccordion";

export const revalidate = 3600;

export const metadata = {
  title: "FAQ — Questions fréquentes sur TaxiBe et les lignes de taxi-be à Antananarivo",
  description: "Toutes les réponses sur TaxiBe : comment trouver une ligne de taxi-be à Antananarivo, calculer une correspondance, télécharger l'app et signaler une erreur.",
  alternates: { canonical: "/aide" },
  openGraph: {
    title: "FAQ TaxiBe — Lignes de taxi-be à Antananarivo",
    description: "Questions fréquentes sur la recherche de lignes de taxi-be, les correspondances et l'utilisation de l'application TaxiBe.",
    url: "/aide",
    images: [{ url: "/logo_taxibe.png", width: 1842, height: 1466, alt: "FAQ TaxiBe" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "FAQ TaxiBe — Lignes de taxi-be à Antananarivo",
    description: "Questions fréquentes sur la recherche de lignes de taxi-be et l'utilisation de TaxiBe.",
    images: ["/logo_taxibe.png"],
  },
};

async function getHeroImageUrl(): Promise<string | null> {
  try {
    const { data } = await supabase.from("parametres").select("valeur").eq("cle", "aide_hero_image_url").single();
    return data?.valeur ?? null;
  } catch { return null; }
}

const FAQ_SECTIONS = [
  {
    theme: "Trouver et utiliser les lignes",
    questions: [
      {
        q: "Qu'est-ce qu'un taxi-be et comment fonctionne-t-il à Antananarivo ?",
        r: "Un taxi-be est un minibus collectif qui constitue le principal moyen de transport en commun à Antananarivo. Chaque ligne est identifiée par un numéro (ex. : 147, 183, 163) ou une lettre (ex. : D). Les taxi-be circulent sur des itinéraires fixes entre des arrêts définis, sans horaires fixes.",
      },
      {
        q: "Comment trouver une ligne de taxi-be à Antananarivo avec TaxiBe ?",
        r: "Tapez le numéro de la ligne dans la barre de recherche (ex. : 147) pour obtenir tous les arrêts et l'itinéraire complet. Vous pouvez aussi rechercher par nom de quartier ou d'arrêt pour trouver les lignes qui desservent une zone précise.",
      },
      {
        q: "Comment calculer une correspondance entre deux lignes de taxi-be ?",
        r: "Dans l'application, indiquez votre point de départ et votre destination. TaxiBe calcule automatiquement le meilleur enchaînement de lignes, y compris les correspondances doubles si aucune ligne directe n'existe entre les deux points.",
      },
      {
        q: "Comment trouver les arrêts de taxi-be près de chez moi ?",
        r: "Activez la localisation GPS dans l'application. TaxiBe affiche les arrêts et lignes disponibles autour de votre position. Vous pouvez aussi utiliser la fonction « Ma position » pour voir les lignes qui passent à proximité.",
      },
    ],
  },
  {
    theme: "Application et fonctionnalités",
    questions: [
      {
        q: "TaxiBe fonctionne-t-il sans connexion internet ?",
        r: "Les lignes que vous avez ajoutées en favori restent consultables hors connexion. La recherche en temps réel, la localisation GPS et les correspondances nécessitent une connexion internet active.",
      },
      {
        q: "Les horaires des taxi-be sont-ils disponibles sur TaxiBe ?",
        r: "Non — les taxi-be d'Antananarivo ne fonctionnent pas sur des horaires fixes. TaxiBe indique les trajets, les arrêts et les correspondances, mais ne peut pas afficher d'heure de passage en temps réel. C'est une limite du réseau de transport actuel, pas de l'application.",
      },
      {
        q: "Comment sauvegarder mes lignes favorites dans TaxiBe ?",
        r: "Depuis la fiche d'une ligne dans l'application, appuyez sur l'icône étoile pour l'ajouter à vos favoris. Vos lignes favorites sont accessibles depuis l'écran d'accueil, même sans connexion internet.",
      },
    ],
  },
  {
    theme: "Téléchargement et accès",
    questions: [
      {
        q: "Comment télécharger l'application TaxiBe sur Android ?",
        r: "TaxiBe est disponible en téléchargement direct au format APK depuis la page Télécharger du site. L'application est compatible Android 6.0 et supérieur. Elle n'est pas encore disponible sur le Play Store — le téléchargement se fait directement via le fichier APK.",
      },
      {
        q: "TaxiBe est-il gratuit ?",
        r: "Oui, TaxiBe est entièrement gratuit. Aucune inscription n'est requise pour utiliser la recherche de base sur le site web. L'application mobile donne accès à toutes les fonctionnalités (GPS, favoris, correspondances) après une inscription gratuite.",
      },
    ],
  },
  {
    theme: "Fiabilité et contribution",
    questions: [
      {
        q: "Comment signaler une erreur sur une ligne ou un arrêt de taxi-be ?",
        r: "Utilisez la fonction « Signaler » dans l'application en indiquant le numéro de ligne concerné et la nature de l'erreur (arrêt manquant, itinéraire incorrect, ligne supprimée). Notre équipe vérifie et met à jour la base dans les meilleurs délais. Votre contribution aide tous les usagers.",
      },
    ],
  },
];


export default async function AidePage() {
  const heroImageUrl = await getHeroImageUrl();

  const allQuestions = FAQ_SECTIONS.flatMap((s) => s.questions);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.r },
    })),
  };

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>
        <style>{`
          .page-hero-inner { max-width: 1280px; margin: 0 auto; padding: 64px 40px; display: grid; grid-template-columns: 1fr 1.4fr; gap: 24px; align-items: center; }
          .page-hero-img { display: flex; align-items: center; justify-content: center; }
          @media (max-width: 768px) { .page-hero-inner { grid-template-columns: 1fr; padding: 40px 20px; } .page-hero-img { display: none; } }
        `}</style>

        {/* ── Hero ── */}
        <section style={{ background: "#F8F9FB", overflow: "hidden", borderBottom: "1px solid #E8ECF0" }}>
          <div className="page-hero-inner">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.4)", borderRadius: 8, padding: "5px 12px", marginBottom: 24 }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8860B" }}>
                  Questions fréquentes
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 16px", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
                Tout ce qu&apos;il faut savoir sur <span style={{ color: "#FFB800" }}>TaxiBe</span>
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: 480, margin: 0, lineHeight: 1.75 }}>
                Recherche de ligne, correspondances, téléchargement, signalement — toutes les réponses pour bien utiliser TaxiBe à Antananarivo.
              </p>
            </div>
            <div className="page-hero-img">
              {heroImageUrl ? (
                <Image src={heroImageUrl} alt="Aide TaxiBe" width={600} height={420} sizes="(max-width: 768px) 0px, 600px" style={{ width: "100%", height: "auto", maxHeight: 420, objectFit: "contain", mixBlendMode: "multiply" }} priority />
              ) : (
                <HeroIllustration />
              )}
            </div>
          </div>
        </section>

        {/* ── FAQ accordéon ── */}
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px" }}>
          <FaqAccordion sections={FAQ_SECTIONS} />

          {/* CTA contact */}
          <div style={{
            marginTop: 24, background: "#0D1525", borderRadius: 14,
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
