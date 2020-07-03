import debug from 'debug';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

const d = debug('imperium.examples.domain-advanced.Score');

/*
	This is an example of a typeorm domain model.
 */

@Entity()
class Score {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('text')
	name!: string;

	@Column('boolean')
	winner: boolean;

	@Column('bigint')
	score: number;

	constructor() {
		this.winner = false;
		this.score = 0;
	}
}

export {Score};
