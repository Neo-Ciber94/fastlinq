import { IterableIterator, iteratorDone, iteratorResult } from './IterableIterator';
import { SizedIterable } from './SizedIterable';

export class MapIterable<T, R> implements IterableIterator<R>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private readonly transform: (value: T) => R;

    constructor(iterable: Iterable<T>, transform: (value: T) => R) {
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.transform = transform;
    }

    [Symbol.iterator](): MapIterable<T, R> {
        return new MapIterable(this.source, this.transform);
    }

    next(): IteratorResult<R, any> {
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

// tslint:disable-next-line: max-classes-per-file
export class MapArrayIterable<T, R> implements IterableIterator<R>, SizedIterable<R>{
    private readonly source: T[];
    private readonly transform: (value: T) => R;
    private index: number;

    constructor(array: T[], transform: (value: T) => R){
        this.source = array;
        this.transform = transform;
        this.index = 0;
    }

    [Symbol.iterator](): MapArrayIterable<T, R> {
        return new MapArrayIterable(this.source, this.transform);
    }

    next(): IteratorResult<R, any> {
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