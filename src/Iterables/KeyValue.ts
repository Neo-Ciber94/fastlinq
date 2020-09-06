
/**
 * Represents `key` and `value` pair.
 */
export interface KeyValue<TKey, TValue>{
    /**
     * The key.
     */
    readonly key: TKey;
    /**
     * The value.
     */
    readonly value: TValue;
}