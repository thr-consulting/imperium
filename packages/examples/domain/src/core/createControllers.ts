import type {EntityManager} from '@mikro-orm/core';
import {ScoreController} from '../score';
import {UserController} from '../user/controllers/UserController';
import type {ExampleAuthorization} from './ExampleAuthorization';
import type {Repositories} from './createRepositories';

export function createControllers(em: EntityManager, authorization: ExampleAuthorization, repositories: Repositories) {
	return {
		userController: new UserController(repositories, em, authorization),
		scoreController: new ScoreController(repositories, em, authorization),
	};
}
