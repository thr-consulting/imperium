import type {AuthenticationDomain, LoginInfo, LoginReturn} from '../types';
import {createAccessToken, createRefreshToken} from './token';
import {validatePassword} from './password';
import {environment} from '../environment';

const env = environment();

export async function login(loginInfo: LoginInfo, remoteAddress: string | undefined, auth: AuthenticationDomain): Promise<LoginReturn> {
	// 1. Check attempts
	const attemptKey = `loginattempts:${loginInfo.identifier}_${remoteAddress?.replace(/:/g, ';')}`;
	const attempts = (await auth.getCache(attemptKey)) || 0;
	if (attempts > env.authMaxFail) throw new Error('Too many login attempts');

	// 2. Get service info from domain layer
	const serviceInfo = await auth.getServiceInfo(loginInfo.identifier);
	if (!serviceInfo) {
		throw new Error('User not found');
	} else {
		// 3. Validate password
		if (await validatePassword(serviceInfo, loginInfo)) {
			// 4. Create and return access and refresh tokens
			return {
				id: serviceInfo.id,
				access: createAccessToken(serviceInfo),
				refresh: createRefreshToken(loginInfo.identifier, loginInfo.rememberDevice),
			};
		}
		// 5. Update cache with attempts and return error on non-valid password.
		await auth.setCache(attemptKey, attempts + 1, env.authMaxCooldown);
		throw new Error('Invalid password');
	}
}
