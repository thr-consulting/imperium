import debug from 'debug';
import decode from 'jwt-decode';

const d = debug('imperium.auth-client.lib.isTokenValidOrUndefined');

// The number of seconds before a token expires that we will return expired
const tokenGracePeriod = 5; // seconds

export function isTokenValid(token: string) {
	try {
		const decodedToken = decode(token) as {exp: number};
		if (!decodedToken || !decodedToken.exp) return false;
		return decodedToken.exp - Date.now() / 1000 > tokenGracePeriod;
	} catch (err: any) {
		d(`Error decoding token: ${err.toString()}`);
		return false;
	}
}

/**
 * @param token
 */
export function isTokenValidOrUndefined(token: string | null): boolean {
	if (!token) return true;
	return isTokenValid(token);
}
