export function authorizationHeader(token?: string): Record<string, string> {
	return token
		? {
				authorization: `Bearer ${token}`,
		  }
		: {};
}
