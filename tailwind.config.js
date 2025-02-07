/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // primary: "#823C72",
        background: "hsl(317 38% 97%)", // Light background based on #823C72
        foreground: "hsl(317 38% 27%)", // Adjusted foreground for contrast
        card: {
          DEFAULT: "hsl(317 38% 97%)",
          foreground: "hsl(317 38% 27%)",
        },
        popover: {
          DEFAULT: "hsl(317 38% 97%)",
          foreground: "hsl(317 38% 27%)",
        },
        primary: {
          DEFAULT: "hsl(317 38% 45%)", // Main theme color #823C72
          foreground: "hsl(0 0% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(317 28% 90%)", // Lighter shade of #823C72
          foreground: "hsl(317 38% 45%)",
        },
        muted: {
          DEFAULT: "hsl(317 28% 90%)",
          foreground: "hsl(317 28% 45%)",
        },
        accent: {
          DEFAULT: "hsl(317 28% 90%)",
          foreground: "hsl(317 38% 45%)",
        },
        destructive: {
          DEFAULT: "hsl(0 62.8% 30.6%)", // Unchanged from original
          foreground: "hsl(0 0% 98%)",
        },
        border: "hsl(317 38% 85%)",
        input: "hsl(317 38% 85%)",
        ring: "hsl(317 38% 45%)",
        chart: {
          1: "hsl(317 38% 45%)",
          2: "hsl(317 28% 55%)",
          3: "hsl(317 48% 65%)",
          4: "hsl(317 38% 35%)",
          5: "hsl(317 58% 25%)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
