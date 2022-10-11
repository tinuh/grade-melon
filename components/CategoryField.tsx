import React, { useState } from "react";

interface CategoryFieldProps {
	children: any;
	value: number;
	name: string;
	onChange: any;
}

export default function CategoryField({
	children,
	value,
	name,
	onChange,
}: CategoryFieldProps) {
	const [focus, setFocus] = useState(false);

	return (
		<div
			onClick={() => setFocus(true)}
			onBlur={() => setFocus(false)}
			className="cursor-pointer"
		>
			{!focus ? (
				name
			) : (
				<select
					id="category"
					onChange={onChange}
					value={value}
					className="block p-2 w-48 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
				>
					{children}
				</select>
			)}
		</div>
	);
}
