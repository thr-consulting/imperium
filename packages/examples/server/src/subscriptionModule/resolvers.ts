import {inspect} from 'util';
import debug from 'debug';
import type {ImperiumServer} from '@imperium/server';
import type {IResolvers} from '@imperium/graphql-server';
import {randomLetters} from '@thx/random';
import type {Context} from '../core/context';
import {data} from './data';

const d = debug('imperium.examples.server.subscriptionModule.resolvers');
const dd = (obj: any) => d(inspect(obj, false, null, true));

export function resolvers(server: ImperiumServer<Context, any>): IResolvers<any, Context> {
	return {
		Query: {
			getSubscriptionValue() {
				// This is a normal query.
				return data;
			},
		},
		Mutation: {
			changeSubscriptionValue(obj, params, ctx) {
				// Perform the mutation
				data.id = randomLetters(10);

				// Notify the pubsub that the value changed. We can send the changed
				// data to the client via the subscription by passing it as the payload
				// to pubsub.publish(). The payload is an object with the key of the
				// subscription name.
				ctx.connectors.connections.pubsub.publish('VALUECHANGED', {
					subscriptionValueChanged: data,
				});

				// Return value for the mutation.
				return data;
			},
		},
		Subscription: {
			subscriptionValueChanged: {
				subscribe(obj, params, ctx) {
					return ctx.connectors.connections.pubsub.asyncIterator(['VALUECHANGED']);
				},
			},
		},
	};
}
