import debug from 'debug';
import get from 'lodash/get';
import DataLoader from 'dataloader';

const d = debug('app.todo.OrderedDataLoader');

export default class OrderedDataLoader<K, V> {
	private dataloader: DataLoader<K, V | undefined>;
	private readonly findByIds: (keys: K[]) => Promise<V[]>;

	constructor(findByIds: (keys: K[]) => Promise<V[]>, options?: DataLoader.Options<K, V>) {
		this.findByIds = findByIds;
		this.dataloader = new DataLoader<K, V | undefined>(this.orderedResults.bind(this), options);
	}

	private async orderedResults(keys: K[]): Promise<(V | undefined)[]> {
		const unorderedResults = await this.findByIds(keys);
		return this.ensureOrder(unorderedResults, keys);
	}

	private ensureOrder(docs: V[], keys: K[], idField = 'id'): (V | undefined)[] {
		const docsMap = new Map<K, V>();
		docs.forEach(doc => docsMap.set(get(doc, idField), doc));
		return keys.map(key => docsMap.get(key));
	}

	async load(key: K) {
		return this.dataloader.load(key);
	}

	async loadMany(keys: K[]) {
		return this.dataloader.loadMany(keys);
	}

	async clear(key: K) {
		return this.dataloader.clear(key);
	}

	async clearAll() {
		return this.dataloader.clearAll();
	}

	async prime(key: K, value: V) {
		return this.dataloader.prime(key, value);
	}
}
