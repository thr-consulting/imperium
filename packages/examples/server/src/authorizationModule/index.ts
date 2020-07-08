import type {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import debug from 'debug';
import {User, Category, Photo} from '@imperium/example-domain-advanced';
import type {connectors} from '../core/connectors';
import {Context, contextCreator} from '../core/context';
import schema from './Schema.graphqls';
import query from './Query.graphqls';
import {resolvers} from './resolvers';

const d = debug('imperium.examples.server.authorizationModule');

async function getOrCreateCategories(ctx: Context) {
	const {Category: CategoryModel} = ctx.domainAdvanced.context;
	let cat1 = await CategoryModel.getByName('Category 1', ctx.domainAdvanced);
	let cat2 = await CategoryModel.getByName('Category 2', ctx.domainAdvanced);
	if (!cat1) {
		cat1 = new CategoryModel();
		cat1.name = 'Category 1';
		await CategoryModel.add(cat1, ctx.domainAdvanced);
	}
	if (!cat2) {
		cat2 = new CategoryModel();
		cat2.name = 'Category 2';
		await Category.add(cat2, ctx.domainAdvanced);
	}

	return [cat1, cat2];
}

async function getOrCreateUsers(ctx: Context) {
	const {User: UserModel} = ctx.domainAdvanced.context;

	let user1 = await UserModel.getByName('John Doe', ctx.domainAdvanced);
	if (!user1) {
		user1 = UserModel.create({
			name: 'John Doe',
			email: 'john@example.com',
			services: {
				password: '$2a$10$SKS6TmYxF7QWRcOC7rn3celhRbGbR27Al8KjtvmPve.dYa9R3pG/2', // "password", sha256 hashed and then bcrypt 12 rounds
				roles: ['admin'],
			},
		});
		await UserModel.add(user1, ctx.domainAdvanced);
	}

	let user2 = await UserModel.getByName('Jane Doe', ctx.domainAdvanced);
	if (!user2) {
		user2 = UserModel.create({
			name: 'Jane Doe',
			email: 'jane@example.com',
			services: {
				password: '$2a$10$SKS6TmYxF7QWRcOC7rn3celhRbGbR27Al8KjtvmPve.dYa9R3pG/2', // "password", sha256 hashed and then bcrypt 12 rounds
				roles: [],
			},
		});
		await UserModel.add(user2, ctx.domainAdvanced);
	}

	return [user1, user2];
}

async function getOrCreatePhotos(categories: Category[], users: User[], ctx: Context) {
	const {Photo: PhotoModel} = ctx.domainAdvanced.context;

	let photo1 = await PhotoModel.getByName('Photo 1', ctx.domainAdvanced);
	if (!photo1) {
		photo1 = PhotoModel.create({
			name: 'Photo 1',
			categories,
			metadata: {
				location: 'Earth',
				privateData: 'This is private data for photo1',
			},
			public: false,
			owner: users[0],
		});
		await PhotoModel.add(photo1, ctx.domainAdvanced);
	}

	let photo2 = await PhotoModel.getByName('Photo 2', ctx.domainAdvanced);
	if (!photo2) {
		photo2 = PhotoModel.create({
			name: 'Photo 2',
			categories,
			metadata: {
				location: 'The ISS',
				privateData: 'This is private data for photo 2',
			},
			public: true,
			owner: users[0],
		});
		await PhotoModel.add(photo2, ctx.domainAdvanced);
	}

	return [photo1, photo2];
}

async function createComments(photos: Photo[], users: User[], ctx: Context) {
	const {Comment} = ctx.domainAdvanced.context;
	const [photo1, photo2] = photos;
	const [user1, user2] = users;

	if (!photo1.comments || photo1.comments.length === 0) {
		const comment1 = Comment.create({
			comment: 'This is a comment',
			user: user1,
			photo: photo1,
		});
		await Comment.add(comment1, ctx.domainAdvanced);
		const comment2 = Comment.create({
			comment: 'Comment number two',
			user: user1,
			photo: photo1,
		});
		await Comment.add(comment2, ctx.domainAdvanced);
	}

	if (!photo2.comments || photo2.comments.length === 0) {
		const comment1 = Comment.create({
			comment: 'A comment on a public photo.',
			user: user1,
			photo: photo2,
		});
		await Comment.add(comment1, ctx.domainAdvanced);
		const comment2 = Comment.create({
			comment: 'Another comment on a public photo.',
			user: user2,
			photo: photo2,
		});
		await Comment.add(comment2, ctx.domainAdvanced);
	}
}

export const authorizationModule = (): ImperiumGraphqlServerModule<Context, typeof connectors> => ({
	name: 'Authorization Server Module',
	schema: [schema, query],
	resolvers,
	async startup(server) {
		const systemUser = await User.createSystemUser();

		const context = await contextCreator(server.connectors, {
			auth: {
				id: systemUser?.id,
			},
		});

		const categories = await getOrCreateCategories(context);
		const users = await getOrCreateUsers(context);
		const photos = await getOrCreatePhotos(categories, users, context);
		await createComments(photos, users, context);
	},
});
