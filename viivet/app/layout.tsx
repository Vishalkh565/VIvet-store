import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vivet.com"),
  title: "VIVET — Maison Tropicale",
  description:
    "Luxury resort menswear. Handcrafted leather goods. Est. 2024.",
  openGraph: {
    title: "VIVET — Maison Tropicale",
    description:
      "Luxury resort menswear. Handcrafted leather goods. Est. 2024.",
    images: ["/images/store-interior.jpg"],
    type: "website",
    siteName: "VIVET",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIVET — Maison Tropicale",
    description:
      "Luxury resort menswear. Handcrafted leather goods. Est. 2024.",
    images: ["/images/store-interior.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className={outfit.className}>
        {children}
      </body>
    </html>
  );
}
