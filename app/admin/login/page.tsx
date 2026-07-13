import { loginAdmin } from "@/app/admin/actions";

export default function LoginPage() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#F1F5F9",
    }}>
      <div style={{
        background: "white", borderRadius: 16, padding: "40px 36px",
        width: "100%", maxWidth: 400,
        boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
        border: "1px solid #E2E8F0",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 56, height: 56, borderRadius: 14,
            background: "#0D1525", marginBottom: 16,
          }}>
            <span style={{ color: "#FFB800", fontWeight: 900, fontSize: "1.3rem" }}>TB</span>
          </div>
          <h1 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#0D1525", margin: "0 0 4px" }}>
            TaxiBe Admin
          </h1>
          <p style={{ fontSize: "0.8rem", color: "#94A3B8", margin: 0 }}>
            Panneau d&apos;administration
          </p>
        </div>

        <form action={loginAdmin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{
              display: "block", fontSize: "0.72rem", fontWeight: 700,
              color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em",
              marginBottom: 6,
            }}>
              Clé d&apos;accès admin
            </label>
            <input
              name="cle"
              type="password"
              placeholder="betax-admin-..."
              required
              autoFocus
              style={{
                width: "100%", padding: "11px 14px", borderRadius: 10,
                border: "1.5px solid #E2E8F0", fontSize: "0.9rem",
                outline: "none", color: "#0D1525", boxSizing: "border-box",
                fontFamily: "monospace", letterSpacing: "0.06em",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "12px", borderRadius: 10, border: "none",
              background: "#FFB800", color: "#0D1525",
              fontWeight: 800, fontSize: "0.9375rem", cursor: "pointer",
              marginTop: 4,
            }}
          >
            Se connecter →
          </button>
        </form>
      </div>
    </div>
  );
}
