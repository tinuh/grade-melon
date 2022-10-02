import React, { useState, useEffect } from "react";

interface GradesProps {
	client: any;
}

export default function Grades({ client }: GradesProps) {
	const [loading, setLoading] = useState(true);
	const [grades, setGrades] = useState([]);
	useEffect(() => {
		client.gradebook().then((res) => {
			console.log(res);
			setGrades(res.courses);
			setLoading(false);
		});
	}, []);

	return <div>{JSON.stringify(grades)}</div>;
}
