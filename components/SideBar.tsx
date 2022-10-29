import React, { useState, useEffect } from "react";
import { Sidebar } from "flowbite-react";
import { useRouter } from "next/router";
import {
	AiOutlineOrderedList,
	AiOutlineCalendar,
	AiOutlineBook,
} from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsTable } from "react-icons/bs";
import { TbLayoutGrid } from "react-icons/tb";
import Link from "next/link";

interface NavProps {
	studentInfo: any;
	logout: () => void;
}

export default function SideBar({ studentInfo, logout }: NavProps) {
	const router = useRouter();

	return (
		<div className="w-fit h-full py-10 pl-10 hidden md:block">
			<aside className="w-64" aria-label="Sidebar">
				<div className="overflow-y-auto py-4 px-3 bg-white rounded dark:bg-gray-800">
					<ul className="space-y-2">
						<li>
							<Link
								href="/schedule"
								className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<AiOutlineOrderedList className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
								<span className="ml-3">Schedule</span>
							</Link>
						</li>
						<li>
							<Link
								href="/grades"
								className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<AiOutlineBook className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
								<span className="flex-1 ml-3 whitespace-nowrap">Gradebook</span>
							</Link>
						</li>
						<li>
							<Link
								href="/attendance"
								className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<AiOutlineCalendar className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
								<span className="flex-1 ml-3 whitespace-nowrap">
									Attendance
								</span>
							</Link>
						</li>
						<li>
							<Link
								href="/documents"
								className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<IoDocumentTextOutline className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
								<span className="flex-1 ml-3 whitespace-nowrap">Documents</span>
							</Link>
						</li>
						<li>
							<a
								onClick={logout}
								className="cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<FiLogOut className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
								<span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
							</a>
						</li>
					</ul>
					{router.pathname === "/grades" && (
						<ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
							<li>
								<Link
									href="?view=card"
									className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
								>
									<TbLayoutGrid className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
									<span className="ml-3">Card View</span>
								</Link>
							</li>

							<li>
								<Link
									href="?view=table"
									className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
								>
									<BsTable className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
									<span className="ml-3">Table View</span>
								</Link>
							</li>
						</ul>
					)}
				</div>
			</aside>
		</div>
	);
}
