/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        quincy: {
          blau1: '#002D5F',
          blau2: '#003C78',
          blau3: '#0096D2',
          schwarz: '#000',
          rot: '#E10019',
          gruen: '#64B400',
          orange: '#F5821F',
          grau1: '#919191',
          grau2: '#D7D7D7',
          grau3: '#E4E4E4',
          grau4: '#F2F2F2',
        },
      },
    },
  },
  plugins: [],
}
