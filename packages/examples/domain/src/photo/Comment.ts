import {Entity, ManyToOne, PrimaryKey, Property} from '@mikro-orm/core';
import {v4} from 'uuid';
import type {Photo} from './Photo';
import {User} from '../user';

@Entity()
export class Comment {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'text'})
	comment!: string;

	@ManyToOne('Photo')
	photo!: Photo;

	@ManyToOne(() => User)
	user!: User;
}
