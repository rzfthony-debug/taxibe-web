import { supabase } from "@/lib/supabase";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Offres d'emploi — TaxiBe",
  description: "Trouvez des offres d'emploi à Antananarivo sur TaxiBe.",
};

export default async function EmploisPage() {
  const { data: offres } = await supabase
    .from("offres_emploi")
    .select("id, nom, type_poste, lieu, description, date_limite, created_at")
    .eq("statut", "publie")
    .order("created_at", { ascending: false });

  return (
    <>
      <Nav />
      <main style={{ minHeight: "70vh", background: "#F8F9FB" }}>

        {/* Header */}
        <div style={{ background: "#0D1525", padding: "56px 24px 64px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
              Offres d&apos;emploi
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "white", margin: 0, letterSpacing: "-0.02em" }}>
              Trouvez votre prochain poste à Tana
            </h1>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
          {(!offres || offres.length === 0) && (
            <div style={{
              background: "white", borderRadius: 12, padding: "48px 32px",
              border: "1px solid #E8ECF0", textAlign: "center",
            }}>
              <p style={{ fontWeight: 700, color: "#0D1525", marginBottom: 8 }}>Aucune offre disponible pour l&apos;instant</p>
              <p style={{ fontSize: "0.875rem", color: "#94A3B8", margin: 0 }}>Revenez bientôt pour les dernières offres d&apos;emploi.</p>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(380px, 100%), 1fr))", gap: 16 }}>
            {(offres ?? []).map((o) => {
              const dateCreation = new Date(o.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
              const dateLimite = o.date_limite
                ? new Date(o.date_limite).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
                : null;

              return (
                <div key={o.id} style={{
                  background: "white", borderRadius: 14,
                  border: "1px solid #E8ECF0",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                  padding: "22px 24px",
                  display: "flex", flexDirection: "column", gap: 12,
                }}>
                  {/* Badges */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {o.type_poste && (
                      <span style={{
                        background: "#FFF7E6", color: "#92400E", border: "1px solid #FDE68A",
                        fontSize: "0.7rem", fontWeight: 700, padding: "3px 10px", borderRadius: 4,
                        letterSpacing: "0.04em",
                      }}>
                        {o.type_poste}
                      </span>
                    )}
                    {o.lieu && (
                      <span style={{
                        background: "#F1F5F9", color: "#475569",
                        fontSize: "0.7rem", fontWeight: 600, padding: "3px 10px", borderRadius: 4,
                      }}>
                        {o.lieu}
                      </span>
                    )}
                  </div>

                  {/* Recruteur */}
                  <div>
                    <p style={{ margin: "0 0 4px", fontWeight: 800, fontSize: "0.95rem", color: "#0D1525" }}>
                      {o.nom}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.78rem", color: "#94A3B8", fontWeight: 500 }}>
                      Publié le {dateCreation}
                    </p>
                  </div>

                  {/* Description */}
                  {o.description && (
                    <p style={{ margin: 0, fontSize: "0.84rem", color: "#64748B", lineHeight: 1.65 }}>
                      {(o.description as string).slice(0, 200).trim()}
                      {(o.description as string).length > 200 ? "…" : ""}
                    </p>
                  )}

                  {/* Date limite */}
                  {dateLimite && (
                    <p style={{
                      margin: 0, fontSize: "0.75rem", color: "#EF4444", fontWeight: 700,
                      paddingTop: 8, borderTop: "1px solid #F1F5F9",
                    }}>
                      Date limite : {dateLimite}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
