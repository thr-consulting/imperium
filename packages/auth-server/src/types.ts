import type {AuthBridge} from '@imperium/context-manager';

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
	refresh: string;
}

export interface RefreshToken {
	id: string;
	type: string;
	iat: number;
	exp: number;
}

export interface AccessToken {
	id: string;
	roles?: string[];
	iat: string;
	exp: string;
}

export interface ServiceInfo {
	id: string;
	roles: string[];
	password: {
		bcrypt: string;
	};
	blacklist?: number[]; // Blacklisted refresh tokens
}

export interface AuthDomain extends AuthBridge {
	getServiceInfo(id: string): Promise<ServiceInfo | null>;
	getPermissions(id: string): Promise<string[]>;
}

export type GetAuthFn<C> = (context: C) => AuthDomain;

export interface AuthMiddlewareConfig {
	credentialsRequired?: boolean;
}
