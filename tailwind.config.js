/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#E59E1A",
        amber: "#F5B041",
        "golden-tint": "#FEF7EA",

        background: "#F9FAFB",
        surface: "#FFFFFF",

        foreground: "#1F2937",
        muted: "#6B7280",
        border: "#E5E7EB",

        success: "#16A34A",
        danger: "#DC2626",

         // Order status backgrounds
        "status-confirmed-bg": "#DBEAFE",
        "status-processing-bg": "#FEF3C7",
        "status-shipped-bg": "#EDE9FE",
        "status-delivered-bg": "#DCFCE7",
        "status-cancelled-bg": "#FEE2E2",

        // Order status text
        "status-confirmed": "#1D4ED8",
        "status-processing": "#B45309",
        "status-shipped": "#6D28D9",
        "status-delivered": "#15803D",
        "status-cancelled": "#B91C1C",
      }
    },
  },
  plugins: [],
};
