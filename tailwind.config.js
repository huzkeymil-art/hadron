/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#070707",
          900: "#070707",
          800: "#0e0e0e",
          700: "#141414",
          600: "#1b1b1b",
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
          "Inter",
          "Helvetica Neue",
          "Arial",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "Space Grotesk",
          "Inter",
          "Helvetica Neue",
          "system-ui",
          "sans-serif",
        ],
        serif: ["Instrument Serif", "Georgia", "serif"],
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
    },
  },
  plugins: [],
};
