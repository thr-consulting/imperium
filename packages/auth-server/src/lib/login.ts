import {env} from '@thx/env';
import {defaults} from '../defaults';
import type {AuthenticationDomain, LoginInfo, LoginReturn} from '../types';
import {createAccessToken, createRefreshToken} from './token';

export async function login(loginInfo: LoginInfo, remoteAddress: string | undefined, auth: AuthenticationDomain): Promise<LoginReturn> {
	const authMaxFail = env.getInt('IMP_LOGIN_MAX_FAIL', defaults.IMP_LOGIN_MAX_FAIL);
	const authMaxCooldown = env.getInt('IMP_LOGIN_MAX_COOLDOWN', defaults.IMP_LOGIN_MAX_COOLDOWN);

	// 1. Check attempts
	const attemptKey = `loginattempts:${loginInfo.identifier}_${remoteAddress?.replace(/:/g, ';')}`;
	const attempts = (await auth.getCache(attemptKey)) || 0;
	if (attempts > authMaxFail) throw new Error('Too many login attempts');

	try {
		const serviceInfo = await auth.verifyAuthentication(loginInfo);
		return {
			id: serviceInfo.id,
			access: createAccessToken(serviceInfo),
			refresh: createRefreshToken(loginInfo.identifier, loginInfo.rememberDevice);
		};
	} catch (err: Error) {
		await auth.setCache(attemptKey, attempts + 1, authMaxCooldown);
		throw new Error(err.message);
	}

	// // 2. Get service info from domain layer
	// const serviceInfo = await auth.getServiceInfo(loginInfo.identifier);
	// if (!serviceInfo) {
	// 	throw new Error('User not found');
	// } else {
	// 	// 3. Validate password
	// 	if (await validatePassword(serviceInfo, loginInfo)) {
	// 		// 4. Create and return access and refresh tokens
	// 		return {
	// 			id: serviceInfo.id,
	// 			access: createAccessToken(serviceInfo),
	// 			refresh: createRefreshToken(loginInfo.identifier, loginInfo.rememberDevice),
	// 		};
	// 	}
	// 	// 5. Update cache with attempts and return error on non-valid password.
	// 	await auth.setCache(attemptKey, attempts + 1, authMaxCooldown);
	// 	throw new Error('Invalid password');
	// }
}
