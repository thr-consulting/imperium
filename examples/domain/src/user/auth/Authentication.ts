import type {AuthenticationDomain, LoginInfo, RefreshToken, ServiceInfo} from '@imperium/auth-server';
import {validatePassword} from '@imperium/auth-server';
import type {VerifyLoginReturn, VerifyRefreshReturn} from '@imperium/auth-server/src';
import debug from 'debug';
import {getConnector} from '../../core/connectors';
import type {Context} from '../../index';

const d = debug('imperium.domain.user.auth.Authentication');

const authKeyPrefix = 'auth';

function getKey(key: string | string[]) {
	return key instanceof Array ? [authKeyPrefix, ...key].join(':') : `${authKeyPrefix}:${key}`;
}

export class Authentication implements AuthenticationDomain {
	private readonly context: Context;

	constructor(context: Context) {
		this.context = context;
	}

	async setCache(key: string | string[], value: any, expire?: number): Promise<typeof value> {
		await getConnector('sharedCache', this.context.connectors).set(getKey(key), value, expire);
		return value;
	}

	async getCache(key: string | string[]): Promise<any> {
		return getConnector('sharedCache', this.context.connectors).get(getKey(key));
	}

	async invalidateCache(key: string | string[]): Promise<void> {
		await getConnector('sharedCache', this.context.connectors).clear(getKey(key));
	}

	async verifyLogin(loginInfo: LoginInfo): Promise<VerifyLoginReturn> {
		const serviceInfo = await this.getServiceInfo(loginInfo.identifier);
		if (!serviceInfo) {
			throw new Error('User not found');
		}

		if (await validatePassword(serviceInfo.password, loginInfo.password)) {
			return {
				id: serviceInfo.id,
				data: {
					customField: false,
				},
			};
		}

		throw new Error('Unable to verify login information');
	}

	async verifyRefresh(token: RefreshToken): Promise<VerifyRefreshReturn> {
		const info = await this.getServiceInfo(token.id);
		if (!info) {
			throw new Error('User not found');
		}
		return {
			id: info.id,
			data: {
				customField: true,
			},
		};
	}

	private async getServiceInfo(identifier: string): Promise<ServiceInfo | null> {
		d(`Get service info for ${identifier}, except we'll ignore. Password should be 'password'.`);
		// const user = await this.context.authenticationRepository.getByEmail(identifier);
		const user = {
			id: 'f8e9f45e-d3b6-4c25-8f0f-4e67d69d5d9a',
			service: {
				password: '$2a$11$FqT0AJ9OjWqgnY9Vl5PjbuxAp4oTtm41zTyQAWYizhZ5jTzijL4nq', // password
			},
		};
		if (!user) return null;
		return {
			password: user.service.password,
			id: user.id,
		};
	}
}
