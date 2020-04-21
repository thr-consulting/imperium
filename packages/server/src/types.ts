export interface AuthContext {
	id: string | null;
	permissions: string[] | null;
	hasPermission: (perms: string | string[]) => boolean;
	getCache: (key: string | string[]) => Promise<boolean | null>;
	setCache: (key: string | string[], allowed: boolean, expire?: number) => Promise<typeof allowed>;
	invalidateCache: (key: string | string[]) => Promise<void>;
}

export type Context = any; // In case we decide that we want to enforce something.
export type ContextMap = {
	readonly [prop: string]: Context;
};

export interface IImperiumConfig {
	development?: {
		clientPort?: number;
		workerCrashDelay?: number;
		workerCrashMax?: number;
		imperiumDevelopmentAliases?: boolean;
	};
	production?: {
		path?: string;
		client?: {
			minimize?: boolean;
			devtool?: boolean;
			vendorChunk?: string[];
		};
		server?: {
			minimize?: boolean;
			devtool?: boolean;
			externals?: string[];
		};
	};
	webpack?: {
		client?: {
			rules: any[];
		};
		server?: {
			rules: any[];
		};
	};
	source?: {
		projectRoot?: string;
		imperiumRoot?: string;
		path?: string;
		serverIndex?: string;
		clientIndex?: string;
		configModules?: string;
		watchPaths?: string[];
	};
	html?: {
		template?: string;
		meta?: {
			[key: string]: string;
		};
		templateParameters?: {
			[key: string]: string;
		};
	};
}
