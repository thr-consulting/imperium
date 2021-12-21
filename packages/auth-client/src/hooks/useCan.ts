import type {JsonValue, Permission} from '@imperium/authorization';
import {useContext, useEffect, useState} from 'react';
import {AuthContext, IAuthContext} from '../AuthContext';

export function useCan(permission: Permission, data?: JsonValue) {
	const ctx = useContext<IAuthContext>(AuthContext);
	const [loading, setLoading] = useState(true);
	const [result, setResult] = useState(false);

	useEffect(() => {
		(async function iife() {
			ctx.authorization.can(permission, data).then(ret => {
				setResult(ret);
				setLoading(false);
			});
		})();
	}, [ctx.authorization, permission, data]);

	return [result, loading];
}
