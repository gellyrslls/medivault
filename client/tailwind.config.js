/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
      colors: {
        background: "#FFFFFF",
        foreground: "#000000",
        neutral: {
          50: "#fafafa",
          100: "#f4f4f4",
          200: "#e6e6e6",
          300: "#d4d4d4",
          400: "#a2a2a2",
          500: "#727272",
          600: "#535353",
          700: "#404040",
          800: "#272727",
          900: "#181818",
        },
        brand: {
          50: "#eefdf2",
          100: "#d2f5da",
          200: "#a9eabb",
          300: "#76da99",
          400: "#48c475",
          500: "#2ea95c",
          600: "#1c8648",
          700: "#0c6a3b",
          800: "#04522e",
          900: "#004226",
        },
        highlight: {
          50: "#fffbee",
          100: "#fff8de",
          200: "#ffefbf",
          300: "#ffe195",
          400: "#ffce6f",
          500: "#ffb000",
          600: "#d98617",
          700: "#aa5f1b",
          800: "#8b4a1c",
          900: "#753c1c",
        },
      },
      borderRadius: {
        sm: "0.0833rem",
        default: "0.1667rem",
        md: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
