import debug from 'debug';
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
// @ts-ignore
import {genReport} from './genReport';

const d = debug('imperium.examples.domain-advanced.Score');

/*
	This is an example of a typeorm domain model.
 */

@Entity()
class Score extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column('varchar')
	name!: string;

	@Column('boolean')
	winner: boolean;

	@Column('bigint')
	score: number;

	constructor() {
		super();
		this.winner = false;
		this.score = 0;
	}

	static async genReport() {
		await genReport();
	}
}

export {Score};
