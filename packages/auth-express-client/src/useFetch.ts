import debug from 'debug';

const d = debug('imperium.auth-express-client.useFetch');

const f = window.fetch;

/**
 * @deprecated
 */
export function useFetch() {
	// eslint-disable-next-line
	console.error('This useFetch method is deprecated. Please use the useFetch in @imperium/auth-client');

	return async (input: RequestInfo, init?: RequestInit) => {
		return f(input, init);
	};
}
