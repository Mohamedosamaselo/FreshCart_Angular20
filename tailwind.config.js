/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Angular components
    "./node_modules/flowbite/**/*.js" // Flowbite components
  ],
  theme: {
    extend: {
      colors: {
        'main': '#0aad0a',
        'gray': '#919eab'
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

