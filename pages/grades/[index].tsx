import React, { useState, useEffect } from "react";
import { Spinner, Modal } from "flowbite-react";
import { useRouter } from "next/router";
import {
	parseGrades,
	updateCourse,
	addAssignment,
	delAssignment,
	updateCategory,
	Grades as GradesType,
	Course,
	genTable,
} from "../../utils/grades";
import GradeField from "../../components/GradeField";
import CategoryField from "../../components/CategoryField";
import Head from "next/head";

//icons
import { TbRefresh } from "react-icons/tb";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { BsGraphUp } from "react-icons/bs";

interface GradesProps {
	client: any;
	grades: GradesType;
	setToasts: (toasts: any) => void;
	setGrades: React.Dispatch<React.SetStateAction<GradesType | undefined>>;
	period: number;
	setPeriod: (period: number) => void;
}

interface OptimizeProps {
	[key: string]: number;
}

export default function Grades({
	client,
	grades,
	setGrades,
	setToasts,
	period,
	setPeriod,
}: GradesProps) {
	const router = useRouter();
	const { index }: { index?: string } = router.query;
	const course = grades?.courses[parseInt(index as string)];
	const [loading, setLoading] = useState(grades ? false : true);
	const [showModal, setShowModal] = useState(false);
	const [modalDetails, setModalDetails] = useState(0);
	const [modalType, setModalType] = useState("assignment");
	const [optimizeProps, setOptimizeProps] = useState<OptimizeProps>({});
	const [solutions, setSolution] = useState<[number[], number][]>([]);

	useEffect(() => {
		try {
			if (!grades) {
				client.gradebook().then((res) => {
					console.log(typeof index);
					let parsedGrades = parseGrades(res);
					setGrades(parsedGrades);
					setPeriod(parsedGrades.period.index);
					setLoading(false);
				});
			}
		} catch {
			if (localStorage.getItem("remember") === "false") {
				router.push("/login");
			}
		}
	}, [client]);

	const updateGrade = (val: string, assignmentId: number, update: string) => {
		let temp = grades;
		temp.courses[parseInt(index as string)] = updateCourse(
			temp.courses[parseInt(index as string)],
			assignmentId,
			update,
			parseFloat(val)
		);
		setGrades({ ...temp });
	};

	const add = () => {
		let temp = grades;
		temp.courses[parseInt(index as string)] = addAssignment(
			temp.courses[parseInt(index as string)]
		);
		setGrades({ ...temp });
	};

	const del = (id: number) => {
		let temp = grades;
		temp.courses[parseInt(index as string)] = delAssignment(
			temp.courses[parseInt(index as string)],
			id
		);
		setGrades({ ...temp });
	};

	const updateCat = (val: string, assignmentId: number) => {
		let temp = grades;
		temp.courses[parseInt(index as string)] = updateCategory(
			temp.courses[parseInt(index as string)],
			assignmentId,
			val
		);
		setGrades({ ...temp });
	};

	const OpenModal = (assignmnetId: number) => {
		setModalType("assignment");
		setModalDetails(assignmnetId);
		setShowModal(true);
	};

	const update = (p: number) => {
		console.log(p);
		setLoading(true);
		client
			.gradebook(p)
			.then((res) => {
				console.log(res);
				setGrades(parseGrades(res));
				setPeriod(p);
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

	const optimize = () => {
		setModalType("optimize");
		let tempProps = {};
		tempProps["desiredGrade"] = 90;
		course.categories.forEach((cat) => {
			tempProps[cat.name] = cat.weight * 100;
		});
		setOptimizeProps(tempProps);
		setShowModal(true);
	};

	const updateOptimize = (val: string, field: string) => {
		setOptimizeProps((prev) => {
			return { ...prev, [field]: parseFloat(val) };
		});
	};

	const optimizeGrades = () => {
		let points = Object.values(optimizeProps);
		points.splice(0, 1);
		let results = genTable(course, optimizeProps.desiredGrade, points);
		setSolution(results);
	};

	return (
		<div className="p-5 md:p-10 flex-1">
			<Head>
				<title>{course ? `${course.name} - Grade Melon` : "Grade Melon"}</title>
			</Head>
			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<Modal.Header>
					{modalType === "assignment"
						? course?.assignments[modalDetails]?.name
						: "Optimize Grade"}
				</Modal.Header>
				<Modal.Body>
					{modalType === "assignment" && (
						<div id="assignment-details">
							<p className="font-bold text-black dark:text-white">Grade</p>
							<p
								className={`text-base leading-relaxed text-${course?.assignments[modalDetails]?.grade.color}-400`}
							>
								{course?.assignments[modalDetails]?.grade.letter}
								{!isNaN(course?.assignments[modalDetails]?.grade.raw) &&
									` (${course?.assignments[modalDetails]?.grade.raw}%)`}
							</p>
							<p className="font-bold text-black dark:text-white">Points</p>
							<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
								{!isNaN(course?.assignments[modalDetails]?.points.earned)
									? course?.assignments[modalDetails]?.points.earned
									: "NG"}
								/{course?.assignments[modalDetails]?.points.possible}
							</p>
							<p className="font-bold text-black dark:text-white">Date Due</p>
							<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
								{course?.assignments[
									modalDetails
								]?.date.due.toLocaleDateString()}
							</p>
							<p className="font-bold text-black dark:text-white">Category</p>
							<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
								{course?.assignments[modalDetails]?.category}
							</p>
						</div>
					)}
					{modalType === "optimize" && (
						<div>
							<div className="flex flex-col gap-3">
								<div>
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Desired Grade (1-100)
									</label>
									<div className="flex gap-2">
										<input
											type="number"
											min={1}
											max={100}
											value={optimizeProps?.desiredGrade}
											onChange={(e) =>
												updateOptimize(e.target.value, "desiredGrade")
											}
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
											placeholder="90"
										/>
									</div>
								</div>
								{course?.categories.map(({ name }, i) => (
									<div key={i}>
										<label
											htmlFor="email"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Points Left ({name})
										</label>
										<div className="flex gap-2">
											<input
												type="number"
												min={1}
												max={100}
												value={optimizeProps[name]}
												onChange={(e) => updateOptimize(e.target.value, name)}
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
												placeholder="50"
											/>
										</div>
									</div>
								))}
							</div>
							<div className="overflow-x-auto shadow-md rounded-lg mt-5 border border-gray-300 dark:border-gray-600">
								<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
									<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
										<tr>
											{course?.categories.map(({ name }, i) => (
												<th scope="col" className="py-3 pl-6" key={i}>
													{name}
												</th>
											))}
											<th scope="col" className="py-3 px-6">
												Grade
											</th>
										</tr>
									</thead>
									<tbody>
										{solutions.map((sol, i) => (
											<tr
												className={`bg-${
													i % 2 == 0 ? "white" : "gray-50"
												} border-b dark:bg-gray-${
													i % 2 == 0 ? 900 : 800
												} dark:border-gray-700`}
												key={i}
											>
												{course?.categories.map((cat, i) => (
													<td scope="col" className="py-3 pl-6" key={i}>
														{sol[0][i]} / {optimizeProps[cat.name]}
													</td>
												))}
												<td
													scope="row"
													className="py-4 pl-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
												>
													{sol[1].toFixed(2)}%
												</td>
											</tr>
										))}
										{!solutions.length && (
											<tr className="text-red-600 font-bold">
												<td
													className="text-center align-center py-3"
													colSpan={course?.categories.length + 1}
												>
													No Solutions Found!
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					{modalType === "assignment" && (
						<div className="flex gap-2">
							<button
								onClick={() => setShowModal(false)}
								className="rounded-lg bg-gray-500 px-2.5 py-2.5 text-center text-xs sm:text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
							>
								Close
							</button>
							<button
								onClick={() => {
									del(modalDetails);
									setShowModal(false);
								}}
								className="rounded-lg bg-primary-500 px-2.5 py-2.5 text-center text-xs sm:text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								<div className="flex gap-1 items-center">
									<HiOutlineTrash size={"1.2rem"} />
									Delete
								</div>
							</button>
						</div>
					)}
					{modalType === "optimize" && (
						<div className="flex gap-2">
							<button
								onClick={() => setShowModal(false)}
								className="rounded-lg bg-gray-500 px-2.5 py-2.5 text-center text-xs sm:text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
							>
								Close
							</button>
							<button
								onClick={optimizeGrades}
								className="rounded-lg bg-primary-500 px-2.5 py-2.5 text-center text-xs sm:text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								Optimize
							</button>
						</div>
					)}
				</Modal.Footer>
			</Modal>
			{loading ? (
				<div className="flex justify-center">
					<Spinner size="xl" color="pink" />
				</div>
			) : (
				<div className="max-w-max">
					<h1 className="flex flex-wrap text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
						{course.name}
					</h1>
					<p className="text-md tracking-tight mb-2.5 text-gray-900 dark:text-white">
						{course.teacher.name}
					</p>
					<div className="text-xl md:text-xl mb-2.5 dark:text-white">
						{course.grade.letter}{" "}
						{!isNaN(course.grade.raw) && `(${course.grade.raw}%)`}
					</div>
					<div className="mt-2.5 w-full bg-gray-200 rounded-full dark:bg-gray-700">
						<div
							className={`bg-${course.grade.color}-400 text-xs md:text-sm font-medium text-left pl-2 p-0.5 leading-none rounded-full h-4 md:h-6`}
							style={{
								width: `${course.grade.raw < 100 ? course.grade.raw : 100}%`,
							}}
						>
							<p className="absolute">Total</p>
						</div>
					</div>
					{course.categories.map(({ name, grade, points }, i) => (
						<div
							key={i}
							className="mt-2 md:mt-3 w-full bg-gray-200 rounded-full dark:bg-gray-700 relative"
						>
							<div
								className={`bg-${grade.color}-400 text-xs md:text-sm font-medium text-left pl-2 p-0.5 leading-none rounded-full h-4 md:h-6`}
								style={{ width: `${grade.raw < 100 ? grade.raw : 100}%` }}
							>
								<p className="absolute">
									{name} ({!isNaN(grade.raw) ? `${grade.raw}%` : "N/A"}) -{" "}
									{points.earned}/{points.possible}
								</p>
							</div>
						</div>
					))}
					<div className="flex gap-2 mt-5 w-full">
						<button
							type="button"
							onClick={() => update(period)}
							className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm p-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
						>
							<TbRefresh size={"1.3rem"} />
						</button>
						<select
							id="periods"
							value={period}
							onChange={(e) => update(parseInt(e.target.value))}
							className="block w-full p-2 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
						>
							{grades.periods.map((period) => (
								<option value={period.index} key={period.index}>
									{period.name}
								</option>
							))}
						</select>
						<button
							type="button"
							onClick={optimize}
							className=" bg-primary-500 border border-primary-500 focus:outline-none hover:bg-primary-600 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm p-2.5 dark:bg-primary-600 text-white dark:hover:bg-primary-700 dark:focus:ring-primary-400"
						>
							<BsGraphUp size={"1.3rem"} />
						</button>
						<button
							type="button"
							onClick={add}
							className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm p-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
						>
							<HiOutlineDocumentAdd size={"1.3rem"} />
						</button>
					</div>
					<div className="m-5" />
					<div className="overflow-x-auto shadow-md rounded-lg max-w-max border border-gray-200 dark:border-gray-700">
						<table className="text-sm text-left text-gray-500 dark:text-gray-400">
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
											<td
												className="py-4 px-6 hover:text-black dark:hover:text-white cursor-pointer"
												onClick={() => OpenModal(i)}
											>
												{name}
											</td>
											<td className="py-4 px-6">
												<div
													className={`flex items-center gap-2 text-${grade.color}-400`}
												>
													<GradeField
														onChange={(e) =>
															updateGrade(e.target.value, i, "earned")
														}
														value={points.earned}
													/>
													/
													<GradeField
														onChange={(e) =>
															updateGrade(e.target.value, i, "possible")
														}
														value={points.possible}
													/>
												</div>
											</td>
											<td className="py-4 px-6">
												<CategoryField
													value={course.categories.findIndex(
														(c) => category === c.name
													)}
													onChange={(e) => updateCat(e.target.value, i)}
													name={category}
												>
													{course.categories.map((category, x) => (
														<option value={x} key={x}>
															{category.name}
														</option>
													))}
												</CategoryField>
											</td>
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