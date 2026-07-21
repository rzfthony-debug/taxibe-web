import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import MessageForm from "@/app/components/MessageForm";

export const metadata = {
  title: "Publicité — Annoncez sur TaxiBe",
  description: "Touchez les usagers quotidiens des taxi-be à Antananarivo. Découvrez les espaces publicitaires disponibles sur l'application TaxiBe.",
  alternates: { canonical: "/publicite" },
};

const ATOUTS = [
  {
    chiffre: "Quotidien",
    titre: "Un usage du quotidien",
    desc: "TaxiBe est consulté à chaque trajet, matin et soir, par des usagers réguliers du transport public.",
  },
  {
    chiffre: "Local",
    titre: "Une audience 100% Tananarivienne",
    desc: "Toute l'audience est concentrée sur Antananarivo et ses environs — idéal pour une visibilité de proximité.",
  },
  {
    chiffre: "Non-intrusif",
    titre: "Des formats respectueux de l'expérience",
    desc: "Nos emplacements publicitaires sont pensés pour ne jamais gêner la recherche d'un trajet.",
  },
];

export default async function PublicitePage({
  searchParams,
}: {
  searchParams: Promise<{ statut?: string }>;
}) {
  const { statut } = await searchParams;

  return (
    <>
      <Nav />
      <style>{`
        .pub-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        @media (max-width: 760px) { .pub-grid { grid-template-columns: 1fr; } }
      `}</style>
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>

        <div style={{ background: "#0D1525", padding: "56px 24px 64px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
              Entreprises
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              Faites connaître votre activité
            </h1>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", maxWidth: 540, margin: 0, lineHeight: 1.7 }}>
              Touchez les usagers des taxi-be d&apos;Antananarivo directement là où ils préparent leur trajet du jour.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>

          <div className="pub-grid" style={{ marginBottom: 32 }}>
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

          <div style={{
            background: "white", borderRadius: 14, padding: "36px",
            border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
            maxWidth: 620, margin: "0 auto",
          }}>
            <h2 style={{ fontSize: "1.05rem", fontWeight: 900, color: "#0D1525", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
              Demander une offre publicitaire
            </h2>
            <p style={{ fontSize: "0.82rem", color: "#94A3B8", margin: "0 0 22px" }}>
              Décrivez votre activité, notre équipe commerciale vous recontacte avec les formats disponibles.
            </p>
            <MessageForm
              categorie="publicite"
              redirectTo="/publicite"
              sujetLabel="Nom de l'entreprise ou de la marque"
              sujetPlaceholder="Ex : Épicerie Ambatomaro"
              messageLabel="Décrivez votre projet publicitaire"
              messagePlaceholder="Type d'activité, période souhaitée, budget indicatif…"
              submitLabel="Envoyer ma demande"
              status={statut}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
