import type {AuthenticationToken, PermissionLookup} from '@imperium/authorization';
import {Authorization} from '@imperium/authorization';
import {env} from '@thx/env';
import debug from 'debug';
import {defaults} from '../defaults';
import {injectNewAuthorization} from './injectNewAuthorization';

const d = debug('imperium.auth-client.lib.authorizationEndpointLookup');

interface RestResult {
	results: boolean[];
}

function isRestResult(res: any): res is RestResult {
	return !!((res as RestResult).results && Array.isArray(res.results));
}

export const authorizationEndpointLookup: PermissionLookup<AuthenticationToken> = async opts => {
	return new Promise((resolve, reject) => {
		const {keys, authorization} = opts;
		const keyStrings = keys.map(k => Authorization.keyToString(k));

		if (!authorization.extra) {
			resolve(keyStrings.map(() => false));
			return;
		}

		d(`Fetching authorization keys: ${keyStrings.join(', ')}`);
		authorization.extra.getToken().then(token => {
			if (!token) {
				resolve(keyStrings.map(() => false));
				return;
			}

			const url = new URL(env.getString('authPermissionUrl', defaults.authPermissionUrl), env.getString('IMP_API_URL', defaults.IMP_API_URL));
			fetch(
				url.href,
				injectNewAuthorization(token, {
					method: 'POST',
					mode: 'cors',
					credentials: 'include',
					body: JSON.stringify({
						permissions: keyStrings,
					}),
					headers: {
						'content-type': 'application/json',
					},
				}),
			)
				.then(res => {
					if (!res.ok) reject(res.statusText);
					d(`Authorization fetched ${keyStrings.join(', ')}: ${res.ok}`);
					res
						.json()
						.then(returnJson => {
							if (isRestResult(returnJson)) {
								resolve(returnJson.results);
							} else {
								reject(new Error('Authorization results not an array'));
							}
						})
						.catch(() => {
							reject(new Error('No authorization results'));
						});
				})
				.catch(err => {
					reject(err);
				});
		});
	});
};
