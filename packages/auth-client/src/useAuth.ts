import debug from 'debug';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from './AuthContext';
import {AuthLevel} from './AuthLevel';
import type {AbstractAuthSelector} from './AbstractAuthSelector';

const d = debug('imperium.auth-client.useAuth');

export function useAuth(selector: AbstractAuthSelector) {
	const ctx = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [level, setLevel] = useState<AuthLevel>(AuthLevel.nullLevel());

	function hasAccess(lvl: AuthLevel): boolean {
		// d(level, 'is higher than', lvl, level.isHigher(lvl), level.isEqual(lvl));
		return level.isHigher(lvl) || level.isEqual(lvl);
	}

	useEffect(() => {
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
	}, [selector, ctx]);

	return {
		level,
		loading,
		id: ctx.auth?.id,
		hasAccess,
	};
}
