/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontSize: {
      'headerSize': ['clamp(2rem, 10vw, 8rem)',{
        fontWeight: '900'
      }],
      "iconSize": "1.5rem"
    },
    extend: {
      colors: {
        mainFontColor: "#fff",
        formButtonColor: "bg-orange-500"
      }
    },
  },
  plugins: [],
};

