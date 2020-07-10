import type {ImperiumServer} from '@imperium/server';
import {entities} from '@imperium/example-domain';
import type {Context} from '../core/context';

export async function createSystemUser(server: ImperiumServer<any, any>) {
	const userEntityRepository = server.connectors.connections.orm.em.getRepository(entities.User);
	const serviceEntityRepository = server.connectors.connections.orm.em.getRepository(entities.Services);
	const systemUser = await userEntityRepository.findOne({name: 'SYSTEM'});
	if (systemUser) return systemUser.id;

	const nu = userEntityRepository.create({
		name: 'SYSTEM',
		email: 'system@example.com',
		services: serviceEntityRepository.create({
			password: 'NOPASSWORD',
			roles: ['admin'],
		}),
	});
	userEntityRepository.persist(nu);
	await server.connectors.connections.orm.em.flush();
	return nu.id;
}

export async function getOrCreateCategories(ctx: Context) {
	let cat1 = await ctx.Category.getByName('Category 1');
	let cat2 = await ctx.Category.getByName('Category 2');
	if (!cat1) {
		cat1 = new ctx.entities.Category();
		cat1.name = 'Category 1';
		ctx.Category.add(cat1);
	}
	if (!cat2) {
		cat2 = new ctx.entities.Category();
		cat2.name = 'Category 2';
		ctx.Category.add(cat2);
	}

	return [cat1, cat2];
}

export async function getOrCreateUsers(ctx: Context) {
	let user1 = await ctx.User.getByName('John Doe');
	if (!user1) {
		user1 = ctx.User.create({
			name: 'John Doe',
			email: 'john@example.com',
			services: new ctx.entities.Services({
				password: '$2a$10$SKS6TmYxF7QWRcOC7rn3celhRbGbR27Al8KjtvmPve.dYa9R3pG/2', // "password", sha256 hashed and then bcrypt 12 rounds
				roles: ['admin'],
			}),
		});
		ctx.User.add(user1);
	}

	let user2 = await ctx.User.getByName('Jane Doe');
	if (!user2) {
		user2 = ctx.User.create({
			name: 'Jane Doe',
			email: 'jane@example.com',
			services: new ctx.entities.Services({
				password: '$2a$10$SKS6TmYxF7QWRcOC7rn3celhRbGbR27Al8KjtvmPve.dYa9R3pG/2', // "password", sha256 hashed and then bcrypt 12 rounds
				roles: [],
			}),
		});
		ctx.User.add(user2);
	}

	return [user1, user2];
}

// export async function getOrCreatePhotos(categories: Category[], users: User[], ctx: Context) {
// 	const {Photo: PhotoModel} = ctx.domainAdvanced.context;
//
// 	let photo1 = await PhotoModel.getByName('Photo 1', ctx.domainAdvanced);
// 	if (!photo1) {
// 		photo1 = PhotoModel.create({
// 			name: 'Photo 1',
// 			categories,
// 			metadata: {
// 				location: 'Earth',
// 				privateData: 'This is private data for photo1',
// 			},
// 			public: false,
// 			owner: users[0],
// 		});
// 		await PhotoModel.add(photo1, ctx.domainAdvanced);
// 	}
//
// 	let photo2 = await PhotoModel.getByName('Photo 2', ctx.domainAdvanced);
// 	if (!photo2) {
// 		photo2 = PhotoModel.create({
// 			name: 'Photo 2',
// 			categories,
// 			metadata: {
// 				location: 'The ISS',
// 				privateData: 'This is private data for photo 2',
// 			},
// 			public: true,
// 			owner: users[0],
// 		});
// 		await PhotoModel.add(photo2, ctx.domainAdvanced);
// 	}
//
// 	return [photo1, photo2];
// }
//
// export async function createComments(photos: Photo[], users: User[], ctx: Context) {
// 	const {Comment} = ctx.domainAdvanced.context;
// 	const [photo1, photo2] = photos;
// 	const [user1, user2] = users;
//
// 	if (!photo1.comments || photo1.comments.length === 0) {
// 		const comment1 = Comment.create({
// 			comment: 'This is a comment',
// 			user: user1,
// 			photo: photo1,
// 		});
// 		await Comment.add(comment1, ctx.domainAdvanced);
// 		const comment2 = Comment.create({
// 			comment: 'Comment number two',
// 			user: user1,
// 			photo: photo1,
// 		});
// 		await Comment.add(comment2, ctx.domainAdvanced);
// 	}
//
// 	if (!photo2.comments || photo2.comments.length === 0) {
// 		const comment1 = Comment.create({
// 			comment: 'A comment on a public photo.',
// 			user: user1,
// 			photo: photo2,
// 		});
// 		await Comment.add(comment1, ctx.domainAdvanced);
// 		const comment2 = Comment.create({
// 			comment: 'Another comment on a public photo.',
// 			user: user2,
// 			photo: photo2,
// 		});
// 		await Comment.add(comment2, ctx.domainAdvanced);
// 	}
// }
