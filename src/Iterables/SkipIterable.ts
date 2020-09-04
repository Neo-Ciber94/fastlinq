import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";

export class SkipIterable<T> implements IterableIterator<T>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private readonly count: number;
    private current: number;

    constructor(iterable: Iterable<T>, count: number){
        if(count < 0){
            throw new Error("Invalid argument: " +count);
        }

        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.count = count;
        this.current = 0;
    }

    [Symbol.iterator](): SkipIterable<T> {
        return new SkipIterable(this.source, this.count);
    }

    next(): IteratorResult<T, any> {
        let next = this.iterator.next();

        while(this.current < this.count){
            next = this.iterator.next();
            this.current += 1;
        }

        return next;
    }
}