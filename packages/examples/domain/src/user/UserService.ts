import {AbstractEntityService} from '~lib/AbstractEntityService';
import type {User} from './User';
import type {DomainConnectors} from '../core/DomainConnectors';

export class UserService extends AbstractEntityService<User, DomainConnectors> {
	async getByName(name: string) {
		return this.repo.findOne({name});
	}

	// static async getById(id: string, ctx: Context): Promise<User | undefined> {
	// 	// ctx.context.Authorization.throwUnlessCan('read', 'User');
	// 	const u = await getRepository(User).findOne(id);
	// 	// if (!u) return u;
	// 	//
	// 	// d(`Current user: ${ctx.authenticatedUser?.auth?.id}`);
	// 	// d(` Lookup user: ${u?.id}`);
	// 	// d(`Can read?: ${ctx.context.Authorization.can('read', u)}`);
	// 	// const permittedFields = ctx.context.Authorization.permittedFieldsOf('read', u);
	// 	// d(`Permitted fields: ${JSON.stringify(permittedFields)}`);
	// 	//
	// 	// const propNames = Object.getOwnPropertyNames(u);
	// 	// d(`Property names: ${propNames}`);
	// 	//
	// 	// const uu = pick(u, permittedFields);
	// 	// d(uu);
	// 	//
	// 	// ctx.context.Authorization.throwUnlessCan('read', u);
	//
	// 	// const z = getRepository(User).metadata;
	// 	// const q = z.ownColumns.map(v => v.propertyPath);
	// 	// const r = z.columns.map(v => v.propertyPath);
	// 	// // const s = z.generatedColumns.map(v => v.propertyPath);
	// 	// // const t = z.descendantColumns.map(v => v.propertyPath);
	// 	// // const x = z.relationsWithJoinColumns.map(v => v.propertyPath);
	// 	// d(q);
	// 	// d(r);
	// 	// // d(s);
	// 	// // d(t);
	// 	// // d(x);
	//
	// 	return u as User;
	// }

	async getByEmail__direct(email: string) {
		return this.repo.findOne({email}, ['services']);
	}

	async getById__direct(id: string) {
		return this.repo.findOne(id, ['services']);
	}
}
