import { adminDb } from "./supabase";

export interface LigneResult {
  id: string;
  slug: string | null;
  numero: string;
  cooperative: string | null;
  couleur_bus: string | null;
  type_circuit: string | null;
  terminus_debut: string;
  terminus_fin: string;
  nb_arrets: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function withTerminus(lignes: any[]): Promise<LigneResult[]> {
  if (!lignes.length) return [];
  const ids = lignes.map((l) => l.id);

  const { data: arrets } = await adminDb
    .from("ligne_arrets")
    .select("ligne_id, direction, position, arret")
    .in("ligne_id", ids)
    .in("direction", ["aller", "unique"])
    .order("position", { ascending: true });

  const arretsMap = new Map<string, { arret: string; position: number }[]>();
  for (const a of arrets ?? []) {
    const list = arretsMap.get(a.ligne_id) ?? [];
    list.push({ arret: a.arret, position: a.position });
    arretsMap.set(a.ligne_id, list);
  }

  return lignes.map((l) => {
    const stops = (arretsMap.get(l.id) ?? []).sort((a: { position: number }, b: { position: number }) => a.position - b.position);
    return {
      id: l.id,
      slug: l.slug ?? null,
      numero: l.numero,
      cooperative: l.cooperative ?? null,
      couleur_bus: l.couleur_bus ?? null,
      type_circuit: l.type_circuit ?? null,
      terminus_debut: stops[0]?.arret ?? "—",
      terminus_fin: stops[stops.length - 1]?.arret ?? "—",
      nb_arrets: stops.length,
    };
  });
}

export async function searchLignesByNumero(query: string): Promise<LigneResult[]> {
  if (!query.trim()) return [];

  const { data: lignes } = await adminDb
    .from("lignes")
    .select("*")
    .eq("actif", true)
    .ilike("numero", `${query.trim()}%`)
    .order("numero")
    .limit(20);

  if (!lignes?.length) return [];
  return withTerminus(lignes);
}

export interface ArretItem {
  id: string;
  arret: string;
  denomination: string | null;
  position: number;
  direction: string;
  lat: number | null;
  lng: number | null;
}

export interface LigneDetail {
  id: string;
  slug: string | null;
  numero: string;
  cooperative: string | null;
  telephone: string | null;
  couleur_bus: string | null;
  type_circuit: string | null;
  statut: string | null;
  terminus_debut: string;
  terminus_fin: string;
  arrets: ArretItem[];
  retourArrets: ArretItem[];
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function getLigneBySlugOrId(slugOrId: string): Promise<LigneDetail | null> {
  const isUuid = UUID_RE.test(slugOrId);
  const { data: ligne } = await adminDb
    .from("lignes")
    .select("*")
    .eq(isUuid ? "id" : "slug", slugOrId)
    .single();

  if (!ligne) return null;

  const { data: la } = await adminDb
    .from("ligne_arrets")
    .select("id, ligne_id, direction, position, arret, denomination, lat, lng")
    .eq("ligne_id", ligne.id)
    .order("direction")
    .order("position");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allArrets: ArretItem[] = (la ?? []) as any[];
  const allerArrets = allArrets.filter((a) => a.direction === "aller" || a.direction === "unique");
  const retourArrets = allArrets.filter((a) => a.direction === "retour");

  return {
    id: ligne.id,
    slug: ligne.slug ?? null,
    numero: ligne.numero,
    cooperative: ligne.cooperative ?? null,
    telephone: ligne.telephone ?? null,
    couleur_bus: ligne.couleur_bus ?? null,
    type_circuit: ligne.type_circuit ?? null,
    statut: ligne.statut ?? null,
    terminus_debut: allerArrets[0]?.arret ?? "—",
    terminus_fin: allerArrets[allerArrets.length - 1]?.arret ?? "—",
    arrets: allerArrets,
    retourArrets,
  };
}

/** @deprecated use getLigneBySlugOrId */
export const getLigneById = getLigneBySlugOrId;

export async function searchLignesByQuartier(quartier: string): Promise<LigneResult[]> {
  if (!quartier.trim()) return [];

  const { data: la } = await adminDb
    .from("ligne_arrets")
    .select("ligne_id")
    .ilike("arret", `%${quartier.trim()}%`);

  if (!la?.length) return [];
  const ligneIds = [...new Set(la.map((r: { ligne_id: string }) => r.ligne_id))];

  const { data: lignes } = await adminDb
    .from("lignes")
    .select("*")
    .eq("actif", true)
    .in("id", ligneIds)
    .order("numero");

  if (!lignes?.length) return [];
  return withTerminus(lignes);
}
