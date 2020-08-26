import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";

export class FlatMapIterable<T, R> extends IterableIterator<R, FlatMapIterable<T, R>> {
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private readonly transform: (value: T) => R[];

    private array?: R[];
    private index: number = 0;

    constructor(iterable: Iterable<T>, transform: (value: T) => R[]) {
        super();
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.transform = transform;
    }

    protected clone(): FlatMapIterable<T, R> {
        return new FlatMapIterable(this.source, this.transform);
    }

    protected getNext(): IteratorResult<R, any> {
        if(this.array && this.index < this.array.length){
            const value = this.array[this.index++];
            return iteratorResult(value);
        }
        else{
            const next = this.iterator.next();
            if(next.done){
                return iteratorDone();
            }

            this.array = this.transform(next.value);
            this.index = 0;
            return this.getNext();
        }
    }
}