/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        primary: "#52b788",
        secondary: "#f5f5f5",
        accent: "#95d5b2",
        surface: "#ffffff",
        background: "#fafafa",
        success: "#52b788",
        warning: "#f77f00",
        error: "#c1121f",
        info: "#4a5568"
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}