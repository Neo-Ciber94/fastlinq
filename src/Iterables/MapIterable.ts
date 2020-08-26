import { IterableIterator } from './IterableIterator';

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