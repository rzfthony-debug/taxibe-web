/** Strips dangerous HTML (scripts, iframes, event handlers, javascript: URIs). */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<\/?(iframe|object|embed|form|base)\b[^>]*>/gi, "")
    .replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|\S+)/gi, "")
    .replace(/(href|src|action)\s*=\s*["']?\s*javascript:[^"'\s>]*/gi, '$1="#"');
}

/** Extrait du texte brut lisible depuis du contenu potentiellement en HTML —
 *  pour les meta description / OG / JSON-LD, qui ne doivent jamais contenir
 *  de balises. Retire aussi un éventuel document complet collé par erreur
 *  (<!DOCTYPE>, <head>...) avant d'extraire le texte. */
export function stripHtml(html: string): string {
  const withoutHead = html.replace(/<head[^>]*>[\s\S]*?<\/head>/i, "");
  return withoutHead
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Safely serialises an object to JSON for use in a <script> tag, preventing </script> injection. */
export function safeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/<\/script>/gi, "<\\/script>");
}
