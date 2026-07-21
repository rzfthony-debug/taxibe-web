import { getSignalements, updateStatutSignalement, deleteSignalement } from "@/app/gestion/actions";

const HIDDEN_KEYS = new Set(["id", "created_at", "statut"]);

function humanize(key: string) {
  return key.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());
}

function formatValue(v: unknown): string {
  if (v === null || v === undefined || v === "") return "—";
  if (typeof v === "boolean") return v ? "Oui" : "Non";
  return String(v);
}

const STATUT_BADGES: Record<string, string> = {
  en_attente: "badge-orange",
  traite: "badge-green",
  resolu: "badge-green",
  rejete: "badge-red",
  archive: "badge-gray",
};

export default async function SignalementsAdminPage() {
  const signalements = await getSignalements();
  const enAttente = signalements.filter((s: Record<string, unknown>) => s.statut === "en_attente");

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Signalements</h1>
        <span style={{ fontSize: "0.82rem", color: "#64748B" }}>
          {signalements.length} signalement{signalements.length > 1 ? "s" : ""} &middot; {enAttente.length} en attente
        </span>
      </div>

      <p style={{ fontSize: "0.78rem", color: "#94A3B8", margin: "0 0 18px", maxWidth: 640, lineHeight: 1.6 }}>
        Ces signalements proviennent de l&apos;application mobile. Le champ statut est modifiable librement
        (ex : traite, resolu, rejete) selon la convention utilisée par l&apos;application.
      </p>

      {signalements.length === 0 && (
        <div className="card" style={{ padding: 40, textAlign: "center", color: "#94A3B8" }}>
          Aucun signalement pour l&apos;instant.
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {signalements.map((s: Record<string, unknown>) => {
          const id = String(s.id ?? "");
          const statut = typeof s.statut === "string" ? s.statut : null;
          const createdAt = typeof s.created_at === "string" ? s.created_at : null;
          const autresChamps = Object.entries(s).filter(([k]) => !HIDDEN_KEYS.has(k));

          return (
            <div key={id} className="card" style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  {statut && (
                    <span className={`badge ${STATUT_BADGES[statut] ?? "badge-gray"}`}>{statut}</span>
                  )}
                  {createdAt && (
                    <span style={{ fontSize: "0.78rem", color: "#94A3B8" }}>
                      {new Date(createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  )}
                </div>
                <form action={deleteSignalement.bind(null, id)}>
                  <button type="submit" className="btn-sm btn-red">Supprimer</button>
                </form>
              </div>

              <div style={{
                display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "6px 24px", marginBottom: 14,
              }}>
                {autresChamps.map(([k, v]) => (
                  <div key={k}>
                    <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      {humanize(k)}
                    </span>
                    <p style={{ margin: "2px 0 0", fontSize: "0.85rem", color: "#0D1525", wordBreak: "break-word" }}>
                      {formatValue(v)}
                    </p>
                  </div>
                ))}
              </div>

              <StatutForm id={id} defaultValue={statut ?? ""} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatutForm({ id, defaultValue }: { id: string; defaultValue: string }) {
  async function action(formData: FormData) {
    "use server";
    const statut = (formData.get("statut") as string) ?? "";
    await updateStatutSignalement(id, statut);
  }

  return (
    <form action={action} style={{ display: "flex", gap: 8, alignItems: "center", maxWidth: 360 }}>
      <input type="text" name="statut" defaultValue={defaultValue} placeholder="ex: traite, rejete…" style={{ margin: 0 }} />
      <button type="submit" className="btn-sm btn-dark" style={{ flexShrink: 0 }}>Mettre à jour</button>
    </form>
  );
}
