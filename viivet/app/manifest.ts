import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VIVET — Maison Tropicale",
    short_name: "VIVET",
    description: "Luxury resort menswear and handcrafted leather goods. Est. 2024.",
    start_url: "/",
    display: "standalone",
    background_color: "#1A0E05",
    theme_color: "#C8A84B",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      // In a real complete setup, we would include 192x192 and 512x512 png icons.
    ],
  };
}
