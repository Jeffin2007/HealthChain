/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        hc: {
          50: "#fff5f5",
          100: "#ffe3e3",
          200: "#ffb8b8",
          400: "#f43f5e",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d"
        }
      },
      blur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
};
