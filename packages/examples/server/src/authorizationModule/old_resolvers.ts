import util from 'util';
import debug from 'debug';
import type {ImperiumServer} from '@imperium/server';
import type {Category, Photo} from '@imperium/example-domain-advanced';
import type {GraphQLResolveInfo} from 'graphql';
import type {Context} from '../core/context';
import {getFields, getSelectionFields} from './getSelectionFields';

const d = debug('imperium.examples.server.authorizationModule.resolvers');
const dd = (obj: any) => d(util.inspect(obj, false, null, true));

export function resolvers(server: ImperiumServer<Context, any>) {
	return {
		// Uncomment the following key to make this work with 'getPhotoUsingIds'.
		// Comment the following key to make this work with 'getPhotoUsingLoader'.
		// Photo: {
		// 	async categories(obj: Photo, params: undefined, ctx: Context, info: GraphQLResolveInfo) {
		// 		const {ability, ForbiddenError} = ctx.domainAdvanced.context;
		// 		const fields = getFields(info);
		// 		obj.categories.forEach(category => {
		// 			fields.forEach(field => ForbiddenError.from(ability).throwUnlessCan('read', category, field));
		// 		});
		// 		return obj.categories;
		// 	},
		// 	async comments(obj: Photo, params: undefined, ctx: Context, info: GraphQLResolveInfo) {
		// 		const {ability, ForbiddenError} = ctx.domainAdvanced.context;
		// 		const fields = getFields(info);
		// 		obj.comments.forEach(comment => {
		// 			fields.forEach(field => ForbiddenError.from(ability).throwUnlessCan('read', comment, field));
		// 		});
		// 		return obj.comments;
		// 	},
		// 	async owner(obj: Photo, params: undefined, ctx: Context, info: GraphQLResolveInfo) {
		// 		const {ability, ForbiddenError} = ctx.domainAdvanced.context;
		// 		getFields(info).forEach(field => ForbiddenError.from(ability).throwUnlessCan('read', obj.owner, field));
		// 		return obj.owner;
		// 	},
		// },
		// Comment: {
		// 	async user(obj: any, params: undefined, ctx: Context) {
		// 		const {ability, ForbiddenError, User} = ctx.domainAdvanced.context;
		// 		const user = await User.findOne(obj.user, {
		// 			loadRelationIds: true,
		// 		});
		// 		ForbiddenError.from(ability).throwUnlessCan('read', obj, 'user');
		// 		ForbiddenError.from(ability).throwUnlessCan('read', user);
		// 		return user;
		// 	},
		// },
		Query: {
			getPhoto: (obj: undefined, {name}: {name: string}, ctx: Context) => {
				// This finds a single photo with no relations loaded.
				return ctx.domainAdvanced.context.Photo.findOne({name});
			},
			async getPhotoUsingLoader(obj: undefined, {name}: {name: string}, ctx: Context, info: GraphQLResolveInfo) {
				// This uses inspection on the info object to determine which relations to load.
				// It results in a single SELECT statement.
				const {ability, typeormLoader, ForbiddenError} = ctx.domainAdvanced.context;

				// First, check if we are allowed to read photos at all
				ForbiddenError.from(ability).throwUnlessCan('read', 'Photo');

				// Second, fetch the actual photo, and all related data
				const photo = await typeormLoader
					.loadEntity(ctx.domainAdvanced.context.Photo)
					.selectFields(['public', 'owner']) // We need to add specific fields for authorization checks.
					.where('Photo.name = :name', {name})
					.info(info)
					.loadOne();

				d(photo);

				// Third, Check if we are allowed to read THIS photo
				ForbiddenError.from(ability).throwUnlessCan('read', photo);

				// // Fourth, Check if we are allowed to read fields on THIS photo
				getFields(info).forEach(field => {
					d(field);
					ForbiddenError.from(ability).throwUnlessCan('read', photo, field);
				});

				// Return the photo, but remember, this will pass through other resolvers
				// and specific authorizations can be checked at that point.
				return photo;
			},
			async getPhotoUsingIds(obj: undefined, {name}: {name: string}, ctx: Context) {
				// This gets the photo and then gets the id's for each relation.
				// This results in three SELECT statements with this single findOne statement.
				// It also will result in another three SELECT statements when graphql resolves
				// each field.
				// This could potentially be reduced via batching and caching with Dataloader.
				const {ability, Photo: PhotoModel, ForbiddenError} = ctx.domainAdvanced.context;

				// First, check if we are allowed to read photos at all
				ForbiddenError.from(ability).throwUnlessCan('read', 'Photo');

				// Second, fetch the actual photo
				const photo = await PhotoModel.findOne(
					{name},
					{
						loadRelationIds: true,
					},
				);

				// Third, Check if we are allowed to read this photo
				ForbiddenError.from(ability).throwUnlessCan('read', photo);

				// Return the photo, but remember, this will pass through other resolvers
				// and specific authorizations can be checked at that point.
				return photo;
			},
		},
	};
}
