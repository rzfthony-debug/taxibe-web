import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { articleTitle, articleDescription } from "@/lib/article";

const BASE = "https://taxibe.mg";

export const revalidate = 3600;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const { data: articles } = await supabase
    .from("actualites")
    .select("id, slug, titre, texte, contenu, created_at, updated_at")
    .eq("publie", true)
    .order("created_at", { ascending: false })
    .limit(30);

  const items = (articles ?? [])
    .map((a) => {
      const url = `${BASE}/blog/${a.slug || a.id}`;
      const title = articleTitle(a);
      const desc = articleDescription(a);
      return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(a.created_at).toUTCString()}</pubDate>
      <description>${escapeXml(desc)}</description>
    </item>`;
    })
    .join("\n");

  const lastBuildDate = articles?.[0]
    ? new Date(articles[0].updated_at ?? articles[0].created_at).toUTCString()
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TaxiBe — Blog</title>
    <link>${BASE}/blog</link>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Actualités, conseils et nouveautés sur TaxiBe et les transports en commun à Antananarivo.</description>
    <language>fr-MG</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
