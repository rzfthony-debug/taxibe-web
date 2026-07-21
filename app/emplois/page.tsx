import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import EmploisContent from "./EmploisContent";

export const metadata = {
  title: "Emplois — Rejoignez l'équipe TaxiBe",
  description: "Découvrez les postes ouverts chez TaxiBe à Antananarivo et rejoignez l'équipe qui transforme la mobilité à Madagascar.",
  alternates: { canonical: "/emplois" },
};

const STATS = (postesOuverts: number) => [
  { valeur: String(postesOuverts), label: "Postes ouverts" },
  { valeur: "120+", label: "Collaborateurs" },
  { valeur: "5", label: "Départements" },
  { valeur: "4,8/5", label: "Satisfaction collaborateurs" },
];

export default async function EmploisPage() {
  const { data: offres } = await supabase
    .from("offres_emploi")
    .select("id, nom, type_poste, lieu, description, date_limite, created_at")
    .eq("statut", "publie")
    .order("created_at", { ascending: false });

  const stats = STATS((offres ?? []).length);

  return (
    <>
      <Nav />
      <main style={{ minHeight: "70vh", background: "#F8F9FB" }}>

        {/* ── Hero ── */}
        <div style={{
          position: "relative", background: "#0D1525", padding: "64px 24px 96px",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -80, right: -80, width: 320, height: 320,
            borderRadius: "50%", background: "radial-gradient(circle, rgba(255,184,0,0.16) 0%, rgba(255,184,0,0) 70%)",
          }} />
          <div style={{
            position: "absolute", bottom: -120, left: -60, width: 280, height: 280,
            borderRadius: "50%", background: "radial-gradient(circle, rgba(255,184,0,0.1) 0%, rgba(255,184,0,0) 70%)",
          }} />
          <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <p style={{
              display: "inline-block", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase",
              letterSpacing: "0.14em", color: "#FFB800", marginBottom: 18,
              background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)",
              padding: "6px 14px", borderRadius: 20,
            }}>
              Emplois TaxiBe
            </p>
            <h1 style={{
              fontSize: "clamp(1.9rem, 5vw, 3rem)", fontWeight: 900, color: "white",
              margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.15,
            }}>
              Rejoignez l&apos;équipe qui transforme la mobilité à Madagascar
            </h1>
            <p style={{
              fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", maxWidth: 560,
              margin: "0 auto 32px", lineHeight: 1.7,
            }}>
              Chez TaxiBe, chaque poste contribue à rendre le transport public plus lisible pour des milliers
              d&apos;usagers à Antananarivo. Découvrez les opportunités ouvertes au sein de nos équipes.
            </p>
            <a href="#offres" style={{
              display: "inline-block", padding: "13px 28px", borderRadius: 10,
              background: "#FFB800", color: "#0D1525", fontWeight: 800, fontSize: "0.9rem",
              textDecoration: "none", letterSpacing: "-0.01em",
            }}>
              Voir les offres
            </a>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div style={{ maxWidth: 900, margin: "-56px auto 0", padding: "0 24px", position: "relative" }}>
          <div style={{
            background: "white", borderRadius: 16, border: "1px solid #E8ECF0",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 0,
          }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{
                padding: "24px 16px", textAlign: "center",
                borderLeft: i === 0 ? "none" : "1px solid #F1F5F9",
              }}>
                <p style={{ margin: "0 0 4px", fontSize: "1.6rem", fontWeight: 900, color: "#0D1525", letterSpacing: "-0.02em" }}>
                  {s.valeur}
                </p>
                <p style={{ margin: 0, fontSize: "0.72rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Offres + sidebar ── */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "56px 24px 0" }}>
          <EmploisContent offres={offres ?? []} />
        </div>

        {/* ── CTA candidature spontanée ── */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 72px" }}>
          <div style={{
            background: "#0D1525", borderRadius: 16, padding: "36px 40px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 20,
          }}>
            <div>
              <p style={{ margin: "0 0 6px", fontWeight: 900, color: "white", fontSize: "1.1rem", letterSpacing: "-0.01em" }}>
                Vous ne trouvez pas le poste idéal ?
              </p>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}>
                Envoyez-nous votre candidature spontanée — nous la conservons pour nos prochains recrutements.
              </p>
            </div>
            <Link href="/contact" style={{
              padding: "13px 26px", borderRadius: 10, background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "0.9rem", textDecoration: "none", flexShrink: 0,
              letterSpacing: "-0.01em",
            }}>
              Envoyer mon CV
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
