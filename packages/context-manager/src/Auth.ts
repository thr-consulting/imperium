export interface AuthImplementation {
	getPermissions: (roles: string[]) => void;
}

export class Auth {
	public readonly id: string | undefined;
	public readonly domain: AuthImplementation;

	constructor(domain: AuthImplementation, id?: string) {
		this.id = id;
		this.domain = domain;
	}

	async getPermissions(roles: string[]) {

	}

	async getCache() {

	}

	async invalidateCache() {

	}

	async setCache() {

	}
}
