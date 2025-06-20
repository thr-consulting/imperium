import type {AuthenticationRequest, Authorization} from '@imperium/authorization';
import {AbstractController} from '@imperium/domaindriven';
import type {EntityManager} from '@mikro-orm/core';
import type {Repositories} from './createRepositories';

export class ExampleController extends AbstractController<Repositories, AuthenticationRequest> {
	public constructor(repos: Repositories, em: EntityManager, authorization: Authorization<AuthenticationRequest>) {
		super(repos, em, authorization);
	}
}
