
export abstract class IterableBase<T, R> implements Iterable<R>{
    readonly iterable: Iterable<T>

    constructor(iterable: Iterable<T>){
        this.iterable = iterable;
    }

    [Symbol.iterator](): Iterator<R, any, undefined> {
        return new IteratorBase(this);
    }

    abstract next(thisArg: any, iterator: Iterator<T>) : IteratorResult<R>;
}

// tslint:disable-next-line: max-classes-per-file
class IteratorBase<T, R> implements Iterator<R>{
    private readonly iterator: Iterator<T>
    private readonly source: IterableBase<T, R>;

    constructor(source: IterableBase<T, R>){
        this.iterator = source.iterable[Symbol.iterator]();
        this.source = source;
    }

    next() : IteratorResult<R>{
        const source = this.source;
        const iterator = this.iterator;
        return source.next(source, iterator);
    }
}