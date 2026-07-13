import { adminDb } from "@/lib/supabase";
import { updateSpotlight } from "@/app/admin/actions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditSpotlightPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: s } = await adminDb.from("spotlight").select("*").eq("id", id).single();
  if (!s) notFound();

  const action = updateSpotlight.bind(null, id);

  return (
    <div style={{ padding: "32px 36px", maxWidth: 760 }}>
      <div className="page-header">
        <h1 className="page-title">Modifier le spotlight</h1>
        <Link href="/admin/spotlight">
          <button className="btn-sm btn-gray">← Retour</button>
        </Link>
      </div>

      <div className="card" style={{ padding: "28px 32px" }}>
        <form action={action} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label>URL de l&apos;image *</label>
            <input name="image_url" type="url" defaultValue={s.image_url} required />
            {s.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.image_url} alt="" style={{ marginTop: 8, height: 100, borderRadius: 8, objectFit: "cover" }} />
            )}
          </div>
          <div>
            <label>Titre *</label>
            <input name="titre" type="text" defaultValue={s.titre} required />
          </div>
          <div>
            <label>Sous-titre</label>
            <input name="sous_titre" type="text" defaultValue={s.sous_titre ?? ""} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label>Texte du bouton (CTA)</label>
              <input name="cta_label" type="text" defaultValue={s.cta_label ?? ""} />
            </div>
            <div>
              <label>URL du bouton</label>
              <input name="cta_url" type="url" defaultValue={s.cta_url ?? ""} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label>Statut</label>
              <select name="publie" defaultValue={s.publie ? "true" : "false"}>
                <option value="true">Actif</option>
                <option value="false">Inactif</option>
              </select>
            </div>
            <div>
              <label>Ordre</label>
              <input name="ordre" type="number" defaultValue={s.ordre ?? 0} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
            <button type="submit" className="btn-yellow">Enregistrer →</button>
            <Link href="/admin/spotlight">
              <button type="button" className="btn-sm btn-gray" style={{ padding: "10px 18px" }}>Annuler</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
