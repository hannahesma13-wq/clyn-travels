/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#123B66',
        sun: '#F4C542',
        sky: '#EAF4FA',
        cream: '#FFF9E9',
        ink: '#17324D',
        muted: '#66788A'
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Manrope', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 55px rgba(18, 59, 102, 0.10)'
      }
    }
  },
  plugins: [],
}
