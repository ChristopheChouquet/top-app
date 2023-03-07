/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        primary: '#6D00FF',
        secondary: '#72F000',
        tertiary: {
          100: '#FFFFFF',
          200: '#EDEDED',
          300: '#B2B2B2',
          400: '#000000',
        }
      }
    },
  },
  plugins: [],
}
