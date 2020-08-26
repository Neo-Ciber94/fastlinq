import { IterableIterator, iteratorDone, iteratorResult } from './IterableIterator';

export class MapIterable<T, R> extends IterableIterator<R>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private readonly transform: (value: T) => R;

    constructor(iterable: Iterable<T>, transform: (value: T) => R) {
        super();
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.transform = transform;
    }

    protected clone(): IterableIterator<R> {
        return new MapIterable(this.source, this.transform);
    }

    protected getNext(): IteratorResult<R, any> {
        const next = this.iterator.next();
        if(next.done){
            return {
                value: undefined,
                done: true
            };
        }

        return {
            value : this.transform(next.value)
        };
    }
}

// tslint:disable-next-line: max-classes-per-file
export class MapArrayIterable<T, R> extends IterableIterator<R>{
    private readonly source: T[];
    private index: number;
    private readonly transform: (value: T) => R;

    constructor(array: T[], transform: (value: T) => R){
        super();
        this.source = array;
        this.transform = transform;
        this.index = 0;
    }

    protected clone(): IterableIterator<R> {
        return new MapArrayIterable(this.source, this.transform);
    }

    protected getNext(): IteratorResult<R, any> {
        if(this.index < this.source.length){
            const value = this.source[this.index++];
            return iteratorResult(this.transform(value));
        }

        return iteratorDone();
    }
}