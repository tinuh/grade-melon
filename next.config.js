const withPwa = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPwa({
	swcMinify: false,
	reactStrictMode: true,
	images: {
		unoptimized: true,
	},
	experimental: {
		runtime: 'experimental-edge',
	},
});

module.exports = nextConfig;
