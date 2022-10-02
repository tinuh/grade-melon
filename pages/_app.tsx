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

	client.schedule().then((res) => {
		console.log(res);
	});

	return client;
};

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [client, setClient] = useState(undefined);

	useEffect(() => {
		let username = localStorage.getItem("username");
		console.log(username);
		let password = localStorage.getItem("password");
		if (username !== null) {
			login(username, password, true).then((res) => {
				setClient(res);
			});
		}
	}, []);

	return (
		<div>
			<Flowbite>
				<Nav />
				<Component
					{...pageProps}
					client={client}
					login={login}
					setClient={setClient}
				/>
			</Flowbite>
		</div>
	);
}

export default MyApp;
