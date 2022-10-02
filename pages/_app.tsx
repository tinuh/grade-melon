import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import StudentVue from "studentvue";
import { Flowbite } from "flowbite-react";
import { DarkThemeToggle, Toast } from "flowbite-react";
import { HiX } from "react-icons/hi";
import Nav from "../components/Nav";
import { useRouter } from "next/router";

interface Toast {
	title: string;
	type: "success" | "error" | "warning" | "info";
}

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [client, setClient] = useState(undefined);
	const [studentInfo, setStudentInfo] = useState(undefined);
	const [toasts, setToasts] = useState<Toast[]>([]);

	const login = async (username, password, save) => {
		await StudentVue.login("https://md-mcps-psv.edupoint.com", {
			username: username,
			password: password,
		})
			.then(async (res) => {
				await setClient(res);
				console.log(res);
				if (save) {
					localStorage.setItem("remember", "true");
					localStorage.setItem("username", username);
					localStorage.setItem("password", password);
				} else {
					localStorage.setItem("remember", "false");
					localStorage.removeItem("username");
					localStorage.removeItem("password");
				}

				return res;
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

		return undefined;
	};

	const logout = () => {
		setClient(undefined);
		localStorage.removeItem("username");
		localStorage.removeItem("password");
		router.push("/login");
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
			router.push("/schedule");
		}
	}, [client]);

	return (
		<Flowbite>
			{toasts.map(({ title, type }, i) => (
				<div className="absolute p-5" key={i}>
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
			<img
				className="fixed bottom-0 w-screen -z-10"
				src="assets/BgBottom.png"
				alt="logo"
			/>
			<div
				className={`dark:min-h-screen bg-gray-50 dark:bg-gray-900 -z-20 ${
					router.pathname === "/login" ? "" : "flex"
				}`}
			>
				{router.pathname !== "/login" && (
					<Nav studentInfo={studentInfo} logout={logout} />
				)}
				<Component
					{...pageProps}
					client={client}
					login={login}
					setClient={setClient}
				/>
			</div>
		</Flowbite>
	);
}

export default MyApp;
