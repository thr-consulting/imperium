import type {Authorization} from '@imperium/authorization';
import type {AuthenticatedUser} from '@imperium/connector';
import {AbstractController} from '@imperium/domaindriven';
import type {EntityManager} from '@mikro-orm/core';
import type {Repositories} from './createRepositories';

export class ExampleController extends AbstractController<Repositories, AuthenticatedUser> {
	public constructor(repos: Repositories, em: EntityManager, authorization: Authorization<AuthenticatedUser>) {
		super(repos, em, authorization);
	}
}
