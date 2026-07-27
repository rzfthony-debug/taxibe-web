import Link from "next/link";

export default function MissionSection() {
  return (
    <>
      {/* ── Pourquoi TaxiBe ── */}
      <section style={{ padding: "88px 24px", background: "white" }}>
        <style>{`
          .mission-user-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
          .mission-user-chip {
            display: inline-flex; align-items: center; gap: 8px;
            background: #F8F9FB; border: 1px solid #E8ECF0; border-radius: 50px;
            padding: 8px 16px; font-size: 0.82rem; font-weight: 700; color: #374151;
          }
          .mission-user-chip-dot { width: 8px; height: 8px; border-radius: 50%; background: #FFB800; flex-shrink: 0; }
          .mission-problem-grid {
            display: grid; grid-template-columns: 1fr 1fr;
            gap: 32px; align-items: center; margin-top: 52px;
          }
          @media (max-width: 700px) {
            .mission-problem-grid { grid-template-columns: 1fr; gap: 24px; }
          }
        `}</style>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800", marginBottom: 12 }}>
            Notre mission
          </p>
          <h2 style={{ fontSize: "clamp(1.4rem, 4vw, 2.1rem)", fontWeight: 900, color: "#0D1525", marginBottom: 0, letterSpacing: "-0.01em", maxWidth: 680 }}>
            Se déplacer ne devrait pas commencer par une longue recherche d&apos;informations
          </h2>

          <div className="mission-problem-grid">
            {/* Texte gauche */}
            <div>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#374151", marginBottom: 20 }}>
                TaxiBe est né d&apos;un constat simple : de nombreux usagers ne savent pas toujours quel transport prendre, où trouver l&apos;arrêt, où descendre ou comment rejoindre leur destination.
              </p>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#374151" }}>
                Cette difficulté est particulièrement présente lorsqu&apos;une personne arrive dans une nouvelle ville, se déplace d&apos;une région à une autre, ou découvre pour la première fois un réseau de transport qu&apos;elle ne connaît pas.
              </p>

              <div className="mission-user-chips">
                {[
                  "Étudiants",
                  "Travailleurs",
                  "Nouveaux arrivants",
                  "Voyageurs en province",
                  "Visiteurs",
                ].map((label) => (
                  <span key={label} className="mission-user-chip">
                    <span className="mission-user-chip-dot" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Bloc problème à droite */}
            <div style={{
              background: "#F8F9FB", borderRadius: 18,
              border: "1px solid #E8ECF0",
              padding: "28px 28px 24px",
            }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", marginBottom: 18 }}>
                Questions sans réponse facile
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Quel bus dois-je prendre ?",
                  "Où est l'arrêt le plus proche ?",
                  "Où descendre pour arriver à destination ?",
                  "Quelle correspondance utiliser ?",
                  "Est-ce qu'un bus passe encore à cette heure ?",
                ].map((q, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{
                      flexShrink: 0, width: 28, height: 28, borderRadius: 8,
                      background: "rgba(255,184,0,0.12)",
                      border: "1.5px solid rgba(255,184,0,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.55, margin: 0, paddingTop: 5 }}>{q}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #E8ECF0" }}>
                <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "#64748B", margin: 0 }}>
                  TaxiBe a pour mission de rendre l&apos;information sur le transport collectif{" "}
                  <strong style={{ color: "#0D1525" }}>plus accessible, plus claire et plus facile à utiliser</strong>,
                  afin d&apos;aider chacun à mieux préparer ses déplacements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Au service de tous ── */}
      <section style={{ padding: "88px 24px", background: "#F8F9FB" }}>
        <style>{`
          .beneficiaires-grid {
            display: grid; grid-template-columns: repeat(3, 1fr);
            gap: 20px; margin-top: 52px;
          }
          @media (max-width: 860px) { .beneficiaires-grid { grid-template-columns: 1fr; } }
          .beneficiaire-card {
            background: white; border-radius: 16px; border: 1px solid #E8ECF0;
            box-shadow: 0 1px 6px rgba(0,0,0,0.04);
            padding: 28px 24px; display: flex; flex-direction: column;
          }
          .beneficiaire-bullet {
            display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px;
          }
          .beneficiaire-bullet:last-child { margin-bottom: 0; }
          .beneficiaire-bullet-dot {
            width: 6px; height: 6px; border-radius: 50%; background: #FFB800;
            flex-shrink: 0; margin-top: 7px;
          }
        `}</style>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800", marginBottom: 12 }}>
            Pour qui ?
          </p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 4vw, 2.1rem)", fontWeight: 900, color: "#0D1525", marginBottom: 12, letterSpacing: "-0.01em" }}>
            Une plateforme au service de tous
          </h2>
          <p style={{ textAlign: "center", color: "#64748B", fontSize: "0.9rem", maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
            TaxiBe s&apos;adresse à ceux qui se déplacent, à ceux qui organisent les transports, et à ceux qui planifient la mobilité.
          </p>

          <div className="beneficiaires-grid">
            {/* Usagers */}
            <div className="beneficiaire-card">
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: "rgba(255,184,0,0.1)", border: "1.5px solid rgba(255,184,0,0.22)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3 style={{ fontWeight: 900, fontSize: "1rem", color: "#0D1525", marginBottom: 6 }}>Usagers</h3>
              <p style={{ fontSize: "0.78rem", color: "#94A3B8", fontWeight: 600, marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Voyageurs du quotidien
              </p>
              <div style={{ flex: 1 }}>
                {[
                  "Comprendre les itinéraires sans avoir à demander son chemin",
                  "Trouver facilement les lignes et les arrêts à proximité",
                  "Préparer ses déplacements à l'avance",
                  "Réduire l'incertitude et le temps perdu",
                ].map((bullet, i) => (
                  <div key={i} className="beneficiaire-bullet">
                    <span className="beneficiaire-bullet-dot" />
                    <p style={{ fontSize: "0.83rem", color: "#374151", lineHeight: 1.6, margin: 0 }}>{bullet}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coopératives */}
            <div className="beneficiaire-card">
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: "rgba(255,184,0,0.1)", border: "1.5px solid rgba(255,184,0,0.22)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="2"/>
                  <path d="M16 8h4l3 5v3h-7V8z"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <h3 style={{ fontWeight: 900, fontSize: "1rem", color: "#0D1525", marginBottom: 6 }}>Coopératives</h3>
              <p style={{ fontSize: "0.78rem", color: "#94A3B8", fontWeight: 600, marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Opérateurs de transport
              </p>
              <div style={{ flex: 1 }}>
                {[
                  "Meilleure visibilité des lignes et des trajets opérés",
                  "Amélioration de la qualité et de la régularité du service",
                  "Outils progressifs de suivi et de statistiques",
                  "Transparence opérationnelle au service du quotidien",
                ].map((bullet, i) => (
                  <div key={i} className="beneficiaire-bullet">
                    <span className="beneficiaire-bullet-dot" />
                    <p style={{ fontSize: "0.83rem", color: "#374151", lineHeight: 1.6, margin: 0 }}>{bullet}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Collectivités */}
            <div className="beneficiaire-card">
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: "rgba(255,184,0,0.1)", border: "1.5px solid rgba(255,184,0,0.22)",
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18"/>
                  <path d="M5 21V7l8-4v18"/>
                  <path d="M19 21V11l-6-4"/>
                  <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01"/>
                </svg>
              </div>
              <h3 style={{ fontWeight: 900, fontSize: "1rem", color: "#0D1525", marginBottom: 6 }}>Collectivités & Institutions</h3>
              <p style={{ fontSize: "0.78rem", color: "#94A3B8", fontWeight: 600, marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Acteurs publics
              </p>
              <div style={{ flex: 1 }}>
                {[
                  "Données structurées sur les réseaux de transport",
                  "Meilleure compréhension des besoins de mobilité",
                  "Identification des zones insuffisamment desservies",
                  "Aide à la planification et à la prise de décision",
                ].map((bullet, i) => (
                  <div key={i} className="beneficiaire-bullet">
                    <span className="beneficiaire-bullet-dot" />
                    <p style={{ fontSize: "0.83rem", color: "#374151", lineHeight: 1.6, margin: 0 }}>{bullet}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision ── */}
      <section style={{ padding: "88px 24px", background: "#0D1525" }}>
        <style>{`
          .vision-grid {
            display: grid; grid-template-columns: repeat(3, 1fr);
            gap: 16px; margin-top: 52px;
          }
          @media (max-width: 860px) { .vision-grid { grid-template-columns: 1fr; } }
          .vision-card {
            border-radius: 16px; padding: 28px 24px;
            display: flex; flex-direction: column;
            position: relative;
          }
          .vision-feature-item {
            display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px;
          }
          .vision-feature-item:last-child { margin-bottom: 0; }
        `}</style>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ textAlign: "center", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFB800", marginBottom: 12 }}>
            Feuille de route
          </p>
          <h2 style={{
            textAlign: "center", fontSize: "clamp(1.4rem, 4vw, 2.1rem)", fontWeight: 900,
            color: "white", marginBottom: 14, letterSpacing: "-0.01em", lineHeight: 1.25,
          }}>
            Une vision pour une mobilité mieux connectée
          </h2>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", maxWidth: 560, margin: "0 auto", lineHeight: 1.75 }}>
            TaxiBe ne souhaite pas être uniquement une application de recherche d&apos;itinéraires. À long terme, la plateforme ambitionne de connecter progressivement les usagers, les coopératives et les institutions autour d&apos;une mobilité plus visible, plus fiable et mieux organisée.
          </p>

          <div className="vision-grid">
            {/* Aujourd'hui */}
            <div className="vision-card" style={{ background: "rgba(255,184,0,0.08)", border: "1.5px solid rgba(255,184,0,0.25)" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "#FFB800", borderRadius: 6, padding: "4px 12px",
                width: "fit-content", marginBottom: 20,
              }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.08em", color: "#0D1525", textTransform: "uppercase" }}>
                  Aujourd&apos;hui
                </span>
              </div>
              <h3 style={{ fontWeight: 900, fontSize: "0.95rem", color: "white", marginBottom: 6 }}>Information &amp; Préparation</h3>
              <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", marginBottom: 20, lineHeight: 1.6 }}>
                Fonctionnalités disponibles maintenant
              </p>
              <div style={{ flex: 1 }}>
                {[
                  "Recherche et consultation des lignes",
                  "Information sur les itinéraires et arrêts",
                  "Localisation GPS et position de l'usager",
                  "Aide à la préparation des déplacements",
                  "Partage de position",
                ].map((item, i) => (
                  <div key={i} className="vision-feature-item">
                    <svg style={{ flexShrink: 0, marginTop: 3 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.55, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prochaine étape */}
            <div className="vision-card" style={{ background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.1)" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(255,255,255,0.12)", borderRadius: 6, padding: "4px 12px",
                width: "fit-content", marginBottom: 20,
              }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.08em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>
                  Prochaine étape
                </span>
              </div>
              <h3 style={{ fontWeight: 900, fontSize: "0.95rem", color: "white", marginBottom: 6 }}>Données &amp; Suivi</h3>
              <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", marginBottom: 20, lineHeight: 1.6 }}>
                En cours de développement
              </p>
              <div style={{ flex: 1 }}>
                {[
                  "Meilleure information sur la disponibilité des bus",
                  "Outils numériques pour les coopératives",
                  "Tableaux de bord de suivi des lignes",
                  "Identification numérique unique des véhicules",
                  "Données utiles pour les institutions publiques",
                ].map((item, i) => (
                  <div key={i} className="vision-feature-item">
                    <svg style={{ flexShrink: 0, marginTop: 3 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.55, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Long terme */}
            <div className="vision-card" style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.06)" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(255,255,255,0.07)", borderRadius: 6, padding: "4px 12px",
                width: "fit-content", marginBottom: 20,
              }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 900, letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
                  À long terme
                </span>
              </div>
              <h3 style={{ fontWeight: 900, fontSize: "0.95rem", color: "white", marginBottom: 6 }}>Mobilité connectée</h3>
              <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.25)", marginBottom: 20, lineHeight: 1.6 }}>
                Vision future
              </p>
              <div style={{ flex: 1 }}>
                {[
                  "Suivi des véhicules en temps réel",
                  "Optimisation des trajets et de la régularité",
                  "Meilleure visibilité sur les trajets réalisés",
                  "Billetterie électronique et paiements numériques",
                  "Plateforme ouverte aux collectivités et partenaires",
                ].map((item, i) => (
                  <div key={i} className="vision-feature-item">
                    <svg style={{ flexShrink: 0, marginTop: 3 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.55, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{
            marginTop: 52, textAlign: "center",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
          }}>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", maxWidth: 440, lineHeight: 1.7 }}>
              Aujourd&apos;hui, TaxiBe aide les usagers à mieux comprendre leurs déplacements à Antananarivo.
            </p>
            <Link href="/telecharger" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 28px", borderRadius: 10,
              background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "0.9rem", textDecoration: "none",
            }}>
              Essayer TaxiBe gratuitement
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
