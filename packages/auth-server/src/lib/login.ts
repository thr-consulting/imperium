import {env} from '@thx/env';
import debug from 'debug';
import {defaults} from '../defaults';
import type {AuthenticationDomain, LoginInfo, LoginReturn} from '../types';
import {createAccessToken, createRefreshToken} from './token';

const d = debug('imperium.auth-server.lib.login');

export async function login(loginInfo: LoginInfo, remoteAddress: string | undefined, auth: AuthenticationDomain): Promise<LoginReturn> {
	const authMaxFail = env.getInt('IMP_LOGIN_MAX_FAIL', defaults.IMP_LOGIN_MAX_FAIL);
	const authMaxCooldown = env.getInt('IMP_LOGIN_MAX_COOLDOWN', defaults.IMP_LOGIN_MAX_COOLDOWN);

	// 1. Check attempts
	const attemptKey = `loginattempts:${loginInfo.identifier}_${remoteAddress?.replace(/:/g, ';')}`;
	const attempts = (await auth.getCache(attemptKey)) || 0;
	if (attempts > authMaxFail) throw new Error('Too many login attempts');

	try {
		const {id, deviceToken, customData} = await auth.verifyLogin(loginInfo);
		const loginRet: LoginReturn = {
			id,
			access: createAccessToken(id),
			refresh: createRefreshToken({...loginInfo, deviceToken}),
			customData,
		};
		// d(`  Access : ${loginRet.access}`);
		// d(`  Refresh: ${loginRet.refresh}`);
		return loginRet;
	} catch (err: any) {
		await auth.setCache(attemptKey, attempts + 1, authMaxCooldown);
		throw new Error(err.message);
	}
}
