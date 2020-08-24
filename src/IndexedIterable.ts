
export interface IndexedValue<T>{
    readonly value: T;
    readonly index: number;
}

export class IndexedIterable<T> implements Iterable<IndexedValue<T>>{
    private readonly iterable: Iterable<T>;

    constructor(iterable: Iterable<T>){
        this.iterable = iterable;
    }

    [Symbol.iterator](): Iterator<IndexedValue<T>, any, undefined> {
        return new IndexedIterator(this.iterable);
    }
}

// tslint:disable-next-line: max-classes-per-file
class IndexedIterator<T> implements Iterator<IndexedValue<T>>{
    private readonly iterator: Iterator<T>;
    private index: number;

    constructor(iterable: Iterable<T>){
        this.iterator = iterable[Symbol.iterator]();
        this.index = 0;
    }

    next() : IteratorResult<IndexedValue<T>>{
        const next = this.iterator.next();
        if(next.done){
            return {
                value: undefined,
                done: true
            };
        }
        else{
            const item : IndexedValue<T> = {
                value: next.value,
                index: this.index++
            };

            return {
                value: item
            }
        }
    }
}