import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import MessageForm from "@/app/components/MessageForm";

export const metadata = {
  title: "Devenir contributeur",
  description: "Rejoignez la communauté de contributeurs TaxiBe et aidez à maintenir à jour la base des lignes de taxi-be d'Antananarivo.",
  alternates: { canonical: "/contribuer" },
};

const APPORTS = [
  {
    titre: "Vérifier les lignes de votre quartier",
    desc: "Confirmez ou corrigez les arrêts et le trajet des lignes que vous empruntez régulièrement.",
  },
  {
    titre: "Documenter de nouveaux trajets",
    desc: "Une ligne récente ou peu connue n'est pas encore dans la base ? Aidez-nous à la cartographier.",
  },
  {
    titre: "Relire les signalements de la communauté",
    desc: "Aidez à confirmer les signalements envoyés par d'autres usagers avant leur mise à jour.",
  },
];

export default async function ContribuerPage({
  searchParams,
}: {
  searchParams: Promise<{ statut?: string }>;
}) {
  const { statut } = await searchParams;

  return (
    <>
      <Nav />
      <style>{`
        .contribuer-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 24px; }
        @media (max-width: 760px) {
          .contribuer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>

        <div style={{ background: "#0D1525", padding: "56px 24px 64px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
              Communauté
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              Devenir contributeur
            </h1>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", maxWidth: 540, margin: 0, lineHeight: 1.7 }}>
              TaxiBe est construit avec l&apos;aide de ceux qui connaissent le mieux le réseau : ses usagers.
              Donnez un peu de votre temps pour améliorer la base pour tout le monde.
            </p>
          </div>
        </div>

        <div className="contribuer-grid" style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8", margin: "0 0 4px" }}>
              Comment vous pouvez aider
            </p>
            {APPORTS.map((a) => (
              <div key={a.titre} style={{
                background: "white", borderRadius: 12, border: "1px solid #E8ECF0", padding: "18px 20px",
              }}>
                <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: "0.86rem", color: "#0D1525" }}>
                  {a.titre}
                </p>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#94A3B8", lineHeight: 1.6 }}>
                  {a.desc}
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
              Proposer votre aide
            </h2>
            <p style={{ fontSize: "0.82rem", color: "#94A3B8", margin: "0 0 22px" }}>
              Présentez-vous en quelques lignes, nous revenons vers vous rapidement.
            </p>
            <MessageForm
              categorie="contribution"
              redirectTo="/contribuer"
              sujetLabel="Quartier ou zone que vous connaissez bien"
              sujetPlaceholder="Ex : Analakely, 67Ha, Ankorondrano…"
              messageLabel="Présentez-vous"
              messagePlaceholder="Dites-nous quelles lignes vous connaissez et comment vous aimeriez contribuer…"
              submitLabel="Envoyer ma candidature"
              status={statut}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
