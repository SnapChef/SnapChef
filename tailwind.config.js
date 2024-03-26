/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'],
        'sand': ['Quicksand', 'sans-serif' ],
        'basker': ['Baskervville', 'serif' ],
        'gara': ['EB Garamond', 'serif' ],
        'madimi': ['Madimi One', 'sans-serif' ],
      },
      colors: {
        "custom-main-dark": "#FF9103",
        "custom-main-light": "#FEEACC",
      },
    },
  },
  plugins: [],
};