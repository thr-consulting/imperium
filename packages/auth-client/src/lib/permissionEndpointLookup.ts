import type {PermissionLookup} from '@imperium/authorization';
import {Environment} from '@thx/env';
import debug from 'debug';
import type {ClientAuthorizationData} from '../types';

const d = debug('imperium.auth-client.lib.permissionEndpointLookup');

export const permissionEndpointLookup: PermissionLookup<ClientAuthorizationData> = async ({permission, data, authorization}) => {
	d('fetching from authorization endpoint');

	return new Promise((resolve, reject) => {
		fetch(Environment.getString('authPermissionUrl'), {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify({
				permission,
				data,
			}),
			headers: {
				'content-type': 'application/json',
				authorization: authorization.extraData?.access ? `Bearer ${authorization.extraData?.access}` : '',
			},
		})
			.then(res => {
				if (!res.ok) reject(res.statusText);
				res.json().then(returnJson => {
					const result = returnJson.ret;
					if (typeof result === 'boolean') {
						resolve(result);
					} else {
						reject(new Error('Authorization result not boolean'));
					}
				});
			})
			.catch(err => {
				d(err);
			});
	});
};
