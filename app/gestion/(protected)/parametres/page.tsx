import { adminDb } from "@/lib/supabase";
import HeroUpload from "./HeroUpload";
import ParamTextInput from "./ParamTextInput";

async function getParam(cle: string): Promise<string | null> {
  const { data } = await adminDb
    .from("parametres")
    .select("valeur")
    .eq("cle", cle)
    .single();
  return data?.valeur ?? null;
}

const HERO_DESC = "Recommandé : 1200 × 800 px (3:2), JPG ou WebP, max 8 Mo. S'affiche à droite du titre de la page.";

export default async function ParametresPage() {
  const [
    homeHero, homeHeroMobile, homeCtaPhone,
    emploisHero,
    telechargerHero, telechargerApercu,
    aproposHero, aideHero, legalHero,
    communauteHero, contactHero, entreprisesHero, blogHero,
    contactEmail, recrutementEmail, contactPhone,
    fbUrl, igUrl, liUrl,
  ] = await Promise.all([
    getParam("home_hero_image_url"),
    getParam("home_hero_image_mobile_url"),
    getParam("home_cta_phone_url"),
    getParam("emplois_hero_image_url"),
    getParam("telecharger_hero_image_url"),
    getParam("telecharger_apercu_image"),
    getParam("apropos_hero_image_url"),
    getParam("aide_hero_image_url"),
    getParam("legal_hero_image_url"),
    getParam("communaute_hero_image_url"),
    getParam("contact_hero_image_url"),
    getParam("entreprises_hero_image_url"),
    getParam("blog_hero_image_url"),
    getParam("contact_email"),
    getParam("recrutement_email"),
    getParam("contact_phone"),
    getParam("social_facebook_url"),
    getParam("social_instagram_url"),
    getParam("social_linkedin_url"),
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

        {/* ── Accueil ── */}
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
            <HeroUpload
              cle="home_cta_phone_url"
              label="Téléphone section CTA (fond jaune)"
              description="Recommandé : PNG avec fond transparent, portrait, ~320 × 580 px. Le téléphone déborde au-dessus et en dessous de la section."
              ratio="9/16"
              currentUrl={homeCtaPhone}
            />
          </div>
        </div>

        {/* ── Carrières ── */}
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8" }}>
            Page Carrières (/emplois)
          </p>
          <HeroUpload
            cle="emplois_hero_image_url"
            label="Image hero — Page Carrières"
            description={HERO_DESC}
            ratio="3/2"
            currentUrl={emploisHero}
          />
        </div>

        {/* ── Télécharger ── */}
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8" }}>
            Page Télécharger (/telecharger)
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <HeroUpload
              cle="telecharger_hero_image_url"
              label="Image hero — Page Télécharger"
              description={HERO_DESC}
              ratio="3/2"
              currentUrl={telechargerHero}
            />
            <HeroUpload
              cle="telecharger_apercu_image"
              label="Aperçu de l'application (section démo)"
              description="Une seule image qui remplace l'illustration. Recommandé : 820 × 480 px (paysage), PNG ou WebP, max 8 Mo."
              ratio="16/9"
              currentUrl={telechargerApercu}
            />
          </div>
        </div>

        {/* ── À propos ── */}
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8" }}>
            Page À propos (/a-propos)
          </p>
          <HeroUpload
            cle="apropos_hero_image_url"
            label="Image hero — Page À propos"
            description={HERO_DESC}
            ratio="3/2"
            currentUrl={aproposHero}
          />
        </div>

        {/* ── Aide ── */}
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8" }}>
            Page Aide (/aide)
          </p>
          <HeroUpload
            cle="aide_hero_image_url"
            label="Image hero — Page Aide"
            description={HERO_DESC}
            ratio="3/2"
            currentUrl={aideHero}
          />
        </div>

        {/* ── Légal ── */}
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8" }}>
            Page Légal (/legal)
          </p>
          <HeroUpload
            cle="legal_hero_image_url"
            label="Image hero — Page Légal"
            description={HERO_DESC}
            ratio="3/2"
            currentUrl={legalHero}
          />
        </div>

        {/* ── Communauté ── */}
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8" }}>
            Page Communauté (/communaute)
          </p>
          <HeroUpload
            cle="communaute_hero_image_url"
            label="Image hero — Page Communauté"
            description={HERO_DESC}
            ratio="3/2"
            currentUrl={communauteHero}
          />
        </div>

        {/* ── Contact ── */}
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8" }}>
            Page Contact (/contact)
          </p>
          <HeroUpload
            cle="contact_hero_image_url"
            label="Image hero — Page Contact"
            description={HERO_DESC}
            ratio="3/2"
            currentUrl={contactHero}
          />
        </div>

        {/* ── Entreprises ── */}
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8" }}>
            Page Entreprises (/entreprises)
          </p>
          <HeroUpload
            cle="entreprises_hero_image_url"
            label="Image hero — Page Entreprises"
            description={HERO_DESC}
            ratio="3/2"
            currentUrl={entreprisesHero}
          />
        </div>

        {/* ── Blog ── */}
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8" }}>
            Page Blog (/blog)
          </p>
          <HeroUpload
            cle="blog_hero_image_url"
            label="Image hero — Page Blog"
            description={HERO_DESC}
            ratio="3/2"
            currentUrl={blogHero}
          />
        </div>

        {/* ── Coordonnées & Réseaux sociaux ── */}
        <div>
          <p style={{ margin: "0 0 10px", fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8" }}>
            Coordonnées &amp; Réseaux sociaux
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <ParamTextInput
              cle="contact_phone"
              label="Numéro de téléphone"
              description="Affiché sur la page Contact et dans le footer. Ex : +261 20 22 xxx xx"
              placeholder="+261 20 22 xxx xx"
              type="tel"
              currentValue={contactPhone}
            />
            <ParamTextInput
              cle="contact_email"
              label="Adresse e-mail de contact"
              description="Affichée sur la page Contact et dans le footer. Ex : contact@taxibe.mg"
              placeholder="contact@taxibe.mg"
              type="email"
              currentValue={contactEmail}
            />
            <ParamTextInput
              cle="recrutement_email"
              label="Adresse e-mail recrutement"
              description="Utilisée dans les offres d'emploi (liens mailto). Ex : recrutement@taxibe.mg"
              placeholder="recrutement@taxibe.mg"
              type="email"
              currentValue={recrutementEmail}
            />
            <ParamTextInput
              cle="social_facebook_url"
              label="Lien Facebook"
              description="URL complète de la page Facebook. Ex : https://facebook.com/taxibe"
              placeholder="https://facebook.com/taxibe"
              currentValue={fbUrl}
            />
            <ParamTextInput
              cle="social_instagram_url"
              label="Lien Instagram"
              description="URL complète du profil Instagram. Ex : https://instagram.com/taxibe"
              placeholder="https://instagram.com/taxibe"
              currentValue={igUrl}
            />
            <ParamTextInput
              cle="social_linkedin_url"
              label="Lien LinkedIn"
              description="URL complète de la page LinkedIn. Ex : https://linkedin.com/company/taxibe"
              placeholder="https://linkedin.com/company/taxibe"
              currentValue={liUrl}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
