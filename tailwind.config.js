/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          "skinstric-gray-light": "rgb(115, 115, 115)",
        },
        fontSize: {
          'skinstric': '14px',  // custom size for SKINSTRIC
          'intro': '10px',      // custom size for INTRO
        }
      },
    },
    plugins: [],
  };
  