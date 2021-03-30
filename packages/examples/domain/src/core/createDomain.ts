/*
	This is the main export from the domain package. This function creates a new domain context
	and should be called on every request/operation.
 */
import type {AuthenticatedUser} from '@imperium/connector';
import {Connectors, ImperiumBaseContext} from '@imperium/connector';
import {Authorization} from '~lib/Authorization';
import {AppAbilityTuple, defineRulesFor} from './defineRulesFor';
import type {User} from '../user';
import {entities} from './entities';
import {services} from './services';
import {SecureModel} from '../other';
import {getConnector} from './connectors';

export async function createDomain(connectors: Connectors, authenticatedUser?: AuthenticatedUser) {
	// const authorization = new Authorization(authenticatedUser?.auth?.id);
	const authorization = new Authorization<AppAbilityTuple, User>(authenticatedUser?.auth?.id);

	// Create a new, blank Entity Manager
	const entityManager = getConnector('orm', connectors).em.fork(true, true);

	// This is the main context object that will be returned. You can make this look however you wish.
	const ctx = {
		...ImperiumBaseContext(),
		...entities,
		...services(entityManager, connectors, authenticatedUser),
		SecureModel,
		// Authorization: authorization,
		// We also tack on a reference to the connectors and the current entity manager.
		connectors,
		entityManager,
	};

	const sharedCache = getConnector('sharedCache', connectors);
	await authorization.prepare({
		defineRulesFor,
		getUserById: ctx.userService.getById__direct.bind(ctx.userService),
		getCache: sharedCache.get.bind(sharedCache),
		setCache: sharedCache.set.bind(sharedCache),
	});

	return ctx;
}
