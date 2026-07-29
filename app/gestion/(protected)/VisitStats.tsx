import { adminDb } from "@/lib/supabase";

type Row = { created_at: string; page: string };

async function fetchStats() {
  const since30d = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await adminDb
    .from("analytics_pageviews")
    .select("created_at, page")
    .gte("created_at", since30d)
    .order("created_at", { ascending: true });

  if (error) return null;
  return (data ?? []) as Row[];
}

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function dayLabel(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export default async function VisitStats() {
  const rows = await fetchStats();

  if (rows === null) {
    return (
      <div className="card" style={{ padding: "24px 28px", marginBottom: 24 }}>
        <h2 style={{ margin: "0 0 12px", fontSize: "0.9rem", fontWeight: 800, color: "#0D1525" }}>
          Statistiques de visites
        </h2>
        <p style={{ fontSize: "0.82rem", color: "#64748B", margin: "0 0 12px" }}>
          La table <code>analytics_pageviews</code> n&apos;existe pas encore. Créez-la dans Supabase&nbsp;:
        </p>
        <pre style={{ background: "#F1F5F9", borderRadius: 8, padding: "12px 16px", fontSize: "0.76rem", color: "#0D1525", overflowX: "auto", margin: 0 }}>{`create table analytics_pageviews (
  id bigint generated always as identity primary key,
  created_at timestamptz default now() not null,
  page text not null
);
create index on analytics_pageviews (created_at desc);`}</pre>
      </div>
    );
  }

  // Totaux
  const todayStr = new Date().toISOString().split("T")[0];
  const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime();
  const today   = rows.filter(r => r.created_at.startsWith(todayStr)).length;
  const week    = rows.filter(r => new Date(r.created_at).getTime() >= since7d).length;
  const month   = rows.length;

  // Graphique 14 jours
  const dailyMap: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    dailyMap[d] = 0;
  }
  rows.forEach(r => {
    const d = r.created_at.split("T")[0];
    if (d in dailyMap) dailyMap[d]++;
  });
  const days = Object.entries(dailyMap);
  const maxVal = Math.max(...days.map(([, v]) => v), 1);

  // Top pages (30 jours)
  const pageMap: Record<string, number> = {};
  rows.forEach(r => { pageMap[r.page] = (pageMap[r.page] || 0) + 1; });
  const topPages = Object.entries(pageMap).sort((a, b) => b[1] - a[1]).slice(0, 6);

  const statTiles = [
    { label: "Aujourd'hui",    value: today, color: "#FFB800" },
    { label: "7 derniers jours", value: week, color: "#3b82f6" },
    { label: "30 derniers jours", value: month, color: "#10b981" },
  ];

  return (
    <div className="card" style={{ marginBottom: 24, overflow: "hidden" }}>
      <style>{`
        .vstats-tiles { display: grid; grid-template-columns: repeat(3,1fr); }
        .vstats-tile  { padding: 20px 24px; border-right: 1px solid #F1F5F9; }
        .vstats-tile:last-child { border-right: none; }
        .vstats-bars  { display: flex; align-items: flex-end; gap: 6px; height: 80px; }
        .vstats-bar-col { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
        .vstats-bar   { width: 100%; border-radius: 4px 4px 0 0; transition: opacity 0.15s; }
        .vstats-bar:hover { opacity: 0.75; }
        .vstats-day   { font-size: 0.62rem; color: #94A3B8; white-space: nowrap; }
        @media (max-width: 640px) {
          .vstats-tiles { grid-template-columns: 1fr 1fr; }
          .vstats-tile:nth-child(3) { border-top: 1px solid #F1F5F9; grid-column: 1 / -1; }
        }
      `}</style>

      {/* Header */}
      <div style={{ padding: "16px 24px", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 800, color: "#0D1525" }}>
          Statistiques de visites
        </h2>
        <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>30 derniers jours</span>
      </div>

      {/* Stat tiles */}
      <div className="vstats-tiles">
        {statTiles.map(t => (
          <div key={t.label} className="vstats-tile">
            <p style={{ margin: "0 0 6px", fontSize: "0.7rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {t.label}
            </p>
            <p style={{ margin: 0, fontSize: "1.9rem", fontWeight: 900, color: t.color, lineHeight: 1 }}>
              {fmt(t.value)}
            </p>
          </div>
        ))}
      </div>

      {/* Graphique 14 jours */}
      <div style={{ padding: "20px 24px 8px", borderTop: "1px solid #F1F5F9" }}>
        <p style={{ margin: "0 0 14px", fontSize: "0.72rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          14 derniers jours
        </p>
        <div className="vstats-bars">
          {days.map(([date, count]) => {
            const isToday = date === todayStr;
            const h = Math.max(Math.round((count / maxVal) * 72), count > 0 ? 4 : 2);
            return (
              <div key={date} className="vstats-bar-col" title={`${dayLabel(date)} : ${count} vue${count !== 1 ? "s" : ""}`}>
                <div
                  className="vstats-bar"
                  style={{
                    height: h,
                    background: isToday ? "#FFB800" : "#0D1525",
                    opacity: isToday ? 1 : count === 0 ? 0.08 : 0.55,
                  }}
                />
                <span className="vstats-day">
                  {new Date(date + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric" })}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top pages */}
      {topPages.length > 0 && (
        <div style={{ padding: "16px 24px 20px", borderTop: "1px solid #F1F5F9" }}>
          <p style={{ margin: "0 0 12px", fontSize: "0.72rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Pages les plus visitées
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {topPages.map(([page, count]) => {
              const pct = Math.round((count / month) * 100);
              return (
                <div key={page} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: "0.78rem", color: "#0D1525", fontWeight: 600, minWidth: 130, flexShrink: 0 }}>
                    {page || "/"}
                  </span>
                  <div style={{ flex: 1, height: 6, background: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: "#FFB800", borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "#64748B", fontWeight: 700, minWidth: 36, textAlign: "right" }}>
                    {fmt(count)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
