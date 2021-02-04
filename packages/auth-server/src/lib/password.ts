import sha256 from '@thx/sha256';
import {compare, hash} from 'bcrypt';
import type {LoginInfo, ServiceInfo} from '../types';

function getPasswordString(password: string | {algorithm: string; digest: string}): string {
	if (typeof password === 'string') {
		return sha256(password).toLowerCase();
	}

	if (password.algorithm.toLowerCase() !== 'sha-256') {
		throw new Error('Invalid Hash Algorithm');
	}
	return password.digest.toLowerCase();
}

export function encryptPassword(password: string | {algorithm: string; digest: string}, saltOrRounds: string | number = 10): Promise<string> {
	return hash(getPasswordString(password), saltOrRounds);
}

export async function validatePassword(serviceInfo: ServiceInfo, loginInfo: LoginInfo): Promise<boolean> {
	return compare(getPasswordString(loginInfo.password), serviceInfo.password || '');
}
