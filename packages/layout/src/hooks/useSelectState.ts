import {flowRight} from 'lodash-es';
import type {State, StateSelectorHook} from '../types';

export function useSelectState(stateSelectorHook?: StateSelectorHook | StateSelectorHook[]) {
	let finalSelectorHook: () => any = () => ({});
	if (stateSelectorHook) {
		finalSelectorHook = Array.isArray(stateSelectorHook)
			? flowRight(
					stateSelectorHook.map(hook => {
						return (prev: State) => ({...prev, ...hook()});
					}),
				)
			: stateSelectorHook;
	}
	return finalSelectorHook();
}
