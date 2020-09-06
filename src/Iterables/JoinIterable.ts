import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";

export class JoinIterable<T, TKey> implements IterableIterator<[T, TKey]>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private readonly other: Iterable<TKey>
    private readonly selector: (x: T, y: TKey) => boolean;

    private current?: IteratorResult<T>;
    private otherIterator?: Iterator<TKey>;

    constructor(iterable: Iterable<T>, other: Iterable<TKey>, selector: (x: T, y: TKey) => boolean){
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.other = other;
        this.selector = selector;
    }

    [Symbol.iterator](): JoinIterable<T, TKey> {
        return new JoinIterable(this.source, this.other, this.selector);
    }

    next(): IteratorResult<[T, TKey], any> {
        if(this.current?.done){
            return iteratorDone();
        }

        if(!this.otherIterator){
            this.current = this.iterator.next();
            if(this.current.done){
                return iteratorDone();
            }
            else{
                this.otherIterator = this.other[Symbol.iterator]();
            }
        }

        while(true){
            const otherNext = this.otherIterator.next();
            if(otherNext.done){
                this.otherIterator = undefined;
                return this.next();
            }

            if(this.selector(this.current!.value, otherNext.value)){
                return iteratorResult([this.current!.value, otherNext.value]);
            }
        }
    }
}