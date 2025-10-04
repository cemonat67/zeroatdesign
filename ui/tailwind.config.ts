import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#02154e",
          green: "#005530",
          orange: "#f9ba00",
          red: "#D51635",
          bg: "#f9f9fb",
        },
      },
      borderRadius: {
        "2xl": "1rem",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;