import React, { useState } from "react";
import "../styles/globals.css";
import StudentVue from "studentvue";
import { Flowbite } from "flowbite-react";
import { DarkThemeToggle } from "flowbite-react";
import Nav from "../components/Nav";

const login = async (username, password) => {
	const client = await StudentVue.login("https://md-mcps-psv.edupoint.com", {
		username: username,
		password: password,
	});
	client.schedule().then((res) => {
		console.log(res);
	});

	return client;
};

function MyApp({ Component, pageProps }) {
	const [client, setClient] = useState(undefined);

	return (
		<div>
			<Flowbite>
				<Nav />
				<Component {...pageProps} login={login} setClient={setClient} />
			</Flowbite>
		</div>
	);
}

export default MyApp;
