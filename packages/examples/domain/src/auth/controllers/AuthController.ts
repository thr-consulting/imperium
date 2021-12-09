import type {AuthenticatedUser} from '@imperium/connector';
import type {EntityManager} from '@mikro-orm/core';
import type {Authorization} from '@imperium/authorization';
import {ExampleController} from '../../core/ExampleController';
import type {Repositories} from '../../core/createRepositories';

export class AuthController extends ExampleController {
	private readonly auth: Authorization<AuthenticatedUser>;

	public constructor(repos: Repositories, em: EntityManager, authorization: Authorization<AuthenticatedUser>) {
		super(repos, em, authorization);
		this.auth = authorization;
	}

	async getSecureData() {
		const isAuthorized = await this.auth.can('getSecureData');

		if (isAuthorized) {
			return 'authSuccess';
		}

		return 'authFail';
	}
}
