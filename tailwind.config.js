module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Assicura che Tailwind scannerizzi i file React
  theme: {
    extend: {
      animation: {
        bounceSlow: "bounceSmall 3s infinite"
      },
      keyframes: {
        bounceSmall: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" } // Rimbalzo più basso
        }
      }
    }
  },
  plugins: [],
};