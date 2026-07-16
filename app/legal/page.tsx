import Image from "next/image";
import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import { supabase } from "@/lib/supabase";
import HeroIllustration from "@/app/components/HeroIllustration";

export const revalidate = 86400;

export const metadata = {
  title: "Informations lÃ©gales",
  description: "Mentions lÃ©gales et conditions d'utilisation de TaxiBe.",
  alternates: { canonical: "/legal" },
  robots: { index: false, follow: false },
};

async function getHeroImageUrl(): Promise<string | null> {
  const { data } = await supabase
    .from("parametres")
    .select("valeur")
    .eq("cle", "legal_hero_image_url")
    .single();
  return data?.valeur ?? null;
}

const MENTIONS = [
  {
    titre: "Ã‰diteur de l'application",
    contenu: [
      "Nom de l'application : TaxiBe",
      "Type : Application mobile et site web",
      "Territoire de service : Antananarivo, Madagascar",
    ],
  },
  {
    titre: "HÃ©bergement",
    contenu: [
      "Site web : Vercel Inc., 340 Pine Street Suite 701, San Francisco, CA 94104, Ã‰tats-Unis",
      "Base de donnÃ©es : Supabase Inc.",
      "Application Android : distribuÃ©e directement via fichier APK",
    ],
  },
  {
    titre: "PropriÃ©tÃ© intellectuelle",
    contenu: [
      "L'ensemble du contenu de ce site et de l'application â€” textes, visuels, logo, interface â€” est la propriÃ©tÃ© exclusive de TaxiBe.",
      "Toute reproduction, mÃªme partielle, est interdite sans autorisation Ã©crite prÃ©alable.",
    ],
  },
  {
    titre: "DonnÃ©es personnelles",
    contenu: [
      "TaxiBe collecte uniquement les donnÃ©es strictement nÃ©cessaires au fonctionnement de l'application (compte utilisateur optionnel, favoris, signalements).",
      "Aucune donnÃ©e n'est vendue Ã  des tiers.",
      "ConformÃ©ment Ã  la loi malgache nÂ° 2014-038 sur la protection des donnÃ©es personnelles, vous disposez d'un droit d'accÃ¨s, de rectification et de suppression de vos donnÃ©es.",
    ],
  },
  {
    titre: "ResponsabilitÃ©",
    contenu: [
      "Les informations sur les lignes de taxi-be sont fournies Ã  titre indicatif. TaxiBe ne garantit pas leur exactitude en temps rÃ©el.",
      "TaxiBe ne saurait Ãªtre tenu responsable des dommages rÃ©sultant de l'utilisation de l'application ou de l'inaccessibilitÃ© du service.",
    ],
  },
];

