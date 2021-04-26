import {Environment} from '@thx/env';

export function getCorsOrigin(): boolean | string | RegExp | string[] {
	const corsString = Environment.get('CORS_ORIGIN');
	if (corsString && typeof corsString === 'string') {
		if (corsString.toLowerCase() === 'true') return true; // Reflect request origin
		if (corsString.toLowerCase() === 'false') return false; // Disable CORS
		if (corsString.startsWith('/') && corsString.endsWith('/')) {
			// Regex
			return new RegExp(corsString);
		}
		if (corsString.includes(',')) {
			// Array
			return corsString.split(',').map(s => s.trim());
		}
		return corsString; // Simple string
	}
	return false; // Default disables CORS
}
