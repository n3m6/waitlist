/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: "#4D455D", // Deep Lavender-Gray
          accent: "#E96479", // Vibrant Coral Pink
          text: "#F5E9CF", // Creamy Beige
        },
        secondary: {
          accent: "#7DB9B6", // Seafoam Green
        },
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
