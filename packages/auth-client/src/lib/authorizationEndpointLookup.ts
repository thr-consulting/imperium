import {fetch} from '@imperium/auth-express-client';
import type {PermissionLookup} from '@imperium/authorization';
import {Authorization} from '@imperium/authorization';
import {env} from '@thx/env';
import debug from 'debug';
import {defaults} from '../defaults';
import type {ClientAuthorizationData} from '../types';
import {authorizationHeader} from './authorizationHeader';

const d = debug('imperium.auth-client.lib.authorizationEndpointLookup');

interface RestResult {
	results: boolean[];
}

function isRestResult(res: any): res is RestResult {
	return !!((res as RestResult).results && Array.isArray(res.results));
}

export const authorizationEndpointLookup: PermissionLookup<ClientAuthorizationData> = async opts => {
	d('fetching from authorization endpoint');
	const {keys, authorization} = opts;

	const keyStrings = keys.map(k => Authorization.keyToString(k));

	return new Promise((resolve, reject) => {
		const url = new URL(env.getString('authPermissionUrl', defaults.authPermissionUrl), env.getString('IMP_API_URL', defaults.IMP_API_URL));
		fetch(url.href, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify({
				permissions: keyStrings,
			}),
			headers: {
				'content-type': 'application/json',
				...authorizationHeader(authorization.extraData?.access),
			},
		}).then(res => {
			if (!res.ok) reject(res.statusText);
			res.json().then(returnJson => {
				if (isRestResult(returnJson)) {
					resolve(returnJson.results);
				} else {
					reject(new Error('Authorization results not an array'));
				}
			});
		});
	});
};
