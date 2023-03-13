import jsonwebtoken from 'jsonwebtoken';
import type {AuthenticationDomain} from '../types';
import {createAccessToken} from './token';
import {isRefreshToken} from './typeguards';

const {decode} = jsonwebtoken;

export async function refresh(refreshTokenString: string, auth: AuthenticationDomain): Promise<{access: string}> {
	const token = decode(refreshTokenString);

	// Check if token is invalid or expired
	if (!token || typeof token === 'string' || !isRefreshToken(token)) {
		throw new Error('Token not valid');
	} else if (Date.now() / 1000 > token.exp) {
		throw new Error('Token expired');
	}

	// // Get service info from domain layer
	// const serviceInfo = await auth.getServiceInfo(token.id);
	// if (!serviceInfo) {
		throw new Error('User not found');
	// }
	//
	// // Check if token is blacklisted
	// const blacklistIndex = serviceInfo.blacklist?.indexOf(refreshTokenString);
	// if (typeof blacklistIndex === 'number' && blacklistIndex >= 0) {
	// 	throw new Error('Token is blacklisted');
	// }
	//
	// return {
	// 	// WARNING: Changing this field name requires a change to the "accessTokenField" in @imperium/auth-graphql-client:src/apolloLink.ts file.
	// 	access: createAccessToken(serviceInfo),
	// };
}
