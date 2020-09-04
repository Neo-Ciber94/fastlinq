import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";

export class SkipLastIterable<T> implements IterableIterator<T>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private readonly count: number;
    private items: T[];

    constructor(iterable: Iterable<T>, count: number){
        if(count < 0){
            throw new Error("count cannot be negative");
        }

        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.count = count;
        this.items = [];
    }

    [Symbol.iterator](): IterableIterator<T> {
        return new SkipLastIterable(this.source, this.count);
    }

    next(): IteratorResult<T, any> {
        let next = this.iterator.next();

        while(!next.done){
            if(this.items.length === this.count){
                const ret = this.items.shift()!;
                this.items.push(next.value);
                return iteratorResult(ret);
            }
            else{
                this.items.push(next.value);
            }

            next = this.iterator.next();
        }

        return iteratorDone();
    }
}