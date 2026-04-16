import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Georgia", "serif"],
        sans: ["Arial", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "monospace"],
      },
      colors: {
        ft: {
          cream: "#FFF1E5",
          pink: "#F2DFCE",
          salmon: "#990F3D",
          navy: "#0D1B2A",
          dark: "#1A1A1A",
          mid: "#5C5C5C",
          light: "#8C8C8C",
          border: "#CCC0B3",
          gold: "#F2C14E",
          up: "#09562B",
          down: "#A3180F",
        },
      },
    },
  },
  plugins: [],
};

export default config;
