import { createActualite } from "@/app/gestion/actions";
import Link from "next/link";
import ArticleForm from "../ArticleForm";

export default function NouvelArticlePage() {
  return (
    <div style={{ padding: "32px 36px", maxWidth: 1180 }}>
      <div className="page-header">
        <h1 className="page-title">Nouvel article</h1>
        <Link href="/gestion/actualites">
          <button className="btn-sm btn-gray">Retour</button>
        </Link>
      </div>

      <ArticleForm
        action={createActualite}
        backHref="/gestion/actualites"
        submitLabel="Créer l'article →"
      />
    </div>
  );
}
