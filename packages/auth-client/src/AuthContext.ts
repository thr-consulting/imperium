import React from 'react';

export interface IAuth {
	readonly id: string;
	readonly access: string;
}

export interface IAuthContext {
	auth: IAuth | null;
	getAuth: () => Promise<IAuth | null>;
	setAuth: (auth: IAuth | null) => void;
}

export const AuthContext = React.createContext({auth: null, setAuth() {}, getAuth: async () => null} as IAuthContext);
