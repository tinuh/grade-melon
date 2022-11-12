import Head from "next/head";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineOrderedList, AiOutlineCalendar } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiMoon } from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import { motion } from "framer-motion";

interface HomeProps {
	client: any;
}

export default function Home({ client }: HomeProps) {
	const router = useRouter();

	useEffect(() => {
		if (localStorage.getItem("remember") === "true" || client) {
			router.push("/login");
		}
	}, []);

	const features = [
		{
			name: "Edit your Grades",
			icon: <BiEditAlt />,
			description:
				"Edit your grades and see how it affects your overall class grade.",
		},
		{
			name: "Grade Optimizer",
			icon: <BsGraphUp />,
			description:
				"See the possible ways that you could earn your desired grade in a class.",
		},
		{
			name: "View your Schedule",
			icon: <AiOutlineCalendar />,
			description: "View your schedule for all the terms in a year.",
		},
		{
			name: "Check your Attendance",
			icon: <AiOutlineOrderedList />,
			description:
				"Check if you were tardy or absent and view totals per period in a bar graph.",
		},
		{
			name: "View Documents",
			icon: <IoDocumentTextOutline />,
			description:
				"Look at and download transcripts, report cards, and other documents.",
		},
		{
			name: "Dark Mode",
			icon: <FiMoon />,
			description:
				"Dark mode is available for all pages. It can be toggled on the Top Bar.",
		},
	];

	return (
		<div className="text-left px-5 sm:px-12 md:px-24 lg:px-36 xl:px-48 py-5 md:py-10 overflow-hidden">
			<Head>
				<title>Grade Melon</title>
			</Head>
			<div className="flex pb-16">
				<div>
					<motion.h1
						initial={{ x: 0, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="font-bold dark:text-white text-5xl"
					>
						Grade Melon
					</motion.h1>
					<motion.p
						initial={{ x: 0, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.1, duration: 0.5 }}
						className="font-medium dark:text-white text-xl pt-3 pb-6"
					>
						Stay in control of your grades.
					</motion.p>
					<motion.div
						initial={{ x: 0, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						<Link href="/login">
							<button
								type="button"
								className="overflow-hidden group relative inline-flex items-center focus:outline-none text-white bg-gradient-to-br from-primary-600 to-green-500 hover:bg-primary-800 hover:scale-105 transform transition duration-300 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2"
							>
								<span className="transition-all group-hover:mr-6">
									Get Started
								</span>
								<span className="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4">
									<FaArrowRight size={"1rem"} />
								</span>
							</button>
						</Link>
					</motion.div>
					<motion.p
						initial={{ x: 0, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className="pt-5 text-gray-500 w-fit md:w-1/2"
					>
						Tired of using StudentVue? Grade Melon is an all new third party app
						to help you stay in control of your grades. It allows any student
						using Synergy StudentVue to login to check their schedule and
						calculate their grades.
					</motion.p>
				</div>
				<div className="hidden md:flex">
					<div>
						<motion.img
							initial={{ x: 0, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.5 }}
							className="w-full"
							alt="image"
							src="/assets/a+.webp"
						/>
					</div>
				</div>
			</div>
			<motion.h2
				initial={{ x: 0, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay: 0.4, duration: 0.5 }}
				className="font-bold dark:text-white text-3xl text-center"
			>
				Features
			</motion.h2>
			<div className="flex flex-wrap gap-5 pb-10 pt-5 justify-center">
				{features.map(({ name, icon, description }, i) => (
					<motion.div
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{
							delay: 0.5 + i * 0.1,
							duration: 0.5,
						}}
						key={i}
						className="w-full md:w-64 rounded-lg border-2 border-black dark:border-white transition-all duration-300 border-opacity-0 dark:border-opacity-0 hover:border-opacity-100 dark:hover:border-opacity-100 p-5 bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10"
					>
						<p className="font-bold flex gap-2 items-center dark:text-white pb-2">
							{icon}
							{name}
						</p>
						<span className="text-xs text-gray-500 dark:text-gray-400">
							{description}
						</span>
					</motion.div>
				))}
			</div>
			<motion.h2
				initial={{ x: 0, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay: 1.1, duration: 0.5 }}
				className="font-bold dark:text-white text-3xl"
			>
				Open Source!
			</motion.h2>
			<motion.p
				initial={{ x: 0, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay: 1.2, duration: 0.5 }}
				className="py-3 text-gray-500 w-fit md:w-1/2"
			>
				Grade Melon is completely open source! You can find the source code on
				our Github. We are commited to maintain transparency with our users.
			</motion.p>
			<motion.div
				initial={{ x: 0, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay: 1.3, duration: 0.5 }}
			>
				<a href="https://github.com/tinuh/grade-melon" target="blank">
					<button className="focus:outline-none text-white bg-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
						<div className="flex gap-2 items-center">
							<FaGithub size={"1.3rem"} /> Github Repository
						</div>
					</button>
				</a>
			</motion.div>
			<motion.h2
				initial={{ x: 0, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay: 1.4, duration: 0.5 }}
				className="font-bold dark:text-white text-3xl mt-10"
			>
				Contact
			</motion.h2>
			<motion.p
				initial={{ x: 0, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay: 1.5, duration: 0.5 }}
				className="pt-3 text-gray-500 w-fit md:w-1/2"
			>
				If you have bug reports/suggestions, feel free to contact us by sending
				an email!
			</motion.p>
			<Link href="mailto:tinu@grademelon.com">
				<motion.p
					initial={{ x: 0, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ delay: 1.6, duration: 0.5 }}
					className="py-3 dark:text-white font-bold flex gap-2 items-center w-fit md:w-1/2"
				>
					<HiOutlineMail size="1.3rem" /> tinu@grademelon.com
				</motion.p>
			</Link>
		</div>
	);
}
