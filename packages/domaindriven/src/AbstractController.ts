/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Authorization} from '@imperium/authorization';
import type {EntityManager} from '@mikro-orm/core';

export abstract class AbstractController<Repos, ExtraAuthorizationData = any> {
	protected readonly repos: Repos;
	private readonly em: EntityManager;
	readonly authorization: Authorization<ExtraAuthorizationData>;

	protected constructor(repos: Repos, em: EntityManager, authorization: Authorization<ExtraAuthorizationData>) {
		this.repos = repos;
		this.em = em;
		this.authorization = authorization;
	}

	protected async flush() {
		await this.em.flush();
	}
}
