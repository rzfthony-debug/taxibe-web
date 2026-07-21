import { supabase } from "@/lib/supabase";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Actualités — TaxiBe",
  description: "Nouvelles et annonces de TaxiBe Antananarivo.",
};

export default async function ActualitesPage() {
  const { data: articles } = await supabase
    .from("actualites")
    .select("id, image_url, texte, created_at")
    .eq("publie", true)
    .order("ordre", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <>
      <Nav />
      <main style={{ minHeight: "70vh", background: "#F8F9FB" }}>

        {/* Header */}
        <div style={{ background: "#0D1525", padding: "56px 24px 64px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#FFB800", marginBottom: 14 }}>
              Actualités
            </p>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 900, color: "white", margin: 0, letterSpacing: "-0.02em" }}>
              Nouvelles et annonces
            </h1>
          </div>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
          {(!articles || articles.length === 0) && (
            <div style={{
              background: "white", borderRadius: 12, padding: "48px 32px",
              border: "1px solid #E8ECF0", textAlign: "center",
            }}>
              <p style={{ fontWeight: 700, color: "#0D1525", marginBottom: 8 }}>Aucune actualité pour l&apos;instant</p>
              <p style={{ fontSize: "0.875rem", color: "#64748B", margin: 0 }}>Revenez bientôt pour les dernières nouvelles.</p>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {(articles ?? []).map((a) => {
              const date = new Date(a.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
              const resume = (a.texte ?? "").slice(0, 160).trim();

              return (
                <article key={a.id} style={{
                  background: "white", borderRadius: 14,
                  border: "1px solid #E8ECF0",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                  overflow: "hidden",
                  display: "flex", flexDirection: "column",
                }}>
                  {a.image_url && (
                    <div style={{ position: "relative", height: 220, width: "100%", flexShrink: 0 }}>
                      <Image
                        src={a.image_url}
                        alt=""
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="800px"
                      />
                    </div>
                  )}
                  <div style={{ padding: "22px 24px" }}>
                    <p style={{ fontSize: "0.73rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#FFB800", margin: "0 0 10px" }}>
                      {date}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "#374151", lineHeight: 1.75 }}>
                      {resume}{a.texte && a.texte.length > 160 ? "…" : ""}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
