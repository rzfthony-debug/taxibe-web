import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import Link from "next/link";

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

export default function EntreprisesPage() {
  return (
    <>
      <Nav />
      <style>{`
        .ent-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .atouts-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .page-hero-inner { max-width: 1280px; margin: 0 auto; padding: 64px 40px; display: grid; grid-template-columns: 1fr 1.4fr; gap: 24px; align-items: center; }
        .page-hero-img { display: flex; align-items: center; justify-content: center; }
        @media (max-width: 768px) {
          .page-hero-inner { grid-template-columns: 1fr; padding: 40px 20px; }
          .page-hero-img { display: none; }
        }
        @media (max-width: 760px) {
          .ent-grid { grid-template-columns: 1fr; }
          .atouts-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>

        <section style={{ background: "#F8F9FB", overflow: "hidden", borderBottom: "1px solid #E8ECF0" }}>
          <div className="page-hero-inner">
            <div>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
                Entreprises
              </p>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
                Travailler avec TaxiBe
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: 480, margin: 0, lineHeight: 1.7 }}>
                Partenariats institutionnels, visibilité commerciale, projets de mobilité — plusieurs façons de collaborer.
              </p>
            </div>
            <div className="page-hero-img">
              <svg viewBox="0 0 380 230" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 360 }}>
                <rect width="380" height="230" fill="#EEF2F7" rx="12"/>
                <rect y="150" width="380" height="80" fill="#D8E2EE"/>
                <rect y="165" width="380" height="4" fill="#C8D2DF"/>
                <rect x="20" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
                <rect x="65" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
                <rect x="110" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
                <rect x="155" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
                <rect x="200" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
                <rect x="245" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
                <rect x="290" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
                <rect x="335" y="168" width="26" height="2" rx="1" fill="white" opacity="0.55"/>
                <rect x="25" y="95" width="26" height="75" rx="2" fill="#C2CDD9"/>
                <rect x="56" y="78" width="30" height="92" rx="2" fill="#B5C3D2"/>
                <rect x="91" y="105" width="22" height="65" rx="2" fill="#C2CDD9"/>
                <rect x="280" y="88" width="28" height="82" rx="2" fill="#C2CDD9"/>
                <rect x="313" y="100" width="24" height="70" rx="2" fill="#B5C3D2"/>
                <rect x="342" y="82" width="28" height="88" rx="2" fill="#BCC8D6"/>
                <rect x="150" y="142" width="72" height="30" rx="8" fill="#FFB800"/>
                <rect x="158" y="134" width="56" height="22" rx="5" fill="#FFB800"/>
                <rect x="162" y="137" width="19" height="15" rx="2" fill="#E0F0FF" opacity="0.85"/>
                <rect x="190" y="137" width="19" height="15" rx="2" fill="#E0F0FF" opacity="0.85"/>
                <circle cx="165" cy="174" r="8" fill="#1a2535"/>
                <circle cx="165" cy="174" r="4" fill="#D0DAE6"/>
                <circle cx="207" cy="174" r="8" fill="#1a2535"/>
                <circle cx="207" cy="174" r="4" fill="#D0DAE6"/>
                <circle cx="78" cy="130" r="4" fill="#FFB800" opacity="0.5"/>
                <circle cx="115" cy="124" r="3.5" fill="#FFB800" opacity="0.35"/>
                <circle cx="148" cy="120" r="4.5" fill="#FFB800"/>
                <line x1="78" y1="130" x2="148" y2="120" stroke="#FFB800" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.45"/>
                <circle cx="250" cy="105" r="14" fill="#FFB800" opacity="0.1"/>
                <path d="M250 92C244.5 92 240 96.5 240 102C240 109 250 118 250 118C250 118 260 109 260 102C260 96.5 255.5 92 250 92Z" fill="#FFB800"/>
                <circle cx="250" cy="102" r="4.5" fill="white"/>
                <ellipse cx="55" cy="30" rx="26" ry="10" fill="white" opacity="0.65"/>
                <ellipse cx="73" cy="24" rx="19" ry="8" fill="white" opacity="0.75"/>
                <ellipse cx="305" cy="26" rx="24" ry="9" fill="white" opacity="0.65"/>
                <ellipse cx="323" cy="20" rx="17" ry="7.5" fill="white" opacity="0.75"/>
              </svg>
            </div>
          </div>
        </section>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px", display: "flex", flexDirection: "column", gap: 56 }}>

          {/* Section Partenariats */}
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", margin: "0 0 16px" }}>
              Partenariats
            </p>
            <div className="ent-grid">
              {PROFILS.map((p) => (
                <div key={p.titre} style={{
                  background: "white", borderRadius: 12, border: "1px solid #E8ECF0", padding: "24px 22px",
                }}>
                  <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: "0.92rem", color: "#0D1525" }}>
                    {p.titre}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: "#94A3B8", lineHeight: 1.6 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#0D1525", color: "#FFB800",
                fontWeight: 800, fontSize: "0.875rem", padding: "12px 24px",
                borderRadius: 9, textDecoration: "none",
              }}>
                Nous contacter pour un partenariat →
              </Link>
            </div>
          </div>

          {/* Section Visibilité */}
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
            <div>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#0D1525", color: "#FFB800",
                fontWeight: 800, fontSize: "0.875rem", padding: "12px 24px",
                borderRadius: 9, textDecoration: "none",
              }}>
                Demander une offre commerciale →
              </Link>
            </div>
          </div>

        </div>
      </main>
      <CtaApp />
      <Footer />
    </>
  );
}
