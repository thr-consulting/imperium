/*
	This is the main export from the domain package. This function creates a new domain context
	and should be called on every request/operation.
 */
import type {AuthenticatedUser} from '@imperium/connector';
import {Connectors, ImperiumBaseContext} from '@imperium/connector';
import {Authorization} from '@imperium/authorization';
import type {User} from '../user';
import {entities} from './entities';
import {getConnector} from './connectors';
import {createControllers} from './createControllers';
import {createRepositories} from './createRepositories';

export async function createDomain(connectors: Connectors, authenticatedUser?: AuthenticatedUser) {
	const authorization = new Authorization<User>(authenticatedUser);

	const entityManager = getConnector('orm', connectors).em.fork(true, true);

	const repositories = createRepositories(entityManager, connectors);
	const controllers = createControllers(entityManager, authorization, repositories);

	const ctx = {
		...ImperiumBaseContext(),
		...entities,
		...controllers,
		connectors,
		authenticationRepository: repositories.user,
		em: entityManager,
	};

	const sharedCache = getConnector('sharedCache', connectors);
	await authorization.prepare({
		getUserById: repositories.user.getById.bind(repositories.user),
		createUser: repositories.user.createUser.bind(repositories.user) as (data: unknown) => User,
		getCache: sharedCache.get.bind(sharedCache),
		setCache: sharedCache.set.bind(sharedCache),
		ctx,
	});

	return ctx;
}
