/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Authorization} from '@imperium/authorization';
import type {EntityManager} from '@mikro-orm/core';
import type {AbstractRepository} from './AbstractRepository';

export abstract class AbstractController<Repos extends Record<string, AbstractRepository<any>>, User> {
	protected readonly repos: Repos;
	private readonly em: EntityManager;
	readonly authorization: Authorization<User>;

	protected constructor(repos: Repos, em: EntityManager, authorization: Authorization<User>) {
		this.repos = repos;
		this.em = em;
		this.authorization = authorization;
	}

	protected async flush() {
		await this.em.flush();
	}
}
