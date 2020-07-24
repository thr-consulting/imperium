import type {EntityManager} from 'mikro-orm';
import type {AuthenticatedUser} from '@imperium/connector';
import {UserService} from '../user';
import type {DomainConnectors} from './DomainConnectors';
import {CategoryService, PhotoService, CommentService} from '../photo';
import {entities} from './entities';

/*
	Services usually need instances created for the current request, we create those here.
 */
export function services(em: EntityManager, conn: DomainConnectors, authenticatedUser?: AuthenticatedUser) {
	return {
		userService: new UserService(em, em.getRepository(entities.User), conn, authenticatedUser),
		categoryService: new CategoryService(em, em.getRepository(entities.Category), conn, authenticatedUser),
		photoService: new PhotoService(em, em.getRepository(entities.Photo), conn, authenticatedUser),
		commentService: new CommentService(em, em.getRepository(entities.Comment), conn, authenticatedUser),
	};
}
