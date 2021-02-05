import type {AbstractAuthSelector} from './AbstractAuthSelector';

export function generateCacheKey(selector: AbstractAuthSelector, authId?: string) {
	return `auth:level:${authId || 'unauthenticated'}:${selector.getName()}:${selector.getCacheId()}`;
}
