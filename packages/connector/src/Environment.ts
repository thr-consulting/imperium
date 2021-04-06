interface EnvironmentDict {
	[key: string]: string | undefined;
}

export class Environment {
	private static instance: Environment;

	readonly #dict: EnvironmentDict;

	private constructor() {
		this.#dict = {};
	}

	public static getInstance(): Environment {
		if (!Environment.instance) {
			Environment.instance = new Environment();
		}
		return Environment.instance;
	}

	public static addEnvironment(env: EnvironmentDict) {
		Environment.getInstance().addEnvironment(env);
	}
	public addEnvironment(env: EnvironmentDict) {
		Object.keys(env).forEach(key => {
			this.#dict[key] = env[key];
		});
	}

	public static get(key: string): string | undefined;
	public static get(key: string, def: string): string;
	public static get(key: string, def?: string) {
		if (def === undefined) return Environment.getInstance().get(key);
		return Environment.getInstance().get(key, def);
	}
	public get(key: string): string | undefined;
	public get(key: string, def: string): string;
	public get(key: string, def?: string) {
		if (key in this.#dict) {
			return this.#dict[key];
		}
		return def;
	}

	public static getInt(key: string): number | undefined;
	public static getInt(key: string, def: number): number;
	public static getInt(key: string, def?: number) {
		if (def === undefined) return Environment.getInstance().getInt(key);
		return Environment.getInstance().getInt(key, def);
	}
	public getInt(key: string): number | undefined;
	public getInt(key: string, def: number): number;
	public getInt(key: string, def?: number | undefined) {
		if (key in this.#dict) {
			const val = this.#dict[key];
			if (val !== undefined) {
				return parseInt(val, 10);
			}
		}
		return def;
	}

	public static getFloat(key: string): number | undefined;
	public static getFloat(key: string, def: number): number;
	public static getFloat(key: string, def?: number) {
		if (def === undefined) return Environment.getInstance().getFloat(key);
		return Environment.getInstance().getFloat(key, def);
	}
	public getFloat(key: string): number | undefined;
	public getFloat(key: string, def: number): number;
	public getFloat(key: string, def?: number | undefined) {
		if (key in this.#dict) {
			const val = this.#dict[key];
			if (val !== undefined) {
				return parseFloat(val);
			}
		}
		return def;
	}
}
