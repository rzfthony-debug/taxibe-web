import { adminDb } from "./supabase";

export interface LigneResult {
  id: string;
  numero: string;
  cooperative: string | null;
  couleur_bus: string | null;
  type_circuit: string;
  terminus_debut: string;
  terminus_fin: string;
  nb_arrets: number;
}

export async function searchLignesByNumero(query: string): Promise<LigneResult[]> {
  if (!query.trim()) return [];

  const { data: lignes } = await adminDb
    .from("lignes")
    .select("id, numero, cooperative, couleur_bus, type_circuit")
    .eq("actif", true)
    .ilike("numero", `%${query.trim()}%`)
    .order("numero")
    .limit(20);

  if (!lignes || lignes.length === 0) return [];

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
    const stops = (arretsMap.get(l.id) ?? []).sort((a, b) => a.position - b.position);
    return {
      id: l.id,
      numero: l.numero,
      cooperative: l.cooperative,
      couleur_bus: l.couleur_bus,
      type_circuit: l.type_circuit,
      terminus_debut: stops[0]?.arret ?? "—",
      terminus_fin: stops[stops.length - 1]?.arret ?? "—",
      nb_arrets: stops.length,
    };
  });
}
