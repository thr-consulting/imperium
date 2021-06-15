import {Authorization} from '@imperium/authorization';
import type {AuthenticatedUser, Connectors, ImperiumContext} from '@imperium/connector';
import {ImperiumBaseContext} from '@imperium/connector';
import debug from 'debug';
import {getConnector} from './connectors';
import {createControllers} from './createControllers';
import {createRepositories} from './createRepositories';
import type {User} from '../user/entities';

const d = debug('domain.core.createDomain');

export async function createDomain(connectors: Connectors, authenticatedUser?: AuthenticatedUser) {
	d('creating Domain');
	// Create authorization
	const authorization = new Authorization<User>(authenticatedUser);

	// Create a new, blank Entity Manager
	const entityManager = getConnector('orm', connectors).em.fork(true, true);

	const repositories = createRepositories(entityManager, connectors);

	const controllers = createControllers(entityManager, authorization, repositories);

	const ctx = {
		...ImperiumBaseContext(),
		...controllers,
		connectors,
		em: entityManager,
	};

	// Prepare the authorization
	const cache = getConnector('cache', connectors);
	await authorization.prepare({
		getUserById: repositories.user.getById.bind(repositories.user),
		createUser: repositories.user.createUser.bind(repositories.user) as (data: unknown) => User,
		getCache: cache.get.bind(cache),
		setCache: cache.set.bind(cache),
		ctx,
	});

	return ctx;
}

export type Context = ImperiumContext<typeof createDomain>;
