import { cookies } from "next/headers";
import Link from "next/link";
import { logoutAdmin } from "../actions";

const NAV_SECTIONS = [
  {
    label: "Vue d'ensemble",
    items: [
      { href: "/gestion",            label: "Dashboard",      icon: "▦" },
    ],
  },
  {
    label: "Site web",
    items: [
      { href: "/gestion/actualites", label: "Actualités",     icon: "📰" },
      { href: "/gestion/spotlight",  label: "Spotlight",      icon: "📣" },
      { href: "/gestion/emplois",    label: "Carrières",      icon: "💼" },
    ],
  },
  {
    label: "Application",
    items: [
      { href: "/gestion/lignes",         label: "Lignes",         icon: "🚌" },
      { href: "/gestion/arrets",         label: "Arrêts",          icon: "📍" },
      { href: "/gestion/cooperatives",   label: "Coopératives",   icon: "🏢" },
      { href: "/gestion/signalements",   label: "Signalements",   icon: "⚠️" },
    ],
  },
  {
    label: "Administration",
    items: [
      { href: "/gestion/utilisateurs", label: "Accès & rôles",   icon: "🔑" },
    ],
  },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const nom = jar.get("taxibe_admin_nom")?.value ?? "Admin";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F1F5F9" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 240, flexShrink: 0,
        background: "#0D1525",
        display: "flex", flexDirection: "column",
        position: "sticky", top: 0, height: "100vh",
      }}>
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9, background: "#FFB800",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: "0.85rem", color: "#0D1525", flexShrink: 0,
            }}>
              TB
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 900, color: "white", fontSize: "0.95rem", lineHeight: 1.2 }}>TaxiBe</p>
              <p style={{ margin: 0, fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.2 }}>Administration</p>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} style={{ marginBottom: 18 }}>
              <p style={{
                margin: "0 0 4px 10px", fontSize: "0.6rem", fontWeight: 800,
                textTransform: "uppercase", letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.25)",
              }}>
                {section.label}
              </p>
              {section.items.map((item) => (
                <Link key={item.href} href={item.href} className="admin-nav-item" style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 12px", borderRadius: 9, marginBottom: 2,
                  textDecoration: "none", color: "rgba(255,255,255,0.65)",
                  fontSize: "0.85rem", fontWeight: 600, transition: "background 0.15s",
                }}>
                  <span style={{ fontSize: "1rem", flexShrink: 0 }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div style={{ padding: "16px 14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", background: "#FFB800",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: "0.8rem", color: "#0D1525", flexShrink: 0,
            }}>
              {nom.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {nom}
            </span>
          </div>
          <form action={logoutAdmin}>
            <button type="submit" style={{
              width: "100%", padding: "8px", borderRadius: 8,
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
            }}>
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>

      {/* ── Contenu principal ── */}
      <main style={{ flex: 1, minWidth: 0, overflowY: "auto" }}>
        <style>{`
          .admin-nav-item:hover { background: rgba(255,255,255,0.07) !important; color: white !important; }
          .btn-yellow { background:#FFB800; color:#0D1525; border:none; padding:8px 18px; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer; }
          .btn-yellow:hover { opacity:0.85; }
          .btn-dark { background:#0D1525; color:#FFB800; border:none; padding:8px 18px; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer; }
          .btn-sm { padding:5px 12px; border-radius:6px; font-weight:700; font-size:0.75rem; cursor:pointer; border:none; }
          .btn-green { background:#dcfce7; color:#16a34a; }
          .btn-red { background:#fee2e2; color:#dc2626; }
          .btn-gray { background:#F1F5F9; color:#64748B; }
          .btn-orange { background:#fff7ed; color:#ea580c; }
          table { width:100%; border-collapse:collapse; }
          th { text-align:left; font-size:0.7rem; font-weight:700; color:#94A3B8; text-transform:uppercase; letter-spacing:0.06em; padding:10px 14px; border-bottom:1px solid #E2E8F0; }
          td { padding:12px 14px; font-size:0.85rem; color:#0D1525; border-bottom:1px solid #F1F5F9; vertical-align:middle; }
          tr:last-child td { border-bottom:none; }
          tr:hover td { background:#FAFBFC; }
          .badge { display:inline-block; padding:3px 10px; border-radius:50px; font-size:0.7rem; font-weight:700; }
          .badge-green { background:#dcfce7; color:#16a34a; }
          .badge-orange { background:#fff7ed; color:#ea580c; }
          .badge-gray { background:#F1F5F9; color:#64748B; }
          .badge-red { background:#fee2e2; color:#dc2626; }
          input[type=text],input[type=url],input[type=number],textarea,select {
            width:100%; padding:9px 12px; border-radius:8px; border:1.5px solid #E2E8F0;
            font-size:0.875rem; outline:none; color:#0D1525; font-family:inherit; box-sizing:border-box;
          }
          input:focus, textarea:focus, select:focus { border-color:#FFB800; }
          label { display:block; font-size:0.72rem; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:5px; }
          .card { background:white; border-radius:14px; border:1px solid #E2E8F0; overflow:hidden; }
          .page-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; }
          .page-title { font-size:1.3rem; font-weight:900; color:#0D1525; margin:0; }
        `}</style>
        {children}
      </main>
    </div>
  );
}
