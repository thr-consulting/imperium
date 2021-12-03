import {AuthLevel, AbstractAuthSelector, SyncAuthorizationResult, SyncHasAccessOptions} from '@imperium/authorization';
import debug from 'debug';
import {useCallback, useContext, useState} from 'react';
import {AuthContext} from '../AuthContext';
import {useAuthEffect} from './useAuthEffect';

const d = debug('imperium.auth-client.hooks.useLazyAuth');

type StartLazyAuthFn = () => void;
interface LazyAuthData {
	level: AuthLevel;
	loading: boolean;
	id: string | undefined;
	hasAccess: (lvl: AuthLevel) => SyncAuthorizationResult;
	called: boolean;
}
type LazyAuthTuple = [StartLazyAuthFn, LazyAuthData];

export function useLazyAuth(selector: AbstractAuthSelector): LazyAuthTuple {
	const ctx = useContext(AuthContext);
	const [called, setCalled] = useState(false);
	const {level, loading} = useAuthEffect(ctx, selector, called);
	const hasAccess = useCallback(
		(lvl: AuthLevel, opts?: SyncHasAccessOptions): SyncAuthorizationResult => {
			return new SyncAuthorizationResult(level, lvl, opts);
		},
		[level],
	);
	const setCalledTrue = useCallback(() => {
		setCalled(true);
	}, [setCalled]);

	return [
		setCalledTrue,
		{
			level,
			loading,
			id: ctx.auth?.id,
			hasAccess,
			called,
		},
	];
}
