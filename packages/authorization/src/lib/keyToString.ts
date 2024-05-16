import {compress} from 'lzbase62';
import type {PermissionWithData, WithKey} from '../types';

/**
 * Converts a PermissionKey object to a string
 * @param id
 * @param permission
 * @param data
 */
export function keyToString({id, permission, data}: WithKey<PermissionWithData>): string {
	if (permission.length <= 0) throw new Error("Can't make key for empty permission");
	const encodedData = compress(JSON.stringify(data));
	const dataStr = data ? `:${encodedData}` : '';
	return `authorization:${id || 'notauth'}:${permission}${dataStr}`;
}
