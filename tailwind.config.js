/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
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
    },
    variants: {
      extend: {
        scrollPadding: ["responsive"],
      },
    },
  },
  plugins: [require("preline/plugin")],
};
