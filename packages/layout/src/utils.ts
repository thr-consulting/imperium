import {memoize, sortBy} from 'lodash-es';
import type {WeightedItem} from './commonItems';

/**
 * Sorts weighted items
 */
export const sortWeightedItems = memoize(function sortWeightedItemsImpl<T extends WeightedItem>(items: T[]) {
	return sortBy(items, v => v.weight || 0);
});
