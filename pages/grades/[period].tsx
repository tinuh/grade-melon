import React, { useState, useEffect } from "react";
import { Spinner, Table, Progress } from "flowbite-react";
import { useRouter } from "next/router";

interface GradesProps {
	client: any;
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

export default function Grades({ client }: GradesProps) {
	const router = useRouter();
	const { period }: { period?: string } = router.query;
	const [loading, setLoading] = useState(true);
	const [course, setCourse] = useState<Course>();
	useEffect(() => {
		try {
			client.gradebook().then((res) => {
				console.log(
					res.courses.filter((course) => course.period === parseInt(period))[0]
				);
				setCourse(
					res.courses.filter(
						(course, i) =>
							(course.period ? course.period : i + 1) === parseInt(period)
					)[0]
				);
				setLoading(false);
			});
		} catch {
			if (localStorage.getItem("remember") === "false") {
				router.push("/login");
			}
		}
	}, [client]);

	return (
		<div className="p-10">
			{loading ? (
				<div className="flex justify-center">
					<Spinner size="xl" />
				</div>
			) : (
				<div>
					<h1 className="flex flex-wrap text-3xl font-bold text-gray-900 dark:text-white mb-2.5">
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
					<Table striped={true}>
						<Table.Head>
							<Table.HeadCell className="!p-4">Date</Table.HeadCell>
							<Table.HeadCell>Assignment Name</Table.HeadCell>
							<Table.HeadCell>Score</Table.HeadCell>
							<Table.HeadCell>Category</Table.HeadCell>
						</Table.Head>
						<Table.Body className="divide-y">
							{course.marks[0].assignments.map(
								({ name, room, date, score, type }, i) => (
									<Table.Row
										key={i}
										className="bg-white dark:border-gray-700 dark:bg-gray-800"
									>
										<Table.Cell>{date.due.toLocaleDateString()}</Table.Cell>
										<Table.Cell>{name}</Table.Cell>
										<Table.Cell>{score.value}</Table.Cell>
										<Table.Cell>{type}</Table.Cell>
									</Table.Row>
								)
							)}
						</Table.Body>
					</Table>
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
