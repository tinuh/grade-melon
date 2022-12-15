import React from "react";
import Router, { useRouter } from "next/router";

export default function NotFound() {
	const router = useRouter();

	React.useEffect(() => {
		router.push(router.pathname);
	}, [router]);

	return (
		<div className="p-5 md:p-10">
			<h1 className="dark:text-white font-bold text-4xl">
				404: Found Not Found
			</h1>
		</div>
	);
}
