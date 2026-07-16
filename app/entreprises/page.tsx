import Image from "next/image";
import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import HeroIllustration from "@/app/components/HeroIllustration";

export const revalidate = 3600;

export const metadata = {
  title: "Entreprises",
  description: "Partenariats et visibilitÃ© sur TaxiBe : coopÃ©ratives de transport, institutions, entreprises et annonceurs Ã  Antananarivo.",
  alternates: { canonical: "/entreprises" },
  openGraph: {
    title: "Entreprises â€” TaxiBe",
    description: "Partenariats et visibilitÃ© sur TaxiBe : coopÃ©ratives de transport, institutions, entreprises et annonceurs Ã  Antananarivo.",
    url: "/entreprises",
    images: [{ url: "/logo_taxibe.png", width: 1200, height: 630, alt: "TaxiBe Entreprises" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Entreprises â€” TaxiBe",
    description: "Partenariats et visibilitÃ© sur TaxiBe Ã  Antananarivo.",
    images: ["/logo_taxibe.png"],
  },
};

async function getHeroImageUrl(): Promise<string | null> {
  const { data } = await supabase
    .from("parametres")
    .select("valeur")
    .eq("cle", "entreprises_hero_image_url")
    .single();
  return data?.valeur ?? null;
}

const PROFILS = [
  {
    titre: "CoopÃ©ratives de transport",
    desc: "Partagez vos donnÃ©es de lignes officielles et gagnez en visibilitÃ© auprÃ¨s de milliers d'usagers.",
  },
  {
    titre: "Institutions & collectivitÃ©s",
    desc: "Collaborons sur des projets de mobilitÃ© urbaine ou de sensibilisation au transport public Ã  Tana.",
  },
  {
    titre: "Acteurs de la mobilitÃ©",
    desc: "Startups, ONG ou projets de recherche autour du transport Ã  Madagascar â€” parlons-en.",
  },
];

const ATOUTS = [
  {
    chiffre: "Quotidien",
    titre: "Un usage du quotidien",
    desc: "TaxiBe est consultÃ© Ã  chaque trajet, matin et soir, par des usagers rÃ©guliers du transport public.",
  },
  {
    chiffre: "Local",
    titre: "Une audience 100% Tananarivienne",
    desc: "Toute l'audience est concentrÃ©e sur Antananarivo et ses environs â€” idÃ©al pour une visibilitÃ© de proximitÃ©.",
  },
  {
    chiffre: "Non-intrusif",
    titre: "Des formats respectueux de l'expÃ©rience",
    desc: "Nos emplacements sont pensÃ©s pour ne jamais gÃªner la recherche d'un trajet.",
  },
];

export default async function EntreprisesPage() {
  const heroImageUrl = await getHeroImageUrl();
  return (
    <>
      <Nav />
      <style>{`
        .ent-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .atouts-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .page-hero-inner { max-width: 1280px; margin: 0 auto; padding: 64px 40px; display: grid; grid-template-columns: 1fr 1.4fr; gap: 24px; align-items: center; }
        .page-hero-img { display: flex; align-items: center; justify-content: center; }
        @media (max-width: 768px) {
          .page-hero-inner { grid-template-columns: 1fr; padding: 40px 20px; }
          .page-hero-img { display: none; }
        }
        @media (max-width: 760px) {
          .ent-grid { grid-template-columns: 1fr; }
          .atouts-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>

        <section style={{ background: "#F8F9FB", overflow: "hidden", borderBottom: "1px solid #E8ECF0" }}>
          <div className="page-hero-inner">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.4)", borderRadius: 8, padding: "5px 12px", marginBottom: 24 }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8860B" }}>
                  Entreprises
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 16px", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
                Travailler avec <span style={{ color: "#FFB800" }}>TaxiBe</span>
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: 480, margin: 0, lineHeight: 1.75 }}>
                Partenariats institutionnels, visibilitÃ© commerciale, projets de mobilitÃ© â€” plusieurs faÃ§ons de collaborer.
              </p>
            </div>
            <div className="page-hero-img">
              {heroImageUrl ? (
                <Image src={heroImageUrl} alt="Travailler avec TaxiBe" width={600} height={420} sizes="(max-width: 768px) 0px, 50vw" priority style={{ width: "100%", height: "auto", maxHeight: 420, objectFit: "contain", mixBlendMode: "multiply" }} />
              ) : (
                <HeroIllustration />
              )}
            </div>
          </div>
        </section>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px", display: "flex", flexDirection: "column", gap: 56 }}>

          {/* Section Partenariats */}
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", margin: "0 0 16px" }}>
              Partenariats
            </p>
            <div className="ent-grid">
              {PROFILS.map((p) => (
                <div key={p.titre} style={{
                  background: "white", borderRadius: 12, border: "1px solid #E8ECF0", padding: "24px 22px",
                }}>
                  <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: "0.92rem", color: "#0D1525" }}>
                    {p.titre}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "#94A3B8", lineHeight: 1.6 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#0D1525", color: "#FFB800",
                fontWeight: 800, fontSize: "0.875rem", padding: "12px 24px",
                borderRadius: 9, textDecoration: "none",
              }}>
                Nous contacter pour un partenariat â†’
              </Link>
            </div>
          </div>

          {/* Section VisibilitÃ© */}
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", margin: "0 0 16px" }}>
              VisibilitÃ© commerciale
            </p>
            <p style={{ fontSize: "0.95rem", color: "#64748B", margin: "0 0 20px", lineHeight: 1.7 }}>
              Touchez les usagers des taxi-be d&apos;Antananarivo directement lÃ  oÃ¹ ils prÃ©parent leur trajet du jour.
            </p>
            <div className="atouts-grid" style={{ marginBottom: 24 }}>
              {ATOUTS.map((a) => (
                <div key={a.titre} style={{
                  background: "white", borderRadius: 12, border: "1px solid #E8ECF0", padding: "22px 20px",
                }}>
                  <p style={{ margin: "0 0 10px", fontWeight: 900, fontSize: "1.1rem", color: "#FFB800" }}>
                    {a.chiffre}
                  </p>
                  <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: "0.86rem", color: "#0D1525" }}>
                    {a.titre}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "#94A3B8", lineHeight: 1.6 }}>
                    {a.desc}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#0D1525", color: "#FFB800",
                fontWeight: 800, fontSize: "0.875rem", padding: "12px 24px",
                borderRadius: 9, textDecoration: "none",
              }}>
                Demander une offre commerciale â†’
              </Link>
            </div>
          </div>

        </div>
      </main>
      <CtaApp />
      <Footer />
    </>
  );
}


