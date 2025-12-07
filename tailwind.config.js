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
        'gray': '#919eab',
        'rating': '#ffc908'
      },
      container: {
        center: true,           // centers the container by default
        padding: '5rem',        // adds default horizontal padding
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
    },
    plugins: [
      require('flowbite/plugin')
    ],
  }
}
