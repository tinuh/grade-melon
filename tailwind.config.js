/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: {
		options: {
			safelist: [
				"text-green-400",
				"text-blue-400",
				"text-yellow-400",
				"text-orange-400",
				"text-red-400",
				"bg-gray-800",
				"bg-gray-900",
				"bg-white",
				"bg-gray-50",
				"bg-gray-100",
				"bg-gray-700",
				"bg-gray-800",
				"bg-green-400",
				"bg-blue-400",
				"bg-yellow-400",
				"bg-orange-400",
				"bg-red-400",
			],
		},
		files: [
			"./node_modules/flowbite-react/**/*.js",
			"./pages/**/*.{js,ts,jsx,tsx}",
			"./components/**/*.{js,ts,jsx,tsx}",
		],
	},
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
	plugins: [require("flowbite/plugin")],
};