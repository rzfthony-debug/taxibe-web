import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

async function getPhoneUrl(): Promise<string | null> {
  const { data } = await supabase
    .from("parametres")
    .select("valeur")
    .eq("cle", "home_cta_phone_url")
    .single();
  return data?.valeur ?? null;
}

export default async function CtaApp() {
  const phoneUrl = await getPhoneUrl();

  return (
    <div style={{ position: "relative", zIndex: 0 }}>
      <style>{`
        .cta-app-section {
          background: #FFB800;
          overflow: visible;
        }
        .cta-app-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 72px 40px;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 40px; align-items: center;
          position: relative;
        }
        .cta-app-phone-col {
          display: flex; justify-content: center; align-items: flex-end;
        }
        .cta-app-phone-img {
          width: 100%; max-width: 320px;
          margin-bottom: -72px;
          margin-top: -72px;
          filter: drop-shadow(0 32px 48px rgba(0,0,0,0.22));
        }
        @media (max-width: 720px) {
          .cta-app-inner { grid-template-columns: 1fr; padding: 56px 24px; }
          .cta-app-phone-col { display: none; }
        }
      `}</style>
      <section className="cta-app-section">
        <div className="cta-app-inner">
          <div>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900, color: "#0D1525", marginBottom: 16, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Toutes les fonctionnalités dans l&apos;app
            </h2>
            <p style={{ color: "rgba(13,21,37,0.65)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: 36, maxWidth: 400 }}>
              Favoris, GPS, correspondances, jeux — toutes les fonctionnalités pour les membres, sur Android.
            </p>
            <Link href="/telecharger" style={{
              display: "inline-block", padding: "15px 36px", borderRadius: 10,
              background: "#0D1525", color: "#FFB800",
              fontWeight: 800, fontSize: "1rem", textDecoration: "none",
              letterSpacing: "-0.01em",
            }}>
              Télécharger l&apos;app
            </Link>
          </div>

          <div className="cta-app-phone-col">
            {phoneUrl ? (
              <Image
                src={phoneUrl}
                alt="Application TaxiBe sur téléphone"
                width={320}
                height={580}
                sizes="320px"
                className="cta-app-phone-img"
                style={{ objectFit: "contain" }}
              />
            ) : (
              <div className="cta-app-phone-img" style={{
                width: 220, background: "#0D1525", borderRadius: 32,
                padding: "12px 8px", boxShadow: "0 32px 48px rgba(0,0,0,0.22)",
              }}>
                <div style={{ width: 60, height: 10, background: "#1a2a40", borderRadius: 5, margin: "0 auto 10px" }} />
                <div style={{ background: "#F8FAFC", borderRadius: 20, height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "2rem", fontWeight: 900, color: "#FFB800", opacity: 0.3 }}>TXB</span>
                </div>
                <div style={{ width: 50, height: 5, background: "rgba(255,255,255,0.2)", borderRadius: 3, margin: "10px auto 0" }} />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
