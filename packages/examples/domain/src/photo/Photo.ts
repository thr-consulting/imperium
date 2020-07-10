import debug from 'debug';
import {Entity, ManyToMany, ManyToOne, PrimaryKey, Property} from 'mikro-orm';
import {Category} from './Category';
import {User} from '../user';
// import type {Comment} from './Comment';
// import {Metadata} from './Metadata';

const d = debug('imperium.examples.domain.Photo');

@Entity()
export class Photo {
	@PrimaryKey({type: 'uuid'})
	id!: string;

	@Property({type: 'text'})
	name!: string;

	@Property({type: 'boolean'})
	public!: boolean;

	// @Property({type: Metadata})
	// metadata!: Metadata;

	@ManyToMany(() => Category)
	categories!: Category[];

	// @OneToMany('Comment', (comment: Comment) => comment.photo)
	// comments!: Comment[];

	@ManyToOne(() => User)
	owner!: User;
}
