
/**
 * Represents `key` and `value` pair.
 */
export interface KeyValue<K, V>{
    /**
     * The key.
     */
    readonly key: K;
    /**
     * The value.
     */
    readonly value: V;
}