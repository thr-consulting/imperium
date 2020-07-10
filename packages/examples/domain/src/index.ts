import debug from 'debug';
import type {Connector, ConnectorsConfig, AuthenticatedUser} from '@imperium/connector';
import type {TypeOfPromise} from '@imperium/util';
import type SharedCache from '@thx/sharedcache';
import type {MikroORM} from 'mikro-orm';
import {Score} from './Score';
import {SecureModel} from './SecureModel';
import {User} from './User';
import {Services} from './Services';
// import {entities as authorizationEntities} from './authorizationExample';
// import {AppAbility, defineRulesFor} from './authorizationExample/defineRulesFor';

const d = debug('imperium.examples.domain');

// We export the required type of connectors this domain needs.
export type DomainConnectors = Connector<{
	pg: ConnectorsConfig<MikroORM>;
	sharedCache: ConnectorsConfig<SharedCache>;
}>;

// The typeorm connector requires all of the typeorm models to be included when we create the connector
// so we export these entities here.
// The mikroorm connector requires all of the mikroorm models to be included when we create the connector
// so we export these entities here.
export const entities = {
	Score,
	User,
	Services,
	// ...authorizationEntities,
};

export async function createDomain(connectors: DomainConnectors, authenticatedUser?: AuthenticatedUser) {
	// const authorization = new Authorization(authenticatedUser?.auth?.id);

	const ctx = {
		...entities,
		SecureModel,
		// Authorization: authorization,
		connectors,
	};

	// await ctx.context.Authorization.prepare(async (id: string) => {
	// 	d(`Fetching user for authorization: ${id}`);
	// 	return ctx.connectors.connections.pg.getRepository(User).findOne(id);
	// }, ctx);

	return ctx;
}

export type Context = TypeOfPromise<ReturnType<typeof createDomain>>;

export {Score} from './Score';
export {SecureModel} from './SecureModel';
export {User} from './User';
export {Photo} from './authorizationExample/Photo';
export {Category} from './authorizationExample/Category';
export {Comment} from './authorizationExample/Comment';
export {Authentication} from './Authentication';