const CONDITIONS = [
  {
    titre: "Acceptation des conditions",
    contenu: [
      "En utilisant TaxiBe â€” que ce soit via l'application mobile ou le site web â€” vous acceptez sans rÃ©serve les prÃ©sentes conditions d'utilisation.",
      "Si vous n'acceptez pas ces conditions, veuillez cesser d'utiliser l'application et le site.",
    ],
  },
  {
    titre: "Description du service",
    contenu: [
      "TaxiBe est un service d'information sur les lignes de taxi-be Ã  Antananarivo. Il permet de rechercher des lignes par numÃ©ro, par arrÃªt, ou par localisation GPS.",
      "Le service est fourni gratuitement, sans garantie de disponibilitÃ© continue ni d'exactitude absolue des donnÃ©es.",
    ],
  },
  {
    titre: "Utilisation du service",
    contenu: [
      "Vous vous engagez Ã  utiliser TaxiBe uniquement Ã  des fins lÃ©gales et personnelles.",
      "Il est interdit d'extraire automatiquement les donnÃ©es de l'application (scraping), de les reproduire Ã  des fins commerciales, ou de tenter d'accÃ©der aux parties non publiques du service.",
      "Tout signalement abusif ou contenu inappropriÃ© soumis via l'application pourra entraÃ®ner la suspension de votre compte.",
    ],
  },
  {
    titre: "Compte utilisateur",
    contenu: [
      "La crÃ©ation d'un compte n'est pas obligatoire pour utiliser les fonctionnalitÃ©s de base de TaxiBe.",
      "Si vous crÃ©ez un compte, vous Ãªtes responsable de la confidentialitÃ© de vos identifiants.",
      "TaxiBe se rÃ©serve le droit de suspendre ou supprimer tout compte en cas de violation des prÃ©sentes conditions.",
    ],
  },
  {
    titre: "Exactitude des informations",
    contenu: [
      "TaxiBe met tout en Å“uvre pour maintenir des informations Ã  jour sur les lignes de taxi-be. Cependant, les itinÃ©raires, arrÃªts et horaires peuvent changer sans prÃ©avis.",
      "TaxiBe ne peut Ãªtre tenu responsable des consÃ©quences d'une information inexacte ou obsolÃ¨te.",
    ],
  },
  {
    titre: "Modification des conditions",
    contenu: [
      "TaxiBe se rÃ©serve le droit de modifier les prÃ©sentes conditions Ã  tout moment. Les utilisateurs seront informÃ©s des changements importants via l'application.",
      "La poursuite de l'utilisation du service aprÃ¨s modification des conditions vaut acceptation des nouvelles conditions.",
    ],
  },
  {
    titre: "Droit applicable",
    contenu: [
      "Les prÃ©sentes conditions sont rÃ©gies par le droit malgache.",
      "En cas de litige, une solution amiable sera recherchÃ©e en prioritÃ©.",
    ],
  },
];

function SectionBlock({ sections }: { sections: { titre: string; contenu: string[] }[] }) {
  return (
    <div style={{
      background: "white", borderRadius: 14, padding: "40px",
      border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
      display: "flex", flexDirection: "column", gap: 32,
    }}>
      {sections.map((section) => (
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
        DerniÃ¨re mise Ã  jour : juillet 2026
      </p>
    </div>
  );
}

export default async function LegalPage() {
  const heroImageUrl = await getHeroImageUrl();
  return (
    <>
      <Nav />
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>
        <style>{`
          .page-hero-inner { max-width: 1280px; margin: 0 auto; padding: 64px 40px; display: grid; grid-template-columns: 1fr 1.4fr; gap: 24px; align-items: center; }
          .page-hero-img { display: flex; align-items: center; justify-content: center; }
          @media (max-width: 768px) { .page-hero-inner { grid-template-columns: 1fr; padding: 40px 20px; } .page-hero-img { display: none; } }
        `}</style>
        <section style={{ background: "#F8F9FB", overflow: "hidden", borderBottom: "1px solid #E8ECF0" }}>
          <div className="page-hero-inner">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.4)", borderRadius: 8, padding: "5px 12px", marginBottom: 24 }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8860B" }}>
                  LÃ©gal
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 16px", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
                Informations <span style={{ color: "#FFB800" }}>lÃ©gales</span>
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: 480, margin: 0, lineHeight: 1.75 }}>
                Mentions lÃ©gales et conditions d&apos;utilisation de l&apos;application et du site TaxiBe.
              </p>
            </div>
            <div className="page-hero-img">
              {heroImageUrl ? (
                <Image src={heroImageUrl} alt="Informations lÃ©gales TaxiBe" width={600} height={420} sizes="(max-width: 768px) 0px, 50vw" style={{ width: "100%", height: "auto", maxHeight: 420, objectFit: "contain", mixBlendMode: "multiply" }} />
              ) : (
                <HeroIllustration />
              )}
            </div>
          </div>
        </section>

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px", display: "flex", flexDirection: "column", gap: 40 }}>
          <div>
            <h2 style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", margin: "0 0 16px" }}>
              Mentions lÃ©gales
            </h2>
            <SectionBlock sections={MENTIONS} />
          </div>
          <div>
            <h2 style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", margin: "0 0 16px" }}>
              Conditions d&apos;utilisation
            </h2>
            <SectionBlock sections={CONDITIONS} />
          </div>
        </div>
      </main>
      <CtaApp />
      <Footer />
    </>
  );
}

