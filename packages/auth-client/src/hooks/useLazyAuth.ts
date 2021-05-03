import {AuthLevel, AbstractAuthSelector, SyncAuthorizationResult, SyncHasAccessOptions} from '@imperium/authorization';
import debug from 'debug';
import {useContext, useState} from 'react';
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

	function hasAccess(lvl: AuthLevel, opts?: SyncHasAccessOptions): SyncAuthorizationResult {
		return new SyncAuthorizationResult(level, lvl, opts);
	}

	return [
		() => {
			setCalled(true);
		},
		{
			level,
			loading,
			id: ctx.auth?.id,
			hasAccess,
			called,
		},
	];
}
