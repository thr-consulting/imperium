import intersection from 'lodash/intersection';
import isArray from 'lodash/isArray';
import permissions from '../../server/permissions';

function permissionsMatch(havePermissions, needPermissions) {
	const {SYSADMIN} = permissions;
	const have = isArray(havePermissions) ? havePermissions : [havePermissions];
	const need = isArray(needPermissions) ? [...needPermissions, SYSADMIN] : [needPermissions, SYSADMIN];
	return intersection(have, need).length > 0;
}

/**
 * Compares an auth object against a permission or list of permissions.
 * @param userPermissions - Must be an auth object
 * @param needPermissions - Array or string of permissions
 * @param userId - The id of the user
 * @returns {boolean}
 */
export default function checkPermissions(userPermissions, needPermissions, userId) {
	if (!userId) return {isAuthenticated: false, isAuthorized: false};
	if (!userPermissions) return {isAuthenticated: true, isAuthorized: false};
	return {
		isAuthenticated: true,
		isAuthorized: permissionsMatch(userPermissions, needPermissions),
	};
}
