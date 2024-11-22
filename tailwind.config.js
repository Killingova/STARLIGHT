// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: 'auto auto 1fr auto', // Layout mit flexibler Mitte und festen oberen und unteren Bereichen
      },
    },
  },
  plugins: [],
}
