/** Le titre affiché d'un article — `titre` s'il a été renseigné, sinon
 *  `texte` par compatibilité avec les articles créés avant l'ajout de ce
 *  champ (où `texte` faisait à la fois office de titre et de résumé). */
export function articleTitle(a: { titre?: string | null; texte: string }): string {
  return a.titre || a.texte;
}
