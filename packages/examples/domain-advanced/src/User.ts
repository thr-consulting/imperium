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
				password: {bcrypt: '$2y$12$i4svh4iIM7TbdKnVvFzgw.NayG1vCrZ/i2m1BET05bS0QnkuRFmru'}, // "password", 12 rounds
			},
		};
	}
}

export {User};
