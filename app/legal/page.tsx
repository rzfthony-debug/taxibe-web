import Image from "next/image";
import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import { supabase } from "@/lib/supabase";
import HeroIllustration from "@/app/components/HeroIllustration";

export const revalidate = 0;

export const metadata = {
  title: "Informations légales",
  description: "Mentions légales et conditions d'utilisation de TaxiBe.",
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
];

const CONDITIONS = [
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
        Dernière mise à jour : juillet 2026
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
                  Légal
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 16px", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
                Informations <span style={{ color: "#FFB800" }}>légales</span>
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: 480, margin: 0, lineHeight: 1.75 }}>
                Mentions légales et conditions d&apos;utilisation de l&apos;application et du site TaxiBe.
              </p>
            </div>
            <div className="page-hero-img">
              {heroImageUrl ? (
                <Image src={heroImageUrl} alt="Informations légales TaxiBe" width={600} height={420} sizes="(max-width: 768px) 0px, 50vw" style={{ width: "100%", height: "auto", maxHeight: 420, objectFit: "contain", mixBlendMode: "multiply" }} />
              ) : (
                <HeroIllustration />
              )}
            </div>
          </div>
        </section>

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px", display: "flex", flexDirection: "column", gap: 40 }}>
          <div>
            <h2 style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", margin: "0 0 16px" }}>
              Mentions légales
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
