import flowRight from 'lodash/flowRight';
import type {Data, PermissionSelectorHook} from '../types';

export function useSelectPermission(data: Data, permissionSelectorHook?: PermissionSelectorHook | PermissionSelectorHook[]) {
	let finalSelectorHook: PermissionSelectorHook = () => ({});
	if (permissionSelectorHook) {
		finalSelectorHook = Array.isArray(permissionSelectorHook) ? flowRight(permissionSelectorHook) : permissionSelectorHook;
	}
	return finalSelectorHook(data);
}
