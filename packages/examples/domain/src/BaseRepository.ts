import type {EntityData, EntityRepository, EntityManager, FilterQuery} from 'mikro-orm';
import type {AuthenticatedUser} from '@imperium/connector';
import type {DomainConnectors} from './index';

export class BaseRepository<T> {
	protected readonly connectors: DomainConnectors;
	protected readonly authenticatedUser?: AuthenticatedUser;
	protected readonly repo: EntityRepository<T>;
	protected readonly em: EntityManager;

	constructor(em: EntityManager, repo: EntityRepository<T>, conn: DomainConnectors, authenticatedUser?: AuthenticatedUser) {
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
