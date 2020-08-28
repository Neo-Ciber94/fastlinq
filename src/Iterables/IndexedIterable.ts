import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";
import { SizedIterable } from "./SizedIterable";

export interface IndexedValue<T>{
    readonly value: T;
    readonly index: number;
}

export class IndexedIterable<T> extends IterableIterator<IndexedValue<T>>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private index: number = 0;

    constructor(iterable: Iterable<T>){
        super();
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
    }

    protected clone(): IndexedIterable<T> {
        return new IndexedIterable(this.source);
    }

    protected getNext(): IteratorResult<IndexedValue<T>, any> {
        const next = this.iterator.next();

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
export class IndexedArrayIterable<T> extends IterableIterator<IndexedValue<T>> implements SizedIterable<IndexedValue<T>>{
    private readonly source: T[];
    private index: number = 0;

    constructor(array: T[]){
        super();
        this.source = array;
    }

    protected clone(): IndexedArrayIterable<T> {
        return new IndexedArrayIterable(this.source);
    }

    protected getNext(): IteratorResult<IndexedValue<T>, any> {
        if(this.index < this.source.length){
            return iteratorResult({
                value: this.source[this.index],
                index: this.index++
            });
        }

        return iteratorDone();
    }

    toArray(): IndexedValue<T>[] {
        return Array.from(this);
    }

    count(): number {
        return this.source.length;
    }
}