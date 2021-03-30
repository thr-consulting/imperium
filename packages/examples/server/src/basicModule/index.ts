import type {ImperiumServerModule} from '@imperium/server';
import type {Context} from '~core/context';

/*
	This is an example of a minimal server module. Only a name is required.
 */

export const basicModule = (): ImperiumServerModule<Context> => ({
	name: 'Basic Server Module',
});
