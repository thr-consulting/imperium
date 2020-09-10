export {};

declare global {
	interface Window {
		__IMPERIUM_ENV__: Record<string, unknown>;
		__IMPERIUM_SYS__: {
			production: boolean;
			development: boolean;
		}
		__IMPERIUM_CLIENT__: any;
	}
}
