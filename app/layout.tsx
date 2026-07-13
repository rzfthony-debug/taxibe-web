import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaxiBe — Lignes de taxi-be à Antananarivo",
  description: "Trouvez facilement vos lignes de taxi-be à Antananarivo avec TaxiBe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
