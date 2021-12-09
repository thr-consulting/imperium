export interface IAuth {
	readonly id: string;
	readonly access: string;
}

export interface LoginInfo {
	identifier: string;
	password: {
		digest: string;
		algorithm: string;
	};
	rememberDevice?: boolean;
}

export interface LoginReturn {
	id: string;
	access: string;
}

export interface AccessToken {
	id: string;
	roles?: string[];
	iat: number;
	exp: number;
}

export interface ClientAuthorizationData {
	access: string;
}
