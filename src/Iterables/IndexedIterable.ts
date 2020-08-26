import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";

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

    protected clone(): IterableIterator<IndexedValue<T>> {
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