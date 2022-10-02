import React, { useState, useEffect } from "react";
import { Spinner, Card } from "flowbite-react";
import { useRouter } from "next/router";

interface GradesProps {
	client: any;
}

export default function Grades({ client }: GradesProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [grades, setGrades] = useState([]);
	useEffect(() => {
		try {
			client.gradebook().then((res) => {
				//console.log(res);
				setGrades(getInfoCurrent(res));
				setLoading(false);
			});
		} catch {
			if (localStorage.getItem("remember") === "false") {
				router.push("/login");
			}
		}
	}, [client]);

	return (
		<div>
			{loading ? (
				<div className="flex justify-center">
					<Spinner size="xl" />
				</div>
			) : (
				<>
					{grades.map(
						(
							{
								period,
								courseName,
								roomNumber,
								teacherName,
								gradeNumber,
								letterGrade,
							},
							i
						) => (
							<div className="max-w-sm my-2.5" key = {i}>
								<Card>
									<a href="#">
										<h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
											{courseName}
										</h5>
										<p className="text-md tracking-tight text-gray-900 dark:text-white">
											{teacherName}
										</p>
									</a>
									<div className="mt-2.5 mb-5 flex items-center"></div>
									<div className="flex items-center justify-between">
										<span className="text-3xl font-bold text-gray-900 dark:text-white">
											{letterGrade} ({gradeNumber}%)
										</span>
										<a
											href="#"
											className="rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
										>
											View
										</a>
									</div>
								</Card>
							</div>
						)
					)}
				</>
			)}
		</div>
	);
}

function getInfoCurrent(data) {
	let array1 = Array(data.courses.length);
	for (let i = 0; i < data.courses.length; i++) {
		let period = data.courses[i].period;
		let courseName = data.courses[i].title;
		let roomNumber = data.courses[i].room;
		let teacherName = data.courses[i].staff.name;
		let gradeNumber = data.courses[i].marks[0].calculatedScore.raw;

		let letterGrade;
		if (gradeNumber >= 89.5) {
			letterGrade = "A";
		} else if (gradeNumber >= 79.5) {
			letterGrade = "B";
		} else if (gradeNumber >= 69.5) {
			letterGrade = "C";
		} else if (gradeNumber >= 59.5) {
			letterGrade = "D";
		} else if (gradeNumber == 0) {
			letterGrade = "N/A";
		} else {
			letterGrade = "E";
		}
		array1[i] = {
			period,
			courseName,
			roomNumber,
			teacherName,
			gradeNumber,
			letterGrade,
		};
	}
	return array1;
}
