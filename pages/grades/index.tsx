import React, { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

interface GradesProps {
	client: any;
	grades: any;
	setGrades: (grades: any) => void;
}

export default function Grades({ client, grades, setGrades }: GradesProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [defaultView, setDefaultView] = useState("card");
	const view = (router.query.view as string) || defaultView;

	useEffect(() => {
		if (localStorage.getItem("defaultView") !== null) {
			setDefaultView(localStorage.getItem("defaultView"));
		}
	}, []);

	useEffect(() => {
		if (router.query.view !== undefined) {
			setDefaultView(router.query.view as string);
			localStorage.setItem("defaultView", router.query.view as string);
		}
	}, [router.query.view]);

	useEffect(() => {
		try {
			if (!grades) {
				client.gradebook().then((res) => {
					console.log(res);
					setGrades(res.courses);
					setLoading(false);
				});
			}
			else {
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
				<title>Gradebook - Grade Melon</title>
			</Head>
			{loading ? (
				<div className="flex justify-center">
					<Spinner size="xl" color="pink" />
				</div>
			) : (
				<div>
					{view === "card" && (
						<div className="flex flex-wrap gap-5">
							{grades.map(({ period, title, staff, marks }, i) => (
								<div className="w-96 h-full" key={i}>
									<div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
										<div>
											<Link href={`/grades/${period ? period : i + 1}`}>
												<div className="hover:cursor-pointer">
													<h5 className="md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
														<p className="font-bold inline-block">
															{period ? period : i + 1}
														</p>{" "}
														- {title}
													</h5>
													<p className="text-md tracking-tight text-gray-900 dark:text-white">
														{staff.name}
													</p>
												</div>
											</Link>
											<div className="mt-2.5 md:mb-5 flex items-center"></div>
											<div className="flex items-center justify-between">
												<span
													className={`text-xl md:text-3xl font-bold text-${letterGradeColor(
														letterGrade(marks[0].calculatedScore.raw)
													)}-400`}
												>
													{letterGrade(marks[0].calculatedScore.raw)} (
													{marks[0].calculatedScore.raw}%)
												</span>
												<Link href={`/grades/${period ? period : i + 1}`}>
													<a className="rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
														View
													</a>
												</Link>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
					{view === "table" && (
						<div className="overflow-x-auto shadow-md rounded-lg">
							<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" className="py-3 pl-6">
											Period
										</th>
										<th scope="col" className="py-3 px-6">
											Course Name
										</th>
										<th scope="col" className="py-3 px-6">
											Teacher
										</th>
										<th scope="col" className="py-3 px-6">
											Grade
										</th>
									</tr>
								</thead>
								<tbody>
									{grades.map(({ period, title, staff, marks }, i) => (
										<tr
											className={`bg-${
												i % 2 == 0 ? "white" : "gray-50"
											} border-b dark:bg-gray-${
												i % 2 == 0 ? 900 : 800
											} dark:border-gray-700`}
											key={i}
										>
											<td
												scope="row"
												className="py-4 pl-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
											>
												{period ? period : i}
											</td>
											<td className="py-4 px-6">
												<Link href={`/grades/${period ? period : i + 1}`}>
													{title}
												</Link>
											</td>
											<td className="py-4 px-6">{staff.name}</td>
											<td className="py-4 px-6">
												<span
													className={`font-bold text-${letterGradeColor(
														letterGrade(marks[0].calculatedScore.raw)
													)}-400`}
												>
													{letterGrade(marks[0].calculatedScore.raw)} (
													{marks[0].calculatedScore.raw}%)
												</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

const letterGradeColor = (letterGrade: string) => {
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
		default:
			return "white";
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
