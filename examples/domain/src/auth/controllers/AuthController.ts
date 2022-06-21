import type {Authorization} from '@imperium/authorization';
import type {AuthenticatedUser} from '@imperium/connector';
import type {EntityManager} from '@mikro-orm/core';
import {ExampleController} from '../../core/ExampleController';
import type {Repositories} from '../../core/createRepositories';

export class AuthController extends ExampleController {
	public constructor(repos: Repositories, em: EntityManager, authorization: Authorization<AuthenticatedUser>) {
		super(repos, em, authorization);
	}

	async getSecureData() {
		const isAuthorized = await this.authorization.can('getSecureData');
		const isAuthorized2 = await this.authorization.can('getLoc');

		if (isAuthorized) {
			return 'authSuccess';
		}

		return 'authFail';
	}
}
