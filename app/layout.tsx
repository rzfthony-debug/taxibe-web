import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/app/components/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://taxibemada.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "TaxiBe — Lignes de taxi-be à Antananarivo",
    template: "%s — TaxiBe",
  },
  description:
    "Trouvez votre ligne de taxi-be à Antananarivo. Recherche par numéro, par arrêt ou par trajet. Gratuit, rapide, disponible sur Android.",
  keywords: [
    "taxi-be", "taxibe", "Antananarivo", "Tananarive", "transport", "bus",
    "ligne", "arrêt", "trajet", "Madagascar", "Tana",
  ],
  authors: [{ name: "TaxiBe", url: BASE_URL }],
  creator: "TaxiBe",
  publisher: "TaxiBe",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fr_MG",
    url: BASE_URL,
    siteName: "TaxiBe",
    title: "TaxiBe — Lignes de taxi-be à Antananarivo",
    description:
      "Trouvez votre ligne de taxi-be à Antananarivo. Recherche par numéro, par arrêt ou par trajet. Gratuit, rapide, disponible sur Android.",
    images: [
      {
        url: "/logo_taxibe.png",
        width: 1200,
        height: 630,
        alt: "TaxiBe — Lignes de taxi-be à Antananarivo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@taxibemada",
    creator: "@taxibemada",
    title: "TaxiBe — Lignes de taxi-be à Antananarivo",
    description:
      "Trouvez votre ligne de taxi-be à Antananarivo. Recherche par numéro, par arrêt ou par trajet.",
    images: ["/logo_taxibe.png"],
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
