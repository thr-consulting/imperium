import {Entity, PrimaryKey, Property} from '@mikro-orm/core';
import {v4} from 'uuid';

interface SampleConstructor {
	name: string;
}

@Entity()
export class Sample {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'number', version: true})
	version = 1;

	@Property({type: 'string'})
	name: string;

	constructor({name}: SampleConstructor) {
		this.name = name;
	}
}
