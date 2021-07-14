import type {Slice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

export function createSelectorHook<State>(state: Slice<State>) {
	return () => {
		return useSelector<unknown, State>(st => (st as Record<string, never>)[state.name]);
	};
}
