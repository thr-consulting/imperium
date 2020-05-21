import debug from 'debug';
import {ContextManager, spreadEntities, Connector, ConnectorsConfig, Auth} from '@imperium/context-manager';
import type SharedCache from '@thx/sharedcache';
import type {Connection} from 'typeorm';
import {Score} from './Score';
import {SecureModel} from './SecureModel';
import {AuthModel} from './AuthModel';
import {User} from './User';

const d = debug('imperium.examples.domain-advanced');

/*
	This is an example of a more complicated domain.
	This domain has typeorm models and also provides auth functionality to the app.
 */

// We export the required type of connectors this domain needs.
export type DomainAdvancedConnectors = Connector<{
	pg: ConnectorsConfig<Connection>;
	sharedCache: ConnectorsConfig<SharedCache>;
}>;

// The typeorm connector requires all of the typeorm models to be included when we create the connector
// so we export these entities here.
export const typeormEntities = {Score};

// This domain requires an Auth instance to be passed into it and we will pass that to the ContextManager instance.
export function createDomainAdvancedContext(connectors: DomainAdvancedConnectors, auth?: Auth) {
	return new ContextManager(
		{
			// We can use the spreadEntities helper function to take our previously defined typeorm models and add them here.
			...spreadEntities(typeormEntities),
			// This model provides domain level authentication functionality.
			AuthModel: () => new AuthModel(connectors),
			// This is just a plain domain model
			SecureModel: () => SecureModel,
			User: () => User,
		},
		connectors,
		auth,
	);
}

export type Context = ReturnType<typeof createDomainAdvancedContext>;
