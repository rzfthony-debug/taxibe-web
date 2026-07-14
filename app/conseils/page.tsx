import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Conseils de déplacement à Antananarivo",
  description: "Nos astuces pour se déplacer sereinement en taxi-be à Antananarivo : horaires, heures d'affluence, sécurité et bonnes pratiques.",
  alternates: { canonical: "/conseils" },
};

const THEMES = [
  {
    titre: "Anticiper les heures d'affluence",
    icone: "⏱",
    conseils: [
      "Le trafic est le plus dense entre 6h30 et 8h30, puis entre 16h30 et 19h — prévoyez une marge sur ces créneaux.",
      "En dehors de ces heures, les taxi-be circulent plus librement et les trajets sont sensiblement plus rapides.",
      "Le samedi matin et les jours de marché, certains axes du centre-ville sont particulièrement chargés.",
    ],
  },
  {
    titre: "Préparer son trajet",
    icone: "🧭",
    conseils: [
      "Repérez votre ligne et vos correspondances avant de partir plutôt qu'une fois sur place, surtout dans un quartier que vous ne connaissez pas.",
      "Gardez de la petite monnaie sur vous : elle facilite le paiement et évite d'attendre la monnaie du chauffeur.",
      "Sur les trajets avec correspondance, gardez en tête le nom du dernier arrêt commun aux deux lignes.",
    ],
  },
  {
    titre: "Voyager en sécurité",
    icone: "🛡",
    conseils: [
      "Gardez vos effets personnels devant vous plutôt que dans un sac porté dans le dos, surtout aux heures de forte affluence.",
      "Aux arrêts très fréquentés, laissez descendre les passagers avant de monter.",
      "En cas de doute sur un itinéraire ou un tarif, n'hésitez pas à demander confirmation au chauffeur ou au receveur avant de monter.",
    ],
  },
  {
    titre: "Optimiser ses trajets réguliers",
    icone: "🔁",
    conseils: [
      "Ajoutez vos lignes du quotidien en favori dans l'application pour y accéder en un geste, même sans connexion.",
      "Si une ligne est habituellement chargée à une heure donnée, une ligne voisine dessert parfois un trajet très proche avec moins d'attente.",
      "Un imprévu sur votre ligne habituelle ? Relancez une recherche par destination pour trouver une alternative en quelques secondes.",
    ],
  },
];

export default function ConseilsPage() {
  return (
    <>
      <Nav />
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>

        <div style={{ background: "#0D1525", padding: "56px 24px 64px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
              Nos astuces
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              Conseils de déplacement à Tana
            </h1>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: 0, lineHeight: 1.7 }}>
              Ce que l&apos;expérience des usagers réguliers nous a appris — pour voyager plus sereinement.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {THEMES.map((t) => (
              <div key={t.titre} style={{
                background: "white", borderRadius: 14, padding: "30px 32px",
                border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    background: "#FFF7E6", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.05rem",
                  }}>
                    {t.icone}
                  </div>
                  <h2 style={{ fontSize: "1rem", fontWeight: 900, color: "#0D1525", margin: 0, letterSpacing: "-0.01em" }}>
                    {t.titre}
                  </h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {t.conseils.map((c) => (
                    <div key={c} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFB800", marginTop: 8, flexShrink: 0 }} />
                      <p style={{ margin: 0, fontSize: "0.86rem", color: "#374151", lineHeight: 1.75 }}>{c}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 24, background: "#0D1525", borderRadius: 14,
            padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 16,
          }}>
            <div>
              <p style={{ margin: "0 0 4px", fontWeight: 800, color: "white", fontSize: "0.95rem" }}>
                Envie de découvrir l&apos;application complète ?
              </p>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "rgba(255,255,255,0.55)" }}>
                Favoris, localisation GPS et correspondances automatiques, gratuitement.
              </p>
            </div>
            <Link href="/telecharger" style={{
              padding: "10px 24px", borderRadius: 8,
              background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "0.875rem", textDecoration: "none", flexShrink: 0,
            }}>
              Télécharger l&apos;app →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
