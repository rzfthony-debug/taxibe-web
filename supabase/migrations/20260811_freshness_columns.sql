-- Ajoute un vrai suivi de date de modification pour actualites et offres_emploi
-- (lignes en a déjà un). Utilisé pour dateModified (structured data) et
-- lastModified (sitemap.xml), qui utilisaient created_at à tort jusqu'ici.
-- A executer une fois dans l'editeur SQL de Supabase (Dashboard > SQL Editor).

alter table public.actualites add column if not exists updated_at timestamptz;
update public.actualites set updated_at = created_at where updated_at is null;
alter table public.actualites alter column updated_at set default now();
alter table public.actualites alter column updated_at set not null;

alter table public.offres_emploi add column if not exists updated_at timestamptz;
update public.offres_emploi set updated_at = created_at where updated_at is null;
alter table public.offres_emploi alter column updated_at set default now();
alter table public.offres_emploi alter column updated_at set not null;
