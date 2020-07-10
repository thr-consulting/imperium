import debug from 'debug';
import type {Connector, ConnectorsConfig, AuthenticatedUser} from '@imperium/connector';
import type {TypeOfPromise} from '@imperium/util';
import type SharedCache from '@thx/sharedcache';
import type {MikroORM} from 'mikro-orm';
import {entities} from './entities';
import {repositories} from './repositories';
import {SecureModel} from './other';
// import {AppAbility, defineRulesFor} from './authorizationExample/defineRulesFor';

const d = debug('imperium.examples.domain');

// We export the required type of connectors this domain needs.
export type DomainConnectors = Connector<{
	orm: ConnectorsConfig<MikroORM>;
	sharedCache: ConnectorsConfig<SharedCache>;
}>;

export async function createDomain(connectors: DomainConnectors, authenticatedUser?: AuthenticatedUser) {
	// const authorization = new Authorization(authenticatedUser?.auth?.id);

	const em = connectors.connections.orm.em.fork(true, true);

	const ctx = {
		entities,
		...repositories(em, connectors, authenticatedUser),
		SecureModel,
		// Authorization: authorization,
		connectors,
		authenticatedUser,
		async flush() {
			await em.flush();
		},
	};

	// await ctx.context.Authorization.prepare(async (id: string) => {
	// 	d(`Fetching user for authorization: ${id}`);
	// 	return ctx.connectors.connections.pg.getRepository(User).findOne(id);
	// }, ctx);

	return ctx;
}

export type Context = TypeOfPromise<ReturnType<typeof createDomain>>;
export {Authentication} from './Authentication';
export {entities};
