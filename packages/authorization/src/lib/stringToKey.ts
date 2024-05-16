import {decompress} from 'lzbase62';
import type {PermissionWithData, WithKey} from '../types';

/**
 * Converts a string to a PermissionKey object
 * @param str
 */
export function stringToKey(str: string): WithKey<PermissionWithData> {
	const c = str.split(':');
	if (c.length === 4) {
		return {
			id: c[1],
			permission: c[2],
			data: JSON.parse(decompress(c[3])),
		};
	}
	if (c.length === 3) {
		return {
			id: c[1],
			permission: c[2],
		};
	}
	throw new Error('String not a valid permission key');
}
