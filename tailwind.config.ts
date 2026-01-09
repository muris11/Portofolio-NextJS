import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#000000", // Default border is black
        input: "#000000", // Default input border is black
        ring: "#000000", // Default ring is black
        background: "#FFFDF5", // neo.canvas
        foreground: "#000000", // neo.ink
        primary: {
          DEFAULT: "#FF6B6B", // neo.accent (Red)
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#FFD93D", // neo.secondary (Yellow)
          foreground: "#000000",
        },
        destructive: {
          DEFAULT: "#FF0000",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#C4B5FD", // neo.muted (Violet)
          foreground: "#000000",
        },
        accent: {
          DEFAULT: "#FF6B6B",
          foreground: "#000000",
        },
        popover: {
          DEFAULT: "#FFFDF5",
          foreground: "#000000",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000",
        },
        // Custom Neo-brutalism palette
        neo: {
          canvas: "#FFFDF5",
          ink: "#000000",
          accent: "#FF6B6B",
          secondary: "#FFD93D",
          muted: "#C4B5FD",
          white: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "0px",
        md: "0px",
        sm: "0px",
        DEFAULT: "0px",
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        neo: "4px 4px 0px 0px #000000",
        "neo-sm": "2px 2px 0px 0px #000000",
        "neo-md": "8px 8px 0px 0px #000000",
        "neo-lg": "12px 12px 0px 0px #000000",
        "neo-xl": "16px 16px 0px 0px #000000",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
