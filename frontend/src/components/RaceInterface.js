import React, { useState } from 'react';
import { startRace, getWinners } from '../api';
import Winners from './Winners';
import './RaceInterface.css';

const RaceInterface = ({ racers }) => {
	const [racePosition, setRacerPosition] = useState({ racerPosition: [] });
	const [race, setRace] = useState({});
	const [startTime, setStartTime] = useState(0);
	const [endTime, setEndTime] = useState(0);
	const [disabled, setDisabled] = useState(false);
	const [winners, setWinners] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);

	const colorSwitch = (racers) => {
		if (
			racers.color === 'black' ||
			racers.color === 'blue' ||
			racers.color === 'indigo'
		) {
			return 'white';
		} else {
			return 'black';
		}
	};

	const getData = async () => {
		setLoading(true);

		try {
			let getRace = await startRace();

			getRace.onmessage = async (event) => {
				const parsedData = JSON.parse(event.data);
				setRace(parsedData);
				setRacerPosition(parsedData);
				const { racerPosition } = parsedData;
				if (parsedData.id) {
					setStartTime(racerPosition[0].timestamp);
				}

				setEndTime(racerPosition[0].timestamp);

				const allRacersDone = racerPosition.every(
					(racer) => racer.position >= 100
				);

				if (!allRacersDone) {
					setDisabled(true);
				}

				if (allRacersDone) {
					let winners = await getWinners();
					setWinners(winners);
					setDisabled(false);
				}
			};
			setError(false);
		} catch (error) {
			console.error(error);
			setError('There was a problem hitting the api. Sorry...');
		}
		setLoading(false);
	};

	if (loading && !race) {
		return <div>loading . . .</div>;
	}

	if (error && !race) {
		return <div>{error}</div>;
	}

	let start = new Date(startTime);
	let end = new Date(endTime);

	let timeElapsed = (end - start) / 1000;

	return (
		<div className='race' key={race}>
			<Winners
				winners={winners}
				loading={loading}
				error={error}
				singleRacers={racers}
				colorSwitch={colorSwitch}
			/>
			{loading}
			{error}
			<table className='racer' style={{ width: '99vw' }}>
				<thead>
					<tr className='racer'>
						<th>ID</th>
						<th>Position</th>
						<th>Current(A)</th>
						<th>Voltage(V)</th>
						<th>Energy(J)</th>
					</tr>
				</thead>
				<tbody className='racer'>
					{racers.map((singleRacer) => {
						singleRacer = {
							...singleRacer,
							...racePosition.racerPosition.find(
								(racer) => racer.racerId === singleRacer.id
							),
						};
						return (
							<tr key={singleRacer.id}>
								<td
									className='racer'
									style={{
										backgroundColor: singleRacer.color,
										color: colorSwitch(singleRacer),
										fontWeight: '600',
										padding: '0.5rem',
										maxWidth: '1.5rem',
										height: '2rem',
									}}>
									{singleRacer.id}
								</td>
								<>
									<td
										className='racer'
										style={{
											fontWeight: '600',
											width: '20rem',
										}}>
										<table>
											<tbody>
												<tr>
													<td
														className='racer'
														style={{
															width: isNaN(singleRacer.position)
																? '0'
																: singleRacer.position * 6.2,
															height: '2rem',
															backgroundColor: singleRacer.color,
															color: colorSwitch(singleRacer),
															fontWeight: '600',
															padding: '0',
															transition: 'width 0.5s ease-in-out',
														}}>
														{isNaN(singleRacer.position)
															? 0
															: singleRacer.position < 100
															? Math.round(singleRacer.position * 10) / 10
															: winners.map((winner) => {
																	if (winner.raceId === race.raceId) {
																		return `${winner.racer.name} is the winner`;
																	}
															  })}
													</td>
												</tr>
											</tbody>
										</table>
									</td>
									<td
										className='racer'
										style={{
											fontWeight: '600',
											padding: '0.5rem',
											maxWidth: '1rem',
										}}>
										{`${
											isNaN(singleRacer.current)
												? 0
												: Math.round(singleRacer.current * 1000) / 1000
										}(A)`}
									</td>
									<td
										className='racer'
										style={{
											fontWeight: '600',
											padding: '0.5rem',
											maxWidth: '1rem',
										}}>
										{`${
											isNaN(singleRacer.voltage)
												? 0
												: Math.round(singleRacer.voltage * 1000) / 1000
										}(V)`}
									</td>
									<td
										className='racer'
										style={{
											fontWeight: '600',
											padding: '0.3rem',
											maxWidth: '6rem',
										}}>
										{`${
											isNaN(
												singleRacer.current * singleRacer.voltage * timeElapsed
											)
												? 0
												: singleRacer.current *
												  singleRacer.voltage *
												  timeElapsed
										}(J)`}
									</td>
								</>
							</tr>
						);
					})}
				</tbody>
			</table>
			<button
				className='start-button'
				disabled={disabled}
				onClick={() => getData()}>
				Start Race
			</button>
		</div>
	);
};

export default RaceInterface;
