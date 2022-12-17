import React from "react";
import {
	AiOutlineOrderedList,
	AiOutlineCalendar,
	AiOutlineBook,
} from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Link from "next/link";

export default function MobileBar() {
	const router = useRouter();

	return (
		<div className="border border-gray-200 shadow-lg dark:border-gray-700 rounded-lg">
			<label htmlFor="tabs" className="sr-only">
				Select Page
			</label>
			<ul className="w-full text-sm font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 flex dark:divide-gray-700 dark:text-gray-400">
				<li className="w-full">
					<Link
						href="/schedule"
						className={`flex justify-center p-4 w-full bg-${
							router.pathname === "/schedule" ? "gray-200" : "white"
						} rounded-l-lg hover:text-gray-700 hover:bg-gray-200 focus:outline-none dark:hover:text-white dark:bg-gray-${
							router.pathname === "/schedule" ? 700 : 800
						} dark:hover:bg-gray-700`}
						aria-current="page"
					>
						<AiOutlineOrderedList className="h-full" size="1.2rem" />
					</Link>
				</li>
				<li className="w-full">
					<Link
						href="/grades"
						className={`flex justify-center p-4 w-full bg-${
							router.pathname.includes("/grades") ? "gray-200" : "white"
						} hover:text-gray-700 hover:bg-gray-200 focus:outline-none dark:hover:text-white dark:bg-gray-${
							router.pathname.includes("/grades") ? 700 : 800
						} dark:hover:bg-gray-700`}
					>
						<AiOutlineBook className="h-full" size="1.2rem" />
					</Link>
				</li>
				<li className="w-full">
					<Link
						href="/attendance"
						className={`flex justify-center p-4 w-full bg-${
							router.pathname === "/attendance" ? "gray-200" : "white"
						} hover:text-gray-700 hover:bg-gray-200 focus:outline-none dark:hover:text-white dark:bg-gray-${
							router.pathname === "/attendance" ? 700 : 800
						} dark:hover:bg-gray-700`}
					>
						<AiOutlineCalendar className="h-full" size="1.2rem" />
					</Link>
				</li>
				<li className="w-full">
					<Link
						href="/documents"
						className={`flex justify-center p-4 w-full bg-${
							router.pathname === "/documents" ? "gray-200" : "white"
						} rounded-r-lg hover:text-gray-700 hover:bg-gray-200 focus:outline-none dark:hover:text-white dark:bg-gray-${
							router.pathname === "/documents" ? 700 : 800
						} dark:hover:bg-gray-700`}
					>
						<IoDocumentTextOutline className="h-full" size="1.2rem" />
					</Link>
				</li>
			</ul>
		</div>
	);
}
