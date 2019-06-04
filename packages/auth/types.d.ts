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

export interface LoginRet {
	jwt: string,
	rtoken: string,
	auth: ClientAuth,
}

export interface UserServices {
	password: {
		bcrypt: string,
	},
	token: {
		blacklist: [{
			token: string,
			exp: Date,
		}],
		recovery: [{
			token: string,
			exp: Date,
		}],
	},
}
