import {name} from '../../package.json';
import models from './models';
import endpoints from './endpoints';
import middleware from './middleware';
import {schema, resolvers, schemaDirectives} from './graphql';
import startup from './startup';

export default function ImperiumAuthModule() {
	return {
		name,
		models,
		middleware,
		endpoints,
		schema,
		resolvers,
		schemaDirectives,
		startup,
		options() {
			return {
				authAccessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'notsecure',
				authRefreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'notsecure',
				authAccessTokenExpires: process.env.AUTH_ACCESS_TOKEN_EXPIRES || '1h',
				authRefreshTokenExpires: process.env.AUTH_REFRESH_TOKEN_EXPIRES || '7d',
				authMaxFail: parseInt(process.env.AUTH_MAX_FAIL || '5', 10),
				authMaxCooldown: parseInt(process.env.AUTH_MAX_COOLDOWN || '300', 10),
				authPasswordSaltRounds: parseInt(process.env.AUTH_PASSWORD_SALT_ROUNDS || '11', 10),
				authRecoveryTokenExpires: process.env.AUTH_RECOVERY_TOKEN_EXPIRES || '2d',
				authEnableSignup: process.env.AUTH_ENABLE_SIGNUP === 'true',
			};
		},
	};
}
