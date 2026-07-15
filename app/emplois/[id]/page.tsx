import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { supabase } from "@/lib/supabase";

type Offre = {
  id: string;
  nom: string;
  type_poste: string | null;
  lieu: string | null;
  description: string | null;
  telephone: string | null;
  statut: string;
  date_limite: string | null;
  created_at: string;
};

async function getOffre(id: string): Promise<Offre | null> {
  const { data } = await supabase
    .from("offres_emploi")
    .select("id, nom, type_poste, lieu, description, telephone, statut, date_limite, created_at")
    .eq("id", id)
    .eq("statut", "publie")
    .eq("interne", true)
    .single();
  return data ?? null;
}

async function getAutresOffres(excludeId: string): Promise<Pick<Offre, "id" | "nom" | "type_poste" | "lieu">[]> {
  const { data } = await supabase
    .from("offres_emploi")
    .select("id, nom, type_poste, lieu")
    .eq("statut", "publie")
    .eq("interne", true)
    .neq("id", excludeId)
    .order("created_at", { ascending: false })
    .limit(4);
  return data ?? [];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const offre = await getOffre(id);
  if (!offre) return { title: "Offre introuvable — TaxiBe" };
  return {
    title: `${offre.nom} — Carrières TaxiBe`,
    description: offre.description?.slice(0, 150) ?? "Rejoignez l'équipe TaxiBe à Antananarivo.",
  };
}

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function OffrePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [offre, autres] = await Promise.all([getOffre(id), getAutresOffres(id)]);
  if (!offre) notFound();

  const paragraphes = (offre.description ?? "").split("\n").filter(Boolean);

  return (
    <>
      <Nav />
      <main>
        <style>{`
          .offre-hero {
            background: linear-gradient(135deg, #0D1525 0%, #1A2540 100%);
            position: relative; overflow: hidden;
          }
          .offre-hero-dots {
            position: absolute; right: 0; top: 0; bottom: 0; width: 300px;
            background-image: radial-gradient(circle, rgba(255,184,0,0.15) 1.5px, transparent 1.5px);
            background-size: 20px 20px; pointer-events: none;
            mask-image: linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 80%);
          }
          .offre-layout {
            max-width: 1060px; margin: 0 auto; padding: 48px 24px;
            display: grid; grid-template-columns: 1fr;
            gap: 32px; align-items: start;
          }
          @media (min-width: 860px) {
            .offre-layout { grid-template-columns: 1fr 300px; }
          }
          .apply-btn {
            display: inline-flex; align-items: center; gap: 8px;
            background: #FFB800; color: #0D1525;
            font-weight: 900; font-size: 0.95rem; padding: 14px 28px;
            border-radius: 10px; text-decoration: none; cursor: pointer;
            border: none; font-family: inherit; transition: background 0.15s;
          }
          .apply-btn:hover { background: #e6a500; }
          .prose-block { background: white; border-radius: 14px; border: 1px solid #E8ECF0; padding: 28px 32px; }
          .sidebar-widget { background: white; border-radius: 14px; border: 1px solid #E8ECF0; overflow: hidden; }
          .widget-header { padding: 13px 18px; background: #0D1525; font-size: 0.73rem; font-weight: 800; color: white; text-transform: uppercase; letter-spacing: 0.1em; }
          .widget-body { padding: 18px; }
          .tag-chip { display: inline-flex; align-items: center; gap: 5px; font-size: 0.72rem; font-weight: 600; padding: 4px 11px; border-radius: 20px; }
          .autre-offre-card { display: flex; flex-direction: column; gap: 6px; padding: 14px; border-bottom: 1px solid #F1F5F9; text-decoration: none; }
          .autre-offre-card:last-child { border-bottom: none; }
          .autre-offre-card:hover { background: #F8F9FB; }
        `}</style>

        {/* Hero */}
        <div className="offre-hero">
          <div className="offre-hero-dots" aria-hidden="true" />
          <div style={{ maxWidth: 1060, margin: "0 auto", padding: "44px 24px 52px", position: "relative" }}>
            <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
              {[
                { label: "Accueil", href: "/" },
                { label: "Carrières", href: "/emplois" },
                { label: offre.nom },
              ].map((c, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {i > 0 && <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem" }}>›</span>}
                  {c.href ? (
                    <Link href={c.href} style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", fontWeight: 500 }}>
                      {c.label}
                    </Link>
                  ) : (
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>{c.label}</span>
                  )}
                </span>
              ))}
            </nav>

            <div style={{ borderLeft: "3px solid #FFB800", paddingLeft: 20 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                {offre.lieu && (
                  <span className="tag-chip" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {offre.lieu}
                  </span>
                )}
                {offre.type_poste && (
                  <span className="tag-chip" style={{ background: "rgba(255,184,0,0.15)", color: "#FFB800", border: "1px solid rgba(255,184,0,0.3)" }}>
                    {offre.type_poste}
                  </span>
                )}
              </div>
              <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.4rem)", fontWeight: 900, color: "white", margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                {offre.nom}
              </h1>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", margin: 0, fontWeight: 500 }}>
                Publié le {formatDate(offre.created_at)}
                {offre.date_limite && (
                  <span style={{ marginLeft: 12, color: "#FCA5A5" }}>
                    · Candidature avant le {formatDate(offre.date_limite)}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div style={{ height: 3, background: "linear-gradient(90deg, #FFB800 0%, transparent 60%)" }} />
        </div>

        {/* Corps */}
        <div style={{ background: "#F8F9FB" }}>
          <div className="offre-layout">

            {/* Description */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="prose-block">
                <h2 style={{ fontSize: "1rem", fontWeight: 900, color: "#0D1525", margin: "0 0 20px", paddingBottom: 14, borderBottom: "2px solid #F1F5F9" }}>
                  Description du poste
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {paragraphes.length > 0 ? paragraphes.map((p, i) => (
                    <p key={i} style={{ margin: 0, fontSize: "0.9rem", color: "#374151", lineHeight: 1.75 }}>{p}</p>
                  )) : (
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "#94A3B8" }}>Aucune description disponible pour ce poste.</p>
                  )}
                </div>
              </div>

              {/* CTA postuler */}
              <div className="prose-block" style={{ background: "linear-gradient(135deg, #0D1525, #1A2540)", border: "none" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <h3 style={{ margin: "0 0 6px", color: "white", fontWeight: 900, fontSize: "1rem" }}>
                      Intéressé(e) par ce poste ?
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                      Envoyez votre candidature dès maintenant. Notre équipe RH vous contactera dans les meilleurs délais.
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {offre.telephone ? (
                      <a href={`mailto:recrutement@taxibe.mg?subject=Candidature — ${encodeURIComponent(offre.nom)}`} className="apply-btn">
                        Postuler maintenant
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      </a>
                    ) : (
                      <a href={`mailto:recrutement@taxibe.mg?subject=Candidature — ${encodeURIComponent(offre.nom)}`} className="apply-btn">
                        Postuler par email
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      </a>
                    )}
                    <Link href="/emplois" style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none",
                      padding: "14px 0",
                    }}>
                      ← Voir toutes les offres
                    </Link>
                  </div>
                  {offre.telephone && (
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
                      Contact direct :{" "}
                      <a href={`tel:${offre.telephone}`} style={{ color: "#FFB800", textDecoration: "none" }}>
                        {offre.telephone}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Résumé poste */}
              <div className="sidebar-widget">
                <div className="widget-header">Résumé du poste</div>
                <div className="widget-body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>, label: "Type", value: offre.type_poste ?? "Non précisé" },
                    { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: "Lieu", value: offre.lieu ?? "Non précisé" },
                    { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, label: "Publié", value: formatDate(offre.created_at) ?? "—" },
                    ...(offre.date_limite ? [{ icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: "Limite", value: formatDate(offre.date_limite) ?? "—" }] : []),
                  ].map((row, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ marginTop: 1, flexShrink: 0 }}>{row.icon}</div>
                      <div>
                        <p style={{ margin: 0, fontSize: "0.68rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em" }}>{row.label}</p>
                        <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 700, color: "#0D1525" }}>{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Autres offres */}
              {autres.length > 0 && (
                <div className="sidebar-widget">
                  <div className="widget-header">Autres offres</div>
                  <div>
                    {autres.map((o) => (
                      <Link key={o.id} href={`/emplois/${o.id}`} className="autre-offre-card">
                        <span style={{ fontWeight: 800, fontSize: "0.85rem", color: "#0D1525" }}>{o.nom}</span>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {o.lieu && (
                            <span className="tag-chip" style={{ background: "#F1F5F9", color: "#64748B" }}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                              {o.lieu}
                            </span>
                          )}
                          {o.type_poste && (
                            <span className="tag-chip" style={{ background: "#FFF7E6", color: "#92400E" }}>{o.type_poste}</span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div style={{ padding: "12px 18px", borderTop: "1px solid #F1F5F9" }}>
                    <Link href="/emplois" style={{ fontSize: "0.78rem", fontWeight: 700, color: "#FFB800", textDecoration: "none" }}>
                      Voir toutes les offres →
                    </Link>
                  </div>
                </div>
              )}

              {/* Contact RH */}
              <div className="sidebar-widget">
                <div className="widget-body" style={{ textAlign: "center" }}>
                  <p style={{ margin: "0 0 8px", fontWeight: 800, color: "#0D1525", fontSize: "0.9rem" }}>Une question ?</p>
                  <p style={{ margin: "0 0 14px", fontSize: "0.77rem", color: "#64748B", lineHeight: 1.6 }}>
                    Notre équipe RH répond du lundi au vendredi, 8h–17h.
                  </p>
                  <a href="tel:147" style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    background: "#F8F9FB", border: "1.5px solid #E2E8F0", borderRadius: 9,
                    padding: "10px 16px", textDecoration: "none", color: "#0D1525", fontWeight: 800, fontSize: "0.88rem",
                  }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Appeler le 147
                  </a>
                </div>
              </div>

            </aside>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
