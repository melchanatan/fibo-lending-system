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
        'primary-green-darken': '#f1b24b',
      },
      fontSize: {
        "clamp-sm" : "clamp(.9rem, 3.5vw, 1.5rem)",
        "clamp-md" : "clamp(2rem, 6vw, 3rem)",
        "clamp-lg" : "clamp(2.3rem, 10vw, 3rem)",
      },
    },
  },
  plugins: [],
}