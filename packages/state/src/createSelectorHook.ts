import type {Slice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

/**
 * Create a selector hook for a specific slice of state
 * @param state
 */
export function createSelectorHook<State>(state: Slice<State>) {
	return () => useSelector<unknown, State>(st => (st as Record<string, never>)[state.name]);
}
