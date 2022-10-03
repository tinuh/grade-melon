import React, { useState, useEffect } from "react";
import { Table, Spinner } from "flowbite-react";
import { useRouter } from "next/router";

interface ScheduleProps {
	client: any;
}

export default function Schedule({ client }: ScheduleProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [schedule, setSchedule] = useState([]);
	useEffect(() => {
		try {
			client.schedule().then((res) => {
				console.log(res);
				setSchedule(res.classes);
				setLoading(false);
			});
		} catch {
			if (localStorage.getItem("remember") === "false") {
				router.push("/login");
			}
		}
	}, [client]);

	return (
		<div className="p-10 flex justify-center h-full">
			{loading ? (
				<Spinner size="xl" />
			) : (
				<Table striped={true}>
					<Table.Head>
						<Table.HeadCell className="!p-4">Period</Table.HeadCell>
						<Table.HeadCell>Course Name</Table.HeadCell>
						<Table.HeadCell>Room</Table.HeadCell>
						<Table.HeadCell>Teacher</Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y">
						{schedule.map(({ name, room, teacher, period }, i) => (
							<Table.Row
								key={i}
								className="bg-white dark:border-gray-700 dark:bg-gray-800"
							>
								<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
									{period ? period : i}
								</Table.Cell>
								<Table.Cell>{name}</Table.Cell>
								<Table.Cell>{room}</Table.Cell>
								<Table.Cell>{teacher.name}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			)}
		</div>
	);
}
