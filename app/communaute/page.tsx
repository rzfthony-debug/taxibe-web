import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
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

        <style>{`
          .page-hero-inner { max-width: 1280px; margin: 0 auto; padding: 64px 40px; display: grid; grid-template-columns: 1fr 1.4fr; gap: 24px; align-items: center; }
          .page-hero-img { display: flex; align-items: center; justify-content: center; }
          @media (max-width: 768px) { .page-hero-inner { grid-template-columns: 1fr; padding: 40px 20px; } .page-hero-img { display: none; } }
        `}</style>
        <section style={{ background: "#F8F9FB", overflow: "hidden", borderBottom: "1px solid #E8ECF0" }}>
          <div className="page-hero-inner">
            <div>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
                Communauté
              </p>
              <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
                Contribuer à TaxiBe
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#64748B", maxWidth: 480, margin: 0, lineHeight: 1.7 }}>
                TaxiBe est construit avec l&apos;aide de ceux qui connaissent le mieux le réseau.
                Signalez une erreur, rejoignez les contributeurs, ou envoyez-nous un message.
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

        <div style={{ maxWidth: 680, margin: "0 auto", padding: "56px 24px" }}>
          <div style={{
            background: "white", borderRadius: 14, padding: "36px",
            border: "1px solid #E8ECF0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
          }}>
            <CommunauteForm status={statut} />
          </div>
        </div>

      </main>
      <CtaApp />
      <Footer />
    </>
  );
}
