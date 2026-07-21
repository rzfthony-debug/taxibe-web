import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import MessageForm from "@/app/components/MessageForm";

export const metadata = {
  title: "Signaler une erreur",
  description: "Un arrêt, un trajet ou un tarif de taxi-be a changé ? Signalez-le en quelques secondes pour aider tous les usagers de TaxiBe.",
  alternates: { canonical: "/signaler" },
};

const EXEMPLES = [
  "Un arrêt qui n'existe plus ou qui a été déplacé",
  "Un numéro de ligne qui a changé de trajet",
  "Une ligne qui ne circule plus",
  "Une coopérative ou une couleur de bus incorrecte",
];

export default async function SignalerPage({
  searchParams,
}: {
  searchParams: Promise<{ statut?: string }>;
}) {
  const { statut } = await searchParams;

  return (
    <>
      <Nav />
      <style>{`
        .signaler-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 24px; }
        @media (max-width: 760px) {
          .signaler-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>

        <div style={{ background: "#0D1525", padding: "56px 24px 64px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
              Communauté
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              Signaler une erreur
            </h1>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: 0, lineHeight: 1.7 }}>
              Vous connaissez le terrain mieux que personne. Chaque signalement nous aide à garder
              la base de données à jour pour tous les usagers.
            </p>
          </div>
        </div>

        <div className="signaler-grid" style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{
              background: "white", borderRadius: 12, border: "1px solid #E8ECF0", padding: "20px 22px",
            }}>
              <p style={{ margin: "0 0 12px", fontWeight: 800, fontSize: "0.85rem", color: "#0D1525" }}>
                Quoi signaler ?
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {EXEMPLES.map((e) => (
                  <div key={e} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFB800", marginTop: 7, flexShrink: 0 }} />
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "#64748B", lineHeight: 1.6 }}>{e}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              background: "#FFF7E6", borderRadius: 12, border: "1px solid #FDE68A", padding: "18px 20px",
            }}>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#92400E", lineHeight: 1.6, fontWeight: 500 }}>
                Plus votre description est précise (arrêt exact, sens du trajet), plus la correction sera rapide.
              </p>
            </div>
          </div>

          <div style={{
            background: "white", borderRadius: 14, padding: "32px 32px",
            border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
            height: "fit-content",
          }}>
            <h2 style={{ fontSize: "1.05rem", fontWeight: 900, color: "#0D1525", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
              Décrire le problème
            </h2>
            <p style={{ fontSize: "0.82rem", color: "#64748B", margin: "0 0 22px" }}>
              Traité par notre équipe sous quelques jours.
            </p>
            <MessageForm
              categorie="erreur"
              redirectTo="/signaler"
              showLigneNumero
              showSujet={false}
              messageLabel="Décrivez l'erreur constatée"
              messagePlaceholder="Ex : l'arrêt Analakely n'est plus desservi par cette ligne depuis…"
              submitLabel="Envoyer le signalement"
              status={statut}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
