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
import { Course } from "../utils/grades";

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
	periodInfos: {
		period: number;
		total: {
			[key: string]: number;
		};
	}[];
	absences: {
		periods: {
			name: string;
			period: number;
		}[];
	}[];
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

	const parsePeriods = (absences: Attendance["absences"]): number[] => {
		if (!absences) return [];
		let periodLabels: number[] = [];

		absences.forEach(({ periods }, i) => {
			periods.forEach((period) => {
				if (!periodLabels.includes(period.period) && period.name) {
					periodLabels.push(period.period);
				}
			});
		});

		return periodLabels.sort();
	};

	const parseDataSets = (absences: Attendance["absences"]) => {
		if (!absences) return [];

		let dataSets: any[] = [];
		absences.forEach(({ periods }, i) => {
			periods.forEach((period) => {
				if (period.name) return;
				let index = dataSets.findIndex(
					(dataSet) => dataSet.label === period.name
				);
				if (index === -1) {
					dataSets.push({
						label: period.name,
						borderWidth: 1,
						color: colors[i],
						data: [1],
					});
				} else {
					dataSets[index].data[0]++;
				}
			});
		});
		console.log(dataSets);

		return dataSets;
	};

	const barData = {
		labels: parsePeriods(data?.absences),
		datasets: parseDataSets(data?.absences),
	};

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
				<div className="w-full md:w-2/3">
					<Bar options={options} data={barData} />
				</div>
			)}
		</div>
	);
}
