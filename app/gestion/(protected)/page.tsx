import { getDashboardStats } from "../actions";
import Link from "next/link";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "Inscriptions en attente", value: stats.usersEnAttente,      href: "/gestion/utilisateurs", color: "#FFB800" },
    { label: "Emplois a moderer",       value: stats.emploisEnAttente,    href: "/gestion/emplois",      color: "#f59e0b" },
    { label: "Articles publies",        value: stats.actualitesPubliees,  href: "/gestion/actualites",   color: "#3b82f6" },
    { label: "Messages non lus",        value: stats.messagesNouveaux,    href: "/gestion/messages",     color: "#ef4444" },
  ];

  const shortcuts = [
    { label: "Nouvel article",        href: "/gestion/actualites/nouveau", icon: "📰" },
    { label: "Nouveau spotlight",     href: "/gestion/spotlight/nouveau",  icon: "📣" },
    { label: "Voir les messages",     href: "/gestion/messages",           icon: "✉️" },
    { label: "Moderer les emplois",   href: "/gestion/emplois",            icon: "💼" },
  ];

  return (
    <div>
      <style>{`
        .dash-stats  { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
        .dash-quick  { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 16px 22px; }
        @media (max-width: 900px) {
          .dash-stats { grid-template-columns: repeat(2, 1fr); }
          .dash-quick { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .dash-stats { grid-template-columns: 1fr 1fr; gap: 10px; }
          .dash-quick { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <span style={{ fontSize: "0.8rem", color: "#64748B" }}>
          {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </span>
      </div>

      <div className="dash-stats">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} style={{ textDecoration: "none" }}>
            <div style={{
              background: "white", borderRadius: 14, padding: "18px 20px",
              border: "1px solid #E2E8F0", borderLeft: `4px solid ${c.color}`,
            }}>
              <p style={{ margin: "0 0 8px", fontSize: "0.72rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: 1.3 }}>
                {c.label}
              </p>
              <p style={{ margin: 0, fontSize: "2rem", fontWeight: 900, color: c.color, lineHeight: 1 }}>
                {c.value}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="card">
        <div style={{ padding: "16px 22px", borderBottom: "1px solid #F1F5F9" }}>
          <h2 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 800, color: "#0D1525" }}>Actions rapides</h2>
        </div>
        <div className="dash-quick">
          {shortcuts.map((s) => (
            <Link key={s.href} href={s.href} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              padding: "18px 12px", borderRadius: 10, textDecoration: "none",
              background: "#F8FAFC", border: "1px solid #E2E8F0",
            }}>
              <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
              <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#0D1525", textAlign: "center", lineHeight: 1.3 }}>{s.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
