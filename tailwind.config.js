/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Inter, monospace",
    },
    extend: {
      fontSize: {
        huge: ["80rem", { lineHeight: "1" }],
        height: { screen: "100dvh" },
      },
      colors: {
        bgcolor: "#f3f4f6",
        maincolor: "#2563eb",
        maincolordarker: "#2159d3",
        maincolorlighter: "#3a72ed",
        maincolorlightest: "#6691f1",
      },
      boxShadow: {
        "right-light": "4px 0 8px rgba(0, 0, 0, 0.03)",
        "focus-shadow": "0 0 0 2px #2d13ad47",
      },
      animation: {
        backSectionHeaderButton: "backSectionHeaderButton 0.4s ease-in-out",
      },
      keyframes: {
        backSectionHeaderButton: {
          "0%": { transform: "translateX(-3.5rem)" }, // -translate-x-12
          "50%": { transform: "translateX(-4rem)" },
          "100%": { transform: "translateX(-3.5rem)" },
        },
      },
    },
  },
  plugins: [],
};
