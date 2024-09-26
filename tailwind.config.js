/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        text: {
          DEFAULT: "#1C1C1C",
        },
        primary: {
          DEFAULT: "#FF8C00", // Default Orange
          50: "#FFF4E5",
          100: "#FFE4CC",
          200: "#FFC999",
          300: "#FFAD66",
          400: "#FF9133",
          500: "#FF8C00",
          600: "#CC6F00",
          700: "#995300",
          800: "#663700",
          900: "#331C00",
        },
        background: {
          DEFAULT: "#FaFaFa",
        },
        accent: {
          DEFAULT: "#0B735F",
        },
      },
      borderRadius: {
        DEFAULT: "10px",
        sm: "5px",
        md: "10px",
        lg: "15px",
        xl: "20px",
      },
    },
  },
  plugins: [],
};

// Gradient #F9881F -> FF774C
