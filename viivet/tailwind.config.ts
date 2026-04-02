import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "amber-gold": "#C8A84B",
        cream: "#F5EDD8",
        "deep-brown": "#1A0E05",
        ivory: "#FAF7F0",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      animation: {
        "pulse-amber": "pulse-amber 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "pulse-amber": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(200, 168, 75, 0.7)",
          },
          "70%": {
            boxShadow: "0 0 0 12px rgba(200, 168, 75, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
