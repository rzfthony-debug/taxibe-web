import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import MessageForm from "@/app/components/MessageForm";
import Link from "next/link";

export const metadata = {
  title: "Contact",
  description: "Une question, une suggestion ou un partenariat ? Contactez l'équipe TaxiBe, l'application des lignes de taxi-be à Antananarivo.",
  alternates: { canonical: "/contact" },
};

const RACCOURCIS = [
  { titre: "Signaler une erreur sur une ligne", desc: "Un arrêt, un trajet ou un tarif qui a changé ?", href: "/signaler" },
  { titre: "Une question sur l'application", desc: "Consultez les réponses aux questions les plus posées.", href: "/faq" },
  { titre: "Une offre de partenariat", desc: "Coopérative, institution, projet urbain.", href: "/partenaires" },
  { titre: "Un espace publicitaire", desc: "Faites connaître votre activité aux usagers de TaxiBe.", href: "/publicite" },
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
        @media (max-width: 760px) {
          .contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>

        <div style={{ background: "#0D1525", padding: "56px 24px 64px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
              Contact
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              Parlons de votre trajet
            </h1>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: 0, lineHeight: 1.7 }}>
              Une question, une remarque ou une idée pour améliorer TaxiBe ? Écrivez-nous, notre équipe
              vous répond directement par email.
            </p>
          </div>
        </div>

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
      <Footer />
    </>
  );
}
