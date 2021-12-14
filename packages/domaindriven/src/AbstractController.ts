/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Authorization} from '@imperium/authorization';
import type {EntityManager} from '@mikro-orm/core';

export interface AbstractControllerOptions {
	preventFlush?: boolean;
}

export abstract class AbstractController<Repos, ExtraAuthorizationData = any> {
	protected readonly repos: Repos;
	private readonly em: EntityManager;
	readonly authorization: Authorization<ExtraAuthorizationData>;
	protected readonly opts?: AbstractControllerOptions;

	protected constructor(repos: Repos, em: EntityManager, authorization: Authorization<ExtraAuthorizationData>, opts?: AbstractControllerOptions) {
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
