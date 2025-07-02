/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#002B5B",
        mustard: "#F4A300",
        darknavy: "#1A1A1A",
        lightbg: "#F8F8F8",
      },
    },
  },
  plugins: [],
}
