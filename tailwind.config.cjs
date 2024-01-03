/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,svelte}'],
  theme: {
    colors: {
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      primary: {
        lightest: colors.sky['100'],
        light: colors.sky['300'],
        DEFAULT: colors.sky['500'], // Primary brand color
        dark: colors.sky['700'],
        darkest: colors.sky['900'],
      },
      secondary: {
        lightest: colors.amber['100'],
        light: colors.amber['300'],
        DEFAULT: colors.amber['500'], // Secondary color for accents
        dark: colors.amber['700'],
        darkest: colors.amber['900'],
      },
      accent: {
        lightest: colors.rose['100'],
        light: colors.rose['300'],
        DEFAULT: colors.rose['500'], // Accent color for call-to-actions
        dark: colors.rose['700'],
        darkest: colors.rose['900'],
      },
      neutral: {
        lightest: colors.slate['100'],
        light: colors.slate['300'],
        DEFAULT: colors.slate['500'], // Neutral color for text, backgrounds, borders, etc.
        dark: colors.slate['700'],
        darkest: colors.slate['900'],
      },
      success: {
        lightest: colors.green['100'],
        light: colors.green['300'],
        DEFAULT: colors.green['500'],
        dark: colors.green['700'],
        darkest: colors.green['900'],
      },
      info: {
        lightest: colors.blue['100'],
        light: colors.blue['300'],
        DEFAULT: colors.blue['500'],
        dark: colors.blue['700'],
        darkest: colors.blue['900'],
      },
      warning: {
        lightest: colors.yellow['100'],
        light: colors.yellow['300'],
        DEFAULT: colors.yellow['500'],
        dark: colors.yellow['700'],
        darkest: colors.rose['900'],
      },
      danger: {
        lightest: colors.red['100'],
        light: colors.red['300'],
        DEFAULT: colors.red['500'],
        dark: colors.red['700'],
        darkest: colors.red['900'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  safelist: [
    {
      pattern: /(text|bg|border|fill)-(primary|secondary|accent|info|warning|success|danger)/,
      variants: ['hover'],
    },
    {
      pattern: /(text|bg|border|fill)-(primary|secondary|accent|info|warning|success|danger)-(light|heavy)/,
      variants: ['hover'],
    },
  ],
};
