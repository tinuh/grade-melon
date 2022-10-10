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

interface Attendance {
	type: string;
	periodInfos: [
		{
			period: number;
			total: {
				[key: string]: number;
			};
		}
	];
}

export default function Attendance({ client }: AttendanceProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<Attendance>();

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

	const options = {
		elements: {
			bar: {
				borderWidth: 1,
			},
		},
		plugins: {
			title: {
				display: true,
				text: "Attendance",
			},
		},
		responsive: true,
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true,
			},
		},
	};

	const colors = ["#50C878", "#FFEC1F", "#FF7F7F", "#637BFF", "#FA8A20"];
	const chartData = {
		labels: data?.periodInfos.map((periodInfo) => periodInfo.period),
		datasets:
			data &&
			Object.keys(data.periodInfos[0].total).map((total, i) => {
				return {
					label: total.slice(0, 1).toUpperCase() + total.slice(1),
					borderWidth: 1,
					data: data.periodInfos.map((periodInfo) => periodInfo.total[total]),
					backgroundColor: colors[i],
				};
			}),
	};

	return (
		<div className="p-10">
			<Head>
				<title>Attendance - Grade Melon</title>
			</Head>
			{loading ? (
				<div className="flex justify-center">
					<Spinner size="xl" color="pink" />
				</div>
			) : (
				<div className="w-full">
					<Bar options={options} data={chartData} />
				</div>
			)}
		</div>
	);
}
