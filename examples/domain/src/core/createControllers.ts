import type {AuthenticatedUser} from '@imperium/connector';
import type {Authorization} from '@imperium/authorization';
import type {EntityManager} from '@mikro-orm/core';
import {ScoreController} from '../score';
import {UserController} from '../user/controllers/UserController';
import type {Repositories} from './createRepositories';
import {AuthController} from '../auth/controllers/AuthController';

export function createControllers(em: EntityManager, authorization: Authorization<AuthenticatedUser>, repositories: Repositories) {
	return {
		userController: new UserController(repositories, em, authorization),
		scoreController: new ScoreController(repositories, em, authorization),
		authController: new AuthController(repositories, em, authorization),
	};
}
