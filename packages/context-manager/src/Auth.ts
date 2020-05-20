export interface AuthBridge {
	hasPermission(perms: string | string[], id: string): boolean;
	setCache(key: string | string[], value: any, expire?: number): Promise<typeof value>;
	getCache(key: string | string[]): Promise<any>;
	invalidateCache(key: string | string[] | undefined): Promise<void>;
	// hasPermission(perms: string | string[]): boolean;

	// // getPermissions(roles: string[], context: C): Promise<string[]>;
	// getServiceInfo(identifier: string, context: C): Promise<ServiceInfo | null>;
}

export interface AuthData {
	auth?: {
		id?: string;
	};
}

export class Auth<T extends AuthData = AuthData> {
	private _bridge?: AuthBridge;
	public readonly data?: T;

	constructor(data?: T) {
		this.data = data;
	}

	setBridge(bridge: AuthBridge) {
		this._bridge = bridge;
	}

	get id() {
		return this.data?.auth?.id;
	}

	hasPermission(perms: string | string[]) {
		if (!this.data?.auth?.id || !this._bridge) return false;
		return this._bridge.hasPermission(perms, this.data.auth.id);
	}

	async setCache(key: string | string[], allowed: boolean, expire?: number) {
		if (!this._bridge) return allowed;
		return this._bridge.setCache(key instanceof Array ? [...key, 'authCache'] : [key, 'authCache'], allowed, expire);
	}

	async getCache(key: string | string[]) {
		if (!this._bridge) return null;
		return this._bridge.getCache(key instanceof Array ? [...key, 'authCache'] : [key, 'authCache']);
	}

	async invalidateCache(key: string | string[]) {
		if (this._bridge) {
			await this._bridge.invalidateCache(key);
		}
	}
}
