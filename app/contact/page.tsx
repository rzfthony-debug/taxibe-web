import { safeJsonLd } from "@/lib/sanitize";
import Image from "next/image";
import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import MessageForm from "@/app/components/MessageForm";
import Link from "next/link";
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
    images: [{ url: "/logo_taxibe.png", width: 1200, height: 630, alt: "Contact TaxiBe" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Contact — TaxiBe",
    description: "Une question, une suggestion ou un partenariat ? Contactez l'équipe TaxiBe.",
    images: ["/logo_taxibe.png"],
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

const RACCOURCIS = [
  { titre: "Signaler une erreur sur une ligne", desc: "Un arrêt, un trajet ou un tarif qui a changé ?", href: "/communaute" },
  { titre: "Une question sur l'application", desc: "Consultez les réponses aux questions les plus posées.", href: "/aide" },
  { titre: "Une offre de partenariat", desc: "Coopérative, institution, projet urbain.", href: "/entreprises" },
  { titre: "Un espace publicitaire", desc: "Faites connaître votre activité aux usagers de TaxiBe.", href: "/entreprises" },
];

const jsonLdContact = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact TaxiBe",
  "url": "https://taxibemada.vercel.app/contact",
  "description": "Une question, une suggestion ou un partenariat ? Contactez l'équipe TaxiBe.",
  "mainEntity": {
    "@type": "Organization",
    "name": "TaxiBe",
    "url": "https://taxibemada.vercel.app",
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
        .contact-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 24px; }
        .page-hero-inner { max-width: 1280px; margin: 0 auto; padding: 64px 40px; display: grid; grid-template-columns: 1fr 1.4fr; gap: 24px; align-items: center; }
        .page-hero-img { display: flex; align-items: center; justify-content: center; }
        @media (max-width: 768px) {
          .page-hero-inner { grid-template-columns: 1fr; padding: 40px 20px; }
          .page-hero-img { display: none; }
        }
        @media (max-width: 760px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>

        <section style={{ background: "#F8F9FB", overflow: "hidden", borderBottom: "1px solid #E8ECF0" }}>
          <div className="page-hero-inner">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.4)", borderRadius: 8, padding: "5px 12px", marginBottom: 24 }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8860B" }}>
                  Contact
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 16px", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
                Parlons de <span style={{ color: "#FFB800" }}>votre trajet</span>
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: 480, margin: 0, lineHeight: 1.75 }}>
                Une question, une remarque ou une idée pour améliorer TaxiBe ? Écrivez-nous, notre équipe
                vous répond directement par email.
              </p>
            </div>
            <div className="page-hero-img">
              {heroImageUrl ? (
                <Image src={heroImageUrl} alt="Contact TaxiBe" width={600} height={420} sizes="(max-width: 768px) 0px, 50vw" priority style={{ width: "100%", height: "auto", maxHeight: 420, objectFit: "contain", mixBlendMode: "multiply" }} />
              ) : (
                <HeroIllustration />
              )}
            </div>
          </div>
        </section>

        <div className="contact-grid" style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>

          {/* Raccourcis */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8", margin: "0 0 4px" }}>
              Une demande précise ?
            </p>
            {RACCOURCIS.map((r) => (
              <Link key={r.href} href={r.href} style={{
                display: "block", background: "white", borderRadius: 12,
                border: "1px solid #E8ECF0", padding: "16px 18px", textDecoration: "none",
              }}>
                <p style={{ margin: "0 0 3px", fontWeight: 700, fontSize: "0.86rem", color: "#0D1525" }}>
                  {r.titre} →
                </p>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "#94A3B8", lineHeight: 1.5 }}>
                  {r.desc}
                </p>
              </Link>
            ))}
          </div>

          {/* Formulaire */}
          <div style={{
            background: "white", borderRadius: 14, padding: "32px 32px",
            border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
            height: "fit-content",
          }}>
            <h2 style={{ fontSize: "1.05rem", fontWeight: 900, color: "#0D1525", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
              Envoyer un message
            </h2>
            <p style={{ fontSize: "0.82rem", color: "#94A3B8", margin: "0 0 22px" }}>
              Réponse sous 2 à 3 jours ouvrés.
            </p>
            <MessageForm
              categorie="contact"
              redirectTo="/contact"
              sujetLabel="Sujet"
              sujetPlaceholder="Ex : suggestion, question générale…"
              messageLabel="Votre message"
              messagePlaceholder="Dites-nous en plus sur votre demande…"
              submitLabel="Envoyer le message"
              status={statut}
            />
          </div>
        </div>
      </main>
      <CtaApp />
      <Footer />
    </>
  );
}




