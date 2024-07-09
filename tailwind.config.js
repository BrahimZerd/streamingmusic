/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx,css}",
    "./src/components/*.{js,ts,tsx,jsx}",
  ],
  theme: {
    fontFamily: {
      playfair: ['"Playfair"', "serif"],
    },
    extend: {
      colors: {
        main: "#AA5156",
        secondary: "#404642",
      },
      backgroundImage: {
        header: "url('./assets/background.svg')",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "33%": { transform: "translateX(100%)" },
          "66%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        popup: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        popup: "popup 2s linear",
      },
    },
  },
  plugins: [],
};
