import Image from "next/image";
import { loginAdmin } from "@/app/admin/actions";

export const metadata = { title: "Connexion — TaxiBe Admin" };

const ERROR_MESSAGES: Record<string, string> = {
  required: "Veuillez saisir votre clé d'accès.",
  invalid: "Clé invalide ou compte désactivé.",
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
      background: "#0D1525",
      fontFamily: "var(--font-poppins), system-ui, sans-serif",
    }}>
      <div style={{
        background: "white", borderRadius: 20, padding: "44px 40px",
        width: "100%", maxWidth: 380,
        boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Image
            src="/logo_taxibe_vertcal.png"
            alt="TaxiBe"
            width={360}
            height={180}
            style={{ height: 48, width: "auto", objectFit: "contain" }}
            priority
          />
          <p style={{ fontSize: "0.78rem", color: "#94A3B8", margin: "14px 0 0", fontWeight: 500 }}>
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
              Clé d&apos;accès
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
                letterSpacing: "0.12em",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "13px", borderRadius: 10, border: "none",
              background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "0.9375rem", cursor: "pointer",
              letterSpacing: "-0.01em",
            }}
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
