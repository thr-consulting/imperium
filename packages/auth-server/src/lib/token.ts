import {Environment} from '@thx/env';
import debug from 'debug';
import jsonwebtoken from 'jsonwebtoken';
import type {SignOptions} from 'jsonwebtoken';
import type {ServiceInfo} from '../types';

const d = debug('imperium.auth-server.lib.token');

const {sign} = jsonwebtoken;

function signJwt(payload: string | Record<string, unknown>, secret: string, options: SignOptions = {expiresIn: '1h'}): string {
	return sign(payload, secret, options);
}

export function createAccessToken(serviceInfo: ServiceInfo): string {
	const authAccessTokenSecret = Environment.getString('ACCESS_TOKEN_SECRET');
	const authAccessTokenExpires = Environment.getString('AUTH_ACCESS_TOKEN_EXPIRES');

	return signJwt(
		{
			id: serviceInfo.id,
		},
		authAccessTokenSecret,
		{expiresIn: authAccessTokenExpires},
	);
}

export function createRefreshToken(identifier: string, rememberDevice?: boolean): string {
	const authRefreshTokenSecret = Environment.getString('REFRESH_TOKEN_SECRET');
	const authRefreshTokenExpiresLong = Environment.getString('AUTH_REFRESH_TOKEN_EXPIRES_LONG');
	const authRefreshTokenExpiresShort = Environment.getString('AUTH_REFRESH_TOKEN_EXPIRES_SHORT');

	return signJwt(
		{
			id: identifier,
			type: 'r',
		},
		authRefreshTokenSecret,
		{expiresIn: rememberDevice ? authRefreshTokenExpiresLong : authRefreshTokenExpiresShort},
	);
}
