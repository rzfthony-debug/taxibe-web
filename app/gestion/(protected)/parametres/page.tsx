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
  const [homeHero, emploisHero] = await Promise.all([
    getParam("home_hero_image_url"),
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
          <HeroUpload
            cle="home_hero_image_url"
            label="Image hero — Page d'accueil"
            description="Recommandé : 1400 × 800 px (16:9), JPG ou WebP, max 8 Mo. S'affiche à droite du titre principal."
            ratio="16/9"
            currentUrl={homeHero}
          />
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
