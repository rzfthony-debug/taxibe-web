import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Télécharger TaxiBe — Gratuit",
  description: "Téléchargez TaxiBe sur Android ou installez-la dans votre navigateur. Gratuit, sans abonnement.",
};

function PhoneMockup({ screen }: { screen: "home" | "search" | "result" }) {
  const screens = {
    home: {
      label: "Accueil",
      content: (
        <div style={{ padding: "12px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ background: "#FFB800", borderRadius: 8, padding: "10px 12px" }}>
            <div style={{ height: 8, background: "rgba(13,21,37,0.3)", borderRadius: 4, width: "60%", marginBottom: 6 }} />
            <div style={{ height: 22, background: "rgba(13,21,37,0.15)", borderRadius: 6 }} />
          </div>
          {["#1a2f55", "#0369a1", "#065f46"].map((c, i) => (
            <div key={i} style={{ background: c, borderRadius: 8, padding: "10px 12px", display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(255,255,255,0.12)", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: 7, background: "rgba(255,255,255,0.5)", borderRadius: 3, width: "55%", marginBottom: 4 }} />
                <div style={{ height: 6, background: "rgba(255,255,255,0.25)", borderRadius: 3, width: "80%" }} />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    search: {
      label: "Recherche",
      content: (
        <div style={{ padding: "12px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ background: "#F1F5F9", borderRadius: 20, padding: "9px 12px", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#CBD5E0", flexShrink: 0 }} />
            <div style={{ height: 7, background: "#CBD5E0", borderRadius: 3, flex: 1 }} />
          </div>
          <div style={{ background: "#F1F5F9", borderRadius: 20, padding: "9px 12px", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
            <div style={{ height: 7, background: "#CBD5E0", borderRadius: 3, flex: 1 }} />
          </div>
          <div style={{ background: "#FFB800", borderRadius: 20, padding: "9px 12px", textAlign: "center" }}>
            <div style={{ height: 8, background: "rgba(13,21,37,0.3)", borderRadius: 3, width: "50%", margin: "0 auto" }} />
          </div>
        </div>
      ),
    },
    result: {
      label: "Résultat",
      content: (
        <div style={{ padding: "10px 8px", display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { c: "#FFB800", label: "147", w: "70%" },
            { c: "#0D1525", label: "135", w: "85%" },
            { c: "#1a2f55", label: "20B", w: "60%" },
          ].map((r) => (
            <div key={r.label} style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 8, padding: "8px 10px", display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: 32, height: 22, borderRadius: 5, background: r.c, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ height: 6, background: "rgba(255,255,255,0.7)", borderRadius: 2, width: "60%" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ height: 7, background: "#E2E8F0", borderRadius: 3, width: r.w, marginBottom: 4 }} />
                <div style={{ height: 6, background: "#F1F5F9", borderRadius: 3, width: "50%" }} />
              </div>
            </div>
          ))}
        </div>
      ),
    },
  };

  const s = screens[screen];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      {/* Phone frame */}
      <div style={{
        width: 160, borderRadius: 24, background: "#0D1525",
        padding: "10px 6px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        position: "relative",
      }}>
        {/* Notch */}
        <div style={{ width: 50, height: 8, background: "#1a2a40", borderRadius: 4, margin: "0 auto 8px" }} />
        {/* Screen */}
        <div style={{ background: "#F8FAFC", borderRadius: 16, minHeight: 200, overflow: "hidden" }}>
          {/* Status bar */}
          <div style={{ background: "#0D1525", padding: "4px 10px", display: "flex", justifyContent: "space-between" }}>
            <div style={{ height: 5, width: 20, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
            <div style={{ height: 5, width: 28, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
          </div>
          {s.content}
        </div>
        {/* Home bar */}
        <div style={{ width: 40, height: 4, background: "rgba(255,255,255,0.2)", borderRadius: 2, margin: "8px auto 0" }} />
      </div>
      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748B" }}>{s.label}</span>
    </div>
  );
}

export default function TelechargerPage() {
  return (
    <main style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>

      {/* ── Nav simple ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100, background: "white",
        borderBottom: "1px solid #E2E8F0", boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
            <Image src="/logo_taxibe_vertcal.png" alt="TaxiBe" width={360} height={180}
              style={{ height: 36, width: "auto", objectFit: "contain" }} priority />
          </Link>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a href="https://taxibemada.vercel.app" style={{
              padding: "8px 16px", borderRadius: 8,
              color: "#64748B", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
              border: "1.5px solid #E2E8F0",
            }}>
              Utiliser dans le navigateur
            </a>
            <Link href="/" style={{ fontSize: "0.85rem", color: "#94A3B8", textDecoration: "none", fontWeight: 500 }}>
              ← Retour
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        background: "linear-gradient(135deg, #0D1525 0%, #1a2f55 100%)",
        padding: "72px 24px 88px", textAlign: "center",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(255,184,0,0.15)", color: "#FFB800",
            border: "1px solid rgba(255,184,0,0.3)",
            borderRadius: 50, padding: "6px 18px", marginBottom: 24,
            fontSize: "0.8rem", fontWeight: 700,
          }}>
            🎁 100% Gratuit — Toujours
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "white", lineHeight: 1.2, marginBottom: 18 }}>
            Téléchargez TaxiBe sur votre téléphone
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 0, maxWidth: 500, margin: "0 auto" }}>
            Installez l&apos;app en quelques secondes. Aucun abonnement, aucune carte bancaire — gratuit pour toujours.
          </p>
        </div>
      </section>

      {/* ── Screenshots ── */}
      <section style={{ padding: "72px 24px", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: "#0D1525", marginBottom: 48 }}>
            Aperçu de l&apos;application
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", alignItems: "flex-end" }}>
            <PhoneMockup screen="home" />
            <div style={{ transform: "scale(1.1)", transformOrigin: "bottom center" }}>
              <PhoneMockup screen="search" />
            </div>
            <PhoneMockup screen="result" />
          </div>
          <p style={{ marginTop: 40, fontSize: "0.82rem", color: "#94A3B8" }}>
            Interface rapide, simple et lisible — conçue pour Antananarivo.
          </p>
        </div>
      </section>

      {/* ── Options de téléchargement ── */}
      <section style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: "#0D1525", marginBottom: 12 }}>
            Choisissez votre méthode d&apos;installation
          </h2>
          <p style={{ textAlign: "center", color: "#64748B", marginBottom: 48 }}>
            Deux façons d&apos;installer TaxiBe — les deux sont gratuites.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 24 }}>

            {/* Option 1 — PWA */}
            <div style={{
              background: "white", borderRadius: 20, padding: "32px 28px",
              border: "2px solid #FFB800",
              boxShadow: "0 4px 24px rgba(255,184,0,0.12)",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", top: -14, left: 28,
                background: "#FFB800", color: "#0D1525",
                fontSize: "0.72rem", fontWeight: 800, padding: "4px 14px", borderRadius: 20,
                letterSpacing: "0.05em",
              }}>
                RECOMMANDÉ
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "#FFF7E6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0 }}>
                  🌐
                </div>
                <div>
                  <h3 style={{ margin: "0 0 4px", fontWeight: 900, fontSize: "1.1rem", color: "#0D1525" }}>Installer en PWA</h3>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748B" }}>Via Chrome ou votre navigateur</p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
                {[
                  { n: "1", text: "Ouvrez taxibemada.vercel.app dans Chrome" },
                  { n: "2", text: "Appuyez sur le menu (⋮) en haut à droite" },
                  { n: "3", text: "Choisissez « Ajouter à l'écran d'accueil »" },
                  { n: "4", text: "Confirmez — l'icône apparaît sur votre écran !" },
                ].map((s) => (
                  <div key={s.n} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                      background: "#FFB800", color: "#0D1525",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 900, fontSize: "0.78rem",
                    }}>
                      {s.n}
                    </div>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "#374151", lineHeight: 1.5, paddingTop: 3 }}>{s.text}</p>
                  </div>
                ))}
              </div>

              <a href="https://taxibemada.vercel.app" style={{
                display: "block", padding: "13px", borderRadius: 50, textAlign: "center",
                background: "#FFB800", color: "#0D1525",
                fontWeight: 800, fontSize: "0.9375rem", textDecoration: "none",
              }}>
                Ouvrir l&apos;app dans Chrome →
              </a>
            </div>

            {/* Option 2 — APK */}
            <div style={{
              background: "white", borderRadius: 20, padding: "32px 28px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0 }}>
                  🤖
                </div>
                <div>
                  <h3 style={{ margin: "0 0 4px", fontWeight: 900, fontSize: "1.1rem", color: "#0D1525" }}>Télécharger l&apos;APK</h3>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748B" }}>Pour Android uniquement</p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
                {[
                  { n: "1", text: "Téléchargez le fichier APK ci-dessous" },
                  { n: "2", text: "Ouvrez le fichier téléchargé sur votre téléphone" },
                  { n: "3", text: "Autorisez l'installation depuis une source inconnue si demandé" },
                  { n: "4", text: "Installez et profitez de TaxiBe !" },
                ].map((s) => (
                  <div key={s.n} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                      background: "#0D1525", color: "#FFB800",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 900, fontSize: "0.78rem",
                    }}>
                      {s.n}
                    </div>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "#374151", lineHeight: 1.5, paddingTop: 3 }}>{s.text}</p>
                  </div>
                ))}
              </div>

              <a href="/taxibe.apk" style={{
                display: "block", padding: "13px", borderRadius: 50, textAlign: "center",
                background: "#0D1525", color: "#FFB800",
                fontWeight: 800, fontSize: "0.9375rem", textDecoration: "none",
              }}>
                ⬇ Télécharger l&apos;APK Android
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ce qui est inclus ── */}
      <section style={{ padding: "72px 24px", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: "#0D1525", marginBottom: 12 }}>
            Tout est inclus — gratuitement
          </h2>
          <p style={{ color: "#64748B", marginBottom: 40 }}>Aucune fonctionnalité cachée derrière un abonnement.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { emoji: "🔍", label: "Recherche par numéro" },
              { emoji: "📍", label: "Recherche par arrêt" },
              { emoji: "🛰️", label: "GPS & arrêts proches" },
              { emoji: "🔄", label: "Correspondances auto" },
              { emoji: "⭐", label: "Lignes favorites" },
              { emoji: "📰", label: "Actualités" },
              { emoji: "💼", label: "Offres d'emploi" },
              { emoji: "🎮", label: "Jeux & récompenses" },
            ].map((f) => (
              <div key={f.label} style={{
                background: "white", borderRadius: 12, padding: "18px 16px",
                border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: 12,
              }}>
                <span style={{ fontSize: "1.3rem" }}>{f.emoji}</span>
                <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0D1525" }}>{f.label}</span>
                <span style={{ marginLeft: "auto", color: "#22c55e", fontSize: "1rem" }}>✓</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer simple ── */}
      <footer style={{ background: "#0D1525", padding: "32px 24px", textAlign: "center" }}>
        <Image src="/logo_taxibe_vertcal.png" alt="TaxiBe" width={120} height={60}
          style={{ height: 30, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", marginBottom: 12 }} />
        <p style={{ margin: "0 0 8px", fontSize: "0.82rem", color: "rgba(255,255,255,0.4)" }}>
          © {new Date().getFullYear()} TaxiBe · Antananarivo, Madagascar
        </p>
        <Link href="/" style={{ fontSize: "0.8rem", color: "rgba(255,184,0,0.7)", textDecoration: "none" }}>
          ← Retour à l&apos;accueil
        </Link>
      </footer>

    </main>
  );
}
