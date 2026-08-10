-- Ajoute un lien vidéo optionnel aux actualités (YouTube, Vimeo ou fichier .mp4 direct).
-- A executer une fois dans l'editeur SQL de Supabase (Dashboard > SQL Editor).

alter table public.actualites
  add column if not exists video_url text;
