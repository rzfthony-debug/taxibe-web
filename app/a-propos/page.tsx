import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "À propos de TaxiBe",
  description: "Découvrez TaxiBe, l'application de référence pour les lignes de taxi-be à Antananarivo.",
};

export default function AProposPage() {
  return (
    <>
      <Nav />
      <main style={{ background: "#F8F9FB", minHeight: "70vh" }}>
        <style>{`
          .page-hero-inner { max-width: 1280px; margin: 0 auto; padding: 64px 40px; display: grid; grid-template-columns: 1fr 1.4fr; gap: 24px; align-items: center; }
          .page-hero-img { display: flex; align-items: center; justify-content: center; }
          @media (max-width: 768px) { .page-hero-inner { grid-template-columns: 1fr; padding: 40px 20px; } .page-hero-img { display: none; } }
        `}</style>
        <section style={{ background: "#F8F9FB", overflow: "hidden", borderBottom: "1px solid #E8ECF0" }}>
          <div className="page-hero-inner">
            <div>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
                À propos
              </p>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
                L&apos;application de taxi-be d&apos;Antananarivo
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: 480, margin: 0, lineHeight: 1.7 }}>
                Votre guide pour naviguer parmi les lignes de taxi-be qui sillonnent la capitale malgache au quotidien.
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

        <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px" }}>
          <div style={{
            background: "white", borderRadius: 14, padding: "40px 40px",
            border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
          }}>
            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0D1525", marginBottom: 16, letterSpacing: "-0.01em" }}>
                Notre mission
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.8, margin: 0 }}>
                TaxiBe est une application conçue pour aider les habitants d&apos;Antananarivo à se repérer parmi
                les centaines de lignes de taxi-be qui sillonnent la capitale malgache. Notre objectif est simple : rendre
                le transport public à Tana plus lisible, plus accessible, et plus simple à utiliser au quotidien.
              </p>
            </section>

            <div style={{ borderTop: "1px solid #F1F5F9", marginBottom: 40 }} />

            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0D1525", marginBottom: 16, letterSpacing: "-0.01em" }}>
                Ce que fait TaxiBe
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.8, marginBottom: 16 }}>
                TaxiBe regroupe toutes les fonctionnalités essentielles pour se déplacer à Tana. L&apos;ensemble
                des fonctionnalités est disponible dans l&apos;application mobile, accessibles aux membres.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { titre: "Recherche par numéro", desc: "Entrez le numéro d'une ligne et obtenez tous les arrêts et le trajet complet en détail." },
                  { titre: "Recherche par lieu", desc: "Indiquez votre point de départ et votre destination — TaxiBe calcule les correspondances automatiquement, y compris les doubles correspondances." },
                  { titre: "Localisation GPS", desc: "Activez la localisation pour voir toutes les lignes disponibles autour de vous." },
                  { titre: "Lignes favorites", desc: "Sauvegardez vos lignes du quotidien pour y accéder d'un seul geste." },
                  { titre: "Jeux et récompenses", desc: "Sudoku et quiz sur les lignes de Tana — une façon ludique d'apprendre à se repérer." },
                ].map((item) => (
                  <div key={item.titre} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFB800", marginTop: 8, flexShrink: 0 }} />
                    <div>
                      <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0D1525" }}>{item.titre} — </span>
                      <span style={{ fontSize: "0.875rem", color: "#64748B", lineHeight: 1.65 }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div style={{ borderTop: "1px solid #F1F5F9", marginBottom: 40 }} />

            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0D1525", marginBottom: 16, letterSpacing: "-0.01em" }}>
                Gratuit et accessible
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.8, margin: "0 0 12px" }}>
                TaxiBe est gratuit. L&apos;inscription est libre et permet d&apos;accéder à l&apos;ensemble
                des fonctionnalités de l&apos;application. La recherche de base est disponible sur ce site web,
                mais l&apos;expérience complète — avec toutes les fonctionnalités — se trouve dans l&apos;application mobile.
              </p>
              <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.8, margin: 0 }}>
                Nous croyons que l&apos;accès à l&apos;information sur le transport public doit être simple et ouvert
                à tous les habitants de Tana.
              </p>
            </section>

            <div style={{ borderTop: "1px solid #F1F5F9", marginBottom: 40 }} />

            <section id="equipe" style={{ marginBottom: 40, scrollMarginTop: 90 }}>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0D1525", marginBottom: 16, letterSpacing: "-0.01em" }}>
                Notre équipe
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.8, margin: "0 0 16px" }}>
                TaxiBe est développé par une équipe basée à Antananarivo, convaincue que la ville se comprend
                mieux quand on la parcourt. Nous cartographions le réseau ligne par ligne, avec l&apos;aide d&apos;usagers
                qui connaissent chaque quartier mieux que quiconque.
              </p>
              <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.8, margin: 0 }}>
                Envie de nous aider à faire grandir la base de données ?{" "}
                <Link href="/communaute" style={{ color: "#FFB800", fontWeight: 700, textDecoration: "none" }}>
                  Devenez contributeur →
                </Link>
              </p>
            </section>

            <div style={{ borderTop: "1px solid #F1F5F9", marginBottom: 40 }} />

            <section>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#0D1525", marginBottom: 16, letterSpacing: "-0.01em" }}>
                Contact
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.8, margin: "0 0 12px" }}>
                Pour toute question, suggestion ou signalement d&apos;erreur sur les lignes, vous pouvez nous contacter
                directement depuis l&apos;application ou via notre formulaire en ligne.
              </p>
              <p style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.8, margin: 0 }}>
                Vous souhaitez contribuer à la base de données des lignes ou signaler une erreur ?{" "}
                <Link href="/contact" style={{ color: "#FFB800", fontWeight: 700, textDecoration: "none" }}>
                  Contactez-nous →
                </Link>
              </p>
            </section>
          </div>
        </div>
      </main>
      <CtaApp />
      <Footer />
    </>
  );
}
