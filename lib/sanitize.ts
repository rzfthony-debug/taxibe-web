/** Strips dangerous HTML (scripts, iframes, event handlers, javascript: URIs). */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<\/?(iframe|object|embed|form|base)\b[^>]*>/gi, "")
    .replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|\S+)/gi, "")
    .replace(/(href|src|action)\s*=\s*["']?\s*javascript:[^"'\s>]*/gi, '$1="#"');
}

/** Safely serialises an object to JSON for use in a <script> tag, preventing </script> injection. */
export function safeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/<\/script>/gi, "<\\/script>");
}
