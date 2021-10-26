import type {FindOptions, Populate} from '@mikro-orm/core';
import type {AbstractRepository} from './AbstractRepository';

export type EntityBase = {id: string};
type ExtractEntityTypeFromRepository<Entity> = Entity extends AbstractRepository<infer X> ? X : never;
type RepositoryInitializersOnly<T extends EntityBase> = Pick<
	AbstractRepository<T>,
	'initializeEntity' | 'initializeCollection' | 'initializeCollectionAsArray'
>;

export type Initializers<T extends AbstractRepository<any>> = T extends AbstractRepository<any>
	? RepositoryInitializersOnly<ExtractEntityTypeFromRepository<T>>
	: never;

export function isFindOptions<EntityType, P extends Populate<EntityType> = any>(
	value: P | FindOptions<EntityType>,
): value is FindOptions<EntityType, P> {
	const forcedValue = value as FindOptions<EntityType, P>;
	return [
		'populate' in forcedValue,
		'orderBy' in forcedValue,
		'cache' in forcedValue,
		'limit' in forcedValue,
		'offset' in forcedValue,
		'refresh' in forcedValue,
		'convertCustomTypes' in forcedValue,
		'disabledIdentityMap' in forcedValue,
		'fields' in forcedValue,
		'schema' in forcedValue,
		'flags' in forcedValue,
		'groupBy' in forcedValue,
		'having' in forcedValue,
		'strategy' in forcedValue,
		'filters' in forcedValue,
	].some(z => z);
}
