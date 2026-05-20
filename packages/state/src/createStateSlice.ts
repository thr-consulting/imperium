import {createSlice, type CreateSliceOptions, type Slice, type SliceCaseReducers, type Action} from '@reduxjs/toolkit';
import {merge} from 'lodash-es';

export function getPersistedStateKey(sliceName: string): string {
	return `persisted_slice_${sliceName}`;
}

/**
 * Clean Higher-Order Reducer that intercepts actions to load/save state
 * without mutating the slice object structure itself.
 */
export function createStateSlice<State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string>(
	options: CreateSliceOptions<State, CaseReducers, Name> & {
		persist?: boolean;
	},
): Slice<State, CaseReducers, Name> {
	const {persist, ...rest} = options;

	// 1. If persistence isn't explicitly requested, return a completely pristine slice.
	// This guarantees that slices like your user slice are 100% identical to your old code.
	if (!persist) {
		return createSlice(rest);
	}

	// 2. Otherwise, set up storage synchronization safely inside the reducer layer
	const slice = createSlice(rest);
	const baseReducer = slice.reducer;

	const key = getPersistedStateKey(slice.name);

	// Build a wrapper reducer that reads initial state from storage on boot,
	// and saves state to storage on changes.
	const persistedReducer = (state: State | undefined, action: Action) => {
		// On initialization, see if we have valid cached data
		if (state === undefined && typeof window !== 'undefined') {
			try {
				const serialized = localStorage.getItem(key);
				if (serialized !== null) {
					const parsed = JSON.parse(serialized);
					// Safe deep merge to prevent broken topologies
					// eslint-disable-next-line no-param-reassign
					state = merge({}, rest.initialState, parsed);
				}
			} catch {
				// Fallback to default initial state safely
			}
		}

		// Run the normal slice reduction logic
		const nextState = baseReducer(state, action);

		// If the state changed, sync it to localStorage
		if (state !== nextState && typeof window !== 'undefined') {
			try {
				localStorage.setItem(key, JSON.stringify(nextState));
			} catch {
				// Handle quota errors silently
			}
		}

		return nextState;
	};

	// Replace the reducer property safely without breaking prototypes or adding custom properties
	slice.reducer = persistedReducer as any;

	return slice;
}
