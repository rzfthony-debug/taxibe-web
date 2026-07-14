import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import MessageForm from "@/app/components/MessageForm";

export const metadata = {
  title: "Partenaires",
  description: "Coopératives de transport, institutions, projets urbains : découvrez comment collaborer avec TaxiBe à Antananarivo.",
  alternates: { canonical: "/partenaires" },
};

const PROFILS = [
  {
    titre: "Coopératives de transport",
    desc: "Partagez vos données de lignes officielles et gagnez en visibilité auprès de milliers d'usagers.",
  },
  {
    titre: "Institutions & collectivités",
    desc: "Collaborons sur des projets de mobilité urbaine ou de sensibilisation au transport public à Tana.",
  },
  {
    titre: "Acteurs de la mobilité",
    desc: "Startups, ONG ou projets de recherche autour du transport à Madagascar — parlons-en.",
  },
];

export default async function PartenairesPage({
  searchParams,
}: {
  searchParams: Promise<{ statut?: string }>;
}) {
  const { statut } = await searchParams;

  return (
    <>
      <Nav />
      <style>{`
        .part-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 24px; }
        @media (max-width: 760px) { .part-grid { grid-template-columns: 1fr; } }
      `}</style>
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>

        <div style={{ background: "#0D1525", padding: "56px 24px 64px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
              Entreprises
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              Construisons ensemble une meilleure mobilité
            </h1>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", maxWidth: 540, margin: 0, lineHeight: 1.7 }}>
              TaxiBe collabore avec les coopératives, institutions et acteurs de la mobilité qui font vivre
              le transport public à Antananarivo.
            </p>
          </div>
        </div>

        <div className="part-grid" style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8", margin: "0 0 4px" }}>
              Profils que nous recherchons
            </p>
            {PROFILS.map((p) => (
              <div key={p.titre} style={{
                background: "white", borderRadius: 12, border: "1px solid #E8ECF0", padding: "18px 20px",
              }}>
                <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: "0.86rem", color: "#0D1525" }}>
                  {p.titre}
                </p>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#94A3B8", lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            background: "white", borderRadius: 14, padding: "32px 32px",
            border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
            height: "fit-content",
          }}>
            <h2 style={{ fontSize: "1.05rem", fontWeight: 900, color: "#0D1525", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
              Présenter votre structure
            </h2>
            <p style={{ fontSize: "0.82rem", color: "#94A3B8", margin: "0 0 22px" }}>
              Décrivez votre organisation et l&apos;idée de collaboration, nous revenons vers vous rapidement.
            </p>
            <MessageForm
              categorie="partenariat"
              redirectTo="/partenaires"
              sujetLabel="Nom de la structure"
              sujetPlaceholder="Ex : Coopérative, institution, organisation…"
              messageLabel="Décrivez votre projet de collaboration"
              messagePlaceholder="Présentez votre structure et le type de partenariat envisagé…"
              submitLabel="Envoyer ma proposition"
              status={statut}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
