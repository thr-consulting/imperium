export interface UserObj {
	name: string,
}

export interface ServerAuth {
	userId: string | null,
	user: () => Promise<UserObj | null>,
	permissions: string[],
}

export interface ClientAuth {
	userId: string| null,
	user: UserObj | null,
	permissions: string[],
}
