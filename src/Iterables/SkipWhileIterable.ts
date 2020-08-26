import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";

export class SkipWhileIterable<T> extends IterableIterator<T, SkipWhileIterable<T>>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private readonly predicate: (value: T) => boolean;
    private skip: boolean = true;

    constructor(iterable: Iterable<T>, predicate: (value: T) => boolean){
        super();
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.predicate = predicate;
    }

    protected clone(): SkipWhileIterable<T> {
        return new SkipWhileIterable(this.source, this.predicate);
    }

    protected getNext(): IteratorResult<T, any> {
        let next = this.iterator.next();

        while(this.skip){
           if(!this.predicate(next.value)){
               this.skip = false;
           }
           else{
               next = this.iterator.next();
           }
        }

        return next;
    }
}