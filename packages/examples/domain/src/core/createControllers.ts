import type {EntityManager} from '@mikro-orm/core';
import type {Repositories} from './createRepositories';
import type {ExampleAuthorization} from './ExampleAuthorization';
import {UserController} from '../user/controllers/UserController';
import {ScoreController} from '../score';

export function createControllers(em: EntityManager, authorization: ExampleAuthorization, repositories: Repositories) {
	return {
		userController: new UserController(repositories, em, authorization),
		scoreController: new ScoreController(repositories, em, authorization),
	};
}
