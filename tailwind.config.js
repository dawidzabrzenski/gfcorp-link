/** @type {import('tailwindcss').Config} */
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
        maincolor: "#3818D9",
      },
      boxShadow: {
        "right-light": "4px 0 8px rgba(0, 0, 0, 0.03)", // Niestandardowy cień padający tylko z prawej strony
      },
    },
  },
  plugins: [],
};
