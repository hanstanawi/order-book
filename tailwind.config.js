/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#131B29',
        'default-white': '#F0F4F8',
        'broken-white': '#8698aa',
        'buy-green': '#00b15d',
        'dark-green': 'rgba(16, 186, 104, 0.12)',
        'flash-green': 'rgba(0, 177, 93, 0.5)',
        'dark-red': 'rgba(255, 90, 90, 0.12)',
        'sell-red': '#FF5B5A',
        'flash-red': 'rgba(255, 91, 90, 0.5)',
        'navy-blue': '#1E3059',
        'dark-grey': 'rgba(134, 152, 170, 0.12)',
      },
    },
  },
  plugins: [],
};
