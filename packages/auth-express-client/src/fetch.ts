import debug from 'debug';

const d = debug('imperium.auth-express-client.fetch');

const f = window.fetch;

/**
 * @deprecated
 * @param input
 * @param init
 */
export async function fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
	// eslint-disable-next-line
	console.error('This fetch method is deprecated. Please use the fetch in @imperium/auth-client');

	return f(input, init);
}
