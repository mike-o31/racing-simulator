import React, { useState, useEffect } from 'react';
import { getRacers } from './api';
import RaceInterface from './components/RaceInterface';

const App = () => {
	const [racers, setRacers] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		setLoading(true);
		try {
			let racers = await getRacers();
			if (racers.length < 2) {
				setError('No Racers. Rerendering page.');
				setTimeout(() => {
					window.location.reload();
				}, 500);
			}
			setRacers(racers);
		} catch (error) {
			console.error(error);
			setError('There was a problem hitting the api. Sorry...');
		}
		setLoading(false);
	};

	if (loading) {
		return (
			<div style={{ margin: '0.5rem', fontWeight: '600' }}>Loading . . .</div>
		);
	}

	if (racers.length < 2) {
		return <div style={{ margin: '0.5rem', fontWeight: '600' }}>{error}</div>;
	}

	return (
		<div>
			<RaceInterface racers={racers} />
		</div>
	);
};

export default App;
