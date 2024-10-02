/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // ensure you're targeting your app folder
  ],
  theme: {
    extend: {
      fontFamily: {
        stardos: ['"Stardos Stencil"', "sans-serif"], // Add Stardos Stencil
      },
    },
  },
  plugins: [],
};
