export interface AuthImplementation {

}

export class Auth {
	public readonly id: string | undefined;
	public readonly domain: AuthImplementation;

	constructor(domain: A, id?: string) {
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
