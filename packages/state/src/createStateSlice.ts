import {createSlice, type CreateSliceOptions, type Slice, type SliceCaseReducers, type Action} from '@reduxjs/toolkit';

export type PersistedSlice<T = any> = Slice<T> & {p?: boolean};

export function createStateSlice<State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string>(
	options: CreateSliceOptions<State, CaseReducers, Name> & {persist?: boolean},
): PersistedSlice<State> {
	const {persist, ...rest} = options;
	const slice = createSlice(rest);

	if (!persist) {
		return Object.assign(slice, {p: persist});
	}

	const baseReducer = slice.reducer;
	const storageKey = `persisted_slice_${slice.name}`;

	const persistedReducer = (state: State | undefined, action: Action) => {
		// 1. HYDRATE WITH GUARANTEED FALLBACK
		if (state === undefined) {
			let fallbackState: State;

			if (typeof rest.initialState === 'function') {
				fallbackState = (rest.initialState as () => State)();
			} else {
				fallbackState = rest.initialState;
			}

			if (typeof window !== 'undefined') {
				try {
					const serialized = localStorage.getItem(storageKey);
					if (serialized !== null) {
						// eslint-disable-next-line no-param-reassign
						state = JSON.parse(serialized);
					} else {
						// eslint-disable-next-line no-param-reassign
						state = fallbackState;
					}
				} catch {
					// eslint-disable-next-line no-param-reassign
					state = fallbackState;
				}
			} else {
				// eslint-disable-next-line no-param-reassign
				state = fallbackState;
			}
		}

		// Run standard Redux action reduction
		const nextState = baseReducer(state, action);

		// 2. PERSIST
		if (state !== nextState && typeof window !== 'undefined') {
			try {
				localStorage.setItem(storageKey, JSON.stringify(nextState));
			} catch {
				// Handle quota limits silently
			}
		}

		return nextState;
	};

	// Swap the reducer handler inline safely
	slice.reducer = persistedReducer as any;

	return Object.assign(slice, {p: persist});
}
