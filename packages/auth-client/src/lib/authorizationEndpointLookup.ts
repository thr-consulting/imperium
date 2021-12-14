import type {PermissionLookup} from '@imperium/authorization';
import {Authorization} from '@imperium/authorization';
import {Environment} from '@thx/env';
import debug from 'debug';
import type {ClientAuthorizationData} from '../types';

const d = debug('imperium.auth-client.lib.authorizationEndpointLookup');

export const authorizationEndpointLookup: PermissionLookup<ClientAuthorizationData> = async opts => {
	d('fetching from authorization endpoint');
	const {keys, authorization} = opts;

	const keyStrings = keys.map(k => Authorization.keyToString(k));

	return new Promise((resolve, reject) => {
		fetch(Environment.getString('authPermissionUrl'), {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify({
				permissions: keyStrings,
			}),
			headers: {
				'content-type': 'application/json',
				authorization: authorization.extraData?.access ? `Bearer ${authorization.extraData?.access}` : '',
			},
		}).then(res => {
			if (!res.ok) reject(res.statusText);
			res.json().then(returnJson => {
				if (Array.isArray(returnJson.results)) {
					resolve(returnJson.results);
				} else {
					reject(new Error('Authorization results not an array'));
				}
			});
		});
	});
};
