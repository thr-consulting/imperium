import debug from 'debug';
import type {ServiceInfo} from '@imperium/auth-server';
import type {Context} from './index';

const d = debug('imperium.examples.domain-advanced.User');

export interface IUser {
	id: string;
	name: string;
	services: Omit<ServiceInfo, 'id'>;
}

class User {
	static async getUserById(id: string, ctx: Context): Promise<IUser> {
		d(id);
		return {
			id: '1234567890',
			name: 'John Doe',
			services: {
				roles: ['admin'],
				password: {bcrypt: '$2a$10$SKS6TmYxF7QWRcOC7rn3celhRbGbR27Al8KjtvmPve.dYa9R3pG/2'}, // "password", sha256 hashed and then bcrypt 12 rounds
			},
		};
	}
}

export {User};
