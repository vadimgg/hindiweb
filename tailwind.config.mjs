/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Poppins', 'system-ui', 'sans-serif'],
        title: ['Oswald', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
