/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // ensure you're targeting your app folder
  ],
  theme: {
    extend: {
      fontFamily: {
        stardos: ['"Stardos Stencil"', "sans-serif"],
        spline: ["Spline Sans", "sans-serif"],
      },
      colors: {
        'beige': '#B07947',
        'yellow': '#FFF6C1',
        'brown': '#6C4A2A',
        'brgr1': '#AE9558',
        'brgr2': '#483E24',
      }
    },
  },
  plugins: [],
};
