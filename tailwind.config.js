/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "node_modules/preline/dist/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        main: "#0A192F",
        technology: "#142B46",
        letters: "#204850",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        "fira-code": ["Fira Code", "monospace"],
      },
      screens: {
        sm: "624px",
        md: "768px",
      },
      animation: {
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
    variants: {
      extend: {
        scrollPadding: ["responsive"],
      },
    },
  },
  plugins: [require("preline/plugin")],
};
