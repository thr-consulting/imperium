export interface ImperiumAuthClientModule {
	thing?: string;
}

export interface LoginInfo {
	identifier: string;
	password: {
		digest: string;
		algorithm: string;
	};
}

export interface LoginReturn {
	id: string;
	access: string;
}
