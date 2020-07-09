import debug from 'debug';
import {ContextManager, spreadEntities, Connector, ConnectorsConfig, AuthenticatedUser, TypeOfPromise} from '@imperium/context-manager';
import type SharedCache from '@thx/sharedcache';
import type {MikroORM} from 'mikro-orm';
// import {Ability, ForbiddenError} from '@casl/ability';
import {Score} from './Score';
import {SecureModel} from './SecureModel';
import {User} from './User';
import {Services} from './Services';
// import {entities as authorizationEntities} from './authorizationExample';
// import {AppAbility, defineRulesFor} from './authorizationExample/defineRulesFor';

const d = debug('imperium.examples.domain-advanced');

/*
	This is an example of a more complicated domain.
	This domain has typeorm models and also provides auth functionality to the app.
 */

// We export the required type of connectors this domain needs.
export type DomainAdvancedConnectors = Connector<{
	pg: ConnectorsConfig<MikroORM>;
	sharedCache: ConnectorsConfig<SharedCache>;
}>;

// The typeorm connector requires all of the typeorm models to be included when we create the connector
// so we export these entities here.
export const entities = {
	Score,
	User,
	Services,
	// ...authorizationEntities,
};

// This domain requires an Auth instance to be passed into it and we will pass that to the ContextManager instance.
export async function createDomainAdvancedContext(connectors: DomainAdvancedConnectors, authenticatedUser?: AuthenticatedUser) {
	const cm = new ContextManager(
		{
			// We can use the spreadEntities helper function to take our previously defined typeorm models and add them here.
			...spreadEntities(entities),
			// This is just a plain domain model
			SecureModel: () => SecureModel,
			// Authorization: () => {
			// 	return new Authorization<User, AppAbility>(defineRulesFor, authenticatedUser?.auth?.id);
			// },
		},
		connectors,
		authenticatedUser,
	);

	// await cm.context.Authorization.prepare(async (id: string) => {
	// 	d(`Fetching user for authorization: ${id}`);
	// 	return cm.connectors.connections.pg.getRepository(User).findOne(id);
	// }, cm);
	// const a = cm.context.Authorization;
	// d(a.can('read', 'User'));

	return cm;
}

export type Context = TypeOfPromise<ReturnType<typeof createDomainAdvancedContext>>;
export {Score} from './Score';
export {SecureModel} from './SecureModel';
export {User} from './User';
export {Photo} from './authorizationExample/Photo';
export {Category} from './authorizationExample/Category';
export {Comment} from './authorizationExample/Comment';
export {Authentication} from './Authentication';
