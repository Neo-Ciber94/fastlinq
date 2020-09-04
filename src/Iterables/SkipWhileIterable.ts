import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";

export class SkipWhileIterable<T> implements IterableIterator<T>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private readonly predicate: (value: T) => boolean;
    private skip: boolean = true;

    constructor(iterable: Iterable<T>, predicate: (value: T) => boolean){
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.predicate = predicate;
    }

    [Symbol.iterator](): SkipWhileIterable<T> {
        return new SkipWhileIterable(this.source, this.predicate);
    }

    next(): IteratorResult<T, any> {
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