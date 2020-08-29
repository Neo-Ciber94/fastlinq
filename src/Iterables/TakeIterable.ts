import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";
import { SizedIterable } from "./SizedIterable";

export class TakeIterable<T> extends IterableIterator<T>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private readonly count: number;
    private index: number;

    constructor(iterable: Iterable<T>, count: number){
        if(count < 0){
            throw new Error("Invalid argument: " +count);
        }

        super();
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.count = count;
        this.index = 0;
    }

    protected clone(): TakeIterable<T> {
        return new TakeIterable(this.source, this.count);
    }

    protected getNext(): IteratorResult<T, any> {
        if(this.index === this.count){
            return iteratorDone();
        }

        this.index += 1;
        return this.iterator.next();
    }
}

// tslint:disable-next-line: max-classes-per-file
export class TakeArrayIterable<T> extends IterableIterator<T> implements SizedIterable<T>{
    private readonly source: T[];
    private readonly takeCount: number;
    private index: number;

    constructor(array: T[], count: number){
        if(count < 0){
            throw new Error("Invalid argument: " +count);
        }

        super();
        this.source = array;
        this.takeCount = count;
        this.index = 0;
    }

    protected clone(): TakeArrayIterable<T> {
        return new TakeArrayIterable(this.source, this.takeCount);
    }

    protected getNext(): IteratorResult<T, any> {
        if(this.index < this.takeCount && this.index < this.source.length){
            return iteratorResult(this.source[this.index++]);
        }

        return iteratorDone();
    }

    count(): number {
        return Math.min(this.takeCount, this.source.length);
    }
}