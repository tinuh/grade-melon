import React, { useState, useEffect } from "react";
import { Table, Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import Head from "next/head";

interface ScheduleProps {
	client: any;
}

interface Schedule {
	classes: [
		{
			name: string;
			room: string;
			teacher: {
				name: string;
				email: string;
			};
			period: number;
		}
	];
	terms: [
		{
			name: string;
			index: number;
			date: Date;
		}
	];
}

export default function Schedule({ client }: ScheduleProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [schedule, setSchedule] = useState<Schedule>();
	const [term, setTerm] = useState(0);
	useEffect(() => {
		try {
			client.schedule(term).then((res) => {
				console.log(res);
				setSchedule(res);
				setLoading(false);
			});
		} catch {
			if (localStorage.getItem("remember") === "false") {
				router.push("/login");
			}
		}
	}, [client, term]);

	return (
		<div className="p-10 h-full">
			{loading ? (
				<Spinner size="xl" />
			) : (
				<div className="overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="py-3 pl-6">
									Period
								</th>
								<th scope="col" className="py-3 px-6">
									Course Name
								</th>
								<th scope="col" className="py-3 px-6">
									Room
								</th>
								<th scope="col" className="py-3 px-6">
									Teacher
								</th>
							</tr>
						</thead>
						<Head>
							<title>
								Schedule
							</title>
						</Head>
						<tbody>
							{schedule.classes.map(({ period, name, room, teacher }, i) => (
								<tr
									className={`bg-${
										i % 2 == 0 ? "white" : "gray-50"
									} border-b dark:bg-gray-${
										i % 2 == 0 ? 900 : 800
									} dark:border-gray-700`}
									key={i}
								>
									<th
										scope="row"
										className="py-4 pl-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{period ? period : i}
									</th>
									<td className="py-4 px-6">{name}</td>
									<td className="py-4 px-6">{room}</td>
									<td className="py-4 px-6">{teacher.name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
