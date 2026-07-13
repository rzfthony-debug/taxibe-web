import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaxiBe — Lignes de taxi-be à Antananarivo",
  description: "Trouvez votre ligne de taxi-be à Antananarivo. Recherche par numéro, par arrêt ou GPS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={poppins.variable}>
      <body style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
