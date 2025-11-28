// Minimal Tailwind config for react-email's Tailwind component
const tailwindConfig = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#0f172a",
        accent: "#2250f4",
        danger: "#ef4444",
      },
      fontFamily: {
        sans: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      },
    },
  },
};

export default tailwindConfig;
