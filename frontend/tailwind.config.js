/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fbf1f6',
          100: '#f6e0ea',
          200: '#edbfd3',
          300: '#df91b3',
          400: '#ca5d8a',
          500: '#b44275',
          600: '#9c2b61',
          700: '#7d204d',
          800: '#601a3c',
          900: '#45112b',
          950: '#2b0a1a',
        },
        secondary: {
          50: '#fff9e9',
          100: '#fff1c8',
          200: '#ffe18b',
          300: '#ffd05e',
          400: '#fdc038',
          500: '#f9ba20',
          600: '#f8b218',
          700: '#d98c00',
          800: '#ae7000',
          900: '#825300',
          950: '#4f3200',
        },
        accent: {
          50: '#fbf1f6',
          100: '#f6e0ea',
          200: '#edbfd3',
          300: '#df91b3',
          400: '#ca5d8a',
          500: '#b44275',
          600: '#9c2b61',
          700: '#7d204d',
          800: '#601a3c',
          900: '#45112b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
