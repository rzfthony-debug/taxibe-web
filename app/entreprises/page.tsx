import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import MessageForm from "@/app/components/MessageForm";

export const metadata = {
  title: "Entreprises — TaxiBe",
  description: "Partenariats et visibilité sur TaxiBe : coopératives de transport, institutions, entreprises et annonceurs à Antananarivo.",
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
    desc: "Nos emplacements sont pensés pour ne jamais gêner la recherche d'un trajet.",
  },
];

export default async function EntreprisesPage({
  searchParams,
}: {
  searchParams: Promise<{ statut?: string; type?: string }>;
}) {
  const { statut, type } = await searchParams;

  return (
    <>
      <Nav />
      <style>{`
        .ent-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 24px; }
        .atouts-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        @media (max-width: 760px) {
          .ent-grid { grid-template-columns: 1fr; }
          .atouts-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>

        <div style={{ background: "#0D1525", padding: "56px 24px 64px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
              Entreprises
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              Travailler avec TaxiBe
            </h1>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", maxWidth: 540, margin: 0, lineHeight: 1.7 }}>
              Partenariats institutionnels, visibilité commerciale, projets de mobilité — plusieurs façons de collaborer.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px", display: "flex", flexDirection: "column", gap: 56 }}>

          {/* Section Partenariats */}
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", margin: "0 0 16px" }}>
              Partenariats
            </p>
            <div className="ent-grid">
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
                  redirectTo="/entreprises"
                  sujetLabel="Nom de la structure"
                  sujetPlaceholder="Ex : Coopérative, institution, organisation…"
                  messageLabel="Décrivez votre projet de collaboration"
                  messagePlaceholder="Présentez votre structure et le type de partenariat envisagé…"
                  submitLabel="Envoyer ma proposition"
                  status={type === "partenariat" ? statut : undefined}
                />
              </div>
            </div>
          </div>

          {/* Section Publicité */}
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", margin: "0 0 16px" }}>
              Visibilité commerciale
            </p>
            <p style={{ fontSize: "0.95rem", color: "#64748B", margin: "0 0 20px", lineHeight: 1.7 }}>
              Touchez les usagers des taxi-be d&apos;Antananarivo directement là où ils préparent leur trajet du jour.
            </p>

            <div className="atouts-grid" style={{ marginBottom: 24 }}>
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
              maxWidth: 620,
            }}>
              <h2 style={{ fontSize: "1.05rem", fontWeight: 900, color: "#0D1525", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
                Demander une offre
              </h2>
              <p style={{ fontSize: "0.82rem", color: "#94A3B8", margin: "0 0 22px" }}>
                Décrivez votre activité, notre équipe commerciale vous recontacte avec les formats disponibles.
              </p>
              <MessageForm
                categorie="publicite"
                redirectTo="/entreprises"
                sujetLabel="Nom de l'entreprise ou de la marque"
                sujetPlaceholder="Ex : Épicerie Ambatomaro"
                messageLabel="Décrivez votre projet"
                messagePlaceholder="Type d'activité, période souhaitée, budget indicatif…"
                submitLabel="Envoyer ma demande"
                status={type === "publicite" ? statut : undefined}
              />
            </div>
          </div>

        </div>
      </main>
      <CtaApp />
      <Footer />
    </>
  );
}
