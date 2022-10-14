interface Absense {
	periods: {
		name: string;
		period: number;
	}[];
}

interface Attendance {
	type: string;
	periodInfos: {
		period: number;
		total: {
			[key: string]: number;
		};
	}[];
	absences: Absense[];
}

const chartOptions = {
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

const getColor = (label: string) => {
	if (label.includes("Absent")) return "#FF7F7F";
	if (label.includes("Excused")) return "#FFEC1F";
	if (label.includes("Activities")) return "#50C878";
	if (label.includes("Tardy")) return "#FA8A20";
	return Math.floor(Math.random() * 16777215).toString(16);
};

const parsePeriods = (absences: Absense[]): string[] => {
	if (!absences) return [];
	let periodLabels: string[] = [];

	absences.forEach(({ periods }, i) => {
		periods.forEach((period) => {
			if (!periodLabels.includes(String(period.period)) && period.name) {
				periodLabels.push(String(period.period));
			}
		});
	});

	return periodLabels.sort();
};

const parseBarData = (
	absences: Absense[]
): {
	labels: string[];
	datasets: any[];
} => {
	if (!absences) return { labels: [], datasets: [] };
	let labels = parsePeriods(absences);

	let datasets: any[] = [];
	absences.forEach(({ periods }, i) => {
		periods.forEach((period) => {
			if (!period.name) return;
			let index = datasets.findIndex(
				(dataSet) => dataSet.label === period.name
			);
			if (index === -1) {
				let data = {};
				let set = {
					label: period.name,
					borderWidth: 1,
					backgroundColor: getColor(period.name),
					data: {},
				};
				labels.forEach((label) => {
					if (label === String(period.period)) data[label] = 1;
					else data[label] = 0;
				});
				set.data = data;
				datasets.push(set);
			} else {
				datasets[index].data[period.period]++;
			}
		});
	});
	console.log(datasets);
	console.log(labels);

	return {
		labels,
		datasets,
	};
};

export { parseBarData, chartOptions };
export type { Attendance, Absense };
