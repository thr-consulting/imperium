import {Authorization} from '@imperium/authorization';
import type {AuthenticatedUser} from '@imperium/connector';
/*
	This is the main export from the domain package. This function creates a new domain context
	and should be called on every request/operation.
 */
import {Connectors, ImperiumBaseContext} from '@imperium/connector';
import {getInitializers} from '@imperium/domaindriven';
import debug from 'debug';
import {getConnector} from './connectors';
import {createControllers} from './createControllers';
import {createRepositories} from './createRepositories';
import {entities} from './entities';
import {permissionLookup} from '../auth/permissionLookup';

const d = debug('imperium.examples.domain.core.createDomain');

export async function createDomain(connectors: Connectors, authenticatedUser?: AuthenticatedUser) {
	d('Creating domain');
	const authorization = new Authorization<AuthenticatedUser>({
		lookup: permissionLookup,
		extraData: authenticatedUser,
		id: authenticatedUser?.auth?.id,
	});

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
		authorization,
	};

	const sharedCache = getConnector('sharedCache', connectors);
	authorization.setCache(sharedCache);

	return ctx;
}
