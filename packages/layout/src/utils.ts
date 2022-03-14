import type {MemoizedFunction} from 'lodash';
import {memoize, sortBy} from 'lodash-es';
import type {WeightedItem} from './commonItems';

/**
 * Sorts weighted items
 */
function sortWeightedItemsImpl<T extends WeightedItem>(items: T[]) {
	return sortBy(items, v => v.weight || 0);
}

export const sortWeightedItems: (<T extends WeightedItem>(items: T[]) => unknown[] | Array<T[][keyof T[]]>) & MemoizedFunction =
	memoize(sortWeightedItemsImpl);
