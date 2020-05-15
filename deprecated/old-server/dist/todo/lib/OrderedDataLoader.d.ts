import DataLoader from 'dataloader';
export default class OrderedDataLoader<K, V> {
    private dataloader;
    private readonly findByIds;
    constructor(findByIds: (keys: K[]) => Promise<V[]>, options?: DataLoader.Options<K, V>);
    private orderedResults;
    private ensureOrder;
    load(key: K): Promise<V | undefined>;
    loadMany(keys: K[]): Promise<(V | undefined)[]>;
    clear(key: K): Promise<DataLoader<K, V | undefined>>;
    clearAll(): Promise<DataLoader<K, V | undefined>>;
    prime(key: K, value: V): Promise<DataLoader<K, V | undefined>>;
}
