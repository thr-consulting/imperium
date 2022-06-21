import {AuthContext} from '@imperium/auth-client';
import type {IAuthContext} from '@imperium/auth-client';
import debug from 'debug';
import {useContext, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {actions, useLayoutState} from '../state';
import type {PermissionSelector} from '../types';

const d = debug('imperium.layout.datahooks.Permissions');

interface PermissionsProps {
	permissions: PermissionSelector;
}

export function Permissions({permissions}: PermissionsProps) {
	const ctx = useContext<IAuthContext>(AuthContext);
	const layoutState = useLayoutState();
	const dispatch = useDispatch();

	useEffect(() => {
		(async function iife() {
			permissions.forEach(permission => {
				const data = layoutState.params && Object.keys(layoutState.params).length > 0 ? layoutState.params : undefined;
				ctx.authorization.can(permission, data).then(result => {
					dispatch(actions.setPermission({permission, result}));
				});
			});
		})();
	}, [dispatch, permissions, ctx.authorization, layoutState.params]);

	return null;
}
