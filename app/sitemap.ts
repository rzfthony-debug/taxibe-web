import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const BASE = "https://taxibemada.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, emplois] = await Promise.all([
    supabase.from("actualites").select("id, slug, created_at").eq("publie", true),
    supabase.from("offres_emploi").select("id, slug, created_at").eq("statut", "publie").eq("interne", true),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                      lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/telecharger`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/blog`,            lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/emplois`,         lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE}/recherche`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/a-propos`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/entreprises`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/communaute`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/faq`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/aide`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/legal`,           lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
  ];

  const articlePages: MetadataRoute.Sitemap = (articles.data ?? []).map((a) => ({
    url: `${BASE}/blog/${a.slug || a.id}`,
    lastModified: new Date(a.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const emploiPages: MetadataRoute.Sitemap = (emplois.data ?? []).map((e) => ({
    url: `${BASE}/emplois/${e.slug || e.id}`,
    lastModified: new Date(e.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages, ...emploiPages];
}

