import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";
import { KeyValue } from "./KeyValue";
import { SizedIterable } from "./SizedIterable";

export class KeyedIterable<TKey, T> implements IterableIterator<KeyValue<TKey, T>>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private readonly keySelector: (value: T) => TKey;

    constructor(iterable: Iterable<T>, keySelector: (value: T) => TKey){
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.keySelector = keySelector;
    }

    [Symbol.iterator](): KeyedIterable<TKey, T> {
        return new KeyedIterable<TKey, T>(this.source, this.keySelector);
    }

    next(): IteratorResult<KeyValue<TKey, T>>{
        const next = this.iterator.next();

        if(next.done){
            return iteratorDone();
        }

        const value = next.value;
        return iteratorResult({
            value,
            key: this.keySelector(value)
        })
    }
}