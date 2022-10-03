import React, { useState, useEffect } from "react";
import { DarkThemeToggle, Sidebar } from "flowbite-react";
import { useRouter } from "next/router";
import {
	AiOutlineOrderedList,
	AiOutlineCalendar,
	AiOutlineBook,
} from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";

interface NavProps {
	studentInfo: any;
	logout: () => void;
}

export default function Nav({ studentInfo, logout }: NavProps) {
	const router = useRouter();

	return (
		<div className="w-fit h-full py-10 pl-10">
			<Sidebar aria-label="Sidebar with logo branding example">
				{studentInfo && (
					<Sidebar.Logo
						href="#"
						img={studentInfo.photo ? `data:image/png;base64,${studentInfo.photo}` : 'assets/logo.png'}
						imgAlt=""
						className="rounded-full"
					>
						{studentInfo.student.name}
					</Sidebar.Logo>
				)}
				<Sidebar.Items>
					<Sidebar.ItemGroup>
						<DarkThemeToggle />
						<Link href="/schedule">
							<Sidebar.Item href="#" icon={AiOutlineOrderedList}>
								Schedule
							</Sidebar.Item>
						</Link>
						<Link href="/grades">
							<Sidebar.Item href="#" icon={AiOutlineBook}>
								Gradebook
							</Sidebar.Item>
						</Link>
						<Link href="/attendance">
							<Sidebar.Item href="#" icon={AiOutlineCalendar}>
								Attendance
							</Sidebar.Item>
						</Link>
						<Sidebar.Item onClick={logout} href="#" icon={FiLogOut}>
							Logout
						</Sidebar.Item>
					</Sidebar.ItemGroup>
				</Sidebar.Items>
			</Sidebar>
		</div>
	);
}
