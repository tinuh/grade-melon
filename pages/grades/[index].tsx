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
} from "../../utils/grades";
import GradeField from "../../components/GradeField";
import CategoryField from "../../components/CategoryField";
import Head from "next/head";
import { TbRefresh } from "react-icons/tb";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";

interface GradesProps {
	client: any;
	grades: GradesType;
	setToasts: (toasts: any) => void;
	setGrades: (grades: GradesType) => void;
}

export default function Grades({
	client,
	grades,
	setGrades,
	setToasts,
}: GradesProps) {
	const router = useRouter();
	const { index }: { index?: string } = router.query;
	const [loading, setLoading] = useState(true);
	const [course, setCourse] = useState<Course>();
	const [period, setPeriod] = useState<number>();
	const [showModal, setShowModal] = useState(false);
	const [modalDetails, setModalDetails] = useState(0);

	useEffect(() => {
		try {
			if (!grades) {
				client.gradebook().then((res) => {
					let parsedGrades = parseGrades(res);
					setGrades(parsedGrades);
					setPeriod(parsedGrades.period.index);
					setCourse(parsedGrades.courses[parseInt(index)]);
					setLoading(false);
				});
			} else {
				setCourse(grades.courses[parseInt(index)]);
				setPeriod(grades.period.index);
				setLoading(false);
			}
		} catch {
			if (localStorage.getItem("remember") === "false") {
				router.push("/login");
			}
		}
	}, [client]);

	const updateGrade = (val: string, assignmentId: number, update: string) => {
		setCourse((prev) => {
			return { ...updateCourse(prev, assignmentId, update, parseFloat(val)) };
		});
	};

	const add = () => {
		setCourse({ ...addAssignment(course) });
	};

	const del = (id: number) => {
		setCourse({ ...delAssignment(course, id) });
	};

	const updateCat = (val: string, assignmentId: number) => {
		setCourse((prev) => {
			return { ...updateCategory(prev, assignmentId, val) };
		});
	};

	const OpenModal = (assignmnetId: number) => {
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
				setCourse(parseGrades(res).courses[parseInt(index)]);
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

	return (
		<div className="p-5 md:p-10">
			<Head>
				<title>{course ? `${course.name} - Grade Melon` : "Grade Melon"}</title>
			</Head>
			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<Modal.Header>{course?.assignments[modalDetails]?.name}</Modal.Header>
				<Modal.Body>
					<div>
						<p className="font-bold text-black dark:text-white">Grade</p>
						<p
							className={`text-base leading-relaxed text-${course?.assignments[modalDetails]?.grade.color}-400`}
						>
							{course?.assignments[modalDetails]?.grade.letter} (
							{course?.assignments[modalDetails]?.grade.raw}%)
						</p>
						<p className="font-bold text-black dark:text-white">Points</p>
						<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
							{course?.assignments[modalDetails]?.points.earned}/
							{course?.assignments[modalDetails]?.points.possible}
						</p>
						<p className="font-bold text-black dark:text-white">Date Due</p>
						<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
							{course?.assignments[modalDetails]?.date.due.toLocaleDateString()}
						</p>
						<p className="font-bold text-black dark:text-white">Category</p>
						<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
							{course?.assignments[modalDetails]?.category}
						</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
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
				</Modal.Footer>
			</Modal>
			{loading ? (
				<div className="flex justify-center">
					<Spinner size="xl" color="pink" />
				</div>
			) : (
				<div>
					<h1 className="flex flex-wrap text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
						{course.name}
					</h1>
					<p className="text-md tracking-tight mb-2.5 text-gray-900 dark:text-white">
						{course.teacher.name}
					</p>
					<div className="text-xl md:text-xl mb-2.5 dark:text-white">
						{course.grade.letter} ({course.grade.raw}%)
					</div>
					<div className="mt-2.5 w-full bg-gray-200 rounded-full dark:bg-gray-700">
						<div
							className={`bg-${course.grade.color}-400 text-xs md:text-sm font-medium text-left pl-2 p-0.5 leading-none rounded-full`}
							style={{
								width: `${course.grade.raw < 100 ? course.grade.raw : 100}%`,
							}}
						>
							Total
						</div>
					</div>
					{course.categories.map(({ name, grade, points }, i) => (
						<div
							key={i}
							className="mt-2 md:mt-3 w-full bg-gray-200 rounded-full dark:bg-gray-700"
						>
							<div
								className={`bg-${grade.color}-400 text-xs md:text-sm font-medium text-left pl-2 p-0.5 leading-none rounded-full`}
								style={{ width: `${grade.raw < 100 ? grade.raw : 100}%` }}
							>
								{name} - {grade.raw}% | {points.earned}/{points.possible}
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
							onClick={add}
							className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm p-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
						>
							<HiOutlineDocumentAdd size={"1.3rem"} />
						</button>
					</div>
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
											<td
												className="py-4 px-6 hover:text-primary-500 cursor-pointer"
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
