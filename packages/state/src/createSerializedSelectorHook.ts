import type {Slice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {useMemo} from 'react';
import type {Modify, ParsedState, Serializer} from './types';
import {isObject} from './types';

/**
 * Create a selector hook for a specific slice of state, overridden with un-serialized state
 * @param state
 * @param serializer
 */
export function createSerializedSelectorHook<State, T extends Serializer>(state: Slice<State>, serializer: T) {
	return () => {
		const serializedState = useSelector<unknown, State>(st => (st as Record<string, never>)[state.name]);
		return useMemo(() => {
			// Can only de-serialize if state is a Record<string, unknown>
			if (isObject(serializedState)) {
				const newState = {} as ParsedState<T['state']>;

				Object.keys(serializedState).forEach(key => {
					if (serializer?.state[key]) {
						// @ts-ignore Overriding index type
						newState[key] = serializer.state[key](serializedState[key]);
					}
				});

				return {
					...serializedState,
					...newState,
				} as Modify<State, ParsedState<T['state']>>;
			}

			return serializedState as Modify<State, ParsedState<T['state']>>;
		}, [serializedState]);
	};
}
