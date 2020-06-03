export interface ImperiumAuthClientModule {
	thing?: string;
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
