import react from "react";
import { useTheme } from "flowbite-react";

export default function BackgroundColor() {
	const theme = useTheme().mode;

	return (
		<style jsx global>{`
			body {
				background-color: ${useTheme().mode === "light"
					? "#f9fafb"
					: "#111827"};
			}
		`}</style>
	);
};