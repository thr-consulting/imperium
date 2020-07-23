import type {EntityManager} from 'mikro-orm';
import type {AuthenticatedUser} from '@imperium/connector';
import {UserService} from './user';
import type {DomainConnectors} from './DomainConnectors';
import {CategoryService, PhotoService, CommentService} from './photo';
import {entities} from './entities';

export function services(em: EntityManager, conn: DomainConnectors, authenticatedUser?: AuthenticatedUser) {
	return {
		UserService: new UserService(em, em.getRepository(entities.User), conn, authenticatedUser),
		CategoryService: new CategoryService(em, em.getRepository(entities.Category), conn, authenticatedUser),
		PhotoService: new PhotoService(em, em.getRepository(entities.Photo), conn, authenticatedUser),
		CommentService: new CommentService(em, em.getRepository(entities.Comment), conn, authenticatedUser),
	};
}
