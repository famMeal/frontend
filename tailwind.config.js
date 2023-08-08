const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    'src/App.{js,jsx,ts,tsx}',
    'src/components/**/*.{js,jsx,ts,tsx}',
    'src/screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#CA752B',
        },
        light: {
          DEFAULT: '#F9F9F9',
        },
        accent: {
          DEFAULT: '#1E463F',
        },
      },
      fontFamily: {
        khula: ['Khula-Regular', ...defaultTheme.fontFamily.sans],
        khulaBold: ['Khula-Bold', ...defaultTheme.fontFamily.sans],
        khulaSemiBold: ['Khula-SemiBold', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
