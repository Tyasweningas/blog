/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        magazine: {
          black: '#1a1a1a',
          white: '#ffffff',
          accent: '#000000',
          paper: '#fafafa',
        }
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}
