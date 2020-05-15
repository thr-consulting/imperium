export interface AuthBridge {
	hasPermission(perms: string | string[], id: string): boolean;
	setCache(key: string | string[], allowed: boolean, expire?: number): Promise<boolean>;
	getCache(key: string | string[]): Promise<boolean>;
	invalidateCache(key: string | string[]): Promise<void>;
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
		return this._bridge.setCache(key, allowed, expire);
	}

	async getCache(key: string | string[]) {
		if (!this._bridge) return null;
		return this._bridge.getCache(key);
	}

	async invalidateCache(key: string | string[]) {
		if (this._bridge) {
			await this._bridge.invalidateCache(key);
		}
	}
}
