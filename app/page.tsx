export default function Home() {
  return (
    <main>

      {/* ── Nav ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "white", borderBottom: "1px solid #E2E8F0",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 900, fontSize: "1.25rem", color: "#0D1525" }}>
            Taxi<span style={{ color: "#FFB800" }}>Be</span>
          </span>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a href="https://app.taxibe.mg" style={{
              padding: "8px 20px", borderRadius: 50,
              background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "0.875rem",
            }}>
              Ouvrir l&apos;app →
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        background: "linear-gradient(135deg, #0D1525 0%, #1a2f55 100%)",
        padding: "80px 24px 100px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <span style={{
            display: "inline-block", marginBottom: 20,
            background: "rgba(255,184,0,0.15)", color: "#FFB800",
            border: "1px solid rgba(255,184,0,0.3)",
            borderRadius: 50, padding: "6px 16px",
            fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            Application gratuite · Antananarivo
          </span>
          <h1 style={{
            fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 900,
            color: "white", lineHeight: 1.15, marginBottom: 20,
          }}>
            Trouvez votre ligne de taxi-be<span style={{ color: "#FFB800" }}> en 2 secondes</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.65)", marginBottom: 40, lineHeight: 1.7 }}>
            TaxiBe vous aide à naviguer dans Antananarivo : recherche par numéro, par arrêt,
            par GPS — avec les correspondances incluses.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://app.taxibe.mg" style={{
              padding: "14px 32px", borderRadius: 50,
              background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "1rem",
              boxShadow: "0 8px 30px rgba(255,184,0,0.35)",
            }}>
              Utiliser l&apos;app →
            </a>
            <a href="#telecharger" style={{
              padding: "14px 32px", borderRadius: 50,
              background: "rgba(255,255,255,0.08)", color: "white",
              fontWeight: 700, fontSize: "1rem",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>
              Télécharger l&apos;APK
            </a>
          </div>
        </div>
      </section>

      {/* ── Fonctionnalités ── */}
      <section style={{ padding: "80px 24px", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 900, marginBottom: 56 }}>
            Tout pour se déplacer à Tana
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 24,
          }}>
            {[
              { icon: "#", title: "Par numéro de ligne", desc: "Entrez le numéro et obtenez tous les arrêts, le trajet complet et les horaires.", color: "#FFB800" },
              { icon: "📍", title: "Par arrêt ou quartier", desc: "Indiquez votre départ et votre destination — TaxiBe trouve le meilleur chemin avec correspondances.", color: "#3b82f6" },
              { icon: "🛰️", title: "Arrêts près de moi", desc: "Activez le GPS pour voir toutes les lignes disponibles autour de vous en temps réel.", color: "#10b981" },
              { icon: "⭐", title: "Lignes favorites", desc: "Sauvegardez vos lignes du quotidien pour y accéder en un tap sans rechercher.", color: "#f59e0b" },
            ].map((f) => (
              <div key={f.title} style={{
                background: "white", borderRadius: 16,
                padding: "28px 24px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${f.color}18`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem", marginBottom: 16,
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: "1rem", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#64748B", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comment ça marche ── */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 900, marginBottom: 56 }}>
            Comment ça marche ?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {[
              { num: "1", title: "Ouvrez l'application", desc: "Depuis votre navigateur ou après avoir installé l'APK Android." },
              { num: "2", title: "Choisissez votre mode de recherche", desc: "Par numéro de ligne, par arrêt/quartier, ou par votre position GPS." },
              { num: "3", title: "Consultez votre itinéraire", desc: "Lignes directes, correspondances et double correspondances — tout est calculé automatiquement." },
            ].map((step) => (
              <div key={step.num} style={{
                display: "flex", alignItems: "flex-start", gap: 20, textAlign: "left",
              }}>
                <div style={{
                  flexShrink: 0, width: 48, height: 48, borderRadius: "50%",
                  background: "#0D1525", color: "#FFB800",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: "1.1rem",
                }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: "1rem", marginBottom: 6 }}>{step.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "#64748B", lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Télécharger ── */}
      <section id="telecharger" style={{
        background: "linear-gradient(135deg, #FFB800 0%, #F59E0B 100%)",
        padding: "80px 24px", textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 900, color: "#0D1525", marginBottom: 16 }}>
            Disponible sur Android
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(13,21,37,0.7)", marginBottom: 36, lineHeight: 1.6 }}>
            Installez l&apos;application directement depuis votre navigateur (PWA) ou téléchargez l&apos;APK pour Android.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://app.taxibe.mg" style={{
              padding: "14px 28px", borderRadius: 50,
              background: "#0D1525", color: "#FFB800",
              fontWeight: 800, fontSize: "0.9375rem",
            }}>
              Ouvrir dans le navigateur
            </a>
            <a href="/taxibe.apk" style={{
              padding: "14px 28px", borderRadius: 50,
              background: "white", color: "#0D1525",
              fontWeight: 800, fontSize: "0.9375rem",
            }}>
              Télécharger l&apos;APK
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        background: "#0D1525", padding: "40px 24px",
        textAlign: "center", color: "rgba(255,255,255,0.45)",
        fontSize: "0.8rem",
      }}>
        <p style={{ marginBottom: 8 }}>
          <span style={{ color: "#FFB800", fontWeight: 800 }}>TaxiBe</span> — Lignes de taxi-be à Antananarivo
        </p>
        <p>© {new Date().getFullYear()} TaxiBe. Tous droits réservés.</p>
      </footer>

    </main>
  );
}
