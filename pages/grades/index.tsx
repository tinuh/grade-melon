import React, { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { TbRefresh } from "react-icons/tb";
import { parseGrades, Grades as GradesType } from "../../utils/grades";

interface GradesProps {
	client: any;
	grades: GradesType;
	setGrades: (grades: GradesType) => void;
	setToasts: (toasts: any) => void;
}

export default function Grades({
	client,
	grades,
	setGrades,
	setToasts,
}: GradesProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [defaultView, setDefaultView] = useState("card");
	const [period, setPeriod] = useState<number>();
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
					setGrades(parseGrades(res));
					setLoading(false);
				});
			} else {
				setPeriod(grades.period.index);
				setLoading(false);
			}
		} catch {
			if (localStorage.getItem("remember") === "false") {
				router.push("/login");
			}
		}
	}, [client]);

	const update = (p: number) => {
		console.log(p);
		setPeriod(p);
		setLoading(true);
		client
			.gradebook(p)
			.then((res) => {
				console.log(res);
				setGrades(parseGrades(res));
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setToasts((toasts) => {
					return [
						...toasts,
						{
							title: err.message,
							type: "error",
						},
					];
				});
				setLoading(false);
			});
	};

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
					<div className="flex gap-2 mb-5 w-full">
						<button
							type="button"
							onClick={() => update(period)}
							className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm p-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
						>
							<TbRefresh size={"1.3rem"} />
						</button>
						<select
							id="periods"
							onChange={(e) => update(parseInt(e.target.value))}
							value={period}
							className="block w-full p-2 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						>
							{grades.periods.map((period) => (
								<option value={period.index} key={period.index}>
									{period.name}
								</option>
							))}
						</select>
					</div>
					{view === "card" && (
						<div className="flex flex-wrap gap-5 items-stretch">
							{grades.courses.map(({ name, period, grade, teacher }, i) => (
								<div className="w-96" key={i}>
									<div className="p-4 sm:p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
										<div className="mb-2.5 md:mb-5">
											<Link href={`/grades/${i}`}>
												<div className="hover:cursor-pointer">
													<h5 className="md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
														<p className="font-bold inline-block">{period}</p> -{" "}
														{name}
													</h5>
													<p className="text-md tracking-tight text-gray-900 dark:text-white">
														{teacher.name}
													</p>
												</div>
											</Link>
										</div>
										<div className="">
											<div className="flex items-center justify-between">
												<span
													className={`text-xl md:text-3xl font-bold text-${grade.color}-400`}
												>
													{grade.letter} ({grade.raw}%)
												</span>
												<Link href={`/grades/${i}`}>
													<button className="rounded-lg bg-primary-700 px-5 py-2.5 text-center text-xs sm:text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
														View
													</button>
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
									{grades.courses.map(({ name, period, grade, teacher }, i) => (
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
												{period}
											</td>
											<td className="py-4 px-6">
												<Link href={`/grades/${i}`}>{name}</Link>
											</td>
											<td className="py-4 px-6">{teacher.name}</td>
											<td className="py-4 px-6">
												<span className={`font-bold text-${grade.color}-400`}>
													{grade.letter} ({grade.raw}%)
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
