import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Spotlight = {
  id: string;
  image_url: string | null;
  titre: string;
  sous_titre: string | null;
  cta_label: string | null;
  cta_url: string | null;
  ordre: number;
};

async function getSpotlight(): Promise<Spotlight[]> {
  const { data } = await supabase
    .from("spotlight")
    .select("id, image_url, titre, sous_titre, cta_label, cta_url, ordre")
    .eq("publie", true)
    .order("ordre", { ascending: true })
    .limit(3);
  return data ?? [];
}

function SpotlightCard({
  item,
  large = false,
}: {
  item: Spotlight;
  large?: boolean;
}) {
  const content = (
    <div style={{ position: "relative", height: "100%", minHeight: large ? 340 : 160, borderRadius: 14, overflow: "hidden" }}>
      {/* Image de fond */}
      {item.image_url ? (
        <Image
          src={item.image_url}
          alt={item.titre}
          fill
          sizes={large ? "(max-width: 900px) 100vw, 65vw" : "35vw"}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0D1525 0%, #162033 100%)" }} />
      )}

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: large
          ? "linear-gradient(to top, rgba(13,21,37,0.95) 0%, rgba(13,21,37,0.5) 50%, rgba(13,21,37,0.15) 100%)"
          : "linear-gradient(to top, rgba(13,21,37,0.92) 0%, rgba(13,21,37,0.4) 100%)",
      }} />

      {/* Contenu */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: large ? "28px 32px" : "18px 20px",
      }}>
        {large && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#FFB800", borderRadius: 6,
            padding: "3px 10px", marginBottom: 12, alignSelf: "flex-start",
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#0D1525">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span style={{ fontSize: "0.6rem", fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0D1525" }}>
              À la une
            </span>
          </div>
        )}
        <h3 style={{
          color: "white", margin: "0 0 8px",
          fontWeight: 900, lineHeight: 1.25,
          fontSize: large ? "clamp(1.2rem, 3vw, 1.65rem)" : "0.95rem",
          letterSpacing: "-0.01em",
        }}>
          {item.titre}
        </h3>
        {item.sous_titre && (
          <p style={{
            color: "rgba(255,255,255,0.65)", margin: "0 0 16px",
            fontSize: large ? "0.88rem" : "0.78rem", lineHeight: 1.55,
            display: large ? "block" : "none",
          }}>
            {item.sous_titre}
          </p>
        )}
        {item.cta_label && item.cta_url && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#FFB800", color: "#0D1525",
            fontWeight: 800, fontSize: large ? "0.84rem" : "0.76rem",
            padding: large ? "9px 18px" : "6px 12px",
            borderRadius: 8, alignSelf: "flex-start",
          }}>
            {item.cta_label}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        )}
      </div>
    </div>
  );

  const href = item.cta_url ?? "#";
  return (
    <Link href={href} style={{ display: "block", height: "100%", textDecoration: "none" }}>
      {content}
    </Link>
  );
}

export default async function SpotlightSection() {
  const items = await getSpotlight();
  if (items.length === 0) return null;

  const [featured, ...rest] = items;

  return (
    <section style={{ background: "#F8F9FB", padding: "56px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 900, color: "#0D1525", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
            Ce qui se passe à Tana
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#64748B", margin: 0, lineHeight: 1.6 }}>
            Actualités, événements et bons plans à ne pas manquer autour de vous.
          </p>
        </div>

        <style>{`
          .spotlight-grid { display: grid; gap: 16px; }
          .spotlight-grid.has-side { grid-template-columns: 1fr; }
          @media (min-width: 720px) {
            .spotlight-grid.has-side { grid-template-columns: 1.8fr 1fr; }
          }
          .spotlight-side { display: flex; flex-direction: column; gap: 16px; }
        `}</style>

        <div className={`spotlight-grid${rest.length > 0 ? " has-side" : ""}`}>
          {/* Item principal */}
          <div style={{ minHeight: rest.length > 0 ? 340 : 300 }}>
            <SpotlightCard item={featured} large />
          </div>

          {/* Items secondaires */}
          {rest.length > 0 && (
            <div className="spotlight-side">
              {rest.map((item) => (
                <div key={item.id} style={{ flex: 1, minHeight: 0 }}>
                  <SpotlightCard item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
