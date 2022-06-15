export function authorizationHeader(token?: string | null): Record<string, string> {
	return token
		? {
				authorization: `Bearer ${token}`,
		  }
		: {};
}
