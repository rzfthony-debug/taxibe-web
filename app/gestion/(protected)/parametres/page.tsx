import { adminDb } from "@/lib/supabase";
import HeroUpload from "./HeroUpload";

async function getParam(cle: string): Promise<string | null> {
  const { data } = await adminDb
    .from("parametres")
    .select("valeur")
    .eq("cle", cle)
    .single();
  return data?.valeur ?? null;
}

export default async function ParametresPage() {
  const [homeHero, homeHeroMobile, emploisHero] = await Promise.all([
    getParam("home_hero_image_url"),
    getParam("home_hero_image_mobile_url"),
    getParam("emplois_hero_image_url"),
  ]);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Paramètres du site</h1>
        <span style={{ fontSize: "0.82rem", color: "#94A3B8" }}>
          Images et configuration des pages publiques
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 640 }}>

        <div>
          <p style={{ margin: "0 0 10px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8" }}>
            Page d&apos;accueil
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <HeroUpload
              cle="home_hero_image_url"
              label="Image hero — Desktop (≥ 769px)"
              description="Recommandé : 1400 × 800 px, JPG ou WebP, max 8 Mo. Affiché à droite du texte sur grand écran."
              ratio="16/9"
              currentUrl={homeHero}
            />
            <HeroUpload
              cle="home_hero_image_mobile_url"
              label="Image hero — Mobile (< 769px)"
              description="Recommandé : 800 × 600 px (4:3 ou carré), JPG ou WebP, max 8 Mo. Affiché sous le texte sur mobile."
              ratio="4/3"
              currentUrl={homeHeroMobile}
            />
          </div>
        </div>

        <div>
          <p style={{ margin: "0 0 10px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8" }}>
            Page Carrières
          </p>
          <HeroUpload
            cle="emplois_hero_image_url"
            label="Image hero — Page Carrières"
            description="Recommandé : 1200 × 800 px (3:2), JPG ou WebP, max 8 Mo. S'affiche à droite du titre de la page /emplois."
            ratio="3/2"
            currentUrl={emploisHero}
          />
        </div>

      </div>
    </div>
  );
}
