import { stripHtml } from "@/lib/sanitize";

/** Le titre affiché d'un article — `titre` s'il a été renseigné, sinon
 *  `texte` par compatibilité avec les articles créés avant l'ajout de ce
 *  champ (où `texte` faisait à la fois office de titre et de résumé). */
export function articleTitle(a: { titre?: string | null; texte: string }): string {
  return a.titre || a.texte;
}

/** La description utilisée pour les meta tags / OG / JSON-LD — toujours du
 *  texte brut, jamais le HTML de `contenu` tel quel (qui peut contenir des
 *  balises, voire un document collé par erreur). */
export function articleDescription(a: { texte: string; contenu?: string | null }, maxLength = 160): string {
  const fromTexte = a.texte?.trim();
  if (fromTexte) return fromTexte.slice(0, maxLength);
  const fromContenu = a.contenu ? stripHtml(a.contenu) : "";
  return fromContenu.slice(0, maxLength) || "TaxiBe — trouvez votre ligne de taxi-be à Antananarivo.";
}

/** Si on a collé un document HTML complet (<!DOCTYPE>, <html>, <head>...)
 *  au lieu du seul contenu de l'article, n'en garde que l'intérieur du
 *  <body> — sinon le <title>/<meta> du document collé se mêle à la page. */
export function stripDocumentWrapper(contenu: string): string {
  if (!/<!DOCTYPE\s+html|<html[\s>]/i.test(contenu)) return contenu;
  const bodyMatch = contenu.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) return bodyMatch[1];
  return contenu.replace(/<head[^>]*>[\s\S]*?<\/head>/i, "");
}

/** Convertit les retours à la ligne en <br/> pour les articles en texte brut.
 *  Si le contenu contient déjà des balises de bloc (article rédigé/collé en
 *  HTML), on n'y touche pas — sinon chaque saut de ligne entre deux balises
 *  s'ajoute à leur marge et double les espacements. */
export function renderContenu(contenu: string): string {
  const cleaned = stripDocumentWrapper(contenu);
  const hasBlockTags = /<(p|div|h[1-6]|ul|ol|li|blockquote|section|article|table)[\s>]/i.test(cleaned);
  return hasBlockTags ? cleaned : cleaned.replace(/\n/g, "<br/>");
}

/** Les styles typographiques de `.article-body` (page publique) — utilisés
 *  aussi par l'éditeur riche et l'aperçu admin pour un rendu fidèle. */
export const ARTICLE_BODY_CSS = `
  .article-body   { font-size: 1rem; color: #374151; line-height: 1.8; }
  .article-body p { margin: 0 0 1.4em; }
  .article-body h2 { font-size: 1.35rem; font-weight: 800; color: #0D1525; margin: 2em 0 0.8em; }
  .article-body h3 { font-size: 1.1rem; font-weight: 700; color: #0D1525; margin: 1.8em 0 0.6em; }
  .article-body ul, .article-body ol { padding-left: 1.5em; margin: 0 0 1.4em; }
  .article-body li { margin-bottom: 0.4em; }
  .article-body a  { color: #FFB800; font-weight: 600; }
  .article-body blockquote { border-left: 4px solid #FFB800; margin: 1.5em 0; padding: 12px 20px; background: #FFFBEB; border-radius: 0 8px 8px 0; font-style: italic; color: #64748B; }
`;
