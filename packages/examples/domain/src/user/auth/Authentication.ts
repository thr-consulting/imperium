import type {AuthenticationDomain, ServiceInfo} from '@imperium/auth-server';
import debug from 'debug';
import {getConnector} from '../../core/connectors';
import type {Context} from '../../index';

const d = debug('imperium.examples.examples/domain.user.auth.Authentication');

const authKeyPrefix = 'auth';

function getKey(key: string | string[]) {
	return key instanceof Array ? [authKeyPrefix, ...key].join(':') : `${authKeyPrefix}:${key}`;
}

export class Authentication implements AuthenticationDomain {
	// eslint-disable-next-line react/static-property-placement
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

	async getServiceInfo(identifier: string): Promise<ServiceInfo | null> {
		const user = await this.context.authenticationRepository.getByEmail(identifier);
		if (!user) return null;
		return {
			password: user.service.password,
			id: user.id,
		};
	}
}
