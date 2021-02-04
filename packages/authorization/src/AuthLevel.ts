export class AuthLevel {
	readonly #name: string;
	readonly #group: string;
	readonly #level: number;

	constructor(name: string, group: string, level: number) {
		this.#name = name;
		this.#group = group;
		this.#level = level;
	}

	public isHigher(other: AuthLevel) {
		if (this.#group === 'null' || other.#group === 'null') return false;
		if (this.#group !== other.#group) throw new Error('Comparing invalid authorization groups');
		return this.#level > other.#level;
	}

	public isLower(other: AuthLevel) {
		if (this.#group === 'null' || other.#group === 'null') return false;
		if (this.#group !== other.#group) throw new Error('Comparing invalid authorization groups');
		return this.#level < other.#level;
	}

	public isEqual(other: AuthLevel) {
		if (this.#group === 'null' && other.#group === 'null') return true;
		if (this.#group === 'null' || other.#group === 'null') return false;
		if (this.#group !== other.#group) throw new Error('Comparing invalid authorization groups');
		return this.#level === other.#level;
	}

	public toString() {
		return `${this.#name}.${this.#group}.${this.#level}`;
	}

	public name() {
		return this.#name;
	}

	public group() {
		return this.#group;
	}

	public isNull() {
		return this.#group === 'null';
	}

	public static fromString(str: string) {
		const arr = str.split('.');
		if (arr.length !== 3) throw new Error(`Cannot create authorization level from string: ${str}`);
		return new AuthLevel(arr[0], arr[1], parseInt(arr[2], 10));
	}

	public static nullLevel() {
		return new AuthLevel('noAccess', 'null', -99999);
	}
}
