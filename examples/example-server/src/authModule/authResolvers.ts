import type {Resolvers} from '~core/graphql';

export function resolvers(): Resolvers {
	return {
		Query: {
			getAuthData(obj, params, ctx) {
				return ctx.authController.getSecureData();
			},
		},
	};
}
