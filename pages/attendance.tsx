import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Spinner } from "flowbite-react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import {
	Attendance as AttendanceType,
	parseBarData,
	chartOptions,
	parsePeriods,
} from "../utils/attendance";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Legend,
	Title,
	Tooltip
);

interface AttendanceProps {
	client: any;
}

export default function Attendance({ client }: AttendanceProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<AttendanceType>();

	useEffect(() => {
		try {
			client.attendance().then((res) => {
				console.log(res);
				setData(res);
				setLoading(false);
			});
		} catch {
			if (localStorage.getItem("remember") === "false") {
				router.push("/login");
			}
		}
	}, [client]);

	const barData = parseBarData(data?.absences);

	return (
		<div className="w-full p-10">
			<Head>
				<title>Attendance - Grade Melon</title>
			</Head>
			{loading ? (
				<div className="flex justify-center">
					<Spinner size="xl" color="pink" />
				</div>
			) : (
				<div className="w-full">
					<div className="md:w-2/3 xl:w-1/2">
						<Bar options={chartOptions} data={barData} />
					</div>
					<div className="w-full overflow-x-auto shadow-md rounded-lg mt-5">
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="py-3 pl-6">
										Date
									</th>
									{parsePeriods(data?.absences).map((period, i) => (
										<th key={i} scope="col" className="py-3 px-6">
											{period}
										</th>
									))}
								</tr>
							</thead>
							{data?.absences.map((absence, i) => (
								<tr
									key={i}
									className={`bg-${
										i % 2 == 0 ? "white" : "gray-50"
									} border-b dark:bg-gray-${
										i % 2 == 0 ? 900 : 800
									} dark:border-gray-700`}
								>
									<th
										scope="row"
										className="py-4 pl-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{absence.date.toLocaleDateString()}
									</th>
									{parsePeriods(data?.absences).map((period, i) => (
										<td key={i} scope="col" className="py-3 px-6">
											{
												absence.periods.filter(
													(p) => p.period === parseInt(period)
												)[0]?.name
											}
										</td>
									))}
								</tr>
							))}
							<tbody></tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
}
