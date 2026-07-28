import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import CtaApp from "@/app/components/CtaApp";
import Link from "next/link";

export const metadata = {
  title: "Le Projet — TaxiBe, infrastructure du transport collectif à Antananarivo",
  description: "TaxiBe cartographie le réseau de taxi-be d'Antananarivo pour le rendre accessible à tous. Mission, impact, feuille de route et partenariats.",
  alternates: { canonical: "/le-projet" },
  openGraph: {
    title: "Le Projet TaxiBe — Cartographier le transport collectif d'Antananarivo",
    description: "TaxiBe construit la première base de données ouverte du réseau de taxi-be d'Antananarivo. Mission, impact et feuille de route.",
    url: "/le-projet",
    images: [{ url: "/logo_taxibe.png", width: 1842, height: 1466, alt: "Le Projet TaxiBe" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Le Projet TaxiBe — Infrastructure du transport collectif à Antananarivo",
    description: "TaxiBe cartographie le réseau de taxi-be d'Antananarivo pour le rendre accessible à tous.",
    images: ["/logo_taxibe.png"],
  },
};

export default function LeProjetPage() {
  return (
    <>
      <Nav />
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>
        <style>{`
          .projet-hero { max-width: 760px; margin: 0 auto; padding: 80px 24px 56px; }
          .projet-section { max-width: 760px; margin: 0 auto; padding: 0 24px 64px; }
          .roadmap-item { display: flex; gap: 20px; align-items: flex-start; padding: 24px 0; border-bottom: 1px solid #F1F5F9; }
          .roadmap-item:last-child { border-bottom: none; }
          @media (max-width: 600px) { .projet-hero { padding: 48px 20px 40px; } .projet-section { padding: 0 20px 48px; } }
        `}</style>

        {/* ── Hero ── */}
        <div className="projet-hero">
          <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,184,0,0.12)", border: "1px solid rgba(255,184,0,0.4)", borderRadius: 8, padding: "5px 12px", marginBottom: 24 }}>
            <span style={{ fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8860B" }}>
              Le projet
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#0D1525", lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 20px" }}>
            L&apos;infrastructure digitale du transport collectif à{" "}
            <span style={{ color: "#FFB800" }}>Antananarivo</span>
          </h1>
          <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.8, margin: "0 0 36px", maxWidth: 580 }}>
            TaxiBe cartographie et rend accessibles les lignes de taxi-be d&apos;Antananarivo — un réseau informel de plusieurs centaines de lignes que des millions d&apos;habitants empruntent chaque jour sans information fiable.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/partenaires" style={{ padding: "12px 24px", borderRadius: 9, background: "#FFB800", color: "#0D1525", fontWeight: 800, fontSize: "0.9rem", textDecoration: "none" }}>
              Devenir partenaire →
            </Link>
            <Link href="/contact" style={{ padding: "12px 24px", borderRadius: 9, border: "1.5px solid #E2E8F0", color: "#64748B", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", background: "white" }}>
              Nous contacter
            </Link>
          </div>
        </div>

        {/* ── Mission ── */}
        <div id="mission" className="projet-section" style={{ scrollMarginTop: 80 }}>
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", padding: "40px" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800" }}>Notre mission</span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0D1525", margin: "12px 0 16px", letterSpacing: "-0.01em" }}>
              Rendre le transport collectif lisible pour tous
            </h2>
            <p style={{ fontSize: "0.92rem", color: "#374151", lineHeight: 1.8, margin: "0 0 16px" }}>
              À Antananarivo, le réseau de taxi-be est l&apos;épine dorsale de la mobilité urbaine. Pourtant, il reste invisible : pas de carte officielle, pas d&apos;arrêts signalés, pas d&apos;itinéraires documentés. Les habitants apprennent à naviguer par transmission orale, de voisin en voisin.
            </p>
            <p style={{ fontSize: "0.92rem", color: "#374151", lineHeight: 1.8, margin: 0 }}>
              TaxiBe construit la première base de données ouverte de ce réseau — collectée, vérifiée et maintenue avec les usagers eux-mêmes. L&apos;application est la vitrine de cette donnée. La donnée est le vrai produit.
            </p>
          </div>
        </div>

        {/* ── Impact & données ── */}
        <div id="impact" className="projet-section" style={{ scrollMarginTop: 80 }}>
          <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800" }}>Impact & données</span>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0D1525", margin: "12px 0 32px", letterSpacing: "-0.01em" }}>
            Ce qu&apos;on construit
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
            {[
              { valeur: "100+", label: "Lignes cartographiées", desc: "Itinéraires complets avec arrêts" },
              { valeur: "2M+", label: "Habitants concernés", desc: "Usagers quotidiens du réseau" },
              { valeur: "Ouvert", label: "Données accessibles", desc: "Gratuitement, sans inscription" },
            ].map((s) => (
              <div key={s.label} style={{ background: "white", borderRadius: 14, border: "1px solid #E8ECF0", padding: "24px 20px", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "#FFB800", lineHeight: 1, marginBottom: 6 }}>{s.valeur}</div>
                <div style={{ fontWeight: 800, fontSize: "0.85rem", color: "#0D1525", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: "0.78rem", color: "#94A3B8" }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#0D1525", borderRadius: 14, padding: "28px 32px" }}>
            <p style={{ margin: "0 0 8px", fontWeight: 800, color: "white", fontSize: "0.95rem" }}>
              La donnée comme bien commun
            </p>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
              TaxiBe vise à devenir la référence ouverte du transport informel à Madagascar — un modèle réplicable dans d&apos;autres villes africaines confrontées aux mêmes réseaux non documentés.
            </p>
          </div>
        </div>

        {/* ── Feuille de route ── */}
        <div id="roadmap" className="projet-section" style={{ scrollMarginTop: 80 }}>
          <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800" }}>Feuille de route</span>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#0D1525", margin: "12px 0 32px", letterSpacing: "-0.01em" }}>
            Les prochaines étapes
          </h2>
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #E8ECF0", padding: "8px 32px", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
            {[
              { phase: "Phase 1", titre: "Couverture complète d'Antananarivo", desc: "Cartographier l'ensemble des lignes urbaines et suburbaines, documenter chaque arrêt, valider avec les coopératives.", statut: "En cours" },
              { phase: "Phase 2", titre: "Partenariats institutionnels", desc: "Intégrer les données officielles des coopératives de transport, ouvrir l'API aux acteurs de la mobilité urbaine.", statut: "Prochain" },
              { phase: "Phase 3", titre: "Extension régionale", desc: "Répliquer le modèle dans d'autres villes malgaches, puis vers d'autres réseaux informels africains.", statut: "Vision" },
            ].map((item) => (
              <div key={item.phase} className="roadmap-item">
                <div style={{
                  flexShrink: 0, width: 48, height: 48, borderRadius: 12,
                  background: item.statut === "En cours" ? "#FFB800" : item.statut === "Prochain" ? "#F1F5F9" : "#F8F9FB",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "0.7rem", color: item.statut === "En cours" ? "#0D1525" : "#94A3B8",
                  textAlign: "center", lineHeight: 1.2,
                }}>
                  {item.phase.split(" ")[1]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                    <h3 style={{ margin: 0, fontWeight: 800, fontSize: "0.92rem", color: "#0D1525" }}>{item.titre}</h3>
                    <span style={{
                      fontSize: "0.6rem", fontWeight: 800, padding: "2px 8px", borderRadius: 4,
                      background: item.statut === "En cours" ? "rgba(255,184,0,0.15)" : "#F1F5F9",
                      color: item.statut === "En cours" ? "#B8860B" : "#94A3B8",
                      letterSpacing: "0.06em", textTransform: "uppercase",
                    }}>
                      {item.statut}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "#64748B", lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Presse ── */}
        <div id="presse" className="projet-section" style={{ scrollMarginTop: 80 }}>
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #E8ECF0", padding: "40px", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", textAlign: "center" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800" }}>Presse</span>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0D1525", margin: "12px 0 12px", letterSpacing: "-0.01em" }}>
              Vous couvrez le projet ?
            </h2>
            <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: 1.75, margin: "0 auto 24px", maxWidth: 480 }}>
              Pour toute demande d&apos;interview, de visuels ou d&apos;informations sur TaxiBe, contactez-nous directement.
            </p>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 24px", borderRadius: 9, background: "#0D1525", color: "#FFB800", fontWeight: 800, fontSize: "0.875rem", textDecoration: "none" }}>
              Contact presse →
            </Link>
          </div>
        </div>
      </main>
      <CtaApp />
      <Footer />
    </>
  );
}
