import {useAuth} from '@imperium/auth-client';
import debug from 'debug';
import type {Location} from 'history';
import {compact, merge} from 'lodash-es';
import {useLocation} from 'react-router-dom';
import {useLayoutState} from '../state';
import type {Data, PermissionSelectorHook, StateSelectorHook} from '../types';
import {useIsActiveRoute} from './useIsActiveRoute';
import {useSelectPermission} from './useSelectPermission';
import {useSelectState} from './useSelectState';

const d = debug('imperium.layout.hooks.useBuildData');

export interface UseBuildDataParams {
	data?: Data;
	routeItem?: any;
	stateSelectorHook?: StateSelectorHook | StateSelectorHook[];
	permissionSelectorHook?: PermissionSelectorHook | PermissionSelectorHook[];
}

export function useBuildData({stateSelectorHook, permissionSelectorHook, data, routeItem}: UseBuildDataParams) {
	const {id} = useAuth();
	const {permissions} = useLayoutState();
	const state = useSelectState(stateSelectorHook);
	const loc = useLocation() as Location;
	const route = {
		path: compact(loc.pathname.split('/')),
		hash: loc.hash,
		search: new URLSearchParams(loc.search),
	};
	const active = useIsActiveRoute({loc, route, state, active: false, id, permissions}, routeItem);
	const permissionsX = useSelectPermission({state, loc, active, route, id, permissions}, permissionSelectorHook);
	const newData: Data = {state, loc, active, route, permissions: {...permissions, ...permissionsX}, id};
	return data ? merge(data, newData) : newData;
}
