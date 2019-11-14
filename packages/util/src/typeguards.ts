// Typeguard
export function isString(x: any): x is string {
	return typeof x === 'string';
}

// Convert to typeguarded string or throw
export function toString(x: any): string {
	if (isString(x)) return x;
	throw new Error('Value is not a string');
}
