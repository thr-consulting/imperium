import type {Permissions} from '@imperium/authorization';
import {useEffect, useState} from 'react';
import debug from 'debug';
import {useAuthorization} from './useAuthorization';

const d = debug('imperium.auth-client.hooks.useCan');

/**
 * A React hook to get the results of a set of permissions.
 * @param permissions
 * @param logicalOperation
 */
export function useCan(permissions: Permissions, logicalOperation: 'AND' | 'OR' = 'AND') {
	const authorization = useAuthorization();
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState(false);

	useEffect(() => {
		(async function iife() {
			authorization
				.can(permissions, logicalOperation)
				.then(ret => {
					setResult(ret);
					setLoading(false);
				})
				.catch(err => d(err));
		})().catch(err => d(err));
	}, [authorization, permissions, logicalOperation]);

	return [result, loading];
}
