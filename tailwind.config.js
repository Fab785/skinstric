/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roobert: ['"Roobert TRIAL"', 'sans-serif'],
      },
      fontSize: {
        hero: ['128px', { lineHeight: '120px', letterSpacing: '-0.07em' }],
        intro: '10px',
      },
      colors: {
        'skinstric-gray-light': '#B0B0B0',
      },
    },
  },
  plugins: [],
};



  