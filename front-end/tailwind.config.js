/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        18: "4.5rem",
      },
      backgroundImage: {
        unsplash: "url('imgs/unsplash_LpbyDENbQQg.png')",
        user: "url('imgs/User 03C.png')",
        "social-media": "url('imgs/Social media logo.png')",
      },
    },
  },
  plugins: [],
};
