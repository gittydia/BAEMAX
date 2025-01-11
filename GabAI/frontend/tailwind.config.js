/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '0px',
        'xs': '375px',
      },
      fontSize: {
        'heading-1': ['64px'],
        'heading-2': ['40px'],
        'heading-3': ['24px'],
        'subtitle': 'clamp(0.8, 0.13vi + 0.77rem, 0.89rem)',
        'body': 'clamp(1rem, 0.27vi + 0.95rem, 1.19rem)',
        'small': ['14px'],
        'pre-title': ['10px'],
        'btn-text': ['10px'],
        'link': ['16px'],
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serfif'],
      },
      letterSpacing: {
        'f-small': '-0.02em',
        'f-widest': '0.03em',
      },
      colors: {
        'secondary': '#68FA61',
        'secondary-2': '#01B781',
        'accent': '#687A6A',
        'personal': '#FFE5D4',
        'business': '#F7F3E9',
        'gifts': '#FFE4E1',
        'loan': '#E4F9F5',
        'other-exp': '#E0F7FA',
        'food': '#FFF9DB',
        'sag': '#F3E5F5',
        'transport': '#E3F2FD',
        'home': '#E0F7FA',
        'other-inc': '#FFE5D4'
      },
      lineHeight: {
        'primary': '-0.3em'
      }
    },
  },
  plugins: [],
}