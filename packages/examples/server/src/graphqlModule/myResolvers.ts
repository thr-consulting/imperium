import {mergeResolvers} from '@imperium/graphql-server';
import type {IResolvers} from 'graphql-tools';
import type {Context} from '~core/context';

function myResolvers(): IResolvers<number, Context> {
	return {
		Query: {
			async getData(/* obj, value, apolloContext */) {
				// The apollo context is technically different than imperium context but we spread imperium context across apollo context.
				// const data = apolloContext.scoreController
				// const fakeSecureData = apolloContext.SecureModel.getSecureData('secure-thing', apolloContext);
				// d(`Fake Secure Data: ${fakeSecureData}`);
				return 5;
			},
		},
	};
}

export function resolvers() {
	return mergeResolvers<Context>([myResolvers()]);
}
