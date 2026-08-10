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
