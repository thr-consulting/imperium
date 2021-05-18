import {LockMode, wrap} from '@mikro-orm/core';
import DataLoader from 'dataloader';
import debug from 'debug';
import type {Connectors} from '@imperium/connector';
/* eslint-disable @typescript-eslint/no-explicit-any */
// Disabled "any" checks because I'm reusing a lot of typescript from Mikro-orm and it has to match. -mk
import type {
	EntityData,
	EntityManager,
	EntityRepository,
	FilterQuery,
	Loaded,
	Populate,
	FindOptions,
	QueryOrderMap,
	FindOneOptions,
	Collection,
} from '@mikro-orm/core';
import type {QueryBuilder} from '@mikro-orm/postgresql';

const d = debug('imperium.domaindriven.AbstractRepository');

export abstract class AbstractRepository<EntityType> {
	protected readonly repo: EntityRepository<EntityType>;
	protected readonly connectors: Connectors;
	private readonly dataloader: DataLoader<string, EntityType>;

	constructor(repo: EntityRepository<EntityType>, connectors: Connectors) {
		this.repo = repo;
		this.connectors = connectors;

		this.dataloader = new DataLoader((keys: ReadonlyArray<string>) => {
			return this.repo.find(keys as FilterQuery<EntityType>);
		});
	}

	public persist(entity: EntityType | EntityType[]): EntityManager {
		return this.repo.persist(entity);
	}

	protected createQueryBuilder(alias?: string): QueryBuilder<EntityType> {
		// @ts-ignore Mikro-orm does not provide createQueryBuilder for all repo's. We are assuming an SQL-type of repo. -mk
		return this.repo.createQueryBuilder(alias);
	}

	/**
	 * Create the entity from data that matches the fields in the entity.
	 * @param data
	 */
	protected create(data: EntityData<EntityType>) {
		return this.repo.create(data);
	}

	/**
	 * Use DataLoader to batch/cache load an id.
	 * @param id
	 * @private
	 */
	private load(id: string) {
		return this.dataloader.load(id);
	}

	protected findOne<P extends Populate<EntityType> = any>(
		where: FilterQuery<EntityType>,
		populate?: P,
		orderBy?: QueryOrderMap,
	): Promise<Loaded<EntityType, P> | null>;
	protected findOne<P extends Populate<EntityType> = any>(
		where: FilterQuery<EntityType>,
		populate?: FindOneOptions<EntityType, P>,
		orderBy?: QueryOrderMap,
	): Promise<Loaded<EntityType, P> | null>;

	protected async findOne<P extends Populate<EntityType> = any>(
		where: FilterQuery<EntityType>,
		populate?: FindOneOptions<EntityType, P> | P,
		orderBy?: QueryOrderMap,
	) {
		const entity = await this.repo.findOne(where, populate, orderBy);
		if (entity) this.primeOne(entity);
		return entity;
	}

	/**
	 * Load many ids
	 * @param ids
	 * @private
	 */
	private loadMany(ids: string[]) {
		// todo : This returns errors and that causes problems
		// tacs/packages/server/src/documents/resolvers/sortedDocumentResolvers.ts
		// const sortedDocument = new SortedDocument({...data, type, account, company, tags});
		return this.dataloader.loadMany(ids);
	}

	public async getAll<P extends Populate<EntityType> = any>(
		populateOrOptions?: FindOptions<EntityType, P> | P,
		orderBy?: QueryOrderMap,
		limit?: number,
		offset?: number,
	) {
		return this.prime(await this.repo.findAll(populateOrOptions, orderBy, limit, offset));
	}

	protected find<P extends Populate<EntityType> = any>(
		where: FilterQuery<EntityType>,
		options?: FindOptions<EntityType, P>,
	): Promise<Loaded<EntityType, P>[]>;
	protected find<P extends Populate<EntityType> = any>(
		where: FilterQuery<EntityType>,
		populate?: P,
		orderBy?: QueryOrderMap,
		limit?: number,
		offset?: number,
	): Promise<Loaded<EntityType, P>[]>;

	protected async find<P extends Populate<EntityType> = any>(
		where: FilterQuery<EntityType>,
		optionsOrPopulate?: FindOptions<EntityType, P> | P,
		orderBy?: QueryOrderMap,
		limit?: number,
		offset?: number,
	) {
		return this.prime(await this.repo.find(where, optionsOrPopulate, orderBy, limit, offset));
	}

	protected primeOne(entity: EntityType, idField = 'id') {
		// @ts-ignore I'm making the assumption that the entity has an id field of some sort. -mk
		this.dataloader.prime(entity[idField], entity);
		return entity;
	}

	/**
	 * Prime the dataloader with entities
	 * @param entities
	 * @param idField
	 * @protected
	 */
	protected prime(entities: EntityType[], idField = 'id') {
		return entities.map(e => {
			// @ts-ignore I'm making the assumption that the entity has an id field of some sort. -mk
			this.dataloader.prime(e[idField], e);
			return e;
		});
	}

	/**
	 * Clear the dataloader cache for a specific key.
	 * @param id
	 * @protected
	 */
	protected clear(id: string) {
		this.dataloader.clear(id);
	}

	/**
	 * Get an entity by id.
	 * @param id
	 * @param version: if the version is specified it acts as a getLock
	 */
	public getById(id: string, version?: number): Promise<EntityType | null> {
		if (version) return this.getLock(id, version);
		return this.load(id);
	}

	/**
	 * Get entities by id's.
	 * @param ids
	 */
	public getByIds(ids: string[]) {
		return this.loadMany(ids);
	}

	/**
	 * Get an optimistic lock on an entity by id and version. This does not batch/cache.
	 * @param id
	 * @param version
	 * @return entity
	 */
	private async getLock(id: string, version: number): Promise<EntityType> {
		const entity = await this.repo.findOne(id as FilterQuery<EntityType>, {lockVersion: version, lockMode: LockMode.OPTIMISTIC});
		if (!entity) throw new Error('Could not optimistically lock entity');
		return entity;
	}

	/**
	 * Delete an entity by id.
	 * @param id
	 * @param version Obtains an optimistic lock when deleting.
	 */
	public async deleteById(id: string, version: number) {
		await this.repo.remove(await this.getLock(id, version));
		this.dataloader.clear(id);
	}

	protected async initializeCollection(collection: Collection<EntityType>, populate?: string[]) {
		if (collection.isInitialized()) return collection;
		await collection.init({populate});
		this.prime(collection.getItems());
		return collection;
	}

	protected async initializeEntity(entity: EntityType | null | undefined, populate?: string[]) {
		if (!entity) return entity;
		// This is the mikro-orm way
		if (wrap(entity).isInitialized()) return entity;
		return this.primeOne(await wrap(entity).init(true, populate));

		// // This is the dataloader way
		// if (wrap(entity).isInitialized()) return entity;
		// // This next line will probably need to be ignored by typescript.
		// return this.load(entity);
	}
}
