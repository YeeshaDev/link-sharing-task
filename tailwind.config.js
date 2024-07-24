/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          index: "#633CFF",
          hover: "#BEADFF",
        },
        neutral: {
          "light-purple": "#EFEBFF",
          "dark-grey": "#333333",
          grey: "#737373",
          borders: "#D9D9D9",
          "light-grey": "#FAFAFA",
        },
        icons: {
          email: "#e4e4e4",
          github: "#1A1A1A",
          "frontend-mentor": "#FFFFFF",
          linkedin: "#2D68FF",
          youtube: "#EE3939",
          facebook: "#2442AC",
          devto: "#333333",
          codewars: "#8A1A50",
          "free-code-camp": "#302267",
          gitlab: "#EB4925",
          hashnode: "#0330D1",
          "stack-overflow": "#EC7100",
        },
        error: "#FF3939",
      },
      boxShadow: {
        "3xl": "0px 5px 15px rgba(0, 0, 0, 0.35)",
        "4xl": "0px 3px 8px rgba(0, 0, 0, 0.24)",
      },
      dropShadow: {
        "3xl": "1px 1px 10px #633CFF",
      },
    },
  },
  plugins: [],
};
