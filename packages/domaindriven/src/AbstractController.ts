/* eslint-disable @typescript-eslint/no-explicit-any */
import type {AuthenticationBase, Authorization} from '@imperium/authorization';
import type {EntityManager} from '@mikro-orm/core';

export interface AbstractControllerOptions {
	preventFlush?: boolean;
}

export abstract class AbstractController<Repos, Extra extends AuthenticationBase> {
	protected readonly repos: Repos;

	private readonly em: EntityManager;

	readonly authorization: Authorization<Extra>;

	protected readonly opts?: AbstractControllerOptions;

	protected constructor(repos: Repos, em: EntityManager, authorization: Authorization<Extra>, opts?: AbstractControllerOptions) {
		this.repos = repos;
		this.em = em;
		this.authorization = authorization;
		this.opts = opts;
	}

	protected async flush() {
		if (!this.opts?.preventFlush) {
			await this.em.flush();
		}
	}
}
