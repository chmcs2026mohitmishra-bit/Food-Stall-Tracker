/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
  themes: [
    {
      midnightflare: {
        "primary": "#ff6b00",        // Neon Orange
        "secondary": "#00f5ff",      // Electric Cyan
        "accent": "#ff00c8",         // Pink Glow
        "neutral": "#0f172a",        // Deep Navy
        "base-100": "#0b1120",       // Main Dark Background
        "base-200": "#111827",
        "base-300": "#1f2937",
        "info": "#38bdf8",
        "success": "#22c55e",
        "warning": "#facc15",
        "error": "#ef4444",
      },
    },
  ],
}
};