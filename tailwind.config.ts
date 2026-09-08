import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hud: {
          bg: "#0B0F1A",
          bgLight: "#0d1117",
          card: "rgba(15, 23, 42, 0.75)",
          cardHover: "rgba(22, 36, 66, 0.85)",
          border: "rgba(0, 242, 255, 0.2)",
          borderHover: "rgba(0, 242, 255, 0.5)",
          cyan: "#00F2FF",
          cyanGlow: "rgba(0, 242, 255, 0.4)",
          blue: "#4169E1",
          violet: "#8A2BE2",
          red: "#FF3366",
          text: "#E2E8F0",
          textDim: "#94A3B8",
          textMuted: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Courier New", "monospace"],
      },
      backgroundImage: {
        "hud-radial": "radial-gradient(ellipse at 50% -20%, rgba(0, 242, 255, 0.15), transparent 70%)",
        "hud-glow": "radial-gradient(circle at center, rgba(65, 105, 225, 0.15) 0%, transparent 60%)",
        "cyber-grid": "linear-gradient(to right, rgba(0, 242, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 242, 255, 0.05) 1px, transparent 1px)",
      },
      boxShadow: {
        "cyan-glow": "0 0 25px rgba(0, 242, 255, 0.25)",
        "cyan-glow-sm": "0 0 12px rgba(0, 242, 255, 0.2)",
        "violet-glow": "0 0 25px rgba(138, 43, 226, 0.3)",
        "hud-card": "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        scanline: "scanline 8s linear infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
