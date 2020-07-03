/* eslint-disable max-classes-per-file */
import debug from 'debug';
import type {ServiceInfo} from '@imperium/auth-server';
import {Column, Entity, getRepository, PrimaryGeneratedColumn} from 'typeorm';
import type {DeepPartial} from 'typeorm/common/DeepPartial';
import type {Context} from './index';

const d = debug('imperium.examples.domain-advanced.User');

class Password {
	@Column('text')
	bcrypt!: string;
}

class Services implements Omit<ServiceInfo, 'id'> {
	@Column(() => Password)
	password!: Password;

	@Column('text', {array: true})
	roles!: string[];
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
		ctx.context.Authorization.throwUnlessCan('read', 'User');
		const u = await getRepository(User).findOne(id);
		// const p = ctx.context.Authorization.can('read', u);
		d(`Current user: ${ctx.authenticatedUser?.auth?.id}`);
		d(` Lookup user: ${u?.id}`);
		d(`Can read?: ${ctx.context.Authorization.can('read', u)}`);

		const permittedFields = ctx.context.Authorization.permittedFieldsOf('read', u);
		d(`Permitted fields: ${JSON.stringify(permittedFields)}`);

		const y = ctx.context.Authorization.rulesToQuery('read', u);
		d(`Rules to query: ${JSON.stringify(y)}`);

		ctx.context.Authorization.throwUnlessCan('read', u);
		return u;
	}

	static async createSystemUser() {
		const repo = getRepository(User);
		const sys = await repo.findOne({name: 'SYSTEM'});
		if (!sys) {
			await repo.insert({
				name: 'SYSTEM',
				email: 'system@example.com',
				services: {
					password: {
						bcrypt: 'NOPASSWORD',
					},
					roles: ['admin'],
				},
			});
		}
		return repo.findOne({name: 'SYSTEM'});
	}

	static async getByName(name: string, ctx: Context) {
		ctx.context.Authorization.throwUnlessCan('read', 'User');
		const u = await getRepository(User).findOne({name});
		ctx.context.Authorization.throwUnlessCan('read', u);
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
