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
		<div className="border rounded-lg">
			<label htmlFor="tabs" className="sr-only">
				Select Page
			</label>
			<ul className="w-full text-sm font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 shadow flex dark:divide-gray-700 dark:text-gray-400">
				<li className="w-full">
					<Link href="/schedule">
						<a
							href="#"
							className={`flex justify-center p-4 w-full bg-${
								router.pathname === "/schedule" ? "gray-100" : "white"
							} rounded-l-lg active focus:outline-none dark:bg-gray-${
								router.pathname === "/schedule" ? 700 : 800
							} dark:hover:bg-gray-700`}
							aria-current="page"
						>
							<AiOutlineOrderedList className="h-full" size="1.2rem" />
						</a>
					</Link>
				</li>
				<li className="w-full">
					<Link href="/grades">
						<a
							href="#"
							className={`flex justify-center p-4 w-full bg-${
								router.pathname === "/grades" ? "gray-100" : "white"
							} hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-${
								router.pathname === "/grades" ? 700 : 800
							} dark:hover:bg-gray-700`}
						>
							<AiOutlineBook className="h-full" size="1.2rem" />
						</a>
					</Link>
				</li>
				<li className="w-full">
					<Link href="/attendance">
						<a
							href="#"
							className={`flex justify-center p-4 w-full bg-${
								router.pathname === "/attendance" ? "gray-100" : "white"
							} hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-${
								router.pathname === "/attendance" ? 700 : 800
							} dark:hover:bg-gray-700`}
						>
							<AiOutlineCalendar className="h-full" size="1.2rem" />
						</a>
					</Link>
				</li>
				<li className="w-full">
					<Link href="/documents">
						<a
							href="#"
							className={`flex justify-center p-4 w-full bg-${
								router.pathname === "/documents" ? "gray-100" : "white"
							} rounded-r-lg hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-${
								router.pathname === "/documents" ? 700 : 800
							} dark:hover:bg-gray-700`}
						>
							<IoDocumentTextOutline className="h-full" size="1.2rem" />
						</a>
					</Link>
				</li>
			</ul>
		</div>
	);
}
