import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";

export class WhereIterable<T> extends IterableIterator<T> {
    private readonly source: Iterable<T>
    private readonly iterator: Iterator<T>;
    private readonly predicate: (value: T) => boolean;

    constructor(iterable: Iterable<T>, predicate: (value: T) => boolean) {
        super();

        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.predicate = predicate;
    }

    protected clone(): IterableIterator<T> {
        return new WhereIterable(this.source, this.predicate);
    }

    protected getNext(): IteratorResult<T, any> {
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