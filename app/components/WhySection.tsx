import Link from "next/link";

const BusScene = () => (
  <svg viewBox="0 0 560 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 520 }} aria-hidden="true">
    {/* Sol / route */}
    <rect x="0" y="168" width="560" height="2" fill="#E8ECF0" rx="1"/>

    {/* Chemin pointillé */}
    <line x1="68" y1="169" x2="460" y2="169" stroke="#FFB800" strokeWidth="2.5" strokeDasharray="10 8" strokeLinecap="round"/>

    {/* ── Pin de départ (gauche) ── */}
    <ellipse cx="64" cy="175" rx="14" ry="5" fill="rgba(0,0,0,0.08)"/>
    <path d="M64 50 C64 50 44 85 44 102 C44 113.05 53.85 122 64 122 C74.15 122 84 113.05 84 102 C84 85 64 50 64 50Z" fill="#FFB800"/>
    <circle cx="64" cy="100" r="9" fill="white"/>

    {/* ── Arrêt de bus (droite) ── */}
    <ellipse cx="476" cy="175" rx="18" ry="6" fill="rgba(0,0,0,0.06)"/>
    {/* Poteau */}
    <rect x="473" y="95" width="6" height="75" fill="#0D1525" rx="3"/>
    {/* Panneau */}
    <rect x="452" y="72" width="56" height="36" fill="#0D1525" rx="8"/>
    {/* Icône bus sur le panneau */}
    <rect x="461" y="80" width="22" height="12" fill="#FFB800" rx="3"/>
    <circle cx="465" cy="94" r="3" fill="#FFB800"/>
    <circle cx="479" cy="94" r="3" fill="#FFB800"/>
    <rect x="487" y="80" width="12" height="8" fill="rgba(255,255,255,0.25)" rx="2"/>

    {/* ── Corps du bus (profil droit) ── */}
    {/* Ombre */}
    <ellipse cx="285" cy="178" rx="105" ry="10" fill="rgba(0,0,0,0.07)"/>

    {/* Carrosserie */}
    <rect x="148" y="78" width="260" height="92" fill="#0D1525" rx="14"/>

    {/* Bande dorée latérale */}
    <rect x="148" y="126" width="260" height="8" fill="#FFB800" rx="0"/>

    {/* Pare-brise (avant droit) */}
    <rect x="366" y="86" width="36" height="52" fill="#1B3A5C" rx="6"/>
    <line x1="368" y1="88" x2="400" y2="136" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>

    {/* Vitres latérales */}
    <rect x="166" y="88" width="40" height="30" fill="#1B3A5C" rx="5"/>
    <rect x="216" y="88" width="40" height="30" fill="#1B3A5C" rx="5"/>
    <rect x="266" y="88" width="40" height="30" fill="#1B3A5C" rx="5"/>
    <rect x="316" y="88" width="40" height="30" fill="#1B3A5C" rx="5"/>

    {/* Porte */}
    <rect x="164" y="118" width="44" height="52" fill="#162030" rx="4"/>
    <circle cx="205" cy="144" r="3" fill="#FFB800"/>

    {/* Texte TaxiBe sur le bus */}
    <text x="228" y="120" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="13" fill="white" letterSpacing="0.5">TaxiBe</text>

    {/* Phare avant */}
    <ellipse cx="403" cy="143" rx="10" ry="7" fill="#FFB800"/>
    <ellipse cx="403" cy="143" rx="6" ry="4" fill="#FFF3CD"/>

    {/* Faisceaux lumineux */}
    <path d="M411 138 L448 118 L448 122 L414 140Z" fill="rgba(255,184,0,0.12)"/>
    <path d="M411 143 L452 143 L452 147 L411 147Z" fill="rgba(255,184,0,0.10)"/>
    <path d="M411 148 L448 163 L448 167 L414 150Z" fill="rgba(255,184,0,0.08)"/>

    {/* Roues */}
    <circle cx="198" cy="170" r="20" fill="#0A0F1E"/>
    <circle cx="198" cy="170" r="11" fill="#2D3748"/>
    <circle cx="198" cy="170" r="4" fill="#FFB800"/>
    <circle cx="360" cy="170" r="20" fill="#0A0F1E"/>
    <circle cx="360" cy="170" r="11" fill="#2D3748"/>
    <circle cx="360" cy="170" r="4" fill="#FFB800"/>

    {/* Pare-chocs avant */}
    <rect x="398" y="155" width="16" height="8" fill="#1a2535" rx="3"/>

    {/* Rétroviseur */}
    <rect x="144" y="96" width="10" height="16" fill="#1a2535" rx="3"/>
  </svg>
);

