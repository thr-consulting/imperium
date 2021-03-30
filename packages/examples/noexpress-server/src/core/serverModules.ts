// Define server modules that should be included in the server.
import debug from 'debug';
import type {ImperiumServerModule} from '@imperium/server';
import type {ExcludeFalse} from '@thx/util';
// import {environment} from './environment';

const d = debug('imperium.examples.noexpress-server.serverModules');
// const env = environment();

/*
	Server modules are created with a factory function that returns an array of
	server modules that we want included in our app.
	Some modules require additional configuration.
*/
export function serverModules(): ImperiumServerModule<any>[] {
	return [].filter((Boolean as any) as ExcludeFalse);
}
