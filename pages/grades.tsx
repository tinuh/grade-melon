import React, { useState, useEffect } from "react";

interface GradesProps {
	client: any;
}

export default function Grades({ client }: GradesProps) {
	const [loading, setLoading] = useState(true);
	const [grades, setGrades] = useState([]);
	useEffect(() => {
		client.gradebook().then((res) => {
			//console.log(res);
			setGrades(getInfoCurrent(res));
			setLoading(false);
		});
	}, []);

	return <div>{JSON.stringify(grades)}</div>;
}

function getInfoCurrent(data){
    let array1 = Array(data.courses.length);
    for (let i = 0; i < data.courses.length; i++){
        let period = data.courses[i].period;
        let courseName = data.courses[i].title;
        let roomNumber = data.courses[i].room;
        let teacherName = data.courses[i].staff.name;
        let gradeNumber = data.courses[i].marks[0].calculatedScore.raw;

        let letterGrade;
        if (gradeNumber >= 89.5){
            letterGrade = "A";
        }
        else if(gradeNumber >= 79.5){
            letterGrade = "B";
        }
        else if (gradeNumber >= 69.5){
            letterGrade = "C";
        }
        else if (gradeNumber >= 59.5){
            letterGrade = "D";
        }
        else if (gradeNumber == 0){
            letterGrade = "N/A"
        }
        else{
            letterGrade = "E";
        }
        array1[i] = {period, courseName, roomNumber, teacherName, gradeNumber, letterGrade};
    }
    return array1;
}

