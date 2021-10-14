import {Authorization} from '@imperium/authorization';
/*
	This is the main export from the domain package. This function creates a new domain context
	and should be called on every request/operation.
 */
import {Connectors, ImperiumBaseContext} from '@imperium/connector';
import type {AuthenticatedUser} from '@imperium/connector';
import {getInitializers} from '@imperium/domaindriven';
import debug from 'debug';
import type {User} from '../user';
import {getConnector} from './connectors';
import {createControllers} from './createControllers';
import {createRepositories} from './createRepositories';
import {entities} from './entities';

const d = debug('imperium.examples.domain.core.createDomain');

export async function createDomain(connectors: Connectors, authenticatedUser?: AuthenticatedUser) {
	d('Creating domain');
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
		repos: getInitializers(repositories),
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
