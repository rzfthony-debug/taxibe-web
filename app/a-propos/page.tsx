import { safeJsonLd } from "@/lib/sanitize";
import Image from "next/image";
import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import HeroIllustration from "@/app/components/HeroIllustration";

export const revalidate = 3600;

export const metadata = {
  title: "À propos",
  description: "Découvrez TaxiBe, l'application de référence pour les lignes de taxi-be à Antananarivo, Madagascar. Notre mission, notre équipe et notre histoire.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "À propos de TaxiBe",
    description: "Découvrez TaxiBe, l'application de référence pour les lignes de taxi-be à Antananarivo, Madagascar.",
    url: "/a-propos",
    images: [{ url: "/logo_taxibe.png", width: 1842, height: 1466, alt: "À propos de TaxiBe" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "À propos de TaxiBe",
    description: "Découvrez TaxiBe, l'application de référence pour les lignes de taxi-be à Antananarivo.",
    images: ["/logo_taxibe.png"],
  },
};

async function getHeroImageUrl(): Promise<string | null> {
  try {
    const { data } = await Promise.race([
      supabase.from("parametres").select("valeur").eq("cle", "apropos_hero_image_url").single(),
      new Promise<{ data: null }>((r) => setTimeout(() => r({ data: null }), 8000)),
    ]);
    return data?.valeur ?? null;
  } catch { return null; }
}

const jsonLdAPropos = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TaxiBe",
  "url": "https://taxibemada.vercel.app",
  "logo": "https://taxibemada.vercel.app/logo_taxibe.png",
  "description": "Application de référence pour les lignes de taxi-be à Antananarivo, Madagascar.",
  "address": { "@type": "PostalAddress", "addressLocality": "Antananarivo", "addressCountry": "MG" },
  "sameAs": ["https://taxibemada.vercel.app"],
};

export default async function AProposPage() {
  const heroImageUrl = await getHeroImageUrl();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLdAPropos) }} />
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
                  À propos
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 16px", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
                L&apos;application de <span style={{ color: "#FFB800" }}>taxi-be</span> d&apos;Antananarivo
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: 480, margin: 0, lineHeight: 1.75 }}>
                Votre guide pour naviguer parmi les lignes de taxi-be qui sillonnent la capitale malgache au quotidien.
              </p>
            </div>
            <div className="page-hero-img">
              {heroImageUrl ? (
                <Image src={heroImageUrl} alt="À propos de TaxiBe" width={600} height={420} sizes="(max-width: 768px) 0px, 600px" priority style={{ width: "100%", height: "auto", maxHeight: 420, objectFit: "contain", mixBlendMode: "multiply" }} />
              ) : (
                <HeroIllustration />
              )}
            </div>
          </div>
        </section>

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px" }}>
          <div style={{
            background: "white", borderRadius: 14, padding: "40px 40px",
            border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
          }}>
            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0D1525", marginBottom: 16, letterSpacing: "-0.01em" }}>
                Notre mission
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.8, margin: 0 }}>
                TaxiBe est une application conçue pour aider les habitants d&apos;Antananarivo à se repérer parmi
                les centaines de lignes de taxi-be qui sillonnent la capitale malgache. Notre objectif est simple : rendre
                le transport public à Tana plus lisible, plus accessible, et plus simple à utiliser au quotidien.
              </p>
            </section>

            <div style={{ borderTop: "1px solid #F1F5F9", marginBottom: 40 }} />

            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0D1525", marginBottom: 16, letterSpacing: "-0.01em" }}>
                Ce que fait TaxiBe
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.8, marginBottom: 16 }}>
                TaxiBe regroupe toutes les fonctionnalités essentielles pour se déplacer à Tana. L&apos;ensemble
                des fonctionnalités est disponible dans l&apos;application mobile, accessibles aux membres.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { titre: "Recherche par numéro", desc: "Entrez le numéro d'une ligne et obtenez tous les arrêts et le trajet complet en détail." },
                  { titre: "Recherche par lieu", desc: "Indiquez votre point de départ et votre destination — TaxiBe calcule les correspondances automatiquement, y compris les doubles correspondances." },
                  { titre: "Localisation GPS", desc: "Activez la localisation pour voir toutes les lignes disponibles autour de vous." },
                  { titre: "Lignes favorites", desc: "Sauvegardez vos lignes du quotidien pour y accéder d'un seul geste." },
                  { titre: "Jeux et récompenses", desc: "Sudoku et quiz sur les lignes de Tana — une façon ludique d'apprendre à se repérer." },
                ].map((item) => (
                  <div key={item.titre} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFB800", marginTop: 8, flexShrink: 0 }} />
                    <div>
                      <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0D1525" }}>{item.titre} — </span>
                      <span style={{ fontSize: "0.875rem", color: "#64748B", lineHeight: 1.65 }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div style={{ borderTop: "1px solid #F1F5F9", marginBottom: 40 }} />

            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0D1525", marginBottom: 16, letterSpacing: "-0.01em" }}>
                Gratuit et accessible
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.8, margin: "0 0 12px" }}>
                TaxiBe est gratuit. L&apos;inscription est libre et permet d&apos;accéder à l&apos;ensemble
                des fonctionnalités de l&apos;application. La recherche de base est disponible sur ce site web,
                mais l&apos;expérience complète — avec toutes les fonctionnalités — se trouve dans l&apos;application mobile.
              </p>
              <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.8, margin: 0 }}>
                Nous croyons que l&apos;accès à l&apos;information sur le transport public doit être simple et ouvert
                à tous les habitants de Tana.
              </p>
            </section>

            <div style={{ borderTop: "1px solid #F1F5F9", marginBottom: 40 }} />

            <section id="equipe" style={{ marginBottom: 40, scrollMarginTop: 90 }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0D1525", marginBottom: 16, letterSpacing: "-0.01em" }}>
                Notre équipe
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.8, margin: "0 0 16px" }}>
                TaxiBe est développé par une équipe basée à Antananarivo, convaincue que la ville se comprend
                mieux quand on la parcourt. Nous cartographions le réseau ligne par ligne, avec l&apos;aide d&apos;usagers
                qui connaissent chaque quartier mieux que quiconque.
              </p>
              <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.8, margin: 0 }}>
                Envie de nous aider à faire grandir la base de données ?{" "}
                <Link href="/communaute" style={{ color: "#FFB800", fontWeight: 700, textDecoration: "none" }}>
                  Devenez contributeur →
                </Link>
              </p>
            </section>

            <div style={{ borderTop: "1px solid #F1F5F9", marginBottom: 40 }} />

            <section>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0D1525", marginBottom: 16, letterSpacing: "-0.01em" }}>
                Contact
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.8, margin: "0 0 12px" }}>
                Pour toute question, suggestion ou signalement d&apos;erreur sur les lignes, vous pouvez nous contacter
                directement depuis l&apos;application ou via notre formulaire en ligne.
              </p>
              <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.8, margin: 0 }}>
                Vous souhaitez contribuer à la base de données des lignes ou signaler une erreur ?{" "}
                <Link href="/contact" style={{ color: "#FFB800", fontWeight: 700, textDecoration: "none" }}>
                  Contactez-nous →
                </Link>
              </p>
            </section>
          </div>
        </div>
      </main>
      <CtaApp />
      <Footer />
    </>
  );
}




