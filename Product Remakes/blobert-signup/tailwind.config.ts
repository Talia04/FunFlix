import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        grape: "#7b3cff",
        jelly: "#b66cff",
        gum: "#ff64c8",
        lime: "#9eff7a",
        ink: "#241033",
      },
      boxShadow: {
        jelly: "0 28px 80px rgba(123, 60, 255, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
