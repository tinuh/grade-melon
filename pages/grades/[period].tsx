import React, { useState, useEffect } from "react";
import { Spinner, Table, Progress } from "flowbite-react";
import { useRouter } from "next/router";
import Head from "next/head";

interface GradesProps {
	client: any;
	grades: any;
	setGrades: (grades: any) => void;
}

interface Course {
	title: string;
	staff: {
		name: string;
	};
	marks: [
		{
			assignments: [
				{
					name: string;
					score: {
						value: number;
					};
					room: string;
					date: {
						due: Date;
					};
					type: string;
				}
			];
			calculatedScore: {
				raw: number;
			};
		}
	];
}

export default function Grades({ client, grades, setGrades }: GradesProps) {
	const router = useRouter();
	const { period }: { period?: string } = router.query;
	const [loading, setLoading] = useState(true);
	const [course, setCourse] = useState<Course>();
	useEffect(() => {
		try {
			if (!grades) {
				client.gradebook().then((res) => {
					console.log(res);
					setGrades(res.courses);
					setCourse(
						res.courses.filter(
							(course, i) =>
								(course.period ? course.period : i + 1) === parseInt(period)
						)[0]
					);
					setLoading(false);
				});
			} else {
				console.log(
					grades.filter(
						(course, i) =>
							(course.period ? course.period : i + 1) === parseInt(period)
					)[0]
				);
				setCourse(
					grades.filter(
						(course, i) =>
							(course.period ? course.period : i + 1) === parseInt(period)
					)[0]
				);
				setLoading(false);
			}
		} catch {
			if (localStorage.getItem("remember") === "false") {
				router.push("/login");
			}
		}
	}, [client]);

	return (
		<div className="p-5 md:p-10">
			<Head>
				<title>
					{course ? `${course.title} - Grade Melon` : "Grade Melon"}
				</title>
			</Head>
			{loading ? (
				<div className="flex justify-center">
					<Spinner size="xl" />
				</div>
			) : (
				<div>
					<h1 className="flex flex-wrap text-xl md:text-3xl font-bold text-gray-900 dark:text-white md:mb-2.5">
						{course.title}
					</h1>
					<p className="text-md tracking-tight mb-2.5 text-gray-900 dark:text-white">
						{course.staff.name}
					</p>
					<div className="text-base font-medium mb-2 dark:text-white">
						{letterGrade(course.marks[0].calculatedScore.raw)} (
						{course.marks[0].calculatedScore.raw}%)
					</div>
					<Progress
						progress={course.marks[0].calculatedScore.raw}
						size="md"
						color={letterGradeColor(
							letterGrade(course.marks[0].calculatedScore.raw)
						)}
					/>
					<div className="m-5" />
					<div className="overflow-x-auto shadow-md rounded-lg">
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="py-3 pl-6">
										Date
									</th>
									<th scope="col" className="py-3 px-6">
										Assignment
									</th>
									<th scope="col" className="py-3 px-6">
										Score
									</th>
									<th scope="col" className="py-3 px-6">
										Category
									</th>
								</tr>
							</thead>
							<tbody>
								{course.marks[0].assignments.map(
									({ name, date, score, type }, i) => (
										<tr
											className={`bg-${
												i % 2 == 0 ? "white" : "gray-50"
											} border-b dark:bg-gray-${
												i % 2 == 0 ? 900 : 800
											} dark:border-gray-700`}
											key={i}
										>
											<td className="py-4 pl-6">
												{date.due.toLocaleDateString()}
											</td>
											<td className="py-4 px-6">{name}</td>
											<td className="py-4 px-6">{score.value}</td>
											<td className="py-4 px-6">{type}</td>
										</tr>
									)
								)}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
}

const letterGradeColor = (letterGrade: string): string => {
	switch (letterGrade) {
		case "A":
			return "green";
		case "B":
			return "blue";
		case "C":
			return "yellow";
		case "D":
			return "orange";
		case "E":
			return "red";
	}
};

const letterGrade = (grade: number): string => {
	if (grade >= 89.5) {
		return "A";
	} else if (grade >= 79.5) {
		return "B";
	} else if (grade >= 69.5) {
		return "C";
	} else if (grade >= 59.5) {
		return "D";
	} else {
		return "E";
	}
};
