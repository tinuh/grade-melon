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

const parseGrades = (grades: Gradebook): Grades => {
	return {
		courses: grades.courses.map(({ title, period, room, staff, marks }, i) => ({
			name: title,
			period: period ? period : i + 1,
			room: room,
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
						raw: (points.current / points.possible) * 100,
						color: letterGradeColor(
							letterGrade((points.current / points.possible) * 100)
						),
					},
					points: {
						earned: points.current,
						possible: points.possible,
					},
				}))
				.slice(0, -1),
			assignments: marks[0].assignments.map(({ name, date, points, type }) => ({
				name: name,
				grade: {
					letter: letterGrade(parsePoints(points).grade),
					raw: parsePoints(points).grade,
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
		periods: grades.reportingPeriod.available.map(({ name, index }) => ({
			name: name,
			index: index,
		})),
	};
};

const updateCourse = (
	course: Course,
	assignmentId: number,
	update: string,
	val: number
): Course => {
	if (update === "earned") {
		course.assignments[assignmentId].points.earned = val;
	} else if (update === "possible") {
		course.assignments[assignmentId].points.possible = val;
	}
	let categoryId = course.categories.findIndex(
		(category) => category.name === course.assignments[assignmentId].category
	);

	course.assignments[assignmentId].grade.raw =
		(course.assignments[assignmentId].points.earned /
			course.assignments[assignmentId].points.possible) *
		100;
	course.assignments[assignmentId].grade.letter = letterGrade(
		course.assignments[assignmentId].grade.raw
	);
	course.assignments[assignmentId].grade.color = letterGradeColor(
		course.assignments[assignmentId].grade.letter
	);
	course.categories[categoryId].points.earned = course.assignments
		.filter(
			(assignment) =>
				assignment.category === course.assignments[assignmentId].category
		)
		.reduce((a, b) => a + b.points.earned, 0);
	course.categories[categoryId].points.possible = course.assignments
		.filter(
			(assignment) =>
				assignment.category === course.assignments[assignmentId].category
		)
		.reduce((a, b) => a + b.points.possible, 0);
	course.categories[categoryId].grade.raw =
		(course.categories[categoryId].points.earned /
			course.categories[categoryId].points.possible) *
		100;
	course.categories[categoryId].grade.letter = letterGrade(
		course.categories[categoryId].grade.raw
	);
	course.categories[categoryId].grade.color = letterGradeColor(
		course.categories[categoryId].grade.letter
	);

	course.grade.raw = course.categories.reduce(
		(a, b) => a + b.grade.raw * b.weight,
		0
	);
	course.grade.letter = letterGrade(course.grade.raw);
	course.grade.color = letterGradeColor(course.grade.letter);
	return course;
};

export { parseGrades, updateCourse };
export type { Grades, Assignment, Course };
