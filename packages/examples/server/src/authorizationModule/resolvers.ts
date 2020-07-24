import {inspect} from 'util';
import debug from 'debug';
import type {ImperiumServer} from '@imperium/server';
import type {IResolvers} from '@imperium/graphql-server';
import type {Photo} from '@imperium/example-domain';
import type {Context} from '../core/context';
import {getSelectionFields} from '../lib/getSelectionFields';

const d = debug('imperium.examples.server.authorizationModule.resolvers');
const dd = (obj: any) => d(inspect(obj, false, null, true));

export function resolvers(server: ImperiumServer<Context, any>): IResolvers<any, Context> {
	return {
		Photo: {
			async categories(obj: Photo) {
				if (!obj.categories.isInitialized()) {
					await obj.categories.loadItems();
				}
				return obj.categories;
			},
			async owner(obj: Photo, params: undefined, ctx) {
				return ctx.userService.getById(obj.owner.id);
			},
			async comments(obj: Photo) {
				if (!obj.comments.isInitialized()) {
					await obj.comments.loadItems();
				}
				return obj.comments;
			},
		},
		Query: {
			async getPhoto(obj: undefined, {name}: {name: string}, ctx) {
				return ctx.photoService.getByName(name);
			},
		},
	};
}
