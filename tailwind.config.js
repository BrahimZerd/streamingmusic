/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx,css}",
    "./src/components/*.{js,ts,tsx,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#AA5156",
        secondary: "#404642",
      },
    },
  },
  plugins: [],
};
