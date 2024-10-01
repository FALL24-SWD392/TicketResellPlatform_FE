const { nextui } = require('@nextui-org/react')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    colors: {
      white: {
        light: '#fefffe', // Light
        lightHover: '#fefffe', // Light :hover
        lightActive: '#fdffff', // Light :active
        normal: '#f7f7f7', // Normal
        normalHover: '#dee6de', // Normal :hover
        normalActive: '#c6cccc', // Normal :active
        dark: '#b9bfb9', // Dark
        darkHover: '#949994', // Dark :hover
        darkActive: '#6f736f', // Dark :active
        darker: '#565956' // Darker
      },
      black: {
        light: '#e8eeef', // Light
        lightHover: '#dde5e7', // Light :hover
        lightActive: '#b8cacc', // Light :active
        normal: '#1a535c', // Normal
        normalHover: '#174b53', // Normal :hover
        normalActive: '#15424a', // Normal :active
        dark: '#143e45', // Dark
        darkHover: '#103237', // Dark :hover
        darkActive: '#0c2529', // Dark :active
        darker: '#091d20' // Darker
      },
      green: {
        light: '#edfaf9', // Light
        lightHover: '#e4f8f6', // Light :hover
        lightActive: '#c8f0ed', // Light :active
        normal: '#4eccd4', // Normal
        normalHover: '#46b9b0', // Normal :hover
        normalActive: '#3ea49d', // Normal :active
        dark: '#3b9a93', // Dark
        darkHover: '#2f7b76', // Dark :hover
        darkActive: '#235c58', // Dark :active
        darker: '#1b4845' // Darker
      },
      red: {
        light: '#FFF0F0', // Light
        lightHover: '#FFE9E9', // Light :hover
        lightActive: '#FFD1D1', // Light :active
        normal: '#FF6B6B', // Normal
        normalHover: '#E66060', // Normal :hover
        normalActive: '#CC5656', // Normal :active
        dark: '#BF5050', // Dark
        darkHover: '#994040', // Dark :hover
        darkActive: '#733030', // Dark :active
        darker: '#592525' // Darker
      },
      yellow: {
        light: '#FFFDF0', // Light
        lightHover: '#FFFBE9', // Light :hover
        lightActive: '#FFF7D2', // Light :active
        normal: '#FFE66D', // Normal
        normalHover: '#E6CF62', // Normal :hover
        normalActive: '#CCB857', // Normal :active
        dark: '#BFAD52', // Dark
        darkHover: '#998A41', // Dark :hover
        darkActive: '#736731', // Dark :active
        darker: '#595126' // Darker
      },
      blue: {
        light: '#e8e9ea',
        lightHover: '#dddedf',
        lightActive: '#b8babd',
        normal: '#1a2129',
        normalHover: '#171e25',
        normalActive: '#151a21',
        dark: '#14191f',
        darkHover: '#101419',
        darkActive: '#0c0f12',
        darker: '#090c0e'
      }
    },
    fontFamily: {
      sans: ['Archivo SemiExpanded', 'sans-serif'],
      serif: ['Archivo SemiExpanded', 'serif']
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  darrkMode: 'class',
  plugins: [nextui()]
}
