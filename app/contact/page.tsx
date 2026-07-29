import { safeJsonLd } from "@/lib/sanitize";
import Image from "next/image";
import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import ContactForm from "@/app/components/ContactForm";
import { supabase } from "@/lib/supabase";
import HeroIllustration from "@/app/components/HeroIllustration";

export const revalidate = 3600;

export const metadata = {
  title: "Contact",
  description: "Une question, une suggestion ou un partenariat ? Contactez l'équipe TaxiBe, l'application des lignes de taxi-be à Antananarivo.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — TaxiBe",
    description: "Une question, une suggestion ou un partenariat ? Contactez l'équipe TaxiBe.",
    url: "/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact TaxiBe" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Contact — TaxiBe",
    description: "Une question, une suggestion ou un partenariat ? Contactez l'équipe TaxiBe.",
    images: ["/og-image.jpg"],
  },
};

async function getHeroImageUrl(): Promise<string | null> {
  try {
    const { data } = await Promise.race([
      supabase.from("parametres").select("valeur").eq("cle", "contact_hero_image_url").single(),
      new Promise<{ data: null }>((r) => setTimeout(() => r({ data: null }), 8000)),
    ]);
    return data?.valeur ?? null;
  } catch { return null; }
}


const jsonLdContact = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact TaxiBe",
  "url": "https://taxibe.mg/contact",
  "description": "Une question, une suggestion ou un partenariat ? Contactez l'équipe TaxiBe.",
  "mainEntity": {
    "@type": "Organization",
    "name": "TaxiBe",
    "url": "https://taxibe.mg",
    "address": { "@type": "PostalAddress", "addressLocality": "Antananarivo", "addressCountry": "MG" },
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ statut?: string }>;
}) {
  const [{ statut }, heroImageUrl] = await Promise.all([searchParams, getHeroImageUrl()]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLdContact) }} />
      <Nav />
      <style>{`
        .page-hero-inner { max-width: 1280px; margin: 0 auto; padding: 56px 40px; display: grid; grid-template-columns: 1fr 1.4fr; gap: 24px; align-items: center; }
        .page-hero-img   { display: flex; align-items: center; justify-content: center; }
        @media (max-width: 768px) {
          .page-hero-inner { grid-template-columns: 1fr; padding: 40px 20px; }
          .page-hero-img   { display: none; }
        }
      `}</style>
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>

        {/* Hero */}
        <section style={{ background: "white", borderBottom: "1px solid #E8ECF0", overflow: "hidden" }}>
          <div className="page-hero-inner">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.4)", borderRadius: 8, padding: "5px 12px", marginBottom: 24 }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8860B" }}>Contact</span>
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 16px", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
                On vous <span style={{ color: "#FFB800" }}>répond.</span>
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: 440, margin: 0, lineHeight: 1.75 }}>
                Choisissez le sujet qui correspond à votre demande — notre équipe vous répond directement par email.
              </p>
            </div>
            <div className="page-hero-img">
              {heroImageUrl ? (
                <Image src={heroImageUrl} alt="Contact TaxiBe" width={600} height={420} sizes="(max-width: 768px) 0px, 600px" priority style={{ width: "100%", height: "auto", maxHeight: 420, objectFit: "contain", mixBlendMode: "multiply" }} />
              ) : (
                <HeroIllustration />
              )}
            </div>
          </div>
        </section>

        {/* Formulaire */}
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px" }}>
          <div style={{ background: "white", borderRadius: 20, border: "1px solid #E8ECF0", padding: "36px 32px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0D1525", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
              Choisissez votre sujet
            </h2>
            <p style={{ fontSize: "0.82rem", color: "#94A3B8", margin: "0 0 24px" }}>
              Sélectionnez une catégorie puis remplissez le formulaire.
            </p>
            <ContactForm status={statut} />
          </div>
        </div>
      </main>
      <CtaApp />
      <Footer />
    </>
  );
}




