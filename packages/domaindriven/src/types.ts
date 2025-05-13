import type {AbstractRepository} from './AbstractRepository';

export type EntityBase = {id: string};
type ExtractEntityTypeFromRepository<Entity> = Entity extends AbstractRepository<infer X> ? X : never;
type RepositoryInitializersOnly<T extends EntityBase> = Pick<
	AbstractRepository<T>,
	'initializeEntity' | 'initializeCollection' | 'initializeCollectionAsArray'
>;

export type Initializers<T extends AbstractRepository<any>> =
	T extends AbstractRepository<any> ? RepositoryInitializersOnly<ExtractEntityTypeFromRepository<T>> : never;
