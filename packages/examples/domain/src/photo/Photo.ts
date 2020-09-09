import debug from 'debug';
import {Collection, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property} from '@mikro-orm/core';
import {v4} from 'uuid';
import {Category} from './Category';
import {User} from '../user';
import {Comment} from './Comment';
// import {Metadata} from './Metadata';

const d = debug('imperium.examples.domain.Photo');

@Entity()
export class Photo {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'text'})
	name!: string;

	@Property({type: 'boolean'})
	public!: boolean;

	// @Property({type: Metadata})
	// metadata!: Metadata;

	@ManyToMany(() => Category)
	categories = new Collection<Category>(this);

	@OneToMany(() => Comment, comment => comment.photo)
	comments = new Collection<Comment>(this);

	@ManyToOne(() => User)
	owner!: User;
}
