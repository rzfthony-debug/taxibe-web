-- Table unique qui recoit tous les messages envoyes depuis le site public :
-- contact general, signalement d'erreur, candidature contributeur, demande publicite, demande partenariat.
-- A executer une fois dans l'editeur SQL de Supabase (Dashboard > SQL Editor).

create table if not exists public.messages_contact (
  id uuid primary key default gen_random_uuid(),
  categorie text not null check (categorie in ('contact', 'erreur', 'contribution', 'publicite', 'partenariat')),
  nom text not null,
  email text not null,
  telephone text,
  sujet text,
  message text not null,
  ligne_numero text,
  statut text not null default 'nouveau' check (statut in ('nouveau', 'traite', 'archive')),
  created_at timestamptz not null default now()
);

create index if not exists messages_contact_categorie_idx on public.messages_contact (categorie);
create index if not exists messages_contact_statut_idx on public.messages_contact (statut);
create index if not exists messages_contact_created_at_idx on public.messages_contact (created_at desc);

-- RLS activee, aucune policy publique : toutes les ecritures et lectures passent
-- par les server actions Next.js (cle service role), jamais depuis le navigateur.
alter table public.messages_contact enable row level security;
