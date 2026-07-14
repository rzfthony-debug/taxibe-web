import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Comment utiliser TaxiBe — Guide pas à pas",
  description: "Le guide complet pour se repérer dans les taxi-be d'Antananarivo avec TaxiBe : rechercher une ligne, trouver un arrêt, calculer un trajet avec correspondances.",
  alternates: { canonical: "/guide" },
};

const ETAPES = [
  {
    n: "1",
    titre: "Cherchez votre ligne ou votre trajet",
    desc: "Vous connaissez déjà le numéro de votre ligne ? Tapez-le directement. Sinon, indiquez votre point de départ et votre destination — TaxiBe trouve le trajet à votre place.",
  },
  {
    n: "2",
    titre: "Repérez votre arrêt de départ",
    desc: "TaxiBe affiche la liste complète des arrêts de la ligne, dans l'ordre du trajet, avec le terminus de départ et d'arrivée clairement indiqués.",
  },
  {
    n: "3",
    titre: "Suivez les correspondances si besoin",
    desc: "Si aucune ligne directe n'existe entre votre point A et votre point B, TaxiBe calcule automatiquement l'enchaînement de lignes le plus simple, y compris avec une double correspondance.",
  },
  {
    n: "4",
    titre: "Activez la localisation pour voir ce qui vous entoure",
    desc: "Avec la localisation GPS activée, TaxiBe affiche en un coup d'œil toutes les lignes qui desservent votre position actuelle — pratique quand vous êtes dans un quartier que vous ne connaissez pas.",
  },
  {
    n: "5",
    titre: "Sauvegardez vos lignes du quotidien",
    desc: "Ajoutez vos lignes habituelles en favori pour y accéder en un geste depuis l'écran d'accueil, même sans connexion internet.",
  },
];

const CONSEILS = [
  "Le numéro de ligne suffit souvent : pas besoin de connaître le nom exact d'un arrêt pour lancer une recherche.",
  "En cas de doute sur un itinéraire, comparez plusieurs lignes proposées avant de monter — certaines desservent des quartiers voisins avec un trajet légèrement différent.",
  "Les arrêts affichés suivent l'ordre réel du trajet, dans le sens aller comme dans le sens retour.",
  "Une information vous semble dépassée ? Un signalement en quelques secondes aide tous les autres usagers.",
];

export default function GuidePage() {
  return (
    <>
      <Nav />
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>

        <div style={{ background: "#0D1525", padding: "56px 24px 64px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
              Guide pas à pas
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              Comment utiliser TaxiBe
            </h1>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: 0, lineHeight: 1.7 }}>
              De la recherche à l&apos;arrêt d&apos;arrivée : le parcours complet pour se déplacer à Tana sans hésitation.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px" }}>

          {/* Étapes */}
          <div style={{
            background: "white", borderRadius: 14, padding: "40px",
            border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
            marginBottom: 24,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {ETAPES.map((e) => (
                <div key={e.n} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                    background: "#FFB800", color: "#0D1525",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 900, fontSize: "0.9rem",
                  }}>
                    {e.n}
                  </div>
                  <div>
                    <p style={{ margin: "0 0 6px", fontWeight: 800, fontSize: "0.95rem", color: "#0D1525" }}>
                      {e.titre}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.86rem", color: "#64748B", lineHeight: 1.75 }}>
                      {e.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conseils rapides */}
          <div style={{
            background: "white", borderRadius: 14, padding: "32px 36px",
            border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
            marginBottom: 24,
          }}>
            <h2 style={{ fontSize: "1.05rem", fontWeight: 900, color: "#0D1525", marginBottom: 18, letterSpacing: "-0.01em" }}>
              Astuces pour aller plus vite
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CONSEILS.map((c) => (
                <div key={c} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFB800", marginTop: 8, flexShrink: 0 }} />
                  <p style={{ margin: 0, fontSize: "0.86rem", color: "#374151", lineHeight: 1.7 }}>{c}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{
            background: "#0D1525", borderRadius: 14,
            padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 16,
          }}>
            <div>
              <p style={{ margin: "0 0 4px", fontWeight: 800, color: "white", fontSize: "0.95rem" }}>
                Prêt à essayer votre premier trajet ?
              </p>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "rgba(255,255,255,0.55)" }}>
                Testez la recherche directement depuis le site, sans rien installer.
              </p>
            </div>
            <Link href="/recherche" style={{
              padding: "10px 24px", borderRadius: 8,
              background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "0.875rem", textDecoration: "none", flexShrink: 0,
            }}>
              Chercher une ligne →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
