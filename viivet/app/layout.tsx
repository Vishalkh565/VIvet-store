import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import Script from "next/script";
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

const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";
const shopifyToken = process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_TOKEN ?? "";
const shopifyConfigured = Boolean(shopifyDomain && shopifyToken);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className={outfit.className}>
        {shopifyConfigured ? (
          // shopify-store provides context for all shopify-* web components
          <shopify-store
            store-domain={shopifyDomain}
            public-access-token={shopifyToken}
          >
            {children}
          </shopify-store>
        ) : (
          children
        )}
        {shopifyConfigured && (
          <Script
            src="https://cdn.shopify.com/storefront/web-components.js"
            type="module"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
