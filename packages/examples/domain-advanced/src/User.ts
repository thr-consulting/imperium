/* eslint-disable max-classes-per-file */
import debug from 'debug';
import type {ServiceInfo} from '@imperium/auth-server';
import pick from 'lodash/pick';
import {Column, Entity, getRepository, PrimaryGeneratedColumn} from 'typeorm';
import type {DeepPartial} from 'typeorm/common/DeepPartial';
import type {Context} from './index';

const d = debug('imperium.examples.domain-advanced.User');

class Services implements Omit<ServiceInfo, 'id'> {
	@Column('text')
	password!: string;

	@Column('text', {array: true})
	roles!: string[];

	@Column('text', {array: true, nullable: true})
	blacklist?: string[];
}

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column('text')
	name!: string;

	@Column('text')
	email!: string;

	@Column(() => Services)
	services!: Services;

	static async getById(id: string, ctx: Context): Promise<User | undefined> {
		// ctx.context.Authorization.throwUnlessCan('read', 'User');
		const u = await getRepository(User).findOne(id);
		if (!u) return u;

		d(`Current user: ${ctx.authenticatedUser?.auth?.id}`);
		d(` Lookup user: ${u?.id}`);
		d(`Can read?: ${ctx.context.Authorization.can('read', u)}`);
		const permittedFields = ctx.context.Authorization.permittedFieldsOf('read', u);
		d(`Permitted fields: ${JSON.stringify(permittedFields)}`);

		const propNames = Object.getOwnPropertyNames(u);
		d(`Property names: ${propNames}`);

		const uu = pick(u, permittedFields);
		d(uu);

		ctx.context.Authorization.throwUnlessCan('read', u);

		// const z = getRepository(User).metadata;
		// const q = z.ownColumns.map(v => v.propertyPath);
		// const r = z.columns.map(v => v.propertyPath);
		// // const s = z.generatedColumns.map(v => v.propertyPath);
		// // const t = z.descendantColumns.map(v => v.propertyPath);
		// // const x = z.relationsWithJoinColumns.map(v => v.propertyPath);
		// d(q);
		// d(r);
		// // d(s);
		// // d(t);
		// // d(x);

		return uu as User;
	}

	static async createSystemUser() {
		const repo = getRepository(User);
		const sys = await repo.findOne({name: 'SYSTEM'});
		if (!sys) {
			await repo.insert({
				name: 'SYSTEM',
				email: 'system@example.com',
				services: {
					password: 'NOPASSWORD',
					roles: ['admin'],
				},
			});
		}
		return repo.findOne({name: 'SYSTEM'});
	}

	static async getByName(name: string, ctx: Context) {
		// ctx.context.Authorization.throwUnlessCan('read', 'User');
		const u = await getRepository(User).findOne({name});
		// ctx.context.Authorization.throwUnlessCan('read', u);
		return u;
	}

	static create(entityLike: DeepPartial<User>) {
		return getRepository(User).create(entityLike);
	}

	static async add(user: User, ctx: Context) {
		ctx.context.Authorization.throwUnlessCan('create', 'User');
		await getRepository(User).save(user);
	}
}
