import debug from 'debug';
import type {ImperiumServer} from '@imperium/server';
import {entities, Category, User, Photo} from '@imperium/example-domain';
import type {Context} from '../core/context';

const d = debug('imperium.examples.server.createData');

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
	let cat1 = await ctx.CategoryService.getByName('Category 1');
	let cat2 = await ctx.CategoryService.getByName('Category 2');

	if (!cat1) {
		cat1 = new ctx.Category();
		cat1.name = 'Category 1';
		ctx.CategoryService.add(cat1);
	}
	if (!cat2) {
		cat2 = new ctx.Category();
		cat2.name = 'Category 2';
		ctx.CategoryService.add(cat2);
	}

	return [cat1, cat2];
}

export async function getOrCreateUsers(ctx: Context) {
	let user1 = await ctx.UserService.getByName('John Doe');
	if (!user1) {
		user1 = ctx.UserService.create({
			name: 'John Doe',
			email: 'john@example.com',
			services: new ctx.Services({
				password: '$2a$10$SKS6TmYxF7QWRcOC7rn3celhRbGbR27Al8KjtvmPve.dYa9R3pG/2', // "password", sha256 hashed and then bcrypt 12 rounds
				roles: ['admin'],
			}),
		});
		ctx.UserService.add(user1);
	}

	let user2 = await ctx.UserService.getByName('Jane Doe');
	if (!user2) {
		user2 = ctx.UserService.create({
			name: 'Jane Doe',
			email: 'jane@example.com',
			services: new ctx.Services({
				password: '$2a$10$SKS6TmYxF7QWRcOC7rn3celhRbGbR27Al8KjtvmPve.dYa9R3pG/2', // "password", sha256 hashed and then bcrypt 12 rounds
				roles: [],
			}),
		});
		ctx.UserService.add(user2);
	}

	return [user1, user2];
}

export async function getOrCreatePhotos(categories: Category[], users: User[], ctx: Context) {
	let photo1 = await ctx.PhotoService.getByName('Photo 1');
	if (!photo1) {
		photo1 = ctx.PhotoService.create({
			name: 'Photo 1',
			categories,
			metadata: {
				location: 'Earth',
				privateData: 'This is private data for photo1',
			},
			public: false,
			owner: users[0],
		});
		ctx.PhotoService.add(photo1);
	}

	let photo2 = await ctx.PhotoService.getByName('Photo 2');
	if (!photo2) {
		photo2 = ctx.PhotoService.create({
			name: 'Photo 2',
			categories,
			metadata: {
				location: 'The ISS',
				privateData: 'This is private data for photo 2',
			},
			public: true,
			owner: users[0],
		});
		await ctx.PhotoService.add(photo2);
	}

	return [photo1, photo2];
}

export async function createComments(photos: Photo[], users: User[], ctx: Context) {
	const [photo1, photo2] = photos;
	const [user1, user2] = users;

	await photo1.comments.loadItems();
	if (photo1.comments.length === 0) {
		const comment1 = ctx.CommentService.create({
			comment: 'This is a comment',
			user: user1,
			photo: photo1,
		});
		ctx.CommentService.add(comment1);

		const comment2 = ctx.CommentService.create({
			comment: 'Comment number two',
			user: user1,
			photo: photo1,
		});
		ctx.CommentService.add(comment2);
	}

	await photo2.comments.loadItems();
	if (photo2.comments.length === 0) {
		const comment1 = ctx.CommentService.create({
			comment: 'A comment on a public photo.',
			user: user1,
			photo: photo2,
		});
		ctx.CommentService.add(comment1);

		const comment2 = ctx.CommentService.create({
			comment: 'Another comment on a public photo.',
			user: user2,
			photo: photo2,
		});
		ctx.CommentService.add(comment2);
	}
}
