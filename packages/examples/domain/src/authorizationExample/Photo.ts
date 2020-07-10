import debug from 'debug';
import {Column, Entity, getRepository, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, DeepPartial} from 'typeorm';
import {Metadata} from './Metadata';
import type {Category} from './Category';
import type {User} from '../User';
import type {Comment} from './Comment';
import type {Context} from '../index';

const d = debug('imperium.examples.domain.Photo');

@Entity()
export class Photo {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('text')
	name!: string;

	@Column('boolean')
	public!: boolean;

	@Column(() => Metadata)
	metadata!: Metadata;

	@ManyToMany('Category')
	@JoinTable()
	categories!: Category[];

	@OneToMany('Comment', (comment: Comment) => comment.photo)
	comments!: Comment[];

	@ManyToOne('User')
	@JoinColumn()
	owner!: User;

	static async getByName(name: string, ctx: Context): Promise<Photo | undefined> {
		// ctx.context.Authorization.throwUnlessCan('read', 'Photo');
		const p = await getRepository(Photo).findOne({name}, {loadRelationIds: true});
		// ctx.context.Authorization.throwUnlessCan('read', p);
		return p;
	}

	static create(entityLike: DeepPartial<Photo>) {
		return getRepository(Photo).create(entityLike);
	}

	static async add(photo: Photo, ctx: Context) {
		// ctx.context.Authorization.throwUnlessCan('create', 'Photo');
		await getRepository(Photo).save(photo);
	}
}
