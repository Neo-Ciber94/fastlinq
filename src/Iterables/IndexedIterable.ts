import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";
import { SizedIterable } from "./SizedIterable";

export interface IndexedValue<T>{
    readonly value: T;
    readonly index: number;
}

export class IndexedIterable<T> implements IterableIterator<IndexedValue<T>>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private index: number = 0;

    constructor(iterable: Iterable<T>){
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
    }

    [Symbol.iterator](): IndexedIterable<T> {
        return new IndexedIterable(this.source);
    }

    next(): IteratorResult<IndexedValue<T>, any> {
        const next = this.iterator.next();

        if(this.index > Number.MAX_SAFE_INTEGER){
            throw new Error("index value is greater than max safe integer value");
        }

        if(next.done){
            return iteratorDone();
        }

        return iteratorResult({
            value: next.value,
            index: this.index++
        });
    }
}

// tslint:disable-next-line: max-classes-per-file
export class IndexedArrayIterable<T> implements IterableIterator<IndexedValue<T>>, SizedIterable<IndexedValue<T>>{
    private readonly source: T[];
    private index: number = 0;

    constructor(array: T[]){
        this.source = array;
    }

    [Symbol.iterator](): IndexedArrayIterable<T> {
        return new IndexedArrayIterable(this.source);
    }

    next(): IteratorResult<IndexedValue<T>, any> {
        if(this.index > Number.MAX_SAFE_INTEGER){
            throw new Error("index value is greater than max safe integer value");
        }

        if(this.index < this.source.length){
            return iteratorResult({
                value: this.source[this.index],
                index: this.index++
            });
        }

        return iteratorDone();
    }

    count(): number {
        return this.source.length;
    }
}