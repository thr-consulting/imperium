import {createSlice, type CreateSliceOptions, type Slice, type SliceCaseReducers} from '@reduxjs/toolkit';
import debug from 'debug';

export type PersistedSlice<T = any> = Slice<T> & {p?: boolean};

const d = debug('imperium.state.createStateSlice');

export function createStateSlice<State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string>(
	options: CreateSliceOptions<State, CaseReducers, Name> & {persist?: boolean},
): PersistedSlice<State> {
	const {persist, name, initialState, reducers, ...rest} = options;
	const localStorageKey = `persisted_slice_${name}`;

	// Resolve initial state (load from localStorage if persist is enabled)
	let finalInitialState = initialState;
	if (persist && typeof window !== 'undefined') {
		try {
			const serializedState = localStorage.getItem(localStorageKey);
			if (serializedState !== null) {
				finalInitialState = JSON.parse(serializedState);
			}
		} catch (err) {
			d(`Failed to load persisted state for slice ${name}:`, err);
		}
	}

	// Cast to a plain Record to bypass TS2862 index read-only tracking safely
	const finalReducers: Record<string, any> = {...reducers};

	if (persist) {
		Object.keys(finalReducers).forEach(key => {
			const originalReducer = finalReducers[key];

			if (typeof originalReducer === 'function') {
				finalReducers[key] = (state: any, action: any) => {
					const result = originalReducer(state, action);

					// RTK uses Immer, so we safely stringify the draft/mutated state
					try {
						localStorage.setItem(localStorageKey, JSON.stringify(state));
					} catch (err) {
						d(`Failed to persist state for slice ${name}:`, err);
					}

					return result;
				};
			} else if (originalReducer && typeof originalReducer === 'object' && 'reducer' in originalReducer) {
				const originalFunc = originalReducer.reducer;

				// Shallow-copy the action configuration object instead of mutating options directly
				finalReducers[key] = {
					...originalReducer,
					reducer: (state: any, action: any) => {
						const result = originalFunc(state, action);
						try {
							localStorage.setItem(localStorageKey, JSON.stringify(state));
						} catch (err) {
							d(`Failed to persist state for slice ${name}:`, err);
						}
						return result;
					},
				};
			}
		});
	}

	// Create the slice with our modified configuration
	const slice = createSlice({
		...rest,
		name,
		initialState: finalInitialState,
		reducers: finalReducers,
	});

	return Object.assign(slice, {p: persist});
}
