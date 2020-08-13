/*
	This is the main export from the domain package. This function creates a new domain context
	and should be called on every request.
 */
import type {AuthenticatedUser} from '@imperium/connector';
import {Authorization} from '../lib/Authorization';
import {AppAbilityTuple, defineRulesFor} from './defineRulesFor';
import type {DomainConnectors} from './DomainConnectors';
import type {User} from '../user';
import {entities} from './entities';
import {services} from './services';
import {SecureModel} from '../other';

export async function createDomain(connectors: DomainConnectors, authenticatedUser?: AuthenticatedUser) {
	// const authorization = new Authorization(authenticatedUser?.auth?.id);
	const authorization = new Authorization<AppAbilityTuple, User>(authenticatedUser?.auth?.id);

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

	await authorization.prepare({
		defineRulesFor,
		getUserById: ctx.userService.getById__direct.bind(ctx.userService),
		getCache: connectors.connections.sharedCache.get.bind(connectors.connections.sharedCache),
		setCache: connectors.connections.sharedCache.set.bind(connectors.connections.sharedCache),
	});

	return ctx;
}
