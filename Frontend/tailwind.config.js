/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        purple:{
          300:"#e0e7fe",
          500:"#3e38a7",
          600:"#5046e4"
        }
      }
    },
  },
  plugins: [],
};
