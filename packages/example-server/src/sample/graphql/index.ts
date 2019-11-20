import debug from 'debug';
import {IImperiumServer} from '@imperium/server';
import {ImperiumResolvers} from '@imperium/graphql-server';
import MyCounter from '../models/MyCounter';
import Sample from './Sample.graphqls';

const d = debug('app.sample.graphql');

export const schema = [Sample];

export function resolvers(server: IImperiumServer): ImperiumResolvers {
	const {pubsub} = server.connectors;

	const res: ImperiumResolvers = {
		Query: {
			getCounter() {
				return MyCounter.getCounter();
			},
		},
		Mutation: {
			incCounter() {
				const newNumber = MyCounter.inc();
				d(`New counter: ${newNumber}`);
				if (pubsub) pubsub.publish('counterChanged', {counterChanged: newNumber});
				return newNumber;
			},
		},
	};

	if (pubsub) {
		res.Subscription = {
			counterChanged: {
				subscribe: () => pubsub.asyncIterator('counterChanged'),
			},
		};
	}

	return res;
}
