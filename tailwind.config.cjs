/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,svelte}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        transparent: 'transparent',
        primary: colors.sky,
        secondary: colors.amber,
        tertiary: colors.lime,
        info: colors.blue,
        success: colors.green,
        warning: colors.yellow,
        danger: colors.red,
        disable: colors.slate,
      },
      animation: {
        'slide-down': 'slide-down 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms backwards',
        ripple: 'ripple 600ms linear',
        wiggle: 'wiggle 1s ease-in-out 1',
        'fill-in-5s': 'fill 5s linear 1',
        notify: 'notify 5s cubic-bezier(0.4, 0, 0.2, 1) 0ms backwards',
      },
      keyframes: {
        'slide-down': {
          '0%': { transform: 'translateY(-5%)', opacity: 0 },
          '100%': { transform: 'translateY(0%)', opacity: 100 },
        },
        ripple: {
          to: { transform: 'scale(4)', opacity: 0 },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fill: {
          '0%': { width: '0%' },
          '90%': { width: '100%' },
        },
        notify: {
          '0%': { transform: 'translateY(25%)', opacity: 0 },
          '10%': { transform: 'translateY(0%)', opacity: 100 },
          '90%': { transform: 'translateY(0%)', opacity: 100 },
          '100%': { transform: 'translateY(-25%)', opacity: 0 },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  safelist: [
    {
      pattern:
        /(text|bg|border|fill)-(primary|secondary|tertiary|info|warning|success|danger)-(50|100|400|500|700|800)/,
      variants: ['hover'],
    },
  ],
};
