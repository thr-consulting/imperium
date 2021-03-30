import type {ImperiumServerModule} from '@imperium/server';
import debug from 'debug';
import type {Context} from '~core/context';

const d = debug('imperium.examples.server.demoData');

export const demoDataModule = (): ImperiumServerModule<Context> => ({
	name: 'Demo Data Module',
	// async startup(server) {
	// 	const systemUserId = await createSystemUser(server);
	//
	// 	const context: Context = {
	// 		...(await contextCreator(server.connectors, {
	// 			auth: {
	// 				id: systemUserId?.id,
	// 			},
	// 		})),
	// 		__session: 'demoDataModule',
	// 	};
	//
	// 	const categories = await getOrCreateCategories(context);
	// 	const users = await getOrCreateUsers(context);
	// 	const photos = await getOrCreatePhotos(categories, users, context);
	// 	await createComments(photos, users, context);
	// 	await context.entityManager.flush();
	// },
});
