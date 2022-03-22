import { Injectable } from '@nestjs/common';
import {
	Color,
	RacePositions,
	Racer,
	RacerPosition,
	Winner,
} from './racerTypes';
import { from, interval, Observable } from 'rxjs';
import { map, takeWhile, toArray } from 'rxjs/operators';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { colors } from './racerTypes';

@Injectable()
export class AppService {
	private positions: RacePositions[] = [];
	private racers: Racer[];

	private async generateRacers() {
		let availableColors: Color[] = Object.assign([], colors);
		let numberOfRacers = Math.floor(Math.random() * 10);

		if (numberOfRacers === 1) {
			numberOfRacers++;
		}

		const source$ = from(_.range(0, numberOfRacers));

		const racers = source$
			.pipe(
				takeWhile((value) => value <= numberOfRacers),
				map((val) => {
					return {
						id: `racer${val}`,
						name: `Racer #${val}`,
						color: availableColors.pop(),
					};
				}),
				toArray()
			)
			.toPromise();

		this.racers = await racers;
	}

	/**
	 * Get all racers
	 */
	public async getRacers(): Promise<Racer[]> {
		await this.generateRacers();

		return this.racers.map((racer) => {
			return {
				id: racer.id,
				name: racer.name,
				color: racer.color,
			};
		});
	}

	/**
	 * Start a race
	 */
	public race(): Observable<{
		raceId: string;
		racerPosition: RacerPosition[];
	}> {
		const raceId = uuid();

		const positions = this.racers.map((racer) => {
			return {
				racerId: racer.id,
				position: 0,
				current: 0,
				voltage: 500,
				timestamp: undefined,
			};
		});

		return interval(1000).pipe(
			map((_) => {
				const timestamp = dayjs().valueOf();

				positions.forEach((p) => {
					p.position += Math.random() + 5;
					p.current = 95 + Math.random() * (20 - 10);
					p.voltage -= Math.random() * 0.1;
					p.timestamp = timestamp;
				});

				this.positions.push({ raceId: raceId, racerPositions: positions });

				return {
					raceId: raceId,
					racerPosition: positions,
				};
			}),
			takeWhile((value) => {
				return (
					value.racerPosition.filter((p) => p.position >= 110).length === 0
				);
			})
		);
	}

	/**
	 * Get the winner of a specific race
	 *
	 * @param raceId
	 */
	public getWinner(raceId: string): Winner {
		const racePositions = this.positions.filter(
			(races) => races.raceId === raceId
		);

		const winner = _.last(racePositions).racerPositions.reduce((a, b) =>
			a.position > b.position ? a : b
		);

		const racer = this.racers.find((racer) => racer.id === winner.racerId);

		return {
			raceId: raceId,
			racer: {
				id: racer.id,
				name: racer.name,
			},
		};
	}

	/**
	 * Get the winner for each race
	 */
	public getWinners(): Winner[] {
		const raceIds = _.uniq(this.positions.map((position) => position.raceId));

		return raceIds.map((raceId) => this.getWinner(raceId));
	}
}
