import jsonwebtoken from 'jsonwebtoken';
import type {AuthenticationDomain} from '../types';
import {createAccessToken} from './token';
import {isRefreshToken} from './typeguards';

const {decode} = jsonwebtoken;

export async function refresh(refreshTokenString: string, auth: AuthenticationDomain): Promise<{access: string; refresh?: string}> {
	const token = decode(refreshTokenString);

	// Check if token is invalid or expired
	if (!token || typeof token === 'string' || !isRefreshToken(token)) {
		throw new Error('Token not valid');
	}

	const isExpired = Date.now() / 1000 > token.exp;
	if (isExpired && !token.deviceId) {
		throw new Error('Token expired');
	}

	await auth.verifyRefresh(token, isExpired);

	if (isExpired) {
		return {
			// WARNING: Changing this field name requires a change to the "accessTokenField" in @imperium/auth-graphql-client:src/apolloLink.ts file.
			access: createAccessToken(token.id),
			refresh: '',
		};
	}

	return {
		// WARNING: Changing this field name requires a change to the "accessTokenField" in @imperium/auth-graphql-client:src/apolloLink.ts file.
		access: createAccessToken(token.id),
	};
}
