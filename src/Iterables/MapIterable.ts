import { IterableIterator, iteratorDone, iteratorResult } from './IterableIterator';
import { SizedIterable } from './SizedIterable';

export class MapIterable<T, TResult> implements IterableIterator<TResult>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private readonly transform: (value: T) => TResult;

    constructor(iterable: Iterable<T>, transform: (value: T) => TResult) {
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.transform = transform;
    }

    [Symbol.iterator](): MapIterable<T, TResult> {
        return new MapIterable(this.source, this.transform);
    }

    next(): IteratorResult<TResult, any> {
        const next = this.iterator.next();
        if(next.done){
            return {
                value: undefined,
                done: true
            };
        }

        return {
            value : this.transform(next.value)
        };
    }
}

export class MapArrayIterable<T, TResult> implements IterableIterator<TResult>, SizedIterable<TResult>{
    private readonly source: T[];
    private readonly transform: (value: T) => TResult;
    private index: number;

    constructor(array: T[], transform: (value: T) => TResult){
        this.source = array;
        this.transform = transform;
        this.index = 0;
    }

    [Symbol.iterator](): MapArrayIterable<T, TResult> {
        return new MapArrayIterable(this.source, this.transform);
    }

    next(): IteratorResult<TResult, any> {
        if(this.index < this.source.length){
            const value = this.source[this.index++];
            return iteratorResult(this.transform(value));
        }

        return iteratorDone();
    }

    count(): number {
        return this.source.length;
    }
}