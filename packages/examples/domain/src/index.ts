import debug from 'debug';
import type {AuthenticatedUser} from '@imperium/connector';
import type {TypeOfPromise} from '@imperium/util';
import {entities} from './entities';
import {services} from './services';
import {SecureModel} from './other';
// import {AppAbility, defineRulesFor} from './authorizationExample/defineRulesFor';
import type {DomainConnectors} from './DomainConnectors';

const d = debug('imperium.examples.domain');

/*
	This is the main export from the domain package. This function creates a new domain context
	and should be called on every request.
 */
export async function createDomain(connectors: DomainConnectors, authenticatedUser?: AuthenticatedUser) {
	// const authorization = new Authorization(authenticatedUser?.auth?.id);

	// Create a new, blank Entity Manager
	const entityManager = connectors.connections.orm.em.fork(true, true);

	// This is the main context object that will be returned. You can make this look however you wish.
	const ctx = {
		...entities,
		...services(entityManager, connectors, authenticatedUser),
		SecureModel,
		// Authorization: authorization,
		// We also tack on a reference to the connectors and the current entity manager.
		connectors,
		entityManager,
	};

	// await ctx.context.Authorization.prepare(async (id: string) => {
	// 	d(`Fetching user for authorization: ${id}`);
	// 	return ctx.connectors.connections.pg.getRepository(User).findOne(id);
	// }, ctx);

	return ctx;
}

export type Context = TypeOfPromise<ReturnType<typeof createDomain>>;
export {entities};
export {services};
export * from './photo';
export * from './user';
