import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
	return (
		<div>
			<footer className="w-full h-16 p-4 bg-white rounded-lg shadow flex items-center justify-between md:p-6 dark:bg-gray-800">
				<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
					© 2022 Grade Melon™
				</span>
				<span className="text-sm text-white sm:text-center">
					<a target="blank" href="https://github.com/tinuh/grade-melon">
						<FaGithub size={"1.3rem"} />
					</a>
				</span>
			</footer>
		</div>
	);
}
