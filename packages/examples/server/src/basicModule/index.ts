import type {ImperiumServerModule} from '@imperium/server';
import type {connectors} from '../core/connectors';
import type {Context} from '../core/context';

export const basicModule = (): ImperiumServerModule<Context, typeof connectors> => ({
	name: 'Basic Server Module',
});
