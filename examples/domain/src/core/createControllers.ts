import type {AuthenticationRequest, Authorization} from '@imperium/authorization';
import type {EntityManager} from '@mikro-orm/core';
import {AuthController} from '../auth/controllers/AuthController';
import {ScoreController} from '../score';
import {UserController} from '../user/controllers/UserController';
import type {Repositories} from './createRepositories';

export function createControllers(em: EntityManager, authorization: Authorization<AuthenticationRequest>, repositories: Repositories) {
	return {
		userController: new UserController(repositories, em, authorization),
		scoreController: new ScoreController(repositories, em, authorization),
		authController: new AuthController(repositories, em, authorization),
	};
}
