import {Column, DeepPartial, Entity, getRepository, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import type {Photo} from './Photo';
import type {User} from '../User';
import type {Context} from '../index';

@Entity()
export class Comment {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('text')
	comment!: string;

	@ManyToOne('Photo', (photo: Photo) => photo.comments)
	photo!: Photo;

	@ManyToOne('User')
	@JoinColumn()
	user!: User;

	static async getById(id: string, ctx: Context): Promise<Comment | undefined> {
		ctx.context.Authorization.throwUnlessCan('read', ' Comment');
		return getRepository(Comment).findOne(id, {loadRelationIds: true});
	}

	static create(entityLike: DeepPartial<Comment>) {
		return getRepository(Comment).create(entityLike);
	}

	static async add(comment: Comment, ctx: Context) {
		ctx.context.Authorization.throwUnlessCan('create', 'Comment');
		await getRepository(Comment).save(comment);
	}
}
