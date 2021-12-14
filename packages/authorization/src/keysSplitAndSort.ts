import debug from 'debug';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import type {IndexedValue} from './types';

const d = debug('imperium.authorization.keysSplitAndSort');

interface KeyWrapper<Key> {
	index: number;
	key: Key;
}

interface KeyWrapperWithOptionalValue<Key, Value> extends KeyWrapper<Key> {
	value?: Value;
}

/**
 * Takes an array of Keys and does a pre-lookup. Then does a lookup on the ones that didn't get values.
 * Returns a stable sorted array matching the input keys.
 * @param keys
 * @param preLookup
 * @param lookup
 */
export async function keysSplitAndSort<Key, Value>(
	keys: readonly Key[],
	preLookup: (key: Key) => Promise<Value | null>,
	lookup: (keys: KeyWrapper<Key>[]) => Promise<IndexedValue<Value>[]>,
): Promise<Value[]> {
	const keyWrappers: KeyWrapperWithOptionalValue<Key, Value>[] = await Promise.all(
		keys.map(async (k, index) => {
			const val = await preLookup(k);
			if (val !== null) {
				return {
					index,
					key: k,
					value: val,
				};
			}
			return {
				index,
				key: k,
			};
		}),
	);

	// Group A needs values, group B has them already
	const grouped = groupBy(keyWrappers, x => {
		if (typeof x.value === 'undefined') return 'a';
		return 'b';
	});

	let vals: IndexedValue<Value>[] = (grouped.b || []) as IndexedValue<Value>[];
	if (grouped.a && grouped.a.length > 0) {
		vals = [...vals, ...(await lookup(grouped.a))];
	}

	const sorted = sortBy(vals, 'index');

	return sorted.map(v => v.value);
}
