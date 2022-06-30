import {authorizationHeader} from './authorizationHeader';

export function injectNewAuthorization(access: string, oldInit?: RequestInit): RequestInit {
	if (!oldInit || !oldInit.headers) {
		return {
			...oldInit,
			headers: authorizationHeader(access),
		};
	}

	if (Array.isArray(oldInit.headers)) {
		// TODO implement this
		throw new Error('fetch: string[][] not implemented');
	}

	if (oldInit.headers instanceof Headers) {
		// TODO implement this
		throw new Error('fetch: Headers not implemented');
	}

	const newHeaders = Object.keys(oldInit.headers).reduce<Record<string, string>>((memo, key) => {
		if (key.toLowerCase() === 'authorization') return memo;
		// @ts-ignore
		return {...memo, [key]: oldInit.headers[key]};
	}, {});

	return {
		...oldInit,
		headers: {...newHeaders, ...authorizationHeader(access)},
	};
}
