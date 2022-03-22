const baseUrl = 'http://localhost:3000/api';

export const getRacers = async () => {
	const res = await fetch(`${baseUrl}/racers`);
	if (res.status >= 400) {
		throw Error;
	}
	return await res.json();
};

export const startRace = async () => {
	const eventSource = new EventSource(`${baseUrl}/race/start`, {
		withCredentials: false,
	});

	if (eventSource.status >= 400) {
		throw Error;
	}
	return await eventSource;
};

export const getWinners = async () => {
	const res = await fetch(`${baseUrl}/winners`);
	if (res.status >= 400) {
		alert('Please restart backend server.');
		throw Error;
	}
	return await res.json();
};
