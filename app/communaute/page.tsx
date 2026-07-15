import Image from "next/image";
import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import CommunauteForm from "./CommunauteForm";
import { supabase } from "@/lib/supabase";
import HeroIllustration from "@/app/components/HeroIllustration";

export const revalidate = 0;

export const metadata = {
  title: "Communauté — TaxiBe",
  description: "Signalez une erreur, devenez contributeur ou envoyez une remarque à l'équipe TaxiBe.",
};

async function getHeroImageUrl(): Promise<string | null> {
  const { data } = await supabase
    .from("parametres")
    .select("valeur")
    .eq("cle", "communaute_hero_image_url")
    .single();
  return data?.valeur ?? null;
}

export default async function CommunautePage({
  searchParams,
}: {
  searchParams: Promise<{ statut?: string }>;
}) {
  const [{ statut }, heroImageUrl] = await Promise.all([searchParams, getHeroImageUrl()]);

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
                  Communauté
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 16px", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
                Contribuer à <span style={{ color: "#FFB800" }}>TaxiBe</span>
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: 480, margin: 0, lineHeight: 1.75 }}>
                TaxiBe est construit avec l&apos;aide de ceux qui connaissent le mieux le réseau.
                Signalez une erreur, rejoignez les contributeurs, ou envoyez-nous un message.
              </p>
            </div>
            <div className="page-hero-img">
              {heroImageUrl ? (
                <Image src={heroImageUrl} alt="Communauté TaxiBe" width={600} height={420} sizes="(max-width: 768px) 0px, 50vw" style={{ width: "100%", height: "auto", maxHeight: 420, objectFit: "contain", mixBlendMode: "multiply" }} />
              ) : (
                <HeroIllustration />
              )}
            </div>
          </div>
        </section>

        <div style={{ maxWidth: 680, margin: "0 auto", padding: "56px 24px" }}>
          <div style={{
            background: "white", borderRadius: 14, padding: "36px",
            border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
          }}>
            <CommunauteForm status={statut} />
          </div>
        </div>

      </main>
      <CtaApp />
      <Footer />
    </>
  );
}
