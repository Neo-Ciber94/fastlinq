import { IterableIterator } from "./IterableIterator";

export class SkipIterable<T> extends IterableIterator<T, SkipIterable<T>>{
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

    protected clone(): SkipIterable<T> {
        return new SkipIterable(this.source, this.count);
    }

    protected getNext(): IteratorResult<T, any> {
        let next = this.iterator.next();

        while(this.index < this.count){
            next = this.iterator.next();
            this.index += 1;
        }

        return next;
    }
}