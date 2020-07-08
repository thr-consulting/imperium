import debug from 'debug';
import {Column, Entity, getRepository, PrimaryGeneratedColumn} from 'typeorm';
import type {Context} from '../index';

const d = debug('imperium.examples.domain-advanced.Category');

@Entity()
export class Category {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('text')
	name!: string;

	static async getById(id: string, ctx: Context): Promise<Category | undefined> {
		// ctx.context.Authorization.throwUnlessCan('read', 'Category');
		return getRepository(Category).findOne(id);
	}

	static async getByName(name: string, ctx: Context): Promise<Category | undefined> {
		// ctx.context.Authorization.throwUnlessCan('read', Category);
		return getRepository(Category).findOne({name});
	}

	static async add(cat: Category, ctx: Context) {
		// ctx.context.Authorization.throwUnlessCan('create', 'Category');
		await getRepository(Category).save(cat);
	}
}
