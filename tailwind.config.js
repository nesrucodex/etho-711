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
          DEFAULT: "#1f1f1f",
          50: "#eaeaea",
          100: "#d4d4d4",
          200: "#a6a6a6",
          300: "#7a7a7a",
          400: "#4f4f4f",
          500: "#3b3b3b",
          600: "#2a2a2a",
          700: "#1f1f1f",
          800: "#141414",
          900: "#0a0a0a",
        },
        background: {
          DEFAULT: "#FaFaFa",
        },
        accent: {
          DEFAULT: "#0B735F",
        },
      },
    },
  },
  plugins: [],
};

// Gradient #F9881F -> FF774C
