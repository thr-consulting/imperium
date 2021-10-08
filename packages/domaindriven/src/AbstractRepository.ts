import type {Connectors} from '@imperium/connector';
/* eslint-disable @typescript-eslint/no-explicit-any */
// Disabled "any" checks because I'm reusing a lot of typescript from Mikro-orm and it has to match. -mk
import type {
	Collection,
	EntityData,
	EntityManager,
	EntityRepository,
	FilterQuery,
	FindOneOptions,
	FindOptions,
	Loaded,
	Populate,
	QueryOrderMap,
} from '@mikro-orm/core';
import {LockMode, wrap} from '@mikro-orm/core';
import type {QueryBuilder} from '@mikro-orm/postgresql';
import DataLoader from 'dataloader';
import debug from 'debug';
import type {EntityBase} from './types';

const d = debug('imperium.domaindriven.AbstractRepository');

export abstract class AbstractRepository<EntityType extends EntityBase> {
	protected readonly repo: EntityRepository<EntityType>;
	protected readonly connectors: Connectors;
	private readonly dataloader: DataLoader<string, EntityType>;

	protected constructor(repo: EntityRepository<EntityType>, connectors: Connectors) {
		this.repo = repo;
		this.connectors = connectors;

		this.dataloader = new DataLoader((keys: ReadonlyArray<string>) => {
			d(`Finding keys: ${keys}`);
			return this.repo.find(keys as FilterQuery<EntityType>);
		});
	}

	/**
	 * Mark an entity to be persisted to the database.
	 * @param entity
	 */
	public persist(entity: EntityType | EntityType[]): EntityManager {
		return this.repo.persist(entity);
	}

	/**
	 * Create a query builder to select entities.
	 * @param alias
	 * @protected
	 */
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

	public findOne<P extends Populate<EntityType> = any>(
		where: FilterQuery<EntityType>,
		populate?: P,
		orderBy?: QueryOrderMap,
	): Promise<Loaded<EntityType, P> | null>;
	public findOne<P extends Populate<EntityType> = any>(
		where: FilterQuery<EntityType>,
		populate?: FindOneOptions<EntityType, P>,
		orderBy?: QueryOrderMap,
	): Promise<Loaded<EntityType, P> | null>;

	public async findOne<P extends Populate<EntityType> = any>(where: FilterQuery<EntityType>, populate?: P, orderBy?: QueryOrderMap) {
		const entity = await this.repo.findOne(where, populate, orderBy);
		if (entity) this.prime(entity);
		return entity;
	}

	/**
	 * Load many ids
	 * @param ids
	 * @private
	 */
	private loadMany(ids: string[]) {
		return this.dataloader.loadMany(ids);
	}

	public async getAll<P extends Populate<EntityType> = any>(
		populateOrOptions?: P, // FindOptions<EntityType, P> | P,
		orderBy?: QueryOrderMap,
		limit?: number,
		offset?: number,
	) {
		return this.repo.findAll(populateOrOptions, orderBy, limit, offset);
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
		optionsOrPopulate?: P, // FindOptions<EntityType, P> | P,
		orderBy?: QueryOrderMap,
		limit?: number,
		offset?: number,
	) {
		return this.prime(await this.repo.find(where, optionsOrPopulate, orderBy, limit, offset));
	}

	/**
	 * Prime the dataloader with entities
	 * @param entityOrEntities
	 * @param idField
	 * @protected
	 */
	protected prime(entityOrEntities: EntityType | EntityType[], idField = 'id') {
		if (Array.isArray(entityOrEntities)) {
			return entityOrEntities.map(e => {
				// @ts-ignore I'm making the assumption that the entity has an id field of some sort. -mk
				this.dataloader.prime(e[idField], e);
				return e;
			});
		}
		// @ts-ignore I'm making the assumption that the entity has an id field of some sort. -mk
		this.dataloader.prime(entityOrEntities[idField], entityOrEntities);
		return entityOrEntities;
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

	/**
	 * Initializes a collection. Does not use dataloader.
	 * @param collection
	 */
	public async initializeCollection(collection: Collection<EntityType>): Promise<Collection<EntityType>> {
		d('InitCollection');
		if (collection.isInitialized()) return collection;
		return collection.init();
		// NOTE: I could use dataloader here, but we would have to reconstitute the array as a collection.
	}

	/**
	 * Initializes a collection, returning an array of entities (not a Collection). Uses dataloader.
	 * @param collection
	 */
	public async initializeCollectionAsArray(collection: Collection<EntityType>): Promise<EntityType[]> {
		d('InitCollectionAsArray');
		if (collection.isInitialized()) return collection.toArray() as EntityType[];
		const ids = collection.getItems(false).map(v => v.id);
		const arr = await this.loadMany(ids);
		if (arr.some(v => v instanceof Error)) {
			throw new Error(`Error initializing collection: ${collection}`);
		}
		return arr as EntityType[];
	}

	/**
	 * Initializes a single entity. Uses dataloader.
	 * @param entity
	 */
	public async initializeEntity(entity: EntityType | null | undefined): Promise<EntityType> {
		if (!entity) throw new Error(`Error initializing entity: ${entity}`);
		d(`InitEntity: ${entity.id}`);

		if (wrap(entity).isInitialized()) return entity;
		return this.load(entity.id);
	}
}
