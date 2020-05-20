import debug from 'debug';
import type {AuthDomain, ServiceInfo} from '@imperium/auth-server';
import type {DomainAdvancedConnectors} from './index';

const d = debug('imperium.examples.domain-advanced.AuthModel');

export class AuthModel implements AuthDomain {
	private connectors: DomainAdvancedConnectors;

	constructor(connectors: DomainAdvancedConnectors) {
		this.connectors = connectors;
	}

	async setCache(key: string | string[], value: any, expire?: number): Promise<typeof value> {
		d(expire);
		return value;
	}

	async getCache(key: string | string[]): Promise<any> {
		d(key);
		return null;
	}

	async invalidateCache(key: string | string[] | undefined): Promise<void> {
		d(key);
		return undefined;
	}

	async getServiceInfo(id: string): Promise<ServiceInfo | null> {
		d(id);
		return null;
	}

	async getPermissions(id: string): Promise<string[]> {
		d(id);
		return [];
	}

	hasPermission(perms: string | string[], id: string): boolean {
		d(id);
		return false;
	}
}
