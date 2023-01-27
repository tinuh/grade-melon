import { Gradebook } from "studentvue";

interface Assignment {
	name: string;
	grade: {
		letter: string;
		raw: number;
		color: string;
	};
	points: {
		earned: number;
		possible: number;
	};
	date: {
		due: Date;
		assigned: Date;
	};
	category: string;
}

interface Course {
	name: string;
	period: number;
	room: string;
	weighted: boolean;
	grade: {
		letter: string;
		raw: number;
		color: string;
	};
	teacher: {
		name: string;
		email: string;
	};
	categories: {
		name: string;
		weight: number;
		grade: {
			letter: string;
			raw: number;
			color: string;
		};
		points: {
			earned: number;
			possible: number;
		};
	}[];
	assignments: Assignment[];
}

interface Grades {
	courses: Course[];
	gpa: number;
	wgpa: number;
	period: {
		name: string;
		index: number;
	};
	periods: {
		name: string;
		index: number;
	}[];
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
			return "gray";
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
	} else if (!isNaN(grade)) {
		return "E";
	} else {
		return "N/A";
	}
};

const letterGPA = (letterGrade: string, weighted: boolean): number => {
	let gpa = 0;
	if (weighted) {
		gpa++;
	}
	switch (letterGrade) {
		case "A":
			return gpa + 4;
		case "B":
			return gpa + 3;
		case "C":
			return gpa + 2;
		case "D":
			return gpa + 1;
		default:
			return gpa + 0;
	}
};

const isWeighted = (name: string): boolean => {
	let weighted = false;
	if (name.includes("AP")) return true;
	if (name.includes("Hon")) return true;
	if (name.includes("IB")) return true;
	if (name.includes("Mag")) return true;
	else return false;
};

//function to get rid of everything in parentheses in assignment names
const stripParens = (str: string): string => {
	let regex = /\(([^)]+)\)/g;
	return str.replace(regex, "");
};

const parsePoints = (points: string) => {
	let regex = /^(\d+\.?\d*|\.\d+) \/ (\d+\.?\d*|\.\d+)$/;
	if (points.match(regex)) {
		let p = points.split(regex);
		return {
			grade: (parseFloat(p[1]) / parseFloat(p[2])) * 100,
			earned: parseFloat(p[1]),
			possible: parseFloat(p[2]),
		};
	}
	return {
		grade: NaN,
		earned: NaN,
		possible: parseFloat(points),
	};
};

