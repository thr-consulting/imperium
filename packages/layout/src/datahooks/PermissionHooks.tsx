import debug from 'debug';
import type {PermissionSelectorHook} from '../types';
import {ExecutePermissionHook} from './ExecutePermissionHook';

const d = debug('imperium.layout.datahooks.PermissionHooks');

interface PermissionHooksProps {
	permissionHooks: PermissionSelectorHook[];
}

export function PermissionHooks({permissionHooks}: PermissionHooksProps) {
	return (
		<>
			{permissionHooks.map((hook, index) => {
				// eslint-disable-next-line react/no-array-index-key
				return <ExecutePermissionHook key={index} permissionHook={hook} />;
			})}
		</>
	);
}
