-- Ajoute un vrai titre court, distinct du texte/résumé (qui servait jusqu'ici
-- à la fois de titre affiché et de description). Les articles existants n'ont
-- pas de titre : le code utilise `texte` comme repli tant qu'ils ne sont pas
-- réenregistrés avec un titre.
-- A executer une fois dans l'editeur SQL de Supabase (Dashboard > SQL Editor).

alter table public.actualites
  add column if not exists titre text;
