import { adminDb } from "@/lib/supabase";
import { updateLigne } from "@/app/gestion/actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArretEditor from "./ArretEditor";

export default async function EditLignePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [{ data: l }, { data: la }] = await Promise.all([
    adminDb.from("lignes").select("*").eq("id", id).single(),
    adminDb
      .from("ligne_arrets")
      .select("arret, denomination, position, direction, lat, lng")
      .eq("ligne_id", id)
      .order("direction")
      .order("position"),
  ]);

  if (!l) notFound();

  const action = updateLigne.bind(null, id);
  const isAllerRetour = l.type_circuit === "aller_retour";
  const color = l.couleur_bus ?? "#FFB800";

  const allerArrets = (la ?? [])
    .filter((a: { direction: string }) => a.direction === "aller" || a.direction === "unique")
    .map((a: { arret: string; denomination: string | null; lat: number | null; lng: number | null }) => ({
      arret: a.arret,
      denomination: a.denomination ?? "",
      lat: a.lat ?? null,
      lng: a.lng ?? null,
    }));

  const retourArrets = (la ?? [])
    .filter((a: { direction: string }) => a.direction === "retour")
    .map((a: { arret: string; denomination: string | null; lat: number | null; lng: number | null }) => ({
      arret: a.arret,
      denomination: a.denomination ?? "",
      lat: a.lat ?? null,
      lng: a.lng ?? null,
    }));

  return (
    <div style={{ padding: "32px 36px" }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Ligne {l.numero}</h1>
          <p style={{ margin: "4px 0 0", fontSize: "0.82rem", color: "#94A3B8" }}>
            {l.cooperative ?? "Sans coopérative"} · <a href={`/ligne/${l.slug ?? l.id}`} target="_blank" style={{ color: "#FFB800" }}>Voir la fiche →</a>
          </p>
        </div>
        <Link href="/gestion/lignes">
          <button className="btn-sm btn-gray">← Retour</button>
        </Link>
      </div>

      {/* ── Infos ligne ── */}
      <div className="card" style={{ padding: "24px 28px", marginBottom: 28 }}>
        <p style={{ margin: "0 0 18px", fontSize: "0.7rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748B" }}>
          Informations de la ligne
        </p>
        <form action={action} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <label>Numéro *</label>
              <input name="numero" type="text" defaultValue={l.numero} required maxLength={20} />
            </div>
            <div>
              <label>Slug URL *</label>
              <input name="slug" type="text" defaultValue={l.slug ?? ""} required maxLength={100} />
            </div>
            <div>
              <label>Couleur du bus</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  name="couleur_bus"
                  type="color"
                  defaultValue={color}
                  style={{ width: 44, height: 36, padding: 2, borderRadius: 8, border: "1px solid #E2E8F0", cursor: "pointer" }}
                />
                <span style={{ fontSize: "0.75rem", color: "#64748B" }}>{color}</span>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label>Coopérative</label>
              <input name="cooperative" type="text" defaultValue={l.cooperative ?? ""} maxLength={200} />
            </div>
            <div>
              <label>Téléphone</label>
              <input name="telephone" type="text" defaultValue={l.telephone ?? ""} maxLength={50} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <label>Type de circuit</label>
              <select name="type_circuit" defaultValue={l.type_circuit ?? "aller_retour"}>
                <option value="aller_retour">Aller-retour</option>
                <option value="aller_simple">Aller simple</option>
                <option value="unique">Unique</option>
              </select>
            </div>
            <div>
              <label>Statut</label>
              <select name="statut" defaultValue={l.statut ?? "a_verifier"}>
                <option value="verifie">Vérifié</option>
                <option value="a_verifier">À vérifier</option>
                <option value="obsolete">Obsolète</option>
              </select>
            </div>
            <div>
              <label>Visible</label>
              <select name="actif" defaultValue={l.actif !== false ? "true" : "false"}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <button type="submit" className="btn-yellow" style={{ fontSize: "0.85rem" }}>
              Enregistrer les infos →
            </button>
          </div>
        </form>
      </div>

      {/* ── Arrêts ── */}
      <div className="card" style={{ padding: "24px 28px" }}>
        <p style={{ margin: "0 0 18px", fontSize: "0.7rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748B" }}>
          Arrêts &amp; coordonnées
        </p>
        <ArretEditor
          ligneId={id}
          allerArrets={allerArrets}
          retourArrets={retourArrets}
          isAllerRetour={isAllerRetour}
          color={color}
        />
      </div>
    </div>
  );
}
