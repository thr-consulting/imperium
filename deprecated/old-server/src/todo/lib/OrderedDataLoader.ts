import debug from 'debug';
import get from 'lodash/get';
import DataLoader from 'dataloader';

const d = debug('app.todo.OrderedDataLoader');

interface OrderedDataLoaderOptions<K, V> {
	idField?: string;
}

export default class OrderedDataLoader<K, V> {
	private dataloader: DataLoader<K, V | undefined>;
	private readonly findByIds: (keys: K[]) => Promise<V[]>;
	private options: OrderedDataLoaderOptions<K, V>;

	constructor(
		findByIds: (keys: K[]) => Promise<V[]>,
		ODLOptions: OrderedDataLoaderOptions<K, V> = {},
		DLOptions?: DataLoader.Options<K, V>,
	) {
		this.findByIds = findByIds;
		this.dataloader = new DataLoader<K, V | undefined>(this.orderedResults.bind(this), DLOptions);
		this.options = ODLOptions;
	}

	private async orderedResults(keys: K[]): Promise<(V | undefined)[]> {
		const unorderedResults = await this.findByIds(keys);
		const docsMap = new Map<K, V>();
		unorderedResults.forEach(doc => docsMap.set(get(doc, this.options.idField || 'id'), doc));
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
