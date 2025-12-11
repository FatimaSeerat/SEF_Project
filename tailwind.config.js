/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(222, 47%, 6%)",
        foreground: "hsl(210, 40%, 98%)",
        primary: {
          DEFAULT: "hsl(187, 100%, 50%)",
          foreground: "hsl(222, 47%, 6%)"
        },
        secondary: {
          DEFAULT: "hsl(260, 60%, 60%)",
          foreground: "hsl(210, 40%, 98%)"
        },
        destructive: {
          DEFAULT: "hsl(0, 84%, 60%)",
          foreground: "hsl(210, 40%, 98%)"
        },
        muted: {
          DEFAULT: "hsl(222, 30%, 15%)",
          foreground: "hsl(215, 20%, 65%)"
        },
        border: "hsl(222, 30%, 18%)",
        input: "hsl(222, 30%, 18%)",
        ring: "hsl(187, 100%, 50%)"
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.55rem",
        sm: "0.4rem"
      },
        backgroundImage: {
          'grid-pattern': 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\' width=\'32\' height=\'32\' fill=\'none\' stroke=\'rgb(255 255 255 / 0.03)\'%3e%3cpath d=\'M0 .5H31.5V32\'/%3e%3c/svg%3e")',
      },
    },
  },
  plugins: [],
};
