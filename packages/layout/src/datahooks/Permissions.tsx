import {useAuthorization} from '@imperium/auth-client';
import debug from 'debug';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {actions, useLayoutState} from '../state';
import type {PermissionSelector} from '../types';

const d = debug('imperium.layout.datahooks.Permissions');

interface PermissionsProps {
	permissions: PermissionSelector;
}

export function Permissions({permissions}: PermissionsProps) {
	const authorization = useAuthorization();
	const layoutState = useLayoutState();
	const dispatch = useDispatch();

	useEffect(() => {
		(async function iife() {
			const permissionsWithData = permissions.map(permission => {
				const data = layoutState.params && Object.keys(layoutState.params).length > 0 ? layoutState.params : undefined;
				return {
					permission,
					data,
				};
			});
			permissionsWithData.forEach(permission => {
				authorization
					.can(permission)
					.then(result => {
						dispatch(actions.setPermission({...permission, result}));
					})
					.catch(err => d(err));
			});
		})().catch(err => d(err));
	}, [dispatch, permissions, authorization, layoutState.params]);

	return null;
}
