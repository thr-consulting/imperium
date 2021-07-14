import {useSelector} from 'react-redux';
import type {Slice} from '@reduxjs/toolkit';

export function createSelectorHook<State>(state: Slice<State>) {
	return () => {
		return useSelector<unknown, State>(st => (st as Record<string, never>)[state.name]);
	};
}
