import type {AuthenticationToken, PermissionLookup} from '@imperium/authorization';

export interface LoginInfo {
	identifier: string;
	password: {
		digest: string;
		algorithm: string;
	};
	rememberDevice?: boolean;
	device?: {
		uniqueId: string;
	};
}

export interface LoginReturn {
	id: string;
	access: string;
}

export interface AuthClientOptions {
	lookup?: PermissionLookup<AuthenticationToken>;
}

/**
 * A token object has these fields
 */
export type Token = {
	iat: number; // Isssued at
	exp: number; // Expires at
	// TOOD not sure if i need these
	// id: string;
	// roles?: string[];
};
