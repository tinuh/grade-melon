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

export default function Nav({ studentInfo, logout }: NavProps) {
	const router = useRouter();

	return (
		<div className="w-fit h-full py-10 pl-10">
			<Sidebar aria-label="Sidebar with logo branding example">
				<Sidebar.Items>
					<Sidebar.ItemGroup>
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
						<Link href="/documents">
							<Sidebar.Item href="#" icon={IoDocumentTextOutline}>
								Documents
							</Sidebar.Item>
						</Link>
						<Sidebar.Item onClick={logout} href="#" icon={FiLogOut}>
							Logout
						</Sidebar.Item>
					</Sidebar.ItemGroup>
					{router.pathname === "/grades" && (
						<Sidebar.ItemGroup>
							<Link href="?view=card">
								<Sidebar.Item href="#" icon={TbLayoutGrid}>
									Card View
								</Sidebar.Item>
							</Link>
							<Link href="?view=table">
								<Sidebar.Item href="#table" icon={BsTable}>
									Table View
								</Sidebar.Item>
							</Link>
						</Sidebar.ItemGroup>
					)}
				</Sidebar.Items>
			</Sidebar>
		</div>
	);
}
