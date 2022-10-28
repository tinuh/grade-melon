import React from "react";
import { Navbar, Dropdown, Avatar, DarkThemeToggle } from "flowbite-react";
import Link from "next/link";

interface TopBarProps {
	studentInfo: any;
	logout: () => void;
}

export default function TopBar({ studentInfo, logout }: TopBarProps) {
	return (
		<div className="fixed top-0 w-full">
			<Navbar fluid={true} rounded={true}>
				<Link href="/">
					<Navbar.Brand href="#">
						<img
							src="/assets/logo.png"
							className="mr-3 h-6 sm:h-9"
							alt="Grade Melon Logo"
						/>
						<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
							Grade Melon
						</span>
					</Navbar.Brand>
				</Link>
				<div className="flex md:order-2">
					<div>
						<DarkThemeToggle />
					</div>
					{studentInfo && (
						<div className="pl-4">
							<Dropdown
								arrowIcon={false}
								inline={true}
								label={
									<button
										type="button"
										className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
										id="user-menu-button"
										aria-expanded="false"
										data-dropdown-toggle="user-dropdown"
										data-dropdown-placement="bottom"
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
								}
							>
								<Dropdown.Header>
									<span className="block text-sm">
										{studentInfo?.student.name}
									</span>
								</Dropdown.Header>
								<Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
							</Dropdown>
						</div>
					)}
				</div>
			</Navbar>
		</div>
	);
}
