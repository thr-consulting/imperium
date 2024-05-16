import debug from 'debug';
import jsonwebtoken from 'jsonwebtoken';
import type {AuthenticationDomain, RefreshReturn} from '../types';
import {createAccessToken, createRefreshToken} from './token';
import {isRefreshToken} from './typeguards';

const d = debug('imperium.auth-server.lib.refresh');

const {decode} = jsonwebtoken;

export async function refresh(refreshTokenString: string, auth: AuthenticationDomain): Promise<RefreshReturn> {
	const token = decode(refreshTokenString);

	// Check if token is invalid or expired
	if (!token || typeof token === 'string' || !isRefreshToken(token)) {
		throw new Error('Token not valid');
	}

	const isExpired = Date.now() / 1000 > token.exp;
	if (isExpired && !token.dev) {
		throw new Error('Token expired');
	}

	const {id, customData} = await auth.verifyRefresh(token, isExpired);

	const access = createAccessToken(id);

	if (isExpired && token.dev) {
		const newRefresh = createRefreshToken({identifier: token.id, rememberDevice: true, deviceToken: token.dev});

		return {
			// WARNING: Changing this field name requires a change to the "accessTokenField" in @imperium/auth-graphql-client:src/apolloLink.ts file.
			access,
			refresh: newRefresh,
			customData,
		};
	}

	return {
		// WARNING: Changing this field name requires a change to the "accessTokenField" in @imperium/auth-graphql-client:src/apolloLink.ts file.
		access,
		customData,
	};
}
