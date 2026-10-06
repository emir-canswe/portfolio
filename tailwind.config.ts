import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        paper: "#ffffff",
        smoke: "#0d0d0d",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Helvetica Neue", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        snug: "-0.02em",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      screens: {
        s: "768px",
      },
    },
  },
  plugins: [],
};

export default config;
