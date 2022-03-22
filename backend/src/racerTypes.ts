export const colors = [
	'red',
	'white',
	'black',
	'green',
	'blue',
	'yellow',
	'purple',
	'orange',
	'pink',
	'indigo',
] as const;

export type Color = typeof colors[number];

export type Racer = {
	id: string;
	name: string;
	color: Color;
};

export type RacerPosition = {
	racerId: string;
	position: number;
	current: number;
	voltage: number;
	timestamp: number;
};

export type RacePositions = {
	raceId: string;
	racerPositions: RacerPosition[];
};

export type Winner = {
	raceId: string;
	racer: Partial<Racer>;
};
