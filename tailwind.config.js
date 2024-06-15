/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontSize: {
      headerSize: [
        "clamp(2rem, 10vw, 8rem)",
        {
          fontWeight: "900",
        },
      ],
      iconSize: "1.5rem",
      timeSize: [
        "clamp(1rem, 10vw, 2rem)",
        {
          fontWeight: "900",
        },
      ],
    },
    extend: {
      colors: {
        mainFontColor: "#fff",
        formButtonColor: "bg-orange-500",
      },
      spacing: {
        "inputErrorPosition": "-25px",
      },
    },
  },
  plugins: [],
};

