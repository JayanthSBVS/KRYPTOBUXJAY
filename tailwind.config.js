/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#bd24df',
        secondary: '#2d6ade',
        'body-bg': '#040D26',
        'darkmode': '#0c1b44',
        'tablebg': '#132259',
        'border': '#091945',
        'lightblue': '#8a9bca',
        'lightsky': '#ECF2FF',
        'lightpurple': '#B4C7ED',
      },
      blur: {
        '390': '390px',
      },
      boxShadow: {
        'mentor': '0px 4px 20px rgba(110, 127, 185, 0.1)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
