import React, { useState, useEffect } from 'react';

const Winners = ({ winners, loading, error, singleRacers, colorSwitch }) => {
	const [racers, setRacers] = useState(singleRacers);

	useEffect(() => {
		updateScores();
	}, [winners]);

	const updateScores = () => {
		let racerCopy = racers.map((racer) => {
			racer.wins = winners.filter(
				(winner) => winner.racer.id === racer.id
			).length;

			return racer;
		});
		setRacers(racerCopy);
	};

	return (
		<div className='racers'>
			{loading}
			{error}
			{racers.map((racer) => (
				<table
					key={racer.id}
					className='racer'
					style={{
						backgroundColor: racer.color,
						color: colorSwitch(racer),
					}}>
					<thead>
						<tr>
							<th>{racer.name}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style={{ fontWeight: '600' }}>{racer.color}</td>
						</tr>
					</tbody>
					<tbody>
						<tr>
							<td>
								<table
									className='winners'
									style={{
										display: 'flex',
										justifyContent: 'center',
										color: colorSwitch(racer),
									}}>
									<tbody>
										<tr>
											<td style={{ fontWeight: '600' }}>Wins: {racer.wins}</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			))}
		</div>
	);
};

export default Winners;
