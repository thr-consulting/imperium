import type {Authorization} from '@imperium/authorization';
import type {EntityManager} from '@mikro-orm/core';

export abstract class AbstractController<Repo, User> {
	protected readonly repos: Repo;
	private readonly em: EntityManager;
	readonly authorization: Authorization<User>;

	constructor(repos: Repo, em: EntityManager, authorization: Authorization<User>) {
		this.repos = repos;
		this.em = em;
		this.authorization = authorization;
	}

	protected async flush() {
		await this.em.flush();
	}
}
