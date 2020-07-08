export interface AuthenticatedUser {
	auth?: {
		id?: string;
	};
	hostname?: string;
	ip?: string;
	headers?: {
		[key: string]: string;
	};
}
