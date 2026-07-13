import { adminDb } from "@/lib/supabase";
import { updateActualite } from "@/app/gestion/actions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: a } = await adminDb
    .from("actualites")
    .select("*")
    .eq("id", id)
    .single();

  if (!a) notFound();

  const action = updateActualite.bind(null, id);

  return (
    <div style={{ padding: "32px 36px", maxWidth: 760 }}>
      <div className="page-header">
        <h1 className="page-title">Modifier l&apos;article</h1>
        <Link href="/gestion/actualites">
          <button className="btn-sm btn-gray">← Retour</button>
        </Link>
      </div>

      <div className="card" style={{ padding: "28px 32px" }}>
        <form action={action} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label>URL de l&apos;image principale *</label>
            <input name="image_url" type="url" defaultValue={a.image_url} required />
            {a.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={a.image_url} alt="" style={{ marginTop: 8, height: 120, borderRadius: 8, objectFit: "cover" }} />
            )}
          </div>
          <div>
            <label>Texte / Résumé *</label>
            <textarea name="texte" rows={2} defaultValue={a.texte} required style={{ resize: "vertical" }} />
          </div>
          <div>
            <label>Contenu complet</label>
            <textarea name="contenu" rows={6} defaultValue={a.contenu ?? ""} style={{ resize: "vertical" }} />
          </div>
          <div>
            <label>Lien externe (optionnel)</label>
            <input name="lien" type="url" defaultValue={a.lien ?? ""} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label>Statut</label>
              <select name="publie" defaultValue={a.publie ? "true" : "false"}>
                <option value="true">Publié</option>
                <option value="false">Brouillon</option>
              </select>
            </div>
            <div>
              <label>Ordre d&apos;affichage</label>
              <input name="ordre" type="number" defaultValue={a.ordre ?? 0} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
            <button type="submit" className="btn-yellow">Enregistrer →</button>
            <Link href="/gestion/actualites">
              <button type="button" className="btn-sm btn-gray" style={{ padding: "10px 18px" }}>Annuler</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
