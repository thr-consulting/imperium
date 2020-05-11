import debug from 'debug';
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
// import type {Context} from './index';

const d = debug('imperium.example-standalone.Score');

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
}

export {Score};
