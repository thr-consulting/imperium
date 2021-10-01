import type {EntityManager} from '@mikro-orm/core';
import type {Authorization} from '@imperium/authorization';
import {AbstractController} from '@imperium/domaindriven';
import type {User} from '../user';
import type {Repositories} from './createRepositories';

export class ExampleController extends AbstractController<Repositories, User> {
	public constructor(repos: Repositories, em: EntityManager, authorization: Authorization<User>) {
		super(repos, em, authorization);
	}
}
