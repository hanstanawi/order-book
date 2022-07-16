/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#131B29',
        'default-white': '#F0F4F8',
        'buy-green': '#00b15d',
        'sell-red': '#FF5B5A',
      },
    },
  },
  plugins: [],
};
