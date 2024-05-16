import type {Permissions} from '@imperium/authorization';
import {useEffect, useState} from 'react';
import {useAuthorization} from './useAuthorization';

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
			authorization.can(permissions, logicalOperation).then(ret => {
				setResult(ret);
				setLoading(false);
			});
		})();
	}, [authorization, permissions, logicalOperation]);

	return [result, loading];
}
