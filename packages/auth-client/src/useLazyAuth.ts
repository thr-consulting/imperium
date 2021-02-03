import debug from 'debug';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from './AuthContext';
import {AuthLevel} from './AuthLevel';
import type {AbstractAuthSelector} from './AbstractAuthSelector';

const d = debug('imperium.auth-client.useLazyAuth');

type StartLazyAuthFn = () => void;
interface LazyAuthData {
	level: AuthLevel;
	loading: boolean;
	id: string | undefined;
	hasAccess: (lvl: AuthLevel) => boolean;
	called: boolean;
}
type LazyAuthTuple = [StartLazyAuthFn, LazyAuthData];

export function useLazyAuth(selector: AbstractAuthSelector): LazyAuthTuple {
	const ctx = useContext(AuthContext);
	const [called, setCalled] = useState(false);
	const [loading, setLoading] = useState(false);
	const [level, setLevel] = useState<AuthLevel>(AuthLevel.nullLevel());

	function hasAccess(lvl: AuthLevel): boolean {
		d(level.name(), 'is higher than', lvl.name(), level.isHigher(lvl), level.isEqual(lvl), level.isHigher(lvl) || level.isEqual(lvl));
		return level.isHigher(lvl) || level.isEqual(lvl);
	}

	useEffect(() => {
		if (called && loading) {
			(async function iife() {
				const cacheKey = `level:${ctx.auth?.id || 'unauthenticated'}:${selector.constructor.name}:${selector.getCacheId()}`;
				const cachedLevel = await ctx.getCache(cacheKey);
				if (cachedLevel) {
					if (!level.isEqual(cachedLevel)) {
						setLevel(cachedLevel);
					}
				} else {
					const selectedLevel = await selector.getLevel(ctx);
					await ctx.setCache(cacheKey, selectedLevel);
					if (!level.isEqual(selectedLevel)) {
						setLevel(selectedLevel);
					}
				}
				setLoading(false);
			})();
		}
	}, [selector, ctx, called, loading]);

	return [
		() => {
			setCalled(true);
			setLoading(true);
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
