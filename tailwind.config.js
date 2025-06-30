/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pulseFast: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.1" }, // more visible transition
        },
      },
      animation: {
        pulseFast: "pulseFast 1.2s ease-in-out infinite", // faster than default 2s
      },
    },
  },
  plugins: [],
};
