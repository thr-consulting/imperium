import flowRight from 'lodash/flowRight';
import type {StateSelectorHook} from '../types';

export function useSelectState(stateSelectorHook?: StateSelectorHook | StateSelectorHook[]) {
	let finalSelectorHook: () => any = () => ({});
	if (stateSelectorHook) {
		finalSelectorHook = Array.isArray(stateSelectorHook) ? flowRight(stateSelectorHook) : stateSelectorHook;
	}
	return finalSelectorHook();
}
