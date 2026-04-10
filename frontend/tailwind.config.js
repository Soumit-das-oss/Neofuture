/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0A192F",
        saffron: "#FF9933",
        "primary-green": "#00FF66",
        dark: "#020c1b",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(to right, rgba(0, 255, 102, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 102, 0.1) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
