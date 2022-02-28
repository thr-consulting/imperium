import type {ImperiumServerModule} from '@imperium/server';
import debug from 'debug';
import type {Context} from '~core/context';

const d = debug('imperium.examples.server.userModule');

export const userModule = (): ImperiumServerModule<Context> => ({
	name: 'User Server Module',
	// async startup(server) {
	// const ctx = await server.createContext();
	// const u1 = await ctx.authenticationRepository.getById('b8ca9dca-1d47-440c-9746-a71bd9ff181d');
	// d(u1);
	// },
});
