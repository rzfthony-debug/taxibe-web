import { getDashboardStats } from "./actions";
import Link from "next/link";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "Inscriptions en attente", value: stats.usersEnAttente, href: "/admin/utilisateurs", color: "#FFB800", bg: "#fffbeb" },
    { label: "Emplois à modérer", value: stats.emploisEnAttente, href: "/admin/emplois", color: "#f59e0b", bg: "#fff7ed" },
    { label: "Articles publiés", value: stats.actualitesPubliees, href: "/admin/actualites", color: "#3b82f6", bg: "#eff6ff" },
    { label: "Signalements ouverts", value: stats.signalementsOuverts, href: "#", color: "#ef4444", bg: "#fef2f2" },
  ];

  const shortcuts = [
    { label: "Nouvel article", href: "/admin/actualites/nouveau", icon: "📰" },
    { label: "Nouveau spotlight", href: "/admin/spotlight/nouveau", icon: "📣" },
    { label: "Voir les utilisateurs", href: "/admin/utilisateurs", icon: "👥" },
    { label: "Modérer les emplois", href: "/admin/emplois", icon: "💼" },
  ];

  return (
    <div style={{ padding: "32px 36px" }}>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>
          {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </span>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {cards.map((c) => (
          <Link key={c.label} href={c.href} style={{ textDecoration: "none" }}>
            <div style={{
              background: "white", borderRadius: 14, padding: "20px 22px",
              border: "1px solid #E2E8F0",
              borderLeft: `4px solid ${c.color}`,
              transition: "box-shadow 0.15s",
            }}>
              <p style={{ margin: "0 0 8px", fontSize: "0.75rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {c.label}
              </p>
              <p style={{ margin: 0, fontSize: "2rem", fontWeight: 900, color: c.color, lineHeight: 1 }}>
                {c.value}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Raccourcis */}
      <div className="card">
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #F1F5F9" }}>
          <h2 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 800, color: "#0D1525" }}>Actions rapides</h2>
        </div>
        <div style={{ padding: "16px 22px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {shortcuts.map((s) => (
            <Link key={s.href} href={s.href} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              padding: "20px 12px", borderRadius: 10, textDecoration: "none",
              background: "#F8FAFC", border: "1px solid #E2E8F0",
              transition: "background 0.15s",
            }}>
              <span style={{ fontSize: "1.6rem" }}>{s.icon}</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0D1525", textAlign: "center" }}>{s.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
