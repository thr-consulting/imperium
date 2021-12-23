import type {Connectors} from '@imperium/connector';
/* eslint-disable @typescript-eslint/no-explicit-any */
// Disabled "any" checks because I'm reusing a lot of typescript from Mikro-orm, and it has to match. -mk
import type {
	Collection,
	EntityData,
	EntityManager,
	EntityRepository,
	FilterQuery,
	FindOneOptions,
	FindOptions,
	IdentifiedReference,
	Loaded,
	Populate,
	Primary,
	QueryOrderMap,
} from '@mikro-orm/core';
import {LockMode, wrap} from '@mikro-orm/core';
import type {QueryBuilder} from '@mikro-orm/postgresql';
import DataLoader from 'dataloader';
import debug from 'debug';
import type {EntityBase} from './types';
import {isFindOptions} from './types';

const d = debug('imperium.domaindriven.AbstractRepository');

export abstract class AbstractRepository<EntityType extends EntityBase> {
	protected readonly repo: EntityRepository<EntityType>;
	protected readonly connectors: Connectors;
	private readonly dataloader: DataLoader<EntityType['id'], EntityType | undefined>;

	protected constructor(repo: EntityRepository<EntityType>, connectors: Connectors) {
		this.repo = repo;
		this.connectors = connectors;

		this.dataloader = new DataLoader<EntityType['id'], EntityType | undefined>(async (keys: ReadonlyArray<EntityType['id']>) => {
			d(`Finding keys: ${keys}`);
			const unordered = await this.repo.find(keys as FilterQuery<EntityType>);
			const entMap = new Map<EntityType['id'], EntityType>();
			unordered.forEach(ent => {
				entMap.set(ent.id, ent);
			});
			return keys.map(key => {
				return entMap.get(key);
			});
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
	 */
	public createQueryBuilder(alias?: string): QueryBuilder<EntityType> {
		// @ts-ignore Mikro-orm does not provide createQueryBuilder for all repo's. We are assuming an SQL-type of repo. -mk
		return this.repo.createQueryBuilder(alias);
	}

	/**
	 * Maps data (usually returned from a query builder) to an entity.
	 * @param entity
	 */
	public map(entity: EntityData<EntityType>) {
		return this.repo.map(entity);
	}

	/**
	 * Create the entity from data that matches the fields in the entity.
	 * @param data
	 */
	public create(data: EntityData<EntityType>) {
		return this.repo.create(data);
	}

	/**
	 * Use DataLoader to batch/cache load an id.
	 * @param id
	 * @private
	 */
	private load(id: EntityType['id']) {
		return this.dataloader.load(id);
	}

	/**
	 * Load many ids
	 * @param ids
	 * @private
	 */
	private async loadMany(ids: EntityType['id'][]): Promise<(EntityType | undefined)[]> {
		const arr = await this.dataloader.loadMany(ids);
		if (arr.some(v => v instanceof Error)) {
			throw new Error(`Error loading many entities`);
		}
		return arr as (EntityType | undefined)[];
	}

	public findOne<P extends Populate<EntityType> = any>(
		where: FilterQuery<EntityType>,
		populate?: P,
		orderBy?: QueryOrderMap,
	): Promise<Loaded<EntityType, P> | undefined>;
	public findOne<P extends Populate<EntityType> = any>(
		where: FilterQuery<EntityType>,
		populate?: FindOneOptions<EntityType, P>,
		orderBy?: QueryOrderMap,
	): Promise<Loaded<EntityType, P> | undefined>;
	public async findOne<P extends Populate<EntityType> = any>(where: FilterQuery<EntityType>, populate?: P, orderBy?: QueryOrderMap) {
		const entity = await this.repo.findOne(where, populate, orderBy);
		if (entity) this.prime(entity);
		return entity || undefined;
	}

	public async getAll<P extends Populate<EntityType> = any>(options?: FindOptions<EntityType, P>): Promise<EntityType[]>;
	public async getAll<P extends Populate<EntityType> = any>(
		populate?: P,
		orderBy?: QueryOrderMap,
		limit?: number,
		offset?: number,
	): Promise<EntityType[]>;

	public async getAll<P extends Populate<EntityType> = any>(
		populateOrOptions?: FindOptions<EntityType, P> | P,
		orderBy?: QueryOrderMap,
		limit?: number,
		offset?: number,
	): Promise<EntityType[]> {
		if (!populateOrOptions) return this.prime(await this.repo.findAll());
		if (orderBy !== undefined) return this.prime(await this.repo.findAll(populateOrOptions as Populate<EntityType>, orderBy, limit, offset));
		if (isFindOptions(populateOrOptions)) {
			return this.prime(await this.repo.findAll(populateOrOptions));
		}
		return this.prime(await this.repo.findAll(populateOrOptions as Populate<EntityType>, orderBy, limit, offset));
	}

	public find<P extends Populate<EntityType> = any>(where: FilterQuery<EntityType>, options?: FindOptions<EntityType, P>): Promise<EntityType[]>;
	public find<P extends Populate<EntityType> = any>(
		where: FilterQuery<EntityType>,
		populate?: P,
		orderBy?: QueryOrderMap,
		limit?: number,
		offset?: number,
	): Promise<EntityType[]>;
	public async find<P extends Populate<EntityType> = any>(
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
	 */
	public prime(entityOrEntities: EntityType): EntityType;
	public prime(entityOrEntities: EntityType[]): EntityType[];
	public prime(entityOrEntities: EntityType | EntityType[]) {
		if (Array.isArray(entityOrEntities)) {
			return entityOrEntities.map(e => {
				this.dataloader.prime(e.id, e);
				return e;
			});
		}
		this.dataloader.prime(entityOrEntities.id, entityOrEntities);
		return entityOrEntities;
	}

	/**
	 * Clear the dataloader cache for a specific key or all keys.
	 * @param id
	 */
	public clear(id?: EntityType['id']) {
		if (id) {
			this.dataloader.clear(id);
		} else {
			this.dataloader.clearAll();
		}
	}

	/**
	 * Get an entity by id.
	 * @param id
	 * @param version: if the version is specified it acts as a getLock
	 */
	public getById(id: EntityType['id'], version?: number): Promise<EntityType | undefined> {
		if (version) return this.getLock(id, version);
		return this.load(id);
	}

	/**
	 * Get entities by id's.
	 * @param ids
	 */
	public getByIds(ids: EntityType['id'][]): Promise<(EntityType | undefined)[]> {
		return this.loadMany(ids);
	}

	/**
	 * Get an optimistic lock on an entity by id and version. This does not batch/cache.
	 * @param id
	 * @param version
	 * @return entity
	 */
	private async getLock(id: EntityType['id'], version: number): Promise<EntityType> {
		const entity = await this.repo.findOne(id as FilterQuery<EntityType>, {lockVersion: version, lockMode: LockMode.OPTIMISTIC});
		if (!entity) throw new Error('Could not optimistically lock entity');
		return this.prime(entity);
	}

	/**
	 * Delete an entity by id.
	 * @param id
	 * @param version Obtains an optimistic lock when deleting.
	 */
	public async deleteById(id: EntityType['id'], version: number) {
		await this.repo.remove(await this.getLock(id, version));
		this.dataloader.clear(id);
	}

	/**
	 * Initializes a collection. Does not use dataloader.
	 * @param collection
	 * @param populate
	 */
	public async initializeCollection(collection: Collection<EntityType>, populate?: string[]): Promise<Collection<EntityType>> {
		d('InitCollection');

		if (populate) {
			const initColl = await collection.init({populate});
			this.prime(initColl.getItems(false));
			return initColl;
		}

		if (collection.isInitialized()) return collection;
		const initColl = await collection.init();
		this.prime(initColl.getItems(false));
		return initColl;
		// NOTE: I could use dataloader here, but we would have to reconstitute the array as a collection.
	}

	/**
	 * Initializes a collection, returning an array of entities (not a Collection). Uses dataloader.
	 * @param collection
	 * @param populate
	 */
	public async initializeCollectionAsArray(collection: Collection<EntityType>, populate?: string[]): Promise<EntityType[]> {
		d('InitCollectionAsArray');
		if (populate) {
			const initColl = await collection.init({populate});
			this.prime(initColl.getItems(false));
			return initColl.toArray() as EntityType[];
		}

		if (collection.isInitialized()) return collection.toArray() as EntityType[];
		const ids = collection.getItems(false).map(v => v.id);
		const arr = await this.loadMany(ids);
		if (arr.some(v => v === undefined)) {
			throw new Error(`Error initializing collection: ${collection}`);
		}
		return arr as EntityType[];
	}

	/**
	 * Initializes a single entity. Uses dataloader.
	 * @param entity
	 * @param populate
	 */
	public async initializeEntity(entity: EntityType, populate?: string[]): Promise<EntityType> {
		d(`InitEntity: ${entity.id}`);

		if (populate) {
			return this.prime(await wrap(entity).init(true, populate));
		}

		if (wrap(entity).isInitialized()) return entity;
		const ent = await this.load(entity.id);
		if (!ent) throw new Error(`Error initializing entity: ${entity}`);
		return ent;
	}

	/**
	 * Create reference to an entity
	 * @param id
	 * @param wrapped
	 */
	getReference(id: Primary<EntityType>, wrapped: true): IdentifiedReference<EntityType, 'id'>;
	getReference(id: Primary<EntityType>, wrapped: false): EntityType;
	getReference(id: Primary<EntityType>): EntityType;
	getReference(id: Primary<EntityType>, wrapped?: true | false): EntityType | IdentifiedReference<EntityType, 'id'> {
		if (wrapped) {
			return this.repo.getReference(id, true) as IdentifiedReference<EntityType, 'id'>;
		}
		return this.repo.getReference(id, false);
	}
}
