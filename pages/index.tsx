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
			icon: <BiEditAlt size={30} />,
			description:
				"Edit your grades and see how it affects your overall className grade.",
		},
		{
			name: "Grade Optimizer",
			icon: <BsGraphUp size={30} />,
			description:
				"See the possible ways that you could earn your desired grade in a className.",
		},
		{
			name: "View your Schedule",
			icon: <AiOutlineCalendar size={30} />,
			description: "View your schedule for all the terms in a year.",
		},
		{
			name: "Check your Attendance",
			icon: <AiOutlineOrderedList size={30} />,
			description:
				"Check if you were tardy or absent and view totals per period in a bar graph.",
		},
		{
			name: "View Documents",
			icon: <IoDocumentTextOutline size={30} />,
			description:
				"Look at and download transcripts, report cards, and other documents.",
		},
		{
			name: "Dark Mode",
			icon: <FiMoon size={30} />,
			description:
				"Dark mode is available for all pages. It can be toggled on the Top Bar.",
		},
	];

	return (
		<div className="text-left px-9 sm:px-12 md:px-24 lg:px-36 xl:px-48 py-5 md:py-10 overflow-hidden">
			<Head>
				<title>Grade Melon</title>
			</Head>

			<div className="grid max-w-screen-xl py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:max-w-none lg:space-x-8 lg:items-center">
				<div className="mr-auto place-self-center lg:col-span-7">
					<motion.h1
						initial={{ x: 0, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="max-w-2xl mb-4 text-5xl font-bold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
					>
						Grade Melon
					</motion.h1>
					<motion.p
						initial={{ x: 0, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.1, duration: 0.5 }}
						className="max-w-2xl mb-4 text-xl font-medium tracking-tight leading-none md:text-2xl xl:text-3xl dark:text-white"
					>
						Stay in control of your grades.
					</motion.p>
					<motion.p
						initial={{ x: 0, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
					>
						Tired of using StudentVue? Grade Melon is an all new third party app
						to help you stay in control of your grades. It allows any student
						using Synergy StudentVue to login to check their schedule and
						calculate their grades.
					</motion.p>

					<motion.div
						initial={{ x: 0, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.5 }}
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
				</div>
				<div className="hidden dark:hidden lg:mt-0 lg:col-span-5 lg:flex ">
					<motion.img
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className="h-96 w-full"
						src="/assets/herolight.svg"
						alt="mockup"
					/>
				</div>
				<div className="hidden lg:mt-0 lg:col-span-5 light:hidden lg:flex">
					<motion.img
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.5 }}
						className="h-96 w-full"
						src="/assets/hero.svg"
						alt="mockup"
					/>
				</div>
			</div>
			<div className="py-8 mx-auto max-w-screen-xl sm:py-16">
				<div className="max-w-screen-md mb-8 lg:mb-16">
					<motion.h2
						initial={{ x: 0, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.4, duration: 0.5 }}
						className=" text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
					>
						Features
					</motion.h2>
				</div>
				<div className="space-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
					{features.map(({ name, icon, description }, i) => (
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{
								delay: 0.5 + i * 0.1,
								duration: 0.5,
							}}
							key={i}
						>
							<div>
								<div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
									<div className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 flex justify-center items-center">
										{icon}
									</div>
								</div>
								<h3 className="mb-2 text-xl font-bold dark:text-white">
									{name}
								</h3>
								<p className="text-gray-500 dark:text-gray-400">
									{description}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>

			<div className="gap-8 items-center py-8 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 ">
				<div className="mt-4 md:mt-0">
					<motion.h2
						initial={{ x: 0, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 1.1, duration: 0.5 }}
						className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
					>
						Open Source
					</motion.h2>
					<motion.p
						initial={{ x: 0, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 1.2, duration: 0.5 }}
						className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400"
					>
						Grade Melon is completely open source! You can find the source code
						on our Github. We are commited to maintain transparency with our
						users.
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
				</div>
				<motion.img
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
					className="h-96 w-full hidden dark:hidden lg:flex"
					src="/assets/opensourcelight.svg"
					alt="Open Source"
				/>
				<motion.img
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
					className="h-96 w-full hidden light:hidden lg:flex"
					src="/assets/opensource.svg"
					alt="Open Source"
				/>
			</div>
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
