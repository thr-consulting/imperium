import debug from 'debug';
import {sign, SignOptions} from 'jsonwebtoken';
import {environment} from '../environment';
import type {ServiceInfo} from '../types';

const d = debug('imperium.auth-server.lib');
const env = environment();

function signJwt(payload: string | Record<string, unknown> = {}, secret: string, options: SignOptions = {expiresIn: '1h'}): string {
	return sign(payload, secret, options);
}

export function createAccessToken(serviceInfo: ServiceInfo): string {
	return signJwt(
		{
			id: serviceInfo.id,
		},
		env.authAccessTokenSecret,
		{expiresIn: env.authAccessTokenExpires},
	);
}

export function createRefreshToken(identifier: string, rememberDevice?: boolean): string {
	return signJwt(
		{
			id: identifier,
			type: 'r',
		},
		env.authRefreshTokenSecret as string,
		{expiresIn: rememberDevice ? env.authRefreshTokenExpiresLong : env.authRefreshTokenExpiresShort},
	);
}
