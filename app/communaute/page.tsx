import Image from "next/image";
import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import CommunauteForm from "./CommunauteForm";
import { supabase } from "@/lib/supabase";
import HeroIllustration from "@/app/components/HeroIllustration";

export const revalidate = 3600;

export const metadata = {
  title: "Communauté",
  description: "Signalez une erreur, devenez contributeur ou envoyez une remarque à l'équipe TaxiBe.",
  alternates: { canonical: "/communaute" },
  openGraph: {
    title: "Communauté — TaxiBe",
    description: "Signalez une erreur, devenez contributeur ou envoyez une remarque à l'équipe TaxiBe.",
    url: "/communaute",
    images: [{ url: "/logo_taxibe.png", width: 1200, height: 630, alt: "Communauté TaxiBe" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Communauté — TaxiBe",
    description: "Signalez une erreur, devenez contributeur ou envoyez une remarque à l'équipe TaxiBe.",
    images: ["/logo_taxibe.png"],
  },
};

async function getHeroImageUrl(): Promise<string | null> {
  try {
    const { data } = await Promise.race([
      supabase.from("parametres").select("valeur").eq("cle", "communaute_hero_image_url").single(),
      new Promise<{ data: null }>((r) => setTimeout(() => r({ data: null }), 8000)),
    ]);
    return data?.valeur ?? null;
  } catch {
    return null;
  }
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
          .valeurs-grid { grid-template-columns: repeat(4, 1fr) !important; }
          @media (max-width: 900px) { .valeurs-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 540px) { .valeurs-grid { grid-template-columns: 1fr !important; } }
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
                <Image src={heroImageUrl} alt="Communauté TaxiBe" width={600} height={420} sizes="(max-width: 768px) 0px, 50vw" priority style={{ width: "100%", height: "auto", maxHeight: 420, objectFit: "contain", mixBlendMode: "multiply" }} />
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

        {/* Section valeurs communauté */}
        <section style={{ background: "white", borderTop: "1px solid #E8ECF0", padding: "56px 24px" }}>
          <div className="valeurs-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "#E8ECF0", borderRadius: 16, overflow: "hidden" }}>

            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                ),
                titre: "Partagez vos expériences",
                desc: "Décrivez vos trajets, donnez votre avis et aidez la communauté à faire les bons choix.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                ),
                titre: "Signalez une erreur",
                desc: "Un arrêt manquant, un trajet incorrect ou une information à corriger ? Dites-le nous.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ),
                titre: "Devenez contributeur",
                desc: "Participez à l'amélioration de TaxiBe en contribuant à la qualité des données.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 12 20 22 4 22 4 12"/>
                    <rect x="2" y="7" width="20" height="5"/>
                    <line x1="12" y1="22" x2="12" y2="7"/>
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
                  </svg>
                ),
                titre: "Ensemble, allons plus loin",
                desc: "Vos contributions rendent TaxiBe plus fiable, plus complet et utile pour tous.",
              },
            ].map((item) => (
              <div key={item.titre} style={{ background: "white", padding: "32px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: "rgba(255,184,0,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ margin: "0 0 8px", fontWeight: 800, fontSize: "0.95rem", color: "#0D1525", lineHeight: 1.3 }}>
                    {item.titre}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "#64748B", lineHeight: 1.65 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </section>

      </main>
      <CtaApp />
      <Footer />
    </>
  );
}
