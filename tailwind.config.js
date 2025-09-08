/**@type {import('tailwindcss').Config}*/

export default {
  content: [
    "./index.html",
    "./src/**/*.{html, js, ts, jsx, tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',  // Azul oscuro personalizado
        secondary: '#9333EA', // Púrpura personalizado
        background: '#F3F4F6', // Fondo claro
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}


