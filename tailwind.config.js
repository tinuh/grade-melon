/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./node_modules/flowbite-react/**/*.js",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			background: "#000000",
			colors: {
				primary: {
					50: "#fff1f2",
					100: "#ffe4e6",
					200: "#fecdd3",
					300: "#fda4af",
					400: "#fb7185",
					500: "#f43f5e",
					600: "#e11d48",
					700: "#be123c",
					800: "#9f1239",
					900: "#881337",
				},
			},
		},
		fontFamily: {
			sans: ["Manrope", "sans-serif"],
		},
	},
	safelist: [
		{
      pattern: /(text|bg)-(green|blue|yellow|orange|red)-400/,
    },
		{
			pattern: /bg-gray-(50|100|700|800|900)/,
		}
	],
	plugins: [require("flowbite/plugin")],
};
