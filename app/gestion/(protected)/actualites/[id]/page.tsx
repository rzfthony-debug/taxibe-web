import { adminDb } from "@/lib/supabase";
import { updateActualite } from "@/app/gestion/actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleForm from "../ArticleForm";

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
    <div style={{ padding: "32px 36px", maxWidth: 1180 }}>
      <div className="page-header">
        <h1 className="page-title">Modifier l&apos;article</h1>
        <Link href="/gestion/actualites">
          <button className="btn-sm btn-gray">← Retour</button>
        </Link>
      </div>

      <ArticleForm
        action={action}
        backHref="/gestion/actualites"
        submitLabel="Enregistrer →"
        defaultImageUrl={a.image_url}
        defaultTexte={a.texte}
        defaultContenu={a.contenu ?? ""}
        defaultLien={a.lien ?? ""}
        defaultVideoUrl={a.video_url ?? ""}
        defaultPublie={a.publie}
        defaultOrdre={a.ordre ?? 0}
      />
    </div>
  );
}
