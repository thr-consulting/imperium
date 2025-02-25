import type {Permission} from '~core/graphql';

export function needsPermission(permissions: Permission | Permission[]) {
	if (Array.isArray(permissions)) {
		return permissions.reduce((memo, v) => {
			return {
				...memo,
				[`permissions.${v}`]: true,
			};
		}, {});
	}
	return {[`permissions.${permissions}`]: true};
}

export function isLoggedIn() {
	return {id: {$not: undefined}};
}

export function needsRoute(path: string) {
	return {'route.path': path};
}
