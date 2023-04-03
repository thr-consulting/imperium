import debug from 'debug';
import jsonwebtoken from 'jsonwebtoken';
import type {AuthenticationDomain} from '../types';
import {createAccessToken, createRefreshToken} from './token';
import {isRefreshToken} from './typeguards';

const d = debug('imperium.auth-server.lib.refresh');

const {decode} = jsonwebtoken;

export async function refresh(refreshTokenString: string, auth: AuthenticationDomain): Promise<{access: string; refresh?: string}> {
	const token = decode(refreshTokenString);

	// Check if token is invalid or expired
	if (!token || typeof token === 'string' || !isRefreshToken(token)) {
		throw new Error('Token not valid');
	}

	const isExpired = Date.now() / 1000 > token.exp;
	if (isExpired && !token.deviceToken) {
		throw new Error('Token expired');
	}

	const {id} = await auth.verifyRefresh(token, isExpired);

	const access = createAccessToken(id);

	if (isExpired && token.deviceToken) {
		const newRefresh = createRefreshToken({identifier: token.id, rememberDevice: true, deviceToken: token.deviceToken});

		return {
			// WARNING: Changing this field name requires a change to the "accessTokenField" in @imperium/auth-graphql-client:src/apolloLink.ts file.
			access,
			refresh: newRefresh,
		};
	}

	return {
		// WARNING: Changing this field name requires a change to the "accessTokenField" in @imperium/auth-graphql-client:src/apolloLink.ts file.
		access,
	};
}
