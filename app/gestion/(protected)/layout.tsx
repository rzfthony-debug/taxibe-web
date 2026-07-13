import { cookies } from "next/headers";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const nom = jar.get("taxibe_admin_nom")?.value ?? "Admin";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F1F5F9" }}>
      <AdminSidebar nom={nom} />

      <main style={{ flex: 1, minWidth: 0, overflowX: "hidden" }}>
        <style>{`
          /* Espace pour la topbar fixe mobile */
          @media (max-width: 768px) {
            main { padding-top: 52px; }
            .admin-page { padding: 16px !important; }
            .page-title { font-size: 1.05rem !important; }
            .page-header { flex-wrap: wrap; gap: 10px; margin-bottom: 16px !important; }
          }

          /* Boutons */
          .btn-yellow { background:#FFB800; color:#0D1525; border:none; padding:8px 18px; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer; }
          .btn-yellow:hover { opacity:0.88; }
          .btn-dark   { background:#0D1525; color:#FFB800; border:none; padding:8px 18px; border-radius:8px; font-weight:700; font-size:0.85rem; cursor:pointer; }
          .btn-sm     { padding:5px 12px; border-radius:6px; font-weight:700; font-size:0.75rem; cursor:pointer; border:none; }
          .btn-green  { background:#dcfce7; color:#16a34a; }
          .btn-red    { background:#fee2e2; color:#dc2626; }
          .btn-gray   { background:#F1F5F9; color:#64748B; }
          .btn-orange { background:#fff7ed; color:#ea580c; }

          /* Tables avec scroll horizontal */
          .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
          table { width:100%; border-collapse:collapse; min-width:480px; }
          th { text-align:left; font-size:0.7rem; font-weight:700; color:#94A3B8; text-transform:uppercase;
               letter-spacing:0.06em; padding:10px 14px; border-bottom:1px solid #E2E8F0; white-space:nowrap; }
          td { padding:12px 14px; font-size:0.85rem; color:#0D1525; border-bottom:1px solid #F1F5F9; vertical-align:middle; }
          tr:last-child td { border-bottom:none; }
          tr:hover td { background:#FAFBFC; }

          /* Badges */
          .badge        { display:inline-block; padding:3px 10px; border-radius:50px; font-size:0.7rem; font-weight:700; white-space:nowrap; }
          .badge-green  { background:#dcfce7; color:#16a34a; }
          .badge-orange { background:#fff7ed; color:#ea580c; }
          .badge-gray   { background:#F1F5F9; color:#64748B; }
          .badge-red    { background:#fee2e2; color:#dc2626; }

          /* Formulaires */
          input[type=text],input[type=url],input[type=number],input[type=email],input[type=password],textarea,select {
            width:100%; padding:9px 12px; border-radius:8px; border:1.5px solid #E2E8F0;
            font-size:0.875rem; outline:none; color:#0D1525; font-family:inherit; box-sizing:border-box;
          }
          input:focus,textarea:focus,select:focus { border-color:#FFB800; }
          label { display:block; font-size:0.72rem; font-weight:700; color:#64748B;
                  text-transform:uppercase; letter-spacing:0.05em; margin-bottom:5px; }

          /* Carte */
          .card { background:white; border-radius:14px; border:1px solid #E2E8F0; overflow:hidden; }

          /* En-tête de page */
          .page-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; flex-wrap:wrap; gap:12px; }
          .page-title  { font-size:1.3rem; font-weight:900; color:#0D1525; margin:0; }
        `}</style>
        <div className="admin-page" style={{ padding: "32px 36px" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
