/**
 * Typeguard to check if a variable is a string or not.
 */
export function isString(x: any): x is string {
	return typeof x === 'string';
}

/**
 * Takes a variable an ensures that it's a string.
 * @deprecated
 */
export function toString(x: any): string {
	if (isString(x)) return x;
	throw new Error('Value is not a string');
}
