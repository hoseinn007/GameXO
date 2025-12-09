import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}",
    "./types/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Basic Colors
        white: "#FFFFFF",
        black: "#000000",
        transparent: "transparent",

        // Gray Colors - Light
        gray: {
          100: "#F8FAFD",
          200: "#EFF2F5",
          300: "#CFD6E4",
          400: "#A6B0C3",
          500: "#808A9D",
          600: "#616E85",
          700: "#222531", // dark-100
          800: "#323546", // dark-200
          900: "#53596A", // dark-300
        },

        // Blue Colors
        blue: {
          50: "#F0F6FF", // blue-100
          100: "#DDE4FD", // blue-200
          200: "#ACBDFB", // blue-300
          300: "#6188FF", // blue-400
          400: "#3861FB", // blue-500
          500: "#2444D4", // blue-600
          600: "#0728A1", // blue-700
          700: "#1E274F", // blue-800
        },

        // Green Colors
        green: {
          50: "#DEFBF0", // green-100
          100: "#C3F8E4", // green-200
          200: "#8CF2CC", // green-300
          300: "#67E4B5", // green-400
          400: "#16C784", // green-500
          500: "#119C68", // green-600
          600: "#0D734C", // green-700
          700: "#173C37", // green-800
        },

        // Orange & Beige Colors
        orange: {
          50: "#FDF4EA", // beige-100
          100: "#FCEDDE", // beige-200
          200: "#FBE0C6", // beige-300
          300: "#F9D3AF", // beige-400
          400: "#F5B97F", // beige-500
          500: "#EE8B2A", // beige-600
          600: "#BD650F", // beige-700
          700: "#433936", // beige-800
          800: "#FFE9E5", // orange-100
          900: "#FFCFC7", // orange-200
        },

        // Red Colors
        red: {
          50: "#FCE6E8", // red-100
          100: "#F8BABD", // red-200 & red-300
          200: "#FFAD9E", // orange-300
          300: "#FF9B8A", // orange-400
          400: "#FF775F", // orange-500
          500: "#FF3C1A", // orange-600
          600: "#D11F00", // orange-700
          700: "#8A1500", // orange-800
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "card-hover":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        crypto: "0 2px 8px 0 rgba(0, 0, 0, 0.08)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
