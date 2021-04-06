interface Dict<T> {
	[key: string]: T;
}

export class Environment {
	private static instance: Environment;
	readonly #dict: Dict<string | undefined>;
	readonly #defaults: Dict<string | number | boolean>;

	private constructor() {
		this.#dict = {};
		this.#defaults = {};
	}

	public static getInstance(): Environment {
		if (!Environment.instance) {
			Environment.instance = new Environment();
		}
		return Environment.instance;
	}

	public static addEnvironment(env: Dict<string | undefined>) {
		Environment.getInstance().addEnvironment(env);
	}
	public addEnvironment(env: Dict<string | undefined>) {
		Object.keys(env).forEach(key => {
			this.#dict[key] = env[key];
		});
	}

	public static addDefaults(defaults: Dict<string | number | boolean>) {
		Environment.getInstance().addDefaults(defaults);
	}
	public addDefaults(defaults: Dict<string | number | boolean>) {
		Object.keys(defaults).forEach(key => {
			this.#defaults[key] = defaults[key];
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
		if (def !== undefined) return def;
		if (key in this.#defaults && typeof this.#defaults[key] === 'string') return this.#defaults[key];
		return undefined;
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
		if (def !== undefined) return def;
		if (key in this.#defaults && typeof this.#defaults[key] === 'number') return this.#defaults[key];
		return undefined;
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
		if (def !== undefined) return def;
		if (key in this.#defaults && typeof this.#defaults[key] === 'number') return this.#defaults[key];
		return undefined;
	}

	public static getBool(key: string): boolean | undefined;
	public static getBool(key: string, def: boolean): boolean;
	public static getBool(key: string, def?: boolean) {
		if (def === undefined) return Environment.getInstance().getBool(key);
		return Environment.getInstance().getBool(key, def);
	}
	public getBool(key: string): boolean | undefined;
	public getBool(key: string, def: boolean): boolean;
	public getBool(key: string, def?: boolean | undefined) {
		if (key in this.#dict) {
			const val = this.#dict[key];
			if (val !== undefined) {
				return this.#dict[key] === 'true';
			}
		}
		if (def !== undefined) return def;
		if (key in this.#defaults && typeof this.#defaults[key] === 'boolean') return this.#defaults[key];
		return undefined;
	}
}
