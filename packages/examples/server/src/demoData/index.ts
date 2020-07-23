import type {ImperiumServerModule} from '@imperium/server';
import debug from 'debug';
import type {connectors} from '../core/connectors';
import {Context, contextCreator} from '../core/context';
import {createComments, createSystemUser, getOrCreateCategories, getOrCreatePhotos, getOrCreateUsers} from './createData';

const d = debug('imperium.examples.server.demoData');

export const demoDataModule = (): ImperiumServerModule<Context, typeof connectors> => ({
	name: 'Demo Data Module',
	async startup(server) {
		const systemUserId = await createSystemUser(server);

		const context = await contextCreator(server.connectors, {
			auth: {
				id: systemUserId?.id,
			},
		});

		// const systemUser = await context.UserService.getById(systemUserId);

		const categories = await getOrCreateCategories(context);
		const users = await getOrCreateUsers(context);
		const photos = await getOrCreatePhotos(categories, users, context);
		await createComments(photos, users, context);
		await context.entityManager.flush();
	},
});
