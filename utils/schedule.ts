interface Schedule {
	classes: [
		{
			name: string;
			room: string;
			teacher: {
				name: string;
				email: string;
			};
			period: number;
		}
	];
	term: {
		index: number;
		name: string;
	};
	terms: [
		{
			name: string;
			index: number;
			date: Date;
		}
	];
}

export type { Schedule };
