/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { primary: "#261B21", secondary: "#AE9518", tertiary: "#014300" },
    },
  },
  plugins: [],
};
