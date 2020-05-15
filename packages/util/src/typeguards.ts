/**
 * Typeguard to check if a variable is a string or not.
 */
export function isString(x: any): x is string {
	return typeof x === 'string';
}
