/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
        
      },
      colors: {
        'primary-orange': '#FF5722',
        'primary-green': '#36C1A3',
      },
      fontSize: {
        "clamp-sm" : "clamp(1rem, 4vw, 1.5rem)",
        "clamp-lg" : "clamp(2rem, 7vw, 3rem)",
      },
    },
  },
  plugins: [],
}