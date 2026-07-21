import Image from "next/image";
import { loginAdmin } from "@/app/gestion/actions";

export const metadata = { title: "Connexion — TaxiBe Admin" };

const ERROR_MESSAGES: Record<string, string> = {
  required: "Veuillez saisir votre cle d'acces.",
  invalid: "Cle invalide ou compte desactive.",
  blocked: "Trop de tentatives. Acces bloque 15 minutes.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const errorMsg = error ? (ERROR_MESSAGES[error] ?? "Erreur inconnue.") : null;

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#F1F5F9",
      fontFamily: "var(--font-inter), system-ui, sans-serif",
    }}>
      <div style={{
        background: "white", borderRadius: 20, padding: "44px 40px",
        width: "100%", maxWidth: 380,
        boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
        border: "1px solid #E2E8F0",
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 36 }}>
          <Image
            src="/logo_taxibe_vertcal.png"
            alt="TaxiBe"
            width={360}
            height={180}
            style={{ height: 52, width: "auto", objectFit: "contain" }}
            priority
          />
          <p style={{
            fontSize: "0.78rem", color: "#64748B", margin: "12px 0 0",
            fontWeight: 500, textAlign: "center",
          }}>
            Espace administrateur
          </p>
        </div>

        {errorMsg && (
          <div style={{
            background: "#fee2e2", color: "#dc2626", borderRadius: 8,
            padding: "10px 14px", fontSize: "0.85rem", marginBottom: 20,
            fontWeight: 600,
          }}>
            {errorMsg}
          </div>
        )}

        <form action={loginAdmin} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <label style={{
              display: "block", fontSize: "0.7rem", fontWeight: 700,
              color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em",
              marginBottom: 7,
            }}>
              Cle d&apos;acces
            </label>
            <input
              name="cle"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              style={{
                width: "100%", padding: "12px 14px", borderRadius: 10,
                border: "1.5px solid #E2E8F0", fontSize: "1rem",
                outline: "none", color: "#0D1525", boxSizing: "border-box",
                letterSpacing: "0.12em", fontFamily: "inherit",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "13px", borderRadius: 10, border: "none",
              background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "0.9375rem", cursor: "pointer",
              letterSpacing: "-0.01em", fontFamily: "inherit",
            }}
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
