import type {ImperiumServerModule} from '@imperium/server';
import type {connectors} from '../core/connectors';
import type {Context} from '~core/context';

/*
	This is an example of a minimal server module. Only a name is required.
 */

export const basicModule = (): ImperiumServerModule<Context, typeof connectors> => ({
	name: 'Basic Server Module',
});
