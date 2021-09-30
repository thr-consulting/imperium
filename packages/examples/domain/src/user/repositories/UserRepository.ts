import {AbstractRepository} from '@imperium/domaindriven';
import type {EntityData} from '@mikro-orm/core';
import debug from 'debug';
import type {User} from '../entities/User';

const d = debug('imperium.examples.examples/domain.user.repositories.UserRepository');

export class UserRepository extends AbstractRepository<User> {
	initializeEntity(user: User) {
		return super.initializeEntity(user);
	}

	async getByEmail(email: string) {
		return this.findOne({email}, ['service']);
	}

	createUser(data: EntityData<User>) {
		return this.create(data);
	}
}
