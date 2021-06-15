import {Entity, PrimaryKey, Property} from '@mikro-orm/core';
import {v4} from 'uuid';

interface UserConstructor {
	name: string;
}

@Entity()
export class User {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'number', version: true})
	version = 1;

	@Property({type: 'string'})
	name: string;

	constructor({name}: UserConstructor) {
		this.name = name;
	}
}
