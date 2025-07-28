/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#161D31',
        'dark-secondary': '#1F2544',
        'dark-accent': '#1E2139',
        'dark-accent-2': '#252A47',
        'text-primary': '#D0D4F1',
        'text-white': '#FFFFFF',
        'purple-primary': '#6F6BF3',
        'purple-secondary': '#9333EA',
        'purple-tertiary': '#7C3AED',
        'pink-accent': '#EC4899',
        'purple-light': '#A855F7',
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(135deg, #161D31 0%, #1F2544 100%)',
        'card-gradient': 'linear-gradient(145deg, #1E2139 0%, #252A47 100%)',
        'purple-gradient': 'linear-gradient(135deg, #6F6BF3 0%, #9333EA 100%)',
        'kpi-gradient': 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #EC4899 100%)',
        'text-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
      },
      fontFamily: {
        'sans': ['Inter', 'Segoe UI', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
      keyframes: {
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
