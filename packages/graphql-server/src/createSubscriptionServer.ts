import type {ImperiumServer} from '@imperium/server';
import {env} from '@thx/env';
import debug from 'debug';
import {execute, type GraphQLSchema, subscribe} from 'graphql';
import {type ServerOptions, SubscriptionServer} from 'subscriptions-transport-ws';
import {defaults} from './defaults';

const d = debug('imperium.graphql-server.createSubscriptionServer');

interface CreateSubscriptionServerOpts {
	schema: GraphQLSchema;
	server: ImperiumServer<any>;
	graphqlUrl: string;
}

export function createSubscriptionServer({server, schema, graphqlUrl}: CreateSubscriptionServerOpts) {
	const enableSubscriptions = env.getBool('IMP_GRAPHQL_ENABLE_SUBSCRIPTIONS', defaults.IMP_GRAPHQL_ENABLE_SUBSCRIPTIONS);

	if (enableSubscriptions) {
		d('Installing subscription handlers');
		const apollSubscriptionServerConfig: ServerOptions = {
			schema,
			execute,
			subscribe,
			async onConnect(/* connectionParams: Record<string, unknown>, webSocket: WebSocket, context: ConnectionContext */) {
				// TODO this context is too long lived. It exists for the life of the websocket.
				// Look into using @envelop https://envelop.dev to fix this.
				return server.createContext();
			},
		};

		const subscriptionServer = SubscriptionServer.create(apollSubscriptionServerConfig, {
			server: server.httpServer,
			path: graphqlUrl,
		});

		return {
			async serverWillStart() {
				return {
					async drainServer() {
						subscriptionServer.close();
					},
				};
			},
		};
	}

	return null;
}
