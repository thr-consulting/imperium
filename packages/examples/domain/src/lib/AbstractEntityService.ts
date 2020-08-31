import type {EntityData, EntityRepository, EntityManager, FilterQuery} from '@mikro-orm/core';
import type {AuthenticatedUser, Connector} from '@imperium/connector';

/**
 * This abstract class can be extended to provide Domain Services for a single mikro-orm entity type.
 */
export abstract class AbstractEntityService<T, C extends Connector> {
	protected readonly connectors: C;
	protected readonly authenticatedUser?: AuthenticatedUser;
	protected readonly repo: EntityRepository<T>;
	protected readonly em: EntityManager;

	constructor(em: EntityManager, repo: EntityRepository<T>, conn: C, authenticatedUser?: AuthenticatedUser) {
		this.connectors = conn;
		this.authenticatedUser = authenticatedUser;
		this.repo = repo;
		this.em = em;
	}

	create(data: EntityData<T>) {
		return this.repo.create(data);
	}

	add(obj: T) {
		this.repo.persist(obj);
	}

	getById(id: FilterQuery<T>) {
		return this.repo.findOne(id);
	}
}
