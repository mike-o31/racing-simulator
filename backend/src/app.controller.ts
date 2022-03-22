import {
	Controller,
	Get,
	Sse,
	MessageEvent,
	Param,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Racer, Winner } from './racerTypes';
import * as _ from 'lodash';

@Controller('/api')
export class AppController {
	constructor(private readonly appService: AppService) {}

	/**
	 * Get all racer information
	 */
	@Get('/racers')
	public async getRacers(): Promise<Racer[]> {
		return this.appService.getRacers();
	}

	/**
	 * Start a new race
	 */
	@Sse('/race/start')
	public start(): Observable<MessageEvent> {
		return this.appService.race().pipe(
			map((vehiclePositions) => ({
				data: vehiclePositions,
			}))
		);
	}

	/**
	 * Get the winner of a specific race
	 *
	 * @param raceId
	 */
	@Get('/race/:raceId/winner')
	public getWinner(@Param('raceId') raceId: string): Winner {
		if (_.isEmpty(raceId)) {
			throw new HttpException('RaceId cannot be empty', HttpStatus.BAD_REQUEST);
		}

		return this.appService.getWinner(raceId);
	}

	/**
	 * Get the winner for each race
	 */
	@Get('/winners')
	public getWinners(): Winner[] {
		return this.appService.getWinners();
	}
}
