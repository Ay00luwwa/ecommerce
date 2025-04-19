import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // New color palette
        coral: {
          DEFAULT: "#E76F51",
          50: "#FCE9E5",
          100: "#F9D3CB",
          200: "#F3A797",
          300: "#ED7B63",
          400: "#E76F51",
          500: "#E04F2A",
          600: "#C03A18",
          700: "#8F2B12",
          800: "#5F1C0C",
          900: "#2F0E06",
        },
        cyan: {
          DEFAULT: "#E0FBFC",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#E0FBFC",
          600: "#AEF5F8",
          700: "#7CEEF3",
          800: "#4AE8EF",
          900: "#18E1EA",
        },
        orange: {
          DEFAULT: "#F4A261",
          50: "#FFFFFF",
          100: "#FEFBF7",
          200: "#FCE9D7",
          300: "#F9D7B7",
          400: "#F7C497",
          500: "#F4A261",
          600: "#F1802B",
          700: "#E16608",
          800: "#AC4E06",
          900: "#773604",
        },
        yellow: {
          DEFAULT: "#E9C46A",
          50: "#FFFFFF",
          100: "#FDF9F0",
          200: "#F7ECD1",
          300: "#F2DFB1",
          400: "#EDD192",
          500: "#E9C46A",
          600: "#E2B13C",
          700: "#D39D1C",
          800: "#A47A16",
          900: "#755710",
        },
        teal: {
          DEFAULT: "#2A9D8F",
          50: "#9BE5DC",
          100: "#89E0D6",
          200: "#64D7CA",
          300: "#3FCEBE",
          400: "#2FB3A3",
          500: "#2A9D8F",
          600: "#1F7469",
          700: "#154B44",
          800: "#0A231F",
          900: "#000000",
        },
        navy: {
          DEFAULT: "#264653",
          50: "#6DA4BC",
          100: "#5D9AB5",
          200: "#4585A3",
          300: "#396F88",
          400: "#2D5A6E",
          500: "#264653",
          600: "#192F38",
          700: "#0D181D",
          800: "#010202",
          900: "#000000",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

