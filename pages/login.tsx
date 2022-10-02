import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Checkbox, Button, Spinner } from "flowbite-react";

interface LoginProps {
	setStudentInfo: any;
	client: any;
	setClient: (client: any) => void;
	login: (username: string, password: string, save: boolean) => any;
}

export default function Login({
	setClient,
	login,
	setStudentInfo,
	client,
}: LoginProps) {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [checkbox, setCheckbox] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password, checkbox)
		await setUsername("");
		await setPassword("");
	};

	useEffect(() => {
		if (localStorage.getItem("remember") === "true") {
			setCheckbox(true);
		}
	}, []);

	return (
		<div>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<a
						href="#"
						className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
					>
						<img className="w-8 h-8 mr-2" src="assets/logo.png" alt="logo" />
						Grade Melon
					</a>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Sign in to your account
							</h1>
							<form className="space-y-4 md:space-y-6">
								<div>
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Your ID
									</label>
									<input
										type="text"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="123456"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Password
									</label>
									<input
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required
									/>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-start">
										<div className="flex items-center h-5">
											<input
												id="remember"
												aria-describedby="remember"
												type="checkbox"
												checked={checkbox}
												onChange={(e) => setCheckbox(e.target.checked)}
												className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
												required
											/>
										</div>
										<div className="ml-3 text-sm">
											<label
												htmlFor="remember"
												className="text-gray-500 dark:text-gray-300"
											>
												Remember me
											</label>
										</div>
									</div>
								</div>
								<button
									onClick={handleSubmit}
									className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									Sign in
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
