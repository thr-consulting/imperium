import {createSlice, type CreateSliceOptions, type Slice, type SliceCaseReducers} from '@reduxjs/toolkit';

export type PersistedSlice<State> = Slice<State> & {
	persist?: boolean;
};

export function createStateSlice<State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string>(
	options: CreateSliceOptions<State, CaseReducers, Name> & {
		persist?: boolean;
	},
): PersistedSlice<State> {
	const {persist, ...rest} = options;

	const slice = createSlice(rest);

	return Object.assign(slice, {
		persist,
	});
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Lightweight structural validation.
 *
 * This intentionally only validates:
 * - object-ness
 * - existence of top-level keys
 *
 * For stricter runtime validation, use a schema validator
 * like Zod or Valibot.
 */
export function isValidState<State>(parsed: unknown, defaultState: State): parsed is State {
	// Primitive states cannot be structurally validated
	if (!isPlainObject(defaultState)) {
		return true;
	}

	if (!isPlainObject(parsed)) {
		return false;
	}

	return Object.keys(defaultState).every(key => key in parsed);
}

export function getPersistedStateKey(sliceName: string): string {
	return `persisted_slice_${sliceName}`;
}

export function clearPersistedState(sliceName: string): void {
	if (typeof window === 'undefined') {
		return;
	}

	try {
		localStorage.removeItem(getPersistedStateKey(sliceName));
	} catch {
		// Ignore storage failures
	}
}

export function persistState<State>(sliceName: string, state: State): void {
	if (typeof window === 'undefined') {
		return;
	}

	try {
		localStorage.setItem(getPersistedStateKey(sliceName), JSON.stringify(state));
	} catch {
		// Ignore quota/security/storage failures
	}
}

/**
 * Hydrates persisted slice state safely.
 */
export function loadPersistedState<State>(sliceName: string, defaultState: State): State {
	if (typeof window === 'undefined') {
		return defaultState;
	}

	try {
		const serializedState = localStorage.getItem(getPersistedStateKey(sliceName));

		if (serializedState === null) {
			return defaultState;
		}

		const parsed: unknown = JSON.parse(serializedState);

		if (isValidState(parsed, defaultState)) {
			return parsed;
		}

		clearPersistedState(sliceName);

		return defaultState;
	} catch {
		clearPersistedState(sliceName);

		return defaultState;
	}
}
