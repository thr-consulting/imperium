import debug from 'debug';
import type {AuthenticatedUser} from '@imperium/connector';
import type {TypeOfPromise} from '@imperium/util';
import {entities} from './entities';
import {services} from './services';
import {SecureModel} from './other';
// import {AppAbility, defineRulesFor} from './authorizationExample/defineRulesFor';
import type {DomainConnectors} from './DomainConnectors';

const d = debug('imperium.examples.domain');

export async function createDomain(connectors: DomainConnectors, authenticatedUser?: AuthenticatedUser) {
	// const authorization = new Authorization(authenticatedUser?.auth?.id);

	// Create a new, blank Entity Manager
	const em = connectors.connections.orm.em.fork(true, true);

	const ctx = {
		...entities,
		...services(em, connectors, authenticatedUser),
		SecureModel,
		// Authorization: authorization,
		connectors,
		authenticatedUser,
		entityManager: em,
	};

	// await ctx.context.Authorization.prepare(async (id: string) => {
	// 	d(`Fetching user for authorization: ${id}`);
	// 	return ctx.connectors.connections.pg.getRepository(User).findOne(id);
	// }, ctx);

	return ctx;
}

export type Context = TypeOfPromise<ReturnType<typeof createDomain>>;
export {Authentication} from './user';
export {entities};
export {services};
