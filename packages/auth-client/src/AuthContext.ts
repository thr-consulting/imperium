import React from 'react';
import {AuthLevel} from '@imperium/authorization';

export interface IAuth {
	readonly id: string;
	readonly access: string;
}

export interface IAuthContext {
	auth: IAuth | null;
	getAuth: () => Promise<IAuth | null>;
	setAuth: (auth: IAuth | null) => void;
	getCache: (key: string) => Promise<AuthLevel | null>;
	setCache: (key: string, level: AuthLevel) => Promise<void>;
	clearCache: () => Promise<void>;
}

const defaultAuthContext: IAuthContext = {
	auth: null,
	setAuth() {},
	getAuth: async () => null,
	getCache: async () => AuthLevel.fromString('0.0.0'),
	setCache: async () => {},
	clearCache: async () => {},
};

export const AuthContext = React.createContext(defaultAuthContext);
