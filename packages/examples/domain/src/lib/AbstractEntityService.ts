import type {EntityData, EntityRepository, EntityManager, FilterQuery} from '@mikro-orm/core';
import type {AuthenticatedUser, Connectors} from '@imperium/connector';

/**
 * This abstract class can be extended to provide Domain Services for a single mikro-orm entity type.
 */
export abstract class AbstractEntityService<T> {
	protected readonly connectors: Connectors;
	protected readonly authenticatedUser?: AuthenticatedUser;
	protected readonly repo: EntityRepository<T>;
	protected readonly em: EntityManager;

	constructor(em: EntityManager, repo: EntityRepository<T>, conn: Connectors, authenticatedUser?: AuthenticatedUser) {
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
