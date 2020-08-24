
export class WhereIterable<T> implements Iterable<T> {
    private readonly iterable: Iterable<T>;
    private readonly predicate: (value: T) => boolean;

    constructor(iterable: Iterable<T>, predicate: (value: T) => boolean) {
        this.iterable = iterable;
        this.predicate = predicate;
    }

    [Symbol.iterator](): Iterator<T, any, undefined> {
        return new WhereIterator(this.iterable, this.predicate);
    }
}

// tslint:disable-next-line: max-classes-per-file
class WhereIterator<T> implements Iterator<T>{
    private readonly iterator: Iterator<T>;
    private readonly predicate: (value: T) => boolean;

    constructor(iterable: Iterable<T>, predicate: (value: T) => boolean) {
        this.iterator = iterable[Symbol.iterator]();
        this.predicate = predicate;
    }

    next() : IteratorResult<T>{
        while(true){
            const next = this.iterator.next();

            if(next.done){
                return {
                    value: undefined,
                    done: true
                };
            }
            else{
                const value = next.value;
                if(this.predicate(value)){
                    return {
                        value
                    }
                }
            }
        }
    }
}