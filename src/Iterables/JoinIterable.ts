import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";

export class JoinIterable<T, R> extends IterableIterator<[T, R], JoinIterable<T, R>>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private readonly other: Iterable<R>
    private readonly selector: (x: T, y: R) => boolean;

    private current?: IteratorResult<T>;
    private otherIterator?: Iterator<R>;

    constructor(iterable: Iterable<T>, other: Iterable<R>, selector: (x: T, y: R) => boolean){
        super();
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.other = other;
        this.selector = selector;
    }

    protected clone(): JoinIterable<T, R> {
        return new JoinIterable(this.source, this.other, this.selector);
    }

    protected getNext(): IteratorResult<[T, R], any> {
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
                return this.getNext();
            }

            if(this.selector(this.current!.value, otherNext.value)){
                return iteratorResult([this.current!.value, otherNext.value]);
            }
        }
    }
}