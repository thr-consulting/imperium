import {AbstractRepository} from '@imperium/domaindriven';
import type {EntityData} from '@mikro-orm/core';
import type {User} from '../entities';

export class UserRepository extends AbstractRepository<User> {
	createUser(data: EntityData<User>): User {
		throw new Error('Creating users not implemented');
		return this.create(data);
	}
}
