import {v4} from 'uuid';
import debug from 'debug';
import {Entity, PrimaryKey, Property} from '@mikro-orm/core';

const d = debug('imperium.examples.domain.Category');

@Entity()
export class Category {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'text'})
	name!: string;
}
