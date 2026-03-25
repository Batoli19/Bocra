/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bocra: {
          blue:   '#1A3A6B',
          accent: '#2E5FA3',
          light:  '#D6E4F7',
          teal:   '#0F6E56',
        },
      },
    },
  },
  plugins: [],
}
