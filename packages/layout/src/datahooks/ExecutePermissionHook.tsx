import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {actions} from '../state';
import type {PermissionSelectorHook} from '../types';

interface ExecutePermissionHookProps {
	permissionHook: PermissionSelectorHook;
	routeParams?: any;
}

export function ExecutePermissionHook({permissionHook, routeParams}: ExecutePermissionHookProps) {
	const dispatch = useDispatch();
	const perms = permissionHook(routeParams);

	useEffect(() => {
		Object.keys(perms).forEach(permission => {
			dispatch(actions.setPermission({permission, result: perms[permission]}));
		});
	}, [dispatch, perms]);

	return null;
}
