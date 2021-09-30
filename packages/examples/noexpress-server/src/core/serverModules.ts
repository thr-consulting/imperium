import type {ImperiumServerModule} from '@imperium/server';
import type {ExcludeFalse} from '@thx/util';
// Define server modules that should be included in the server.
import debug from 'debug';

const d = debug('imperium.examples.examples/noexpress-server.core.serverModules');

/*
	Server modules are created with a factory function that returns an array of
	server modules that we want included in our app.
	Some modules require additional configuration.
*/
export function serverModules(): ImperiumServerModule<any>[] {
	return [].filter(Boolean as any as ExcludeFalse);
}
