import type {Connectors} from '@imperium/connector';
import {AbstractRepository} from '@imperium/domaindriven';
import type {EntityRepository, RequiredEntityData} from '@mikro-orm/core';
import debug from 'debug';
import type {User} from '../entities/User';

const d = debug('imperium.example-domain.user.repositories.UserRepository');

export class UserRepository extends AbstractRepository<User> {
	public constructor(repo: EntityRepository<User>, connectors: Connectors) {
		super('User', repo, connectors);
	}

	initializeEntity(user: User) {
		return super.initializeEntity(user);
	}

	async getByEmail(email: string) {
		return this.findOne(
			{email},
			{
				populate: ['service'],
				fields: ['email'],
			},
		);
	}

	createUser(data: RequiredEntityData<User>) {
		return this.create(data);
	}

	async getMany(email: string) {
		return this.find(
			{email},
			{
				populate: ['service'],
				fields: ['email'],
			},
		);
	}

	async getEverything() {
		return this.getAll({
			populate: ['service'],
			fields: ['email'],
		});
	}
}
