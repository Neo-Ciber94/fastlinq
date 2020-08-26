import { IterableIterator, iteratorDone } from "./IterableIterator";

export class TakeWhileIterable<T> extends IterableIterator<T, TakeWhileIterable<T>>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private readonly predicate: (value: T) => boolean;
    private hasNext: boolean = true;

    constructor(iterable: Iterable<T>, predicate: (value: T) => boolean){
        super();
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.predicate = predicate;
    }

    protected clone(): TakeWhileIterable<T> {
        return new TakeWhileIterable(this.source, this.predicate);
    }

    protected getNext(): IteratorResult<T, any> {
        if(this.hasNext){
            const next = this.iterator.next();

            if(next.done){
                this.hasNext = false;
                return iteratorDone();
            }

            if(this.predicate(next.value)){
                return next;
            }
            else{
                this.hasNext = false;
            }
        }

        return iteratorDone();
    }
}