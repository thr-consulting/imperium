import {inspect} from 'util';
import debug from 'debug';
import type {ImperiumServer} from '@imperium/server';
import type {GraphQLResolveInfo} from 'graphql';
import type {Context} from '../core/context';
import {getSelectionFields} from './getSelectionFields';

const d = debug('imperium.examples.server.authorizationModule.resolvers');
const dd = (obj: any) => d(inspect(obj, false, null, true));

export function resolvers(server: ImperiumServer<Context, any>) {
	return {
		// Photo: {
		// 	async categories(obj: any, params: undefined, ctx: Context) {
		// 		return Promise.all(obj.categories.map(async (id: string) => ctx.domainAdvanced.context.Category.getById(id, ctx.domainAdvanced)));
		// 	},
		// 	async owner(obj: any, params: undefined, ctx: Context) {
		// 		return ctx.domainAdvanced.context.User.getById(obj.owner, ctx.domainAdvanced);
		// 	},
		// },
		Query: {
			async getPhoto(obj: undefined, {name}: {name: string}, ctx: Context, info: GraphQLResolveInfo) {
				// return ctx.domainAdvanced.context.Photo.getByName(name, ctx.domainAdvanced);
				// ctx.domainAdvanced.context.Authorization.throwUnlessCan('read', p, getSelectionFields(info));
			},
			async getPhotoUsingLoader(obj: undefined, {name}: {name: string}, ctx: Context, info: GraphQLResolveInfo) {},
			async getPhotoUsingIds(obj: undefined, {name}: {name: string}, ctx: Context) {},
		},
	};
}
