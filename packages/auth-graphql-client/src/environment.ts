import memoize from 'lodash/memoize';

export const environment = memoize((env?: Record<string, unknown>) => {
	return {
		localStorageAccessTokenKey: (env?.authAccessTokenKey as string) || 'access',
		localStorageIdKey: (env?.authIdKey as string) || 'id',
	};
});
