/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme
        primary: {
          DEFAULT: '#2563eb',
          foreground: '#ffffff',
        },
        // Dark theme (Serika Dark inspired)
        'serika-dark': {
          background: '#323437',
          foreground: '#646669',
          accent: '#e2b714',
        },
        // Botanical theme
        botanical: {
          background: '#7fa480',
          foreground: '#2c513f',
          accent: '#d3ffdc',
        },
        // Muted theme
        muted: {
          background: '#aaaaaa',
          foreground: '#444444',
          accent: '#eeeeee',
        },
      },
    },
  },
  plugins: [],
};