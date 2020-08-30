import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";

export class SkipLastIterable<T> extends IterableIterator<T>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private readonly count: number;
    private items: T[];

    constructor(iterable: Iterable<T>, count: number){
        if(count < 0){
            throw new Error("count cannot be negative");
        }

        super();
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.count = count;
        this.items = [];
    }

    protected clone(): IterableIterator<T> {
        return new SkipLastIterable(this.source, this.count);
    }

    protected getNext(): IteratorResult<T, any> {
        let next = this.iterator.next();
        if(!next){
            return next;
        }

        while(this.items.length < this.count){
            this.items.push(next.value);
            next = this.iterator.next();

            if(!next){
                return iteratorDone();
            }
        }

        const ret = this.items.shift()!;
        return iteratorResult(ret);
    }
}