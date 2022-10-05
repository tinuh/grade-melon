/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: false,
	reactStrictMode: true,
	swcMinify: true,
	images: {
		unoptimized: true,
	},
};

module.exports = nextConfig;
