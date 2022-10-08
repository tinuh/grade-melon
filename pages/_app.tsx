import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import StudentVue from "studentvue";
import { Flowbite } from "flowbite-react";
import { Toast } from "flowbite-react";
import { HiX } from "react-icons/hi";
import SideBar from "../components/SideBar";
import MobileBar from "../components/MobileBar";
import Topbar from "../components/TopBar";
import { useRouter } from "next/router";
import Head from "next/head";
import { Grades } from "../utils/grades";

interface Toast {
	title: string;
	type: "success" | "error" | "warning" | "info";
}

const noShowNav = ["/login", "/"];

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [client, setClient] = useState(undefined);
	const [studentInfo, setStudentInfo] = useState(undefined);
	const [toasts, setToasts] = useState<Toast[]>([]);
	const [grades, setGrades] = useState<Grades>();

	const login = async (username, password, save) => {
		await StudentVue.login("https://md-mcps-psv.edupoint.com", {
			username: username,
			password: password,
		})
			.then(async (res) => {
				await setClient(res);
				if (save) {
					localStorage.setItem("remember", "true");
					localStorage.setItem("username", username);
					localStorage.setItem("password", password);
				} else {
					localStorage.setItem("remember", "false");
					localStorage.removeItem("username");
					localStorage.removeItem("password");
				}

				return true;
			})
			.catch((err) => {
				console.log(err);
				setToasts((toasts) => [
					...toasts,
					{
						title: err.message,
						type: "error",
					},
				]);
			});

		return false;
	};

	const logout = async () => {
		await setClient(undefined);
		await router.push("/login");
		await setStudentInfo(undefined);
		await setGrades(undefined);
		await localStorage.removeItem("username");
		await localStorage.removeItem("password");
	};

	useEffect(() => {
		let username = localStorage.getItem("username");
		console.log(username);
		let password = localStorage.getItem("password");
		let remember = localStorage.getItem("remember");
		if (remember === "true" && username && password) {
			login(username, password, true);
		}
	}, []);

	useEffect(() => {
		if (client !== undefined) {
			try {
				client.studentInfo().then((res) => {
					console.log(res);
					setStudentInfo(res);
				});
			} catch {
				console.log("waiting");
			}
			if (router.pathname === "/login") {
				router.push("/schedule");
			}
		}
	}, [client]);

	return (
		<Flowbite>
			<Head>
				<title>Grade Melon</title>
			</Head>
			{toasts.map(({ title, type }, i) => (
				<div className="absolute p-5 z-10" key={i}>
					<Toast>
						<div
							onClick={() =>
								setToasts((prev) => {
									prev.splice(i, 1);
									return prev;
								})
							}
							className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
						>
							<HiX className="h-5 w-5" />
						</div>
						<div className="ml-3 text-sm font-normal">{title}</div>
						<Toast.Toggle />
					</Toast>
				</div>
			))}
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
				<Topbar studentInfo={studentInfo} logout={logout} />
				<div>
					{noShowNav.includes(router.pathname) && (
						<Component
							{...pageProps}
							client={client}
							login={login}
							setClient={setClient}
							grades={grades}
							setGrades={setGrades}
						/>
					)}

					{!noShowNav.includes(router.pathname) && (
						<div className="pb-16 md:pb-0">
							<div className="hidden md:flex">
								<SideBar studentInfo={studentInfo} logout={logout} />
								<Component
									{...pageProps}
									client={client}
									login={login}
									setClient={setClient}
									grades={grades}
									setGrades={setGrades}
								/>
							</div>
							<div className="md:hidden">
								<Component
									{...pageProps}
									client={client}
									login={login}
									setClient={setClient}
									grades={grades}
									setGrades={setGrades}
								/>
								<div className="px-4 fixed bottom-5 w-full">
									<MobileBar />
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</Flowbite>
	);
}

export default MyApp;
