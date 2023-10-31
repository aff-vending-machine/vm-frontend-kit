/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,svelte}'],
  theme: {
    extend: {
      colors: {
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out 1',
        'fill-in-5s': 'fill 5s linear 1',
        'notify': 'notify 5s cubic-bezier(0.4, 0, 0.2, 1) 0ms backwards',
      },
      keyframes: {
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
        }
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  safelist: [],
};
