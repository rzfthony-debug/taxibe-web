import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/app/components/Nav";
import CtaApp from "@/app/components/CtaApp";
import Footer from "@/app/components/Footer";
import { getLigneBySlugOrId } from "@/lib/search";
import type { ArretItem } from "@/lib/search";
import LigneMapWrapper from "@/app/components/LigneMapWrapper";
import StopTimeline from "@/app/components/StopTimeline";
import { safeJsonLd } from "@/lib/sanitize";

export const revalidate = 3600;

const BASE = "https://taxibe.mg";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ligne = await getLigneBySlugOrId(slug);
  if (!ligne) return { title: "Ligne introuvable" };
  const canonicalSlug = ligne.slug || ligne.id;
  const title = `Ligne ${ligne.numero} — ${ligne.terminus_debut} → ${ligne.terminus_fin}`;
  const description = `Arrêts et itinéraire de la ligne taxi-be ${ligne.numero} à Antananarivo : de ${ligne.terminus_debut} à ${ligne.terminus_fin}, ${ligne.arrets.length} arrêts.`;
  return {
    title,
    description,
    alternates: { canonical: `/ligne/${canonicalSlug}` },
    openGraph: {
      title: `${title} — TaxiBe`,
      description,
      url: `/ligne/${canonicalSlug}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
    },
  };
}

const STATUT_STYLE: Record<string, { label: string; color: string; bg: string }> = {
  verifie:    { label: "Vérifié",    color: "#15803d", bg: "rgba(34,197,94,0.1)" },
  a_verifier: { label: "À vérifier", color: "#92400e", bg: "rgba(245,158,11,0.1)" },
  obsolete:   { label: "Obsolète",   color: "#b91c1c", bg: "rgba(239,68,68,0.1)" },
};


export default async function LignePage({ params }: Props) {
  const { slug } = await params;
  const ligne = await getLigneBySlugOrId(slug);
  if (!ligne) notFound();

  const statut = STATUT_STYLE[ligne.statut ?? ""] ?? STATUT_STYLE.a_verifier;
  const isAllerRet = ligne.type_circuit === "aller_retour";
  const color = ligne.couleur_bus ?? "#FFB800";

  const ligneUrl = `${BASE}/ligne/${ligne.slug || ligne.id}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BusTrip",
        "name": `Ligne ${ligne.numero} — ${ligne.terminus_debut} → ${ligne.terminus_fin}`,
        "busName": `Taxi-be ${ligne.numero}`,
        "busNumber": ligne.numero,
        "url": ligneUrl,
        "departureBusStop": { "@type": "BusStop", "name": ligne.terminus_debut },
        "arrivalBusStop": { "@type": "BusStop", "name": ligne.terminus_fin },
        "provider": ligne.cooperative
          ? { "@type": "Organization", "name": ligne.cooperative }
          : { "@id": `${BASE}/#organization` },
        ...(ligne.arrets.length > 0 && {
          "itinerary": {
            "@type": "ItemList",
            "itemListElement": ligne.arrets.map((a, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": a.arret,
            })),
          },
        }),
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Accueil", "item": BASE },
          { "@type": "ListItem", "position": 2, "name": "Recherche", "item": `${BASE}/recherche` },
          { "@type": "ListItem", "position": 3, "name": `Ligne ${ligne.numero}`, "item": ligneUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <Nav />
      <style>{`
        @media (max-width: 700px) {
          .ligne-hero-grid { grid-template-columns: 1fr !important; }
          .ligne-hero-img { display: none !important; }
        }
        @keyframes stop-in {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>

        {/* ── Breadcrumb ── */}
        <div style={{ background: "white", borderBottom: "1px solid #E8ECF0" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "10px 24px", display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "#94A3B8" }}>
            <Link href="/recherche" style={{ color: "#64748B", textDecoration: "none", fontWeight: 500 }}>← Recherche</Link>
            <span>/</span>
            <span style={{ color: "#0D1525", fontWeight: 600 }}>Ligne {ligne.numero}</span>
          </div>
        </div>

        {/* ── Hero ligne ── */}
        <div style={{ background: "white", borderBottom: "1px solid #E8ECF0" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>

              {/* Badge numéro */}
              <div style={{
                flexShrink: 0,
                background: color, borderRadius: 14,
                padding: "10px 20px",
                boxShadow: `0 4px 20px ${color}50`,
                minWidth: 72, textAlign: "center",
              }}>
                <span style={{ fontWeight: 900, fontSize: "2rem", color: "white", lineHeight: 1, letterSpacing: "-0.02em" }}>
                  {ligne.numero}
                </span>
                <p style={{ margin: "2px 0 0", fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)" }}>Taxi-be</p>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <h1 style={{ margin: "0 0 6px", fontSize: "clamp(1.1rem, 3vw, 1.5rem)", fontWeight: 900, color: "#0D1525", lineHeight: 1.2 }}>
                  {ligne.terminus_debut}
                  <span style={{ color: "#FFB800", margin: "0 8px", fontWeight: 400 }}>→</span>
                  {ligne.terminus_fin}
                </h1>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: statut.color, background: statut.bg, padding: "2px 8px", borderRadius: 99 }}>
                    {statut.label}
                  </span>
                  {ligne.cooperative && (
                    <span style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 500 }}>· {ligne.cooperative}</span>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: 16, flexShrink: 0, flexWrap: "wrap" }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: "1.4rem", fontWeight: 900, color: "#0D1525", lineHeight: 1 }}>{ligne.arrets.length}</p>
                  <p style={{ margin: "2px 0 0", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8" }}>arrêts</p>
                </div>
                {ligne.telephone && (
                  <a href={`tel:${ligne.telephone}`} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "8px 14px", borderRadius: 10,
                    background: "#FFF7E6", border: "1px solid #FFE4A0",
                    textDecoration: "none",
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>
                    </svg>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0D1525" }}>{ligne.telephone}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Contenu principal ── */}
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px 60px" }}>

          {/* Carte */}
          {ligne.arrets.some((a) => a.lat && a.lng) && (
            <div style={{ marginBottom: 32 }}>
              <p style={{ margin: "0 0 10px", fontSize: "0.7rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748B" }}>
                Itinéraire
              </p>
              <LigneMapWrapper arrets={ligne.arrets} color={color} />
            </div>
          )}

          <StopTimeline arrets={ligne.arrets} label={isAllerRet ? "Arrêts — Aller" : "Arrêts"} />
          {isAllerRet && ligne.retourArrets.length > 0 && (
            <StopTimeline arrets={ligne.retourArrets} label="Arrêts — Retour" />
          )}

          {/* CTA app */}
          <div style={{
            background: "#0D1525", borderRadius: 16, padding: "28px 32px",
            display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "rgba(255,184,0,0.12)", border: "1.5px solid rgba(255,184,0,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <p style={{ margin: "0 0 4px", fontWeight: 800, color: "white", fontSize: "0.95rem" }}>
                GPS, favoris, correspondances…
              </p>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                Retrouvez cette ligne et bien plus dans l&apos;application TaxiBe.
              </p>
            </div>
            <a href="/telecharger" style={{
              padding: "11px 24px", borderRadius: 10, background: "#FFB800",
              color: "#0D1525", fontWeight: 800, fontSize: "0.9rem",
              textDecoration: "none", flexShrink: 0, whiteSpace: "nowrap",
            }}>
              Ouvrir l&apos;app →
            </a>
          </div>

          <p style={{ textAlign: "center", fontSize: "0.68rem", color: "#CBD5E1", marginTop: 32 }}>
            Données indicatives — aucun horaire ni tarif garanti.
          </p>
        </div>
      </div>

      <CtaApp
        title={`Suivez la ligne ${ligne.numero} dans l'app`}
        description="Ajoutez-la en favori, retrouvez ses correspondances et recevez les infos à jour — directement sur votre téléphone."
      />
      <Footer />
    </>
  );
}
