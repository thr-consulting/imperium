// Disabled "any" checks because I'm reusing a lot of typescript from Mikro-orm, and it has to match. -mk
import type {Connectors} from '@imperium/connector';
import {
	type CountOptions,
	type EntityDictionary,
	type EntityRepository,
	type FilterQuery,
	type FindOneOptions,
	type FindOptions,
	type GetReferenceOptions,
	type IdentifiedReference,
	type Loaded,
	type Populate,
	type Primary,
	type RequiredEntityData,
	type Collection,
	LockMode,
	type Reference,
	wrap,
} from '@mikro-orm/core';
import type {QueryBuilder} from '@mikro-orm/postgresql';
import DataLoader from 'dataloader';
import debug from 'debug';
import type {EntityBase} from './types';

const d = debug('imperium.domaindriven.AbstractRepository');

export abstract class AbstractRepository<EntityType extends EntityBase> {
	protected readonly entityName: string;

	protected readonly repo: EntityRepository<EntityType>;

	protected readonly connectors: Connectors;

	private readonly dataloader: DataLoader<EntityType['id'], EntityType | undefined>;

	protected constructor(entityName: string, repo: EntityRepository<EntityType>, connectors: Connectors) {
		this.entityName = entityName;
		this.repo = repo;
		this.connectors = connectors;

		// Create a dataloader to be used by this repository
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
	public persist(entity: EntityType | EntityType[]) {
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
	public map(entity: EntityDictionary<EntityType>) {
		return this.repo.map(entity);
	}

	/**
	 * Create the entity from data that matches the fields in the entity.
	 * @param data
	 */
	public create(data: RequiredEntityData<EntityType>) {
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

	public async findOne<P extends string = never>(
		where: FilterQuery<EntityType>,
		options?: FindOneOptions<EntityType, P>,
	): Promise<Loaded<EntityType, P> | undefined> {
		const entity = await this.repo.findOne(where, options);
		if (entity) this.prime(entity);
		return entity || undefined;
	}

	public async getAll<P extends string = never>(options?: FindOptions<EntityType, P>) {
		return this.prime(await this.repo.findAll(options));
	}

	public async find<P extends string = never>(where: FilterQuery<EntityType>, options?: FindOptions<EntityType, P>) {
		return this.prime(await this.repo.find(where, options));
	}

	public async count<P extends string = never>(where: FilterQuery<EntityType>, options?: CountOptions<EntityType, P>) {
		return this.repo.count(where, options);
	}

	public async remove(entityOrEntities: EntityType | EntityType[]) {
		return this.repo.remove(entityOrEntities);
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
	 * Get an entity by id or error.
	 * @param id
	 * @param version: if the version is specified it acts as a getLock
	 */
	public async getByIdOrError(id: EntityType['id'], version?: number): Promise<EntityType> {
		if (version) return this.getLock(id, version);
		const entity = await this.load(id);
		if (!entity) throw new Error(`${this.entityName} with id ${id} not found!`);
		return entity;
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
		this.repo.remove(await this.getLock(id, version));
		this.dataloader.clear(id);
	}

	/**
	 * Initializes a collection. Does not use dataloader.
	 * @param collection
	 * @param options
	 */
	public async initializeCollection<P extends string = never>(collection: Collection<EntityType>, options?: {populate?: Populate<EntityType, P>}) {
		d('InitCollection');

		if (options?.populate) {
			const initColl = await collection.init({populate: options.populate});
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
	 * @param options
	 */
	public async initializeCollectionAsArray<P extends string = never>(
		collection: Collection<EntityType>,
		options?: {populate?: Populate<EntityType, P>},
	) {
		d('InitCollectionAsArray');
		if (options?.populate) {
			const initColl = await collection.init(options);
			this.prime(initColl.getItems(false));
			return initColl.getItems();
		}

		if (collection.isInitialized()) return collection.getItems();
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
	 * @param options
	 */
	public async initializeEntity<P extends string = never>(entity: EntityType, options?: {populate?: Populate<EntityType, P>}) {
		d(`InitEntity: ${entity.id}`);

		if (options?.populate) {
			return this.prime(await wrap(entity).init(true, options.populate));
		}

		if (wrap(entity).isInitialized()) return entity;
		const ent = await this.load(entity.id);
		if (!ent) throw new Error(`Error initializing entity: ${entity}`);
		return ent;
	}

	public getReference(
		id: Primary<EntityType>,
		options: Omit<GetReferenceOptions, 'wrapped'> & {
			wrapped: true;
		},
	): IdentifiedReference<EntityType, 'id'>;
	public getReference(id: Primary<EntityType>): EntityType;
	public getReference(
		id: Primary<EntityType>,
		options: Omit<GetReferenceOptions, 'wrapped'> & {
			wrapped: false;
		},
	): EntityType;
	public getReference(id: Primary<EntityType>, options?: GetReferenceOptions): EntityType | Reference<EntityType> {
		if (options?.wrapped) {
			return this.repo.getReference(id, {wrapped: true});
		}
		return this.repo.getReference(id, {wrapped: false});
	}
}
