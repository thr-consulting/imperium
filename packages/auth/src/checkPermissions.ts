import intersection from 'lodash/intersection';
import isArray from 'lodash/isArray';
import permissions from './permissions';

export function permissionsMatch(havePermissions: string | string[], needPermissions: string | string[]): boolean {
	const {SYSADMIN} = permissions;
	const have = isArray(havePermissions) ? havePermissions : [havePermissions];
	const need = isArray(needPermissions) ? [...needPermissions, SYSADMIN] : [needPermissions, SYSADMIN];
	return intersection(have, need).length > 0;
}

interface CheckPermissions {
	isAuthenticated: boolean;
	isAuthorized: boolean;
}

/**
 * Compares an auth object against a permission or list of permissions.
 * @param userPermissions - Must be an auth object
 * @param needPermissions - Array or string of permissions
 * @param userId - The id of the user
 * @returns {boolean}
 */
export default function checkPermissions(
	userPermissions: string | string[],
	needPermissions: string | string[],
	userId: any,
): CheckPermissions {
	if (!userId) return {isAuthenticated: false, isAuthorized: false};
	if (!userPermissions) return {isAuthenticated: true, isAuthorized: false};
	return {
		isAuthenticated: true,
		isAuthorized: permissionsMatch(userPermissions, needPermissions),
	};
}