const userTypes = [
  {
    label: "Étudiants",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    label: "Travailleurs",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
  },
  {
    label: "Habitants",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    label: "Voyageurs",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
  {
    label: "Touristes",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
];

const questions = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 5v3h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    q: "Quel bus dois-je prendre ?",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    q: "Où est l'arrêt le plus proche ?",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    q: "Où dois-je descendre ?",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9"/>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <polyline points="7 23 3 19 7 15"/>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
    q: "Quelle correspondance utiliser ?",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    q: "Un bus passe-t-il encore à cette heure ?",
  },
];

export default function WhySection() {
  return (
    <section style={{ padding: "88px 24px", background: "white" }}>
      <style>{`
        .why-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 64px;
          align-items: center;
          max-width: 1100px;
          margin: 0 auto;
        }
        .why-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 28px;
        }
        .why-chip {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: #0D1525;
          border-radius: 50px;
          padding: 8px 16px 8px 8px;
          font-size: 0.82rem;
          font-weight: 700;
          color: white;
        }
        .why-chip-icon {
          width: 30px; height: 30px;
          border-radius: 50%;
          background: rgba(255,184,0,0.18);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .why-question {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 0;
          border-bottom: 1px solid #F1F5F9;
        }
        .why-question:last-of-type { border-bottom: none; }
        .why-q-icon {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: #0D1525;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        @media (max-width: 860px) {
          .why-grid { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>

      <div className="why-grid">
        {/* ── Colonne gauche ── */}
        <div>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800", marginBottom: 18 }}>
            Notre mission
          </p>

          <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.4rem)", fontWeight: 900, color: "#0D1525", lineHeight: 1.18, letterSpacing: "-0.02em", marginBottom: 18 }}>
            Le transport collectif,{" "}
            <br />
            enfin{" "}
            <span style={{ color: "#FFB800" }}>simple</span>
            {" "}à comprendre.
          </h2>

          <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "#64748B", maxWidth: 440, marginBottom: 28 }}>
            TaxiBe vous aide à trouver le bon bus, les arrêts et l&apos;itinéraire adapté à votre destination,{" "}
            <strong style={{ color: "#0D1525" }}>en quelques secondes.</strong>
          </p>

          {/* Illustration bus */}
          <div style={{
            background: "#F8F9FB",
            borderRadius: 18,
            border: "1px solid #E8ECF0",
            padding: "24px 20px 8px",
            marginBottom: 24,
            overflow: "hidden",
          }}>
            <BusScene />
          </div>

          {/* Chips utilisateurs */}
          <div className="why-chips">
            {userTypes.map((u) => (
              <span key={u.label} className="why-chip">
                <span className="why-chip-icon">{u.icon}</span>
                {u.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Colonne droite ── */}
        <div>
          <p style={{
            fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "#64748B", marginBottom: 24, lineHeight: 1.6,
          }}>
            Les questions auxquelles{" "}
            <span style={{ color: "#FFB800" }}>TaxiBe</span>{" "}répond
          </p>

          <div>
            {questions.map((item, i) => (
              <div key={i} className="why-question">
                <div className="why-q-icon">{item.icon}</div>
                <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0D1525", margin: 0, lineHeight: 1.5 }}>
                  {item.q}
                </p>
              </div>
            ))}
          </div>

          {/* Callout */}
          <div style={{
            marginTop: 24,
            background: "#FFFBEB",
            border: "1.5px solid #FDE68A",
            borderRadius: 14,
            padding: "18px 20px",
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "#FFB800",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D1525" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#92400E", lineHeight: 1.65, margin: 0 }}>
              <strong>Une seule application</strong> pour préparer vos déplacements en{" "}
              <strong>toute simplicité.</strong>
            </p>
          </div>

          <div style={{ marginTop: 24 }}>
            <Link href="/telecharger" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 22px", borderRadius: 10,
              background: "#0D1525", color: "#FFB800",
              fontWeight: 800, fontSize: "0.88rem", textDecoration: "none",
            }}>
              Télécharger gratuitement
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
