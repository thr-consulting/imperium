import debug from 'debug';
import {Entity, OneToOne, PrimaryKey, Property} from 'mikro-orm';
import {v4} from 'uuid';
import {Services} from './Services';

const d = debug('imperium.examples.domain.User');

@Entity()
export class User {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'text'})
	name!: string;

	@Property({type: 'text'})
	email!: string;

	@OneToOne({type: Services})
	services!: Services;
}
