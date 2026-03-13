export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { background: "var(--color-bg)", primary: "var(--color-primary)", accent: "var(--color-accent)", text: "var(--color-text)" },
      fontFamily: { sans: ["var(--font-sans)"], drama:["var(--font-drama)"], mono: ["var(--font-mono)"] },
    }
  }
}