const parseDate = ({ start, end }: { start: Date; end: Date }): string => {
	let startDate = new Date(start);
	let endDate = new Date(end);

	//days left to the due date
	let daysLeft = Math.ceil(
		(endDate.getTime() - new Date().getTime()) / 86400000
	);
	let daysToStart = Math.floor(
		(startDate.getTime() - new Date().getTime()) / 86400000
	);
	let daysAgo = Math.floor(
		(new Date().getTime() - endDate.getTime()) / 86400000
	);

	if (daysLeft > 0 && daysToStart < 0) {
		return `ends in ${daysLeft} day${daysLeft > 1 ? "s" : ""}`;
	} else if (daysToStart > 0) {
		return `starts in ${daysToStart} day${daysToStart > 1 ? "s" : ""}`;
	} else if (daysAgo > 0) {
		return `ended ${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
	} else if (daysAgo === 0) {
		return "ends today";
	}
};

const parseGrades = (grades: Gradebook): Grades => {
	if (grades.courses[0].marks.length === 0) {
		for (let i = 0; i < grades.courses.length; i++) {
			grades.courses[i].marks = [
				{
					calculatedScore: { raw: NaN, string: "N/A" },
					weightedCategories: [],
					assignments: [],
					name: "",
				},
			];
		}
	}
	let parsedGrades = {
		gpa:
			grades.courses.reduce(
				(a, b) =>
					a + letterGPA(letterGrade(b.marks[0].calculatedScore.raw), false),
				0
			) / grades.courses.length,
		wgpa:
			grades.courses.reduce(
				(a, b) =>
					a +
					letterGPA(
						letterGrade(b.marks[0].calculatedScore.raw),
						isWeighted(b.title)
					),
				0
			) / grades.courses.length,
		courses: grades.courses.map(({ title, period, room, staff, marks }, i) => ({
			name: stripParens(title),
			period: period ? period : i + 1,
			room: room,
			weighted: isWeighted(title),
			grade: {
				letter: letterGrade(marks[0].calculatedScore.raw),
				raw: marks[0].calculatedScore.raw,
				color: letterGradeColor(letterGrade(marks[0].calculatedScore.raw)),
			},
			teacher: {
				name: staff.name,
				email: staff.email,
			},
			categories: marks[0].weightedCategories
				.map(({ type, weight, points }) => ({
					name: type,
					weight: parseFloat(weight.standard) / 100,
					grade: {
						letter: letterGrade((points.current / points.possible) * 100),
						raw: parseFloat(
							((points.current / points.possible) * 100).toFixed(2)
						),
						color: letterGradeColor(
							letterGrade((points.current / points.possible) * 100)
						),
					},
					points: {
						earned: points.current,
						possible: points.possible,
					},
				}))
				.filter((category) => !category.name.toLowerCase().includes("total")),
			assignments: marks[0].assignments.map(({ name, date, points, type }) => ({
				name: name,
				grade: {
					letter: letterGrade(parsePoints(points).grade),
					raw: parseFloat(parsePoints(points).grade.toFixed(2)),
					color: letterGradeColor(letterGrade(parsePoints(points).grade)),
				},
				points: {
					earned: parsePoints(points).earned,
					possible: parsePoints(points).possible,
				},
				date: {
					due: date.start,
					assigned: date.due,
				},
				category: type,
			})),
		})),
		period: {
			name: grades.reportingPeriod.current.name,
			index: grades.reportingPeriod.current.index,
		},
		periods: grades.reportingPeriod.available.map(({ name, index, date }) => ({
			name: `${name} (${parseDate(date)})`,
			index: index,
		})),
	};
	parsedGrades.courses.map((course) => calculateGrade(course));
	return parsedGrades;
};

let solutions = [];
const recur = (
	coeff: Array<number>,
	sols: Array<number>,
	remainingPoints: Array<number>,
	start: number,
	end: number,
	currentPoints: Array<number>,
	currentPossible: Array<number>,
	desired: number
): [number[], number][] => {
	let result = [];
	let newGrade = 0;

	for (let i = 0; i < currentPoints.length; i++) {
		newGrade +=
			((currentPoints[i] + sols[i]) /
				(currentPossible[i] + sols[i] + remainingPoints[i])) *
			coeff[i];
	}

	if (newGrade * 100 >= desired) {
		console.log(sols);
		console.log(newGrade * 100);
		solutions.push([sols, newGrade * 100]);
		return [[sols, newGrade * 100]];
	} else {
		for (let i = start; i <= end; i++) {
			let temp = [...sols];
			temp[i] = temp[i] + 1;
			let temp2 = [...remainingPoints];
			if (temp2[i] >= 1) {
				temp2[i] -= 1;
				result.concat(
					recur(
						coeff,
						temp,
						temp2,
						i,
						end,
						currentPoints,
						currentPossible,
						desired
					)
				);
			}
		}
	}
	return result;
};

const genTable = (
	course: Course,
	desired: number,
	remaining: Array<number>
): [number[], number][] => {
	let n = course.categories.length;
	let current = course.grade.raw;
	let gradeBoost = desired - current;

	let weights: number[] = [];
	for (let i = 0; i < n; i++) {
		weights[i] = course.categories[i].weight;
	}
	solutions = [];

	let sols: number[] = [];
	let cur: number[] = [];
	let possible: number[] = [];

	for (let a = 0; a < n; a++) {
		sols[a] = 0;
		cur[a] = course.categories[a].points.earned;
		possible[a] = course.categories[a].points.possible;
	}

	let result = recur(
		weights,
		sols,
		remaining,
		0,
		n - 1,
		cur,
		possible,
		desired
	);
	console.log(result);

	return [...solutions];
};

const calculateCategory = (course: Course, categoryId: number): Course => {
	course.categories[categoryId].points.earned = course.assignments
		.filter(
			(assignment) =>
				assignment.category === course.categories[categoryId].name &&
				!isNaN(assignment.points.possible) &&
				!isNaN(assignment.points.earned)
		)
		.reduce((a, b) => a + b.points.earned, 0);
	course.categories[categoryId].points.possible = course.assignments
		.filter(
			(assignment) =>
				assignment.category === course.categories[categoryId].name &&
				!isNaN(assignment.points.possible) &&
				!isNaN(assignment.points.earned)
		)
		.reduce((a, b) => a + b.points.possible, 0);
	course.categories[categoryId].grade.raw = parseFloat(
		(
			(course.categories[categoryId].points.earned /
				course.categories[categoryId].points.possible) *
			100
		).toFixed(2)
	);
	course.categories[categoryId].grade.letter = letterGrade(
		course.categories[categoryId].grade.raw
	);
	course.categories[categoryId].grade.color = letterGradeColor(
		course.categories[categoryId].grade.letter
	);
	return course;
};

const calculateGrade = (course: Course): Course => {
	let currWeight = 0;
	let trueCategories = course.categories.filter((c) => {
		if (!isNaN(c.grade.raw)) {
			currWeight += c.weight;
			return true;
		}
		return false;
	});
	course.grade.raw = parseFloat(
		trueCategories
			.reduce((a, b) => {
				return a + b.grade.raw * (b.weight / currWeight);
			}, 0)
			.toFixed(2)
	);

	if (trueCategories.length === 0) {
		course.grade.raw = NaN;
	}
	course.grade.letter = letterGrade(course.grade.raw);
	course.grade.color = letterGradeColor(course.grade.letter);
	return course;
};

const addAssignment = (course: Course): Course => {
	course.assignments.unshift({
		name: "New Assignment",
		grade: {
			letter: "N/A",
			raw: NaN,
			color: "gray",
		},
		points: {
			earned: 0,
			possible: 0,
		},
		date: {
			due: new Date(),
			assigned: new Date(),
		},
		category: course.categories.length ? course.categories[0].name : "N/A",
	});
	return course;
};

const calculateGPA = (grades: Grades): Grades => {
	grades.gpa =
		grades.courses.reduce(
			(a, b) => a + letterGPA(letterGrade(b.grade.raw), false),
			0
		) / grades.courses.length;
	grades.wgpa =
		grades.courses.reduce(
			(a, b) => a + letterGPA(letterGrade(b.grade.raw), b.weighted),
			0
		) / grades.courses.length;

	return { ...grades };
};

const updateGPA = (grades: Grades, i: number, val: boolean): Grades => {
	grades.courses[i].weighted = val;
	grades = calculateGPA(grades);

	return { ...grades };
};

const delAssignment = (course: Course, assignmentId: number): Course => {
	course.assignments.splice(assignmentId, 1);
	course.categories.forEach((category, i) => {
		course = calculateCategory(course, i);
	});
	course = calculateGrade(course);
	return course;
};

const updateCategory = (
	course: Course,
	assignmentId: number,
	val: string
): Course => {
	course.assignments[assignmentId].category = course.categories[val].name;
	course.categories.forEach((category, i) => {
		course = calculateCategory(course, i);
	});
	course = calculateGrade(course);
	return course;
};

const updateCourse = (
	course: Course,
	assignmentId: number,
	update: string,
	val: number
): Course => {
	if (update === "earned") {
		if (val < 0) val = 0;
		course.assignments[assignmentId].points.earned = val;
	} else if (update === "possible") {
		if (val < 0) val = 0;
		course.assignments[assignmentId].points.possible = val;
	}
	let categoryId = course.categories.findIndex(
		(category) => category.name === course.assignments[assignmentId].category
	);

	//update assignment grade
	course.assignments[assignmentId].grade.raw = parseFloat(
		(
			(course.assignments[assignmentId].points.earned /
				course.assignments[assignmentId].points.possible) *
			100
		).toFixed(2)
	);
	course.assignments[assignmentId].grade.letter = letterGrade(
		course.assignments[assignmentId].grade.raw
	);
	course.assignments[assignmentId].grade.color = letterGradeColor(
		course.assignments[assignmentId].grade.letter
	);

	//update category grade
	course = calculateCategory(course, categoryId);

	//update whole course grade
	course = calculateGrade(course);
	return course;
};

export {
	parseGrades,
	updateCourse,
	addAssignment,
	delAssignment,
	updateCategory,
	genTable,
	calculateGPA,
	updateGPA,
};
export type { Grades, Assignment, Course };
