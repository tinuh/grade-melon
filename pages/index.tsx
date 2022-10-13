import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaGithub } from "react-icons/fa";

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
		<div className="text-left px-5 md:px-20 pt-5 md:pt-10">
			<Head>
				<title>Grade Melon</title>
			</Head>
			<div className="flex pb-16">
				<div>
					<h1 className="font-bold dark:text-white text-5xl">Grade Melon</h1>
					<p className="font-medium dark:text-white text-xl pt-3 pb-6">
						A new way to stay in control of your grades.
					</p>
					<Link href="/login">
						<button
							type="button"
							className="focus:outline-none text-white bg-gradient-to-r from-primary-600 to-green-500 hover:bg-primary-800 hover:scale-105 transform transition duration-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
						>
							Get Started
						</button>
					</Link>
					<p className="pt-5 text-gray-500 w-fit md:w-1/2">
						Tired of using StudentVue? Grade Melon is an all new third party app
						to help you stay in control of your grades. It allows any student
						using Synergy StudentVue to login to check their schedule and
						claculate their grades.
					</p>
				</div>
				<div className="hidden md:flex gap-5">
					<div>
						<img className="w-96" alt="image" src="/assets/a+.webp" />
					</div>
					<div>
						<img className="w-96" alt="image" src="/assets/books.webp" />
					</div>
				</div>
			</div>
			<h2 className="font-bold dark:text-white text-3xl">Open Source!</h2>
			<p className="py-3 text-gray-500 w-fit md:w-1/2">
				Grade Melon is completely open source! You can find the source code on
				our Github. We are commited to maintain transparency with our users.
			</p>
			<a href="https://github.com/tinuh/grade-melon" target="blank">
				<button className="focus:outline-none text-white bg-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
					<div className="flex gap-2 items-center">
						<FaGithub size={"1.3rem"} /> Github Repository
					</div>
				</button>
			</a>
		</div>
	);
}
