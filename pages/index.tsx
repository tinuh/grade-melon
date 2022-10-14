import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaGithub, FaArrowRight } from "react-icons/fa";
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

	return (
		<div className="text-left px-5 md:px-20 pt-5 md:pt-10 overflow-hidden">
			<Head>
				<title>Grade Melon</title>
			</Head>
			<div className="flex pb-16">
				<div>
					<motion.h1
						initial={{ x: -200, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="font-bold dark:text-white text-5xl"
					>
						Grade Melon
					</motion.h1>
					<motion.p
						initial={{ x: -200, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.1, duration: 0.5 }}
						className="font-medium dark:text-white text-xl pt-3 pb-6"
					>
						A new way to stay in control of your grades.
					</motion.p>
					<motion.div
						initial={{ x: -200, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						<Link href="/login">
							<button
								type="button"
								className="overflow-hidden group relative inline-flex items-center focus:outline-none text-white bg-gradient-to-r from-primary-600 to-green-500 hover:bg-primary-800 hover:scale-105 transform transition duration-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
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
						initial={{ x: -200, opacity: 0 }}
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
				<div className="hidden md:flex gap-5">
					<div>
						<motion.img
							initial={{ x: 200, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.5 }}
							className="w-96"
							alt="image"
							src="/assets/a+.webp"
						/>
					</div>
					<div>
						<motion.img
							initial={{ x: 200, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ delay: 0.1, duration: 0.5 }}
							className="w-96"
							alt="image"
							src="/assets/books.webp"
						/>
					</div>
				</div>
			</div>
			<motion.h2
				initial={{ x: -200, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay: 0.4, duration: 0.5 }}
				className="font-bold dark:text-white text-3xl"
			>
				Open Source!
			</motion.h2>
			<motion.p
				initial={{ x: -200, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay: 0.5, duration: 0.5 }}
				className="py-3 text-gray-500 w-fit md:w-1/2"
			>
				Grade Melon is completely open source! You can find the source code on
				our Github. We are commited to maintain transparency with our users.
			</motion.p>
			<motion.div
				initial={{ x: -200, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay: 0.6, duration: 0.5 }}
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
	);
}
