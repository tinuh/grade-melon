import React from "react";

export default function FAQ() {
	return (
		<div className="p-5 md:p-10 flex-1">
			<h1 className="font-bold text-center text-3xl dark:text-white pb-5">
				FAQ & Info
			</h1>
			<div className="space-y-4">
				<details className="group [&_summary::-webkit-details-marker]:hidden">
					<summary className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-white dark:bg-gray-800 border dark:border-gray-700 dark:text-white">
						<h2 className="font-medium">Is Grade Melon an App?</h2>

						<svg
							className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</summary>

					<p className="px-4 mt-4 leading-relaxed dark:text-white">
						Yes, Grade Melon is a PWA (Progessive Web App). <br />
						To Add Grade Melon to your Home Screen, follow these steps:
					</p>
					<p className="px-4 mt-4 leading-relaxed dark:text-white">
						<span className="flex gap-2 items-center">
							Apple
							<img className="h-4 inline-block" src="/assets/apple.png" />
						</span>
					</p>
					<ul className="list-disc pl-10 dark:text-white">
						<li>Open Grade Melon in Safari</li>
						<li>Click on the Share button in the bottom bar</li>
						<li>Click on &quot;Add to Home Screen&quot;</li>
					</ul>
					<p className="px-4 mt-4 leading-relaxed dark:text-white">
						<span className="flex gap-2 items-center">
							Android
							<img className="h-4 inline-block" src="/assets/android.png" />
						</span>
					</p>
					<ul className="list-disc ml-10 dark:text-white">
						<li>Open Grade Melon in Chrome</li>
						<li>Click on the 3 dots in the top right corner</li>
						<li>Click on &quot;Add to Home Screen&quot;</li>
					</ul>
				</details>

				<details className="group [&_summary::-webkit-details-marker]:hidden">
					<summary className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-white dark:bg-gray-800 border dark:border-gray-700 dark:text-white">
						<h2 className="font-medium">
							How do I send feedback regarding Grade Melon?
						</h2>

						<svg
							className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</summary>

					<p className="px-4 mt-4 leading-relaxed dark:text-white">
						To send feedback regarding Grade Melon, please email{" "}
						<a href="mailto:tinu@grademelon.com" className="text-primary-500">
							tinu@grademelon.com
						</a>
						.
					</p>
				</details>
			</div>
		</div>
	);
}
