/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#161622',
        secondary: {
          DEFAULT: '#F1AC09',
          100: '#FF9001',
          200: '#FF8E01'
        },
        black: {
          DEFAULT: '#000000',
          100: '#1E1E2D',
          200: '#232533'
        },
        white: {
          DEFAULT: '#FFFFFF',
          100: '#F5F5F5'
        },
        gray: {
          100: '#FAFAFC',
          200: '#E5E7EB',
          400: '#9CA3AF'
        }
      },
      fontFamily: {
        pthin: ['Poppins-Thin', 'sans-serif'],
        pextralight: ['Poppins-ExtraLight', 'sans-serif'],
        plight: ['Poppins-Light', 'sans-serif'],
        pregular: ['Poppins-Regular', 'sans-serif'],
        pmedium: ['Poppins-Medium', 'sans-serif'],
        psemibold: ['Poppins-SemiBold', 'sans-serif'],
        pbold: ['Poppins-Bold', 'sans-serif'],
        pextrabold: ['Poppins-ExtraBold', 'sans-serif'],
        pblack: ['Poppins-Black', 'sans-serif']
      }
    }
  },
  plugins: []
};
