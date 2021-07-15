import debug from 'debug';
import type {Slice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import type {Serializer} from './types';

const d = debug('imperium.state.createSelectorHook');

function isObject(val: any): val is Record<string, unknown> {
	if (val === null) {
		return false;
	}
	return typeof val === 'function' || typeof val === 'object';
}

function transformObjectState(state: Record<string, unknown>, serializer: Serializer) {
	const stateSerializers = serializer.state;
	if (!stateSerializers) return state;
	return Object.keys(state).reduce((memo, v) => {
		if (stateSerializers[v]) {
			return {
				...memo,
				[v]: stateSerializers[v](state[v]),
			};
		}
		return memo;
	}, state);
}

export function createSelectorHook<State>(state: Slice<State>, serializer?: Serializer) {
	return () => {
		return useSelector<unknown, State>(st => {
			const stat = (st as any)[state.name];
			if (!serializer) return stat;
			if (!isObject(stat)) return stat;
			return transformObjectState(stat, serializer);
		});
	};
}
