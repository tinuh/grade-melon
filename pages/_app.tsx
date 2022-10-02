import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import StudentVue from "studentvue";
import { Flowbite } from "flowbite-react";
import { DarkThemeToggle } from "flowbite-react";
import Nav from "../components/Nav";
import { useRouter } from "next/router";

const login = async (username, password, save) => {
	const client = await StudentVue.login("https://md-mcps-psv.edupoint.com", {
		username: username,
		password: password,
	});
	console.log(client);
	if (save) {
		localStorage.setItem("remember", "true");
		localStorage.setItem("username", username);
		localStorage.setItem("password", password);
	} else {
		localStorage.setItem("remember", "false");
		localStorage.removeItem("username");
		localStorage.removeItem("password");
	}

	return client;
};

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [client, setClient] = useState(undefined);
	const [studentInfo, setStudentInfo] = useState(undefined);

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
		if (username !== null) {
			login(username, password, true).then(async (res) => {
				await setClient(res);
			});
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
		}
	}, [client]);

	return (
		<Flowbite>
			<img className="fixed bottom-0 w-screen" src="assets/BgBottom.png" alt="logo" />
			<div
				className={`dark:min-h-screen bg-gray-50 dark:bg-gray-900${
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
