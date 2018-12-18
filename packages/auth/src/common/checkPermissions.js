import intersection from 'lodash/intersection';
import isArray from 'lodash/isArray';
import permissions from './permissions';

function permissionsMatch(havePermissions, needPermissions) {
	const {SYSADMIN} = permissions;
	const have = isArray(havePermissions) ? havePermissions : [havePermissions];
	const need = isArray(needPermissions) ? [...needPermissions, SYSADMIN] : [needPermissions, SYSADMIN];
	return intersection(have, need).length > 0;
}

/**
 * Compares an auth object against a permission or list of permissions.
 * @param auth - Must be an immutable auth object
 * @param needPermissions - Array or string of permissions
 * @returns {boolean}
 */
export default function checkPermissions(auth, needPermissions) {

	if (!auth.get('userId')) return false;
	return permissionsMatch(auth.get('permissions'), needPermissions);
}
