/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "home-banner": "var(--bg-banner-home)",
        "about-banner": "var(--bg-banner-about)",
        neutral: {
          50: "#f7f9fc",
          100: "#ebeff5",
          200: "#c1cad7",
          300: "#a4b2c5",
          400: "#8396b1",
          500: "#66768e",
          600: "#566479",
          700: "#4c5a6e",
          800: "#384354",
          900: "#273141",
          950: "#171c25"
        },
        blue: {
          50: "#f5f8fe",
          100: "#e8effc",
          200: "#b5caf5",
          300: "#91b1f0",
          400: "#6793ea",
          500: "#3470e2",
          600: "#245dc8",
          700: "#2054b5",
          800: "#183f87",
          900: "#122f63",
          950: "#0b1b3b"
        },
        red: {
          50: "#fef6f8",
          100: "#fceaee",
          200: "#f6b9c5",
          300: "#f297a9",
          400: "#ed6983",
          500: "#df294d",
          600: "#bd2341",
          700: "#ab1f3b",
          800: "#81182c",
          900: "#611221",
          950: "#390b14"
        },
        green: {
          50: "#f4fbf8",
          100: "#ddf3ea",
          200: "#8cd8b8",
          300: "#53c595",
          400: "#19a96c",
          500: "#148555",
          600: "#117148",
          700: "#0f6641",
          800: "#0b4c31",
          900: "#083824",
          950: "#052115"
        },
        yellow: {
          50: "#fff9eb",
          100: "#ffeec9",
          200: "#ffbf34",
          300: "#e4a61e",
          400: "#c08b1a",
          500: "#976e14",
          600: "#805d11",
          700: "#73530f",
          800: "#563f0b",
          900: "#402e09",
          950: "#251a05"
        },
        orange: {
          50: "#fff6f4",
          100: "#ffebe6",
          200: "#ffb8a7",
          300: "#ff9379",
          400: "#ff5f3a",
          500: "#cf4625",
          600: "#b03b20",
          700: "#9f351d",
          800: "#772815",
          900: "#581e10",
          950: "#341109"
        }
      },
      fontFamily: {
        sans: ["Garet", "Helvetica", "Arial", "sans-serif"]
      },
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["2rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.5rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }]
      },
      backgroundImage: {
        "white-noise": "url('../assets/images/white-noise.png')"
      },
      backgroundSize: {
        "50%": "15%"
      },
      boxShadow: {
        "plastic-hard":
          "0 -1px 1px inset rgba(0, 0, 0, 0.4), 0 2px 0px inset rgba(255, 255, 255, 0.8), 0 16px 20px rgba(0,0,0,0.05)",
        "plastic-soft":
          "0 -1px 1px inset rgba(0, 0, 0, 0.4), 0 2px 0px inset rgba(255, 255, 255, 0.3), 0 16px 20px rgba(0,0,0,0.05)"
      }
    }
  },
  plugins: [typography]
};
