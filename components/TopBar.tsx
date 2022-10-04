import React from "react";
import { Navbar, Dropdown, Avatar, DarkThemeToggle } from "flowbite-react";

interface TopBarProps {
	studentInfo: any;
	logout: () => void;
}

export default function TopBar({ studentInfo, logout }: TopBarProps) {
	return (
		<div className="fixed top-0 w-screen mb-24">
			<Navbar fluid={true} rounded={true}>
				<Navbar.Brand href="https://gmelon.pages.dev/login">
					<img
						src="assets/logo.png"
						className="mr-3 h-6 sm:h-9"
						alt="Flowbite Logo"
					/>
					<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
						Grade Melon
					</span>
				</Navbar.Brand>
				<div className="flex md:order-2">
					<div className="pr-4">
						<DarkThemeToggle />
					</div>
					{studentInfo && (
						<div>
							<Dropdown
								arrowIcon={false}
								inline={true}
								label={
									<Avatar
										alt="User settings"
										img={
											studentInfo.photo
												? `data:image/png;base64,${studentInfo.photo}`
												: ""
										}
										rounded
										bordered
									/>
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
					<Navbar.Toggle />
				</div>
			</Navbar>
		</div>
	);
}
