import { IterableIterator, iteratorDone } from "./IterableIterator";

export class RepeatIterable<T> extends IterableIterator<T>{
    private readonly source: Iterable<T>;
    private iterator: Iterator<T>;
    private repeatCount: number;
    private count: number;

    constructor(iterable: Iterable<T>, count: number){
        if(count < 0){
            throw new Error("count must be positive");
        }

        super();
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.repeatCount = count;
        this.count = 0;
    }

    protected clone(): IterableIterator<T> {
        return new RepeatIterable(this.source, this.repeatCount);
    }

    protected getNext(): IteratorResult<T, any> {
        if(this.count < this.repeatCount){
            const next = this.iterator.next();
            if(next.done){
                this.count += 1;
                this.iterator = this.source[Symbol.iterator]();
                return this.getNext();
            }

            return next;
        }

        return iteratorDone();
    }
}