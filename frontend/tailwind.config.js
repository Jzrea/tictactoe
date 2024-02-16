/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          hover: "hsl(var(--primary-hover))",
          focus: "hsl(var(--primary-focus))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          hover: "hsl(var(--secondary-hover))",
          focus: "hsl(var(--secondary-focus))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          hover: "hsl(var(--destructive-hover))",
          focus: "hsl(var(--destructive-focus))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          hover: "hsl(var(--accent-hover))",
          focus: "hsl(var(--accent-focus))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          inner: "hsl(var(--popover-inner))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          inner: "hsl(var(--card-inner))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontSize: {
        sm: "clamp(0.8rem, -0.15vw + 0.84rem, 0.66rem)",
        base: "clamp(1rem, -0.13vw + 1.03rem, 0.88rem)",
        lg: "clamp(1.25rem, -0.09vw + 1.27rem, 1.17rem)",
        xl: "clamp(1.56rem, -0.01vw + 1.56rem, 1.55rem)",
        "2xl": "clamp(1.95rem, 0.13vw + 1.92rem, 2.07rem)",
        "3xl": "clamp(2.44rem, 0.34vw + 2.36rem, 2.76rem)",
        "4xl": "clamp(3.05rem, 0.66vw + 2.89rem, 3.68rem)",
        "5xl": "clamp(3.81rem, 1.15vw + 3.53rem, 4.91rem)",
        "6xl": "clamp(4.77rem, 1.87vw + 4.3rem, 6.54rem)",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};