/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D1B69",
        secondary: "#E5E5E5",
        third: "#473AD10F",
      },
      extend: {
        fontFamily: {
          sans: ["Nunito Sans"],
        },
      },
    },
    screens: {
      "3xl": { min: "1441px" },
      "2xl": { max: "1440px" },

      xl: { max: "1279px" },

      lg: { max: "1023px" },

      md: { max: "767px" },

      sm: { max: "639px" },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};
