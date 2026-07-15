import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import MessageForm from "@/app/components/MessageForm";
import Link from "next/link";

export const metadata = {
  title: "Contact",
  description: "Une question, une suggestion ou un partenariat ? Contactez l'équipe TaxiBe, l'application des lignes de taxi-be à Antananarivo.",
  alternates: { canonical: "/contact" },
};

const RACCOURCIS = [
  { titre: "Signaler une erreur sur une ligne", desc: "Un arrêt, un trajet ou un tarif qui a changé ?", href: "/communaute" },
  { titre: "Une question sur l'application", desc: "Consultez les réponses aux questions les plus posées.", href: "/aide" },
  { titre: "Une offre de partenariat", desc: "Coopérative, institution, projet urbain.", href: "/entreprises" },
  { titre: "Un espace publicitaire", desc: "Faites connaître votre activité aux usagers de TaxiBe.", href: "/entreprises" },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ statut?: string }>;
}) {
  const { statut } = await searchParams;

  return (
    <>
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
              <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
                Contact
              </p>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
                Parlons de votre trajet
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: 480, margin: 0, lineHeight: 1.7 }}>
                Une question, une remarque ou une idée pour améliorer TaxiBe ? Écrivez-nous, notre équipe
                vous répond directement par email.
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
