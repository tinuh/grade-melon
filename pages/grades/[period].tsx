import React, { useState, useEffect } from "react";
import { Spinner, Table, Progress, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import {
	parseGrades,
	updateCourse,
	Grades as GradesType,
	Course,
} from "../../utils/grades";
import Head from "next/head";

interface GradesProps {
	client: any;
	grades: GradesType;
	setGrades: (grades: GradesType) => void;
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
					setGrades(parseGrades(res));
					setCourse(
						parseGrades(res).courses.filter(
							(course) => course.period === parseInt(period)
						)[0]
					);
					setLoading(false);
				});
			} else {
				setCourse(
					grades.courses.filter(
						(course) => course.period === parseInt(period)
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

	const update = async (e, assignmentId: number, update: string) => {
		let newGrades = await updateCourse(course, assignmentId, update, parseInt(e.target.value));
		await setCourse(newGrades);
		await console.log(course);
	};

	return (
		<div className="p-5 md:p-10">
			<Head>
				<title>{course ? `${course.name} - Grade Melon` : "Grade Melon"}</title>
			</Head>
			{loading ? (
				<div className="flex justify-center">
					<Spinner size="xl" color="pink" />
				</div>
			) : (
				<div>
					<h1 className="flex flex-wrap text-xl md:text-3xl font-bold text-gray-900 dark:text-white md:mb-2.5">
						{course.name}
					</h1>
					<p className="text-md tracking-tight mb-2.5 text-gray-900 dark:text-white">
						{course.teacher.name}
					</p>
					<div className="text-base font-medium mb-2 dark:text-white">
						{course.grade.letter} ({course.grade.raw}%)
					</div>
					<Progress
						progress={course.grade.raw}
						size="md"
						color={course.grade.color}
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
								{course.assignments.map(
									({ name, date, grade, category, points }, i) => (
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
											<td className="py-4 px-6">
												<div className="flex items-center gap-2">
													<input
														type="number"
														value={points.earned}
														onChange={(e) => update(e, i, "earned")}
														className="w-12 inline-block bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
													/>
													/
													<input
														type="number"
														value={points.possible}
														onChange={(e) => update(e, i, "possible")}
														className="w-12 inline-block bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
													/>
												</div>
											</td>
											<td className="py-4 px-6">{category}</td>
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
