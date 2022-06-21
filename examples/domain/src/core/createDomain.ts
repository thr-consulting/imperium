import {Authorization} from '@imperium/authorization';
import type {AuthenticatedUser} from '@imperium/connector';
import {Connectors, ImperiumBaseContext} from '@imperium/connector';
import {Domain} from '@imperium/domaindriven';
import debug from 'debug';
import {authModule} from '../auth';
import {getConnector} from './connectors';
import {createControllers} from './createControllers';
import {createRepositories} from './createRepositories';
import {entities} from './entities';

/*
	This is the main export from the domain package. This function creates a new domain context
	and should be called on every request/operation.
 */

const d = debug('imperium.domain.core.createDomain');

export async function createDomain(connectors: Connectors, authenticatedUser?: AuthenticatedUser) {
	d('Creating domain');

	const entityManager = getConnector('orm', connectors).em.fork({
		clear: true,
		useContext: true,
	});

	const authorization = new Authorization<AuthenticatedUser>({
		extraData: authenticatedUser,
		id: authenticatedUser?.auth?.id,
	});

	const repositories = createRepositories(entityManager, connectors);
	const initializers = repositories;

	const controllers = createControllers(entityManager, authorization, repositories);

	const domain = new Domain<AuthenticatedUser>({
		modules: [authModule],
		repositories,
	});

	const ctx = {
		...ImperiumBaseContext(),
		...entities,
		...controllers,
		connectors,
		authenticationRepository: repositories.user,
		em: entityManager,
		initializers,
		authorization,
	};

	authorization.cache = getConnector('sharedCache', connectors);
	authorization.context = ctx;
	authorization.lookup = domain.permissionLookup;

	return ctx;
}
