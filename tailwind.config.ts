import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#FCFBFA",
          rose: "#D8A09B",
          "rose-dark": "#C48E88",
          "rose-light": "#E8C4BF",
          "rose-pale": "#F5E6E3",
          text: "#4A4443",
          "text-light": "#7A7170",
          "text-muted": "#A39E9D",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Lato"', "system-ui", "sans-serif"],
        script: ['"Great Vibes"', "cursive"],
      },
      boxShadow: {
        soft: "0 2px 20px -4px rgba(74, 68, 67, 0.08)",
        "soft-md": "0 4px 30px -6px rgba(74, 68, 67, 0.1)",
        "soft-lg": "0 10px 50px -12px rgba(74, 68, 67, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;