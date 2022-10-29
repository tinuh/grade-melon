import React, { useState } from "react";
import { DarkThemeToggle } from "flowbite-react";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";

interface TopBarProps {
	studentInfo: any;
	logout: () => void;
}

export default function TopBar({ studentInfo, logout }: TopBarProps) {
	const [dropdown, setDropdown] = useState(false);

	return (
		<div className="fixed top-0 w-full">
			<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
				<div className=" flex flex-wrap justify-between items-center">
					<Link href="/" className="flex items-center">
						<img
							src="/assets/logo.png"
							className="mr-3 h-6 sm:h-9"
							alt="Grade Melon Logo"
						/>
						<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
							Grade Melon
						</span>
					</Link>
					<div className="flex items-center md:order-2 gap-2">
						<div>
							<DarkThemeToggle />
						</div>
						{studentInfo && (
							<div
								tabIndex={100}
								onBlur={(e) => {
									const target = e.currentTarget;

									requestAnimationFrame(() => {
										if (!target.contains(document.activeElement)) {
											setDropdown(false);
										}
									});
								}}
							>
								<button
									type="button"
									className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
									onClick={() => setDropdown(!dropdown)}
								>
									<span className="sr-only">Open user menu</span>
									<img
										className="w-10 h-10 object-cover rounded-full"
										src={
											studentInfo?.photo
												? `data:image/png;base64,${studentInfo.photo}`
												: "/assets/default-avatar.svg"
										}
										alt="User Icon"
									/>
								</button>

								{dropdown && (
									<div className="top-10 right-4 absolute z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
										<div className="py-3 px-4">
											<span className="block text-sm text-gray-900 truncate dark:text-white">
												{studentInfo?.student.name}
											</span>
											<span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
												{studentInfo?.currentSchool}
											</span>
										</div>
										<ul className="py-1" aria-labelledby="user-menu-button">
											<li>
												<a
													onClick={() => {
														setDropdown(false);
														logout();
													}}
													className="flex gap-2 items-center cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
												>
													<FiLogOut /> Log out
												</a>
											</li>
										</ul>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
}
