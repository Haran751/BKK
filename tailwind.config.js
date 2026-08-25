/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bkk: {
          navy: '#0b2347',
          blue: '#133e75',
          lightBlue: '#1e5ca8',
          sky: '#e8f0fe',
          orange: '#ff6b00',
          orangeHover: '#e05e00',
          orangeLight: '#fff2e8',
          yellow: '#f59e0b',
          dark: '#0a192f',
          cardBg: '#ffffff',
          border: '#e2e8f0'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(11, 35, 71, 0.08), 0 2px 6px -1px rgba(11, 35, 71, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(11, 35, 71, 0.15), 0 4px 12px -2px rgba(11, 35, 71, 0.08)',
        'button-orange': '0 4px 14px 0 rgba(255, 107, 0, 0.39)',
        'button-blue': '0 4px 14px 0 rgba(19, 62, 117, 0.39)'
      }
    },
  },
  plugins: [],
}
