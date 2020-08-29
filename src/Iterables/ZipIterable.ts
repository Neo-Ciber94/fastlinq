import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";

export class ZipIterable<T, R, TResult> extends IterableIterator<TResult>{
    private readonly source: Iterable<T>;
    private readonly other: Iterable<R>
    private readonly leftIterator: Iterator<T>;
    private readonly rightIterator: Iterator<R>;
    private readonly combine: (x: T, y: R) => TResult;

    constructor(iterable: Iterable<T>, other: Iterable<R>, combine: (x: T, y: R) => TResult){
        super();
        this.source = iterable;
        this.other = other;
        this.leftIterator = iterable[Symbol.iterator]();
        this.rightIterator = other[Symbol.iterator]();
        this.combine = combine;
    }

    protected clone(): ZipIterable<T, R, TResult> {
        return new ZipIterable(this.source, this.other, this.combine);
    }

    protected getNext(): IteratorResult<TResult, any> {
        const left = this.leftIterator.next();
        const right = this.rightIterator.next();

        if(left.done || right.done){
            return iteratorDone();
        }

        const value = this.combine(left.value, right.value);
        return iteratorResult(value);
    }
}