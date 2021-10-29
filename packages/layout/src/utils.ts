import memoize from 'lodash/memoize';
import sortBy from 'lodash/sortBy';
import type {HorizontalPositionedItem, WeightedItem, VisibilityQuery} from './types';

/**
 * Sorts weighted items
 */
export const sortWeightedItems = memoize(function sortWeightedItemsImpl<T extends WeightedItem>(items: T[]) {
	return sortBy(items, v => v.weight || 0);
});

/**
 * Splits horizontally positioned items into left and right arrays
 * @param items
 */
export function splitHorizontalItems<T extends HorizontalPositionedItem>(items: T[]) {
	return items.reduce(
		(memo, v) => {
			if (v.position === 'right') {
				return {
					leftItems: memo.leftItems,
					rightItems: [...memo.rightItems, v],
				};
			}
			return {
				leftItems: [...memo.leftItems, v],
				rightItems: memo.rightItems,
			};
		},
		{leftItems: [], rightItems: []} as {leftItems: T[]; rightItems: T[]},
	);
}

export function generateVisible<T extends Record<string, unknown>>(visDefinition: VisibilityQuery<T>): VisibilityQuery<T> {
	return {
		query: visDefinition.query,
		stateSelectorHook: visDefinition.stateSelectorHook,
	};
}
