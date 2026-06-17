/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0a",
          900: "#0a0a0a",
          800: "#111111",
          700: "#161616",
          600: "#1d1d1d",
        },
        bone: {
          DEFAULT: "#f4f1ea",
          muted: "#cfcbc0",
          dim: "#8b887f",
        },
        ember: {
          DEFAULT: "#ff3d00",
          bright: "#ff4d12",
          deep: "#e2330a",
        },
      },
      fontFamily: {
        sans: [
          "Suisse",
          "Inter",
          "Helvetica Neue",
          "Arial",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "IBM Plex Mono",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      fontSize: {
        // Fluid display scale used for the big Swiss headlines.
        "display-sm": "clamp(2.5rem, 7vw, 5rem)",
        "display": "clamp(3.5rem, 11vw, 11rem)",
        "display-lg": "clamp(4rem, 15vw, 16rem)",
      },
      letterSpacing: {
        tightest: "-0.055em",
        tighter: "-0.03em",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "spin-slow": "spin-slow 14s linear infinite",
      },
    },
  },
  plugins: [],
};
