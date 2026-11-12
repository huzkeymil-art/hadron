/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Fresh look: "lab notebook". `ink` is the page surface and `bone`
        // the text colour, so the names are kept and only the values flip.
        ink: {
          DEFAULT: "#f3f1ec",
          900: "#f3f1ec",
          800: "#ebe8e1",
          700: "#e3dfd6",
          600: "#d8d3c8",
        },
        bone: {
          DEFAULT: "#15161a",
          muted: "#3d3f45",
          dim: "#6b6d73",
        },
        ember: {
          DEFAULT: "#2b4bff",
          bright: "#4361ff",
          deep: "#1d36d4",
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
          "Fraunces",
          "Georgia",
          "Inter",
          "Helvetica Neue",
          "system-ui",
          "sans-serif",
        ],
        serif: ["Fraunces", "Georgia", "serif"],
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
