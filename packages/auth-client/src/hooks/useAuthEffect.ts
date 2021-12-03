import debug from 'debug';
import {AbstractAuthSelector, AuthLevel, generateCacheKey} from '@imperium/authorization';
import {useEffect, useState} from 'react';
import type {IAuthContext} from '../AuthContext';

const d = debug('imperium.auth-client.hooks.useAuthEffect');

export function useAuthEffect(ctx: IAuthContext, selector: AbstractAuthSelector, execute: boolean) {
	const [loading, setLoading] = useState(execute);
	const [level, setLevel] = useState<AuthLevel>(AuthLevel.nullLevel());

	useEffect(() => {
		if (execute) {
			(async function iife() {
				// const cacheKey = generateCacheKey(selector, ctx.auth?.id);
				// d(`Checking cache: ${cacheKey}`);
				// const cachedLevel = await ctx.getCache(cacheKey);
				// if (cachedLevel) {
				// 	if (!level.isEqual(cachedLevel)) {
				// 		setLevel(cachedLevel);
				// 	}
				// } else {
				const selectedLevel = await selector.getLevel(ctx, ctx.auth?.id);
				// await ctx.setCache(cacheKey, selectedLevel);
				if (!level.isEqual(selectedLevel)) {
					setLevel(selectedLevel);
				}
				// }
				setLoading(false);
			})();
		}
	}, [selector, ctx, execute, level]);

	return {
		loading,
		level,
	};
}
