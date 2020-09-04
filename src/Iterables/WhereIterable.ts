import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";

export class WhereIterable<T> implements IterableIterator<T> {
    private readonly source: Iterable<T>
    private readonly iterator: Iterator<T>;
    private readonly predicate: (value: T) => boolean;

    constructor(iterable: Iterable<T>, predicate: (value: T) => boolean) {
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.predicate = predicate;
    }

    [Symbol.iterator](): WhereIterable<T> {
        return new WhereIterable(this.source, this.predicate);
    }

    next(): IteratorResult<T, any> {
        while(true){
            const next = this.iterator.next();

            if(next.done){
                break;
            }

            const value = next.value;
            if(this.predicate(value)){
                return iteratorResult(value);
            }
        }

        return iteratorDone();
    }
}

// tslint:disable-next-line: max-classes-per-file
export class WhereArrayIterable<T> implements IterableIterator<T>{
    private readonly source: T[];
    private readonly predicate: (value: T) => boolean;
    private index: number;

    constructor(array: T[], predicate: (value: T) => boolean) {
        this.source = array;
        this.predicate = predicate;
        this.index = 0;
    }

    [Symbol.iterator](): WhereArrayIterable<T> {
        return new WhereArrayIterable(this.source, this.predicate);
    }

    next(): IteratorResult<T, any> {
        while(this.index < this.source.length){
            const value = this.source[this.index++];
            if(this.predicate(value)){
                return iteratorResult(value);
            }
        }

        return iteratorDone();
    }
}