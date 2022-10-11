import React, { useState } from "react";

interface GradeFieldProps {
	value: number;
	onChange: any;
}

export default function GradeField({ value, onChange }: GradeFieldProps) {
	const [focus, setFocus] = useState(false);

	return (
		<div
			onClick={() => setFocus(true)}
			onBlur={() => setFocus(false)}
			className="cursor-pointer"
		>
			{!focus ? (
				value
			) : (
				<input
					type="number"
					value={value}
					onChange={onChange}
					className="w-12 inline-block bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
				/>
			)}
		</div>
	);
}
