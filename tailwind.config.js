/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#4f6bed',
          600: '#3730a3',
          700: '#1e293b',
          800: '#0f172a',
          900: '#020617',
        }
      }
    },
  },
  plugins: [],
}