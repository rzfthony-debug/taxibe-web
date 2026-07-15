import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CommunauteForm from "./CommunauteForm";

export const metadata = {
  title: "Communauté — TaxiBe",
  description: "Signalez une erreur, devenez contributeur ou envoyez une remarque à l'équipe TaxiBe.",
};

export default async function CommunautePage({
  searchParams,
}: {
  searchParams: Promise<{ statut?: string }>;
}) {
  const { statut } = await searchParams;

  return (
    <>
      <Nav />
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>

        <div style={{ background: "#0D1525", padding: "56px 24px 64px" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
              Communauté
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              Contribuer à TaxiBe
            </h1>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.7 }}>
              TaxiBe est construit avec l&apos;aide de ceux qui connaissent le mieux le réseau.
              Signalez une erreur, rejoignez l&apos;équipe de contributeurs, ou envoyez-nous un message.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 680, margin: "0 auto", padding: "56px 24px" }}>
          <div style={{
            background: "white", borderRadius: 14, padding: "36px",
            border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
          }}>
            <CommunauteForm status={statut} />
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
