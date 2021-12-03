import {AuthLevel, AbstractAuthSelector, SyncHasAccessOptions, SyncAuthorizationResult} from '@imperium/authorization';
import debug from 'debug';
import {useCallback, useContext} from 'react';
import {AuthContext} from '../AuthContext';
import {useAuthEffect} from './useAuthEffect';

const d = debug('imperium.auth-client.hooks.useAuth');

export function useAuth(selector: AbstractAuthSelector) {
	const ctx = useContext(AuthContext);
	const {level, loading} = useAuthEffect(ctx, selector, true);
	const hasAccess = useCallback(
		(lvl: AuthLevel, opts?: SyncHasAccessOptions): SyncAuthorizationResult => {
			return new SyncAuthorizationResult(level, lvl, opts);
		},
		[level],
	);

	return {
		level,
		loading,
		id: ctx.auth?.id,
		hasAccess,
	};
}
