import type {EntityManager} from 'mikro-orm';
import type {AuthenticatedUser} from '@imperium/connector';
import {UserRepository} from './user';
import type {DomainConnectors} from './index';
import {CategoryRepository} from './photo';
import {entities} from './entities';

export function repositories(em: EntityManager, conn: DomainConnectors, authenticatedUser?: AuthenticatedUser) {
	return {
		User: new UserRepository(em, em.getRepository(entities.User), conn, authenticatedUser),
		Category: new CategoryRepository(em, em.getRepository(entities.Category), conn, authenticatedUser),
	};
}
