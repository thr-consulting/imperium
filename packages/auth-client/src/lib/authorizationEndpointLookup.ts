import type {PermissionLookup} from '@imperium/authorization';
import {Authorization} from '@imperium/authorization';
import {Environment} from '@thx/env';
import debug from 'debug';
import fetch from 'node-fetch';
import type {ClientAuthorizationData} from '../types';

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
		// TODO switched to node-fetch, these are not implemented, needs testing - mk
		fetch(Environment.getString('authPermissionUrl'), {
			method: 'POST',
			// mode: 'cors',
			// credentials: 'include',
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
				if (isRestResult(returnJson)) {
					resolve(returnJson.results);
				} else {
					reject(new Error('Authorization results not an array'));
				}
			});
		});
	});
};
