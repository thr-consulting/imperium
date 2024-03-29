import {env} from '@thx/env';
import debug from 'debug';
import type {SignOptions} from 'jsonwebtoken';
import jsonwebtoken from 'jsonwebtoken';
import {defaults} from '../defaults';

const d = debug('imperium.auth-server.lib.token');

const {sign} = jsonwebtoken;

function signJwt(payload: string | Record<string, unknown>, secret: string, options: SignOptions = {expiresIn: '1h'}): string {
	return sign(payload, secret, options);
}

export function createAccessToken(id: string): string {
	const authAccessTokenSecret = env.getString('IMP_ACCESS_TOKEN_SECRET', defaults.IMP_ACCESS_TOKEN_SECRET);
	const authAccessTokenExpires = env.getString('IMP_ACCESS_TOKEN_EXPIRES', defaults.IMP_ACCESS_TOKEN_EXPIRES);

	return signJwt(
		{
			id,
		},
		authAccessTokenSecret,
		{expiresIn: authAccessTokenExpires},
	);
}

export function createRefreshToken({
	identifier,
	rememberDevice,
	deviceToken,
}: {
	identifier: string;
	rememberDevice?: boolean;
	deviceToken?: string;
}): string {
	const authRefreshTokenSecret = env.getString('IMP_REFRESH_TOKEN_SECRET', defaults.IMP_REFRESH_TOKEN_SECRET);
	const authRefreshTokenExpiresLong = env.getString('IMP_REFRESH_TOKEN_EXPIRES_LONG', defaults.IMP_REFRESH_TOKEN_EXPIRES_LONG);
	const authRefreshTokenExpiresShort = env.getString('IMP_REFRESH_TOKEN_EXPIRES_SHORT', defaults.IMP_REFRESH_TOKEN_EXPIRES_SHORT);

	let payload: Record<any, string> = {
		id: identifier,
		type: 'r',
	};
	if (rememberDevice && deviceToken) {
		payload = {...payload, dev: deviceToken};
	}

	return signJwt(payload, authRefreshTokenSecret, {expiresIn: rememberDevice ? authRefreshTokenExpiresLong : authRefreshTokenExpiresShort});
}
