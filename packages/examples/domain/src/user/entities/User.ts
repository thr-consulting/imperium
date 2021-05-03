import debug from 'debug';
import {Entity, OneToOne, PrimaryKey, Property, Unique} from '@mikro-orm/core';
import {v4} from 'uuid';
import {Service} from './Service';

const d = debug('imperium.examples.domain.User');

@Entity()
export class User {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'text'})
	name!: string;

	@Property({type: 'text'})
	@Unique()
	email!: string;

	@OneToOne({type: Service})
	service!: Service;
}
