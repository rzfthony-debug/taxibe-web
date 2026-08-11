import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const BASE = "https://taxibe.mg";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, emplois, lignes] = await Promise.all([
    supabase.from("actualites").select("id, slug, image_url, created_at, updated_at").eq("publie", true),
    supabase.from("offres_emploi").select("id, slug, created_at, updated_at").eq("statut", "publie").eq("interne", true),
    supabase.from("lignes").select("id, slug, photo_url, created_at, updated_at").eq("actif", true),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    // ── Priorité haute ──
    { url: BASE,                      lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/telecharger`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/le-projet`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/recherche`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/blog`,            lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/emplois`,         lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    // ── Priorité moyenne ──
    { url: `${BASE}/partenaires`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/aide`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/a-propos`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/communaute`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    // ── Priorité basse ──
    { url: `${BASE}/legal`,           lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  const articlePages: MetadataRoute.Sitemap = (articles.data ?? []).map((a) => ({
    url: `${BASE}/blog/${a.slug || a.id}`,
    lastModified: new Date(a.updated_at ?? a.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    ...(a.image_url && { images: [a.image_url] }),
  }));

  const emploiPages: MetadataRoute.Sitemap = (emplois.data ?? []).map((e) => ({
    url: `${BASE}/emplois/${e.slug || e.id}`,
    lastModified: new Date(e.updated_at ?? e.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const lignePages: MetadataRoute.Sitemap = (lignes.data ?? []).map((l) => ({
    url: `${BASE}/ligne/${l.slug || l.id}`,
    lastModified: new Date(l.updated_at ?? l.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    ...(l.photo_url && { images: [l.photo_url] }),
  }));

  return [...staticPages, ...articlePages, ...emploiPages, ...lignePages];
}
