/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "8px"
    },
    extend: {
      colors: {
        firstColor: "#89A8B2",
        secondColor: "#B3C8CF",
        thirdColor: "#E5E1DA",
        fourthColor: "#F1F0E8",
        darkFirstColor: "#1b1f20",
        darkSecondColor: "#282f32",
        darkThirdColor: "#374043",
        darkFourthColor: "#49575b",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
