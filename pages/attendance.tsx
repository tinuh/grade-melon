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
		<div className="p-10 w-full">
			<Head>
				<title>Attendance - Grade Melon</title>
			</Head>
			{loading ? (
				<div className="flex justify-center">
					<Spinner size="xl" color="pink" />
				</div>
			) : (
				<div className="w-full md:w-1/2">
					<Bar options={chartOptions} data={barData} />
				</div>
			)}
		</div>
	);
}
