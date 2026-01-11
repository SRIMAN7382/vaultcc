/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#070A0F",
        vault: "#00e5a8",
        cyan: "#42d9ff",

        /* Glass UI colors */
        panel: "rgba(255,255,255,0.08)",
        line: "rgba(255,255,255,0.18)",
        muted: "rgba(255,255,255,0.70)",
      },

      boxShadow: {
        glow: "0 0 50px rgba(0,229,168,0.45)",
        glow2: "0 0 90px rgba(66,217,255,0.35)",
        soft: "0 30px 80px rgba(0,0,0,0.85)",
      },

      borderRadius: {
        xl2: "22px",
      },

      backdropBlur: {
        xl: "24px",
      },
    },
  },
  plugins: [],
};

export default config;
