import Link from "next/link";

type Crumb = { label: string; href?: string };

type Props = {
  tag?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
};

export default function PageHeader({ tag, title, subtitle, breadcrumbs }: Props) {
  return (
    <div style={{ background: "#0D1525", position: "relative", overflow: "hidden" }}>

      {/* Motif décoratif — lignes de route */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", right: 0, top: 0, height: "100%", width: "auto", opacity: 0.04, pointerEvents: "none" }}
        viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg"
      >
        {[0,40,80,120,160,200,240,280,320].map((x) => (
          <line key={x} x1={x} y1="0" x2={x - 80} y2="200" stroke="white" strokeWidth="40"/>
        ))}
      </svg>

      {/* Numéro décoratif — ambiance taxi */}
      <div aria-hidden="true" style={{
        position: "absolute", right: 32, top: "50%", transform: "translateY(-50%)",
        fontSize: "clamp(5rem, 14vw, 9rem)", fontWeight: 900, color: "#FFB800",
        opacity: 0.06, lineHeight: 1, letterSpacing: "-0.05em", userSelect: "none",
        fontVariantNumeric: "tabular-nums",
      }}>
        TXB
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "44px 24px 48px", position: "relative" }}>

        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {i > 0 && <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem" }}>›</span>}
                {crumb.href ? (
                  <Link href={crumb.href} style={{ fontSize: "0.75rem", fontWeight: 500, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Contenu */}
        <div style={{ borderLeft: "3px solid #FFB800", paddingLeft: 20 }}>
          {tag && (
            <p style={{
              fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase",
              letterSpacing: "0.14em", color: "#FFB800", margin: "0 0 12px",
            }}>
              {tag}
            </p>
          )}
          <h1 style={{
            fontSize: "clamp(1.6rem, 5vw, 2.6rem)", fontWeight: 900,
            color: "white", margin: 0, lineHeight: 1.15, letterSpacing: "-0.02em",
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{
              fontSize: "0.95rem", color: "rgba(255,255,255,0.5)",
              margin: "12px 0 0", lineHeight: 1.65, maxWidth: 520,
            }}>
              {subtitle}
            </p>
          )}
        </div>

      </div>

      {/* Barre jaune bas */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #FFB800 0%, transparent 60%)" }} />
    </div>
  );
}
