import {Entity, OneToOne, PrimaryKey, Property, Unique} from '@mikro-orm/core';
import debug from 'debug';
import {v4} from 'uuid';
import {Service} from './Service';

const d = debug('imperium.examples.domain.user.entities.User');

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
