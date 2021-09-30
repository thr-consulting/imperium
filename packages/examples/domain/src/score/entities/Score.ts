import {PrimaryKey, Entity, Property, BigIntType} from '@mikro-orm/core';
import debug from 'debug';
import {v4} from 'uuid';

const d = debug('imperium.examples.examples/domain.score.entities.Score');

/*
	This is an example of a mikro-orm domain model.
 */

@Entity()
class Score {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'text'})
	name!: string;

	@Property({type: 'boolean'})
	winner: boolean;

	@Property({type: BigIntType})
	score: number;

	constructor() {
		this.winner = false;
		this.score = 0;
	}
}

export {Score};
