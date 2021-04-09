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

	public static get(key: string, def?: string): string | undefined {
		return Environment.getInstance().get(key, def);
	}
	public get(key: string, def?: string): string | undefined {
		if (key in this.#dict) {
			return this.#dict[key];
		}
		if (key in this.#defaults) {
			const sysdef = this.#defaults[key];
			if (typeof sysdef === 'string') {
				return sysdef;
			}
			if (typeof sysdef === 'number') {
				return sysdef.toString(10);
			}
			return sysdef ? 'true' : 'false';
		}
		return def;
	}

	public static getString(key: string, def?: string): string {
		return Environment.getInstance().getString(key, def);
	}
	public getString(key: string, def?: string): string {
		if (key in this.#dict) {
			return this.#dict[key] || '';
		}
		if (key in this.#defaults) {
			const sysdef = this.#defaults[key];
			if (typeof sysdef === 'string') {
				return sysdef || '';
			}
		}
		return def || '';
	}

	public static getInt(key: string, def?: number): number {
		return Environment.getInstance().getInt(key, def);
	}
	public getInt(key: string, def?: number): number {
		if (key in this.#dict) {
			return parseInt(this.#dict[key] || '0', 10);
		}
		if (key in this.#defaults) {
			const sysdef = this.#defaults[key];
			if (typeof sysdef === 'number') {
				return sysdef;
			}
		}
		return def || 0;
	}

	public static getFloat(key: string, def?: number): number {
		return Environment.getInstance().getFloat(key, def);
	}
	public getFloat(key: string, def?: number): number {
		if (key in this.#dict) {
			return parseFloat(this.#dict[key] || '0');
		}
		if (key in this.#defaults) {
			const sysdef = this.#defaults[key];
			if (typeof sysdef === 'number') {
				return sysdef;
			}
		}
		return def || 0;
	}

	public static getBool(key: string, def?: boolean) {
		return Environment.getInstance().getBool(key, def);
	}
	public getBool(key: string, def?: boolean): boolean {
		if (key in this.#dict) {
			return this.#dict[key] === 'true';
		}
		if (key in this.#defaults) {
			const sysdef = this.#defaults[key];
			if (typeof sysdef === 'boolean') {
				return sysdef;
			}
		}
		return def || false;
	}
}
