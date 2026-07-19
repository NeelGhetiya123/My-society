import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)", surface: "var(--surface)", "surface-2": "var(--surface-2)",
        border: "var(--border)", ink: "var(--ink)", "ink-soft": "var(--ink-soft)",
        "ink-faint": "var(--ink-faint)", primary: "var(--primary)",
        "primary-strong": "var(--primary-strong)", "primary-tint": "var(--primary-tint)",
      },
      fontFamily: { serif: ["Fraunces", "Georgia", "serif"] },
    },
  },
  plugins: [],
};
export default config;
