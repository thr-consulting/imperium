type AuthGraphqlBackingPublishTokenFn = (token: string | null) => void;

/**
 * This class lets us connect things we need in the Apollo links and our React code
 */
export class AuthGraphqlBacking {
	#token: string | null;
	#publishFn: AuthGraphqlBackingPublishTokenFn;

	constructor() {
		this.#token = null;
		this.#publishFn = () => {};
	}

	getToken(): string | null {
		return this.#token;
	}

	setToken(token: string | null): void {
		this.#token = token;
	}

	publishToken(token: string | null): void {
		this.#token = token;
		this.#publishFn(token);
	}

	setPublishFn(publishFn: AuthGraphqlBackingPublishTokenFn) {
		this.#publishFn = publishFn;
	}
}
