import Link from "next/link";

export type Crumb = { label: string; href?: string };

type Props = {
  items: Crumb[];
  variant?: "light" | "dark";
};

/** Fil d'ariane visible, partagé par toutes les pages — doit toujours
 *  refléter le même contenu que le BreadcrumbList JSON-LD de la page. */
export default function Breadcrumb({ items, variant = "light" }: Props) {
  const dim = variant === "dark" ? "rgba(255,255,255,0.4)" : "#64748B";
  const current = variant === "dark" ? "rgba(255,255,255,0.65)" : "#0D1525";
  const sep = variant === "dark" ? "rgba(255,255,255,0.2)" : "#CBD5E1";

  return (
    <nav aria-label="Fil d'ariane" style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {i > 0 && <span style={{ color: sep, fontSize: "0.75rem" }}>›</span>}
          {item.href ? (
            <Link href={item.href} style={{ fontSize: "0.78rem", fontWeight: 500, color: dim, textDecoration: "none" }}>
              {item.label}
            </Link>
          ) : (
            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: current }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
