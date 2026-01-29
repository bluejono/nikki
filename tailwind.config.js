/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter_400Regular"],
        inter: ["Inter_400Regular"],
        serif: ["Merriweather_400Regular"],
        merriweather: ["Merriweather_400Regular"],
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".font-regular": { fontFamily: "Inter_400Regular" },
        ".font-medium": { fontFamily: "Inter_500Medium" },
        ".font-semibold": { fontFamily: "Inter_600SemiBold" },
        ".font-bold": { fontFamily: "Inter_700Bold" },
        ".font-black": { fontFamily: "Inter_900Black" },
        ".font-serif": { fontFamily: "Merriweather_400Regular" },
        ".font-serif-bold": { fontFamily: "Merriweather_700Bold" },
        ".font-serif-black": { fontFamily: "Merriweather_900Black" },
      });
    },
  ],
};
