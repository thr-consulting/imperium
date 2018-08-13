// import {SYSADMIN} from '@thx/router';
import intersection from 'lodash/intersection';
import isArray from 'lodash/isArray';

const SYSADMIN = 'sysadmin';

// TODO need this until I fix @thx/router:checkPermissions
/**
 * Checks permissions or array of permissions against a permission or array of permissions. If the user has the SYSADMIN
 * permission, always allow.
 * @param havePermissions
 * @param needPermissions
 * @return {boolean}
 */
export default function permissionsMatch(havePermissions, needPermissions) {
	const have = isArray(havePermissions) ? havePermissions : [havePermissions];
	const need = isArray(needPermissions) ? [...needPermissions, SYSADMIN] : [needPermissions, SYSADMIN];
	return intersection(have, need).length > 0;
}
