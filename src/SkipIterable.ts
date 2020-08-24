
export class SkipIterable<T> implements Iterable<T>{
    private readonly iterable: Iterable<T>;
    private readonly count: number;

    constructor(iterable: Iterable<T>, count: number){
        if(count < 0){
            throw new Error("Invalid argument: " +count);
        }

        this.iterable = iterable;
        this.count = count;
    }

    [Symbol.iterator](): Iterator<T, any, undefined>{
        return new SkipIterator(this.iterable, this.count);
    }
}

// tslint:disable-next-line: max-classes-per-file
class SkipIterator<T> implements Iterator<T>{
    private readonly iterator: Iterator<T>;
    private readonly count: number;
    private index: number;

    constructor(iterable: Iterable<T>, count: number){
        this.iterator = iterable[Symbol.iterator]();
        this.count = count;
        this.index = 0;
    }

    next() : IteratorResult<T>{
        let next = this.iterator.next();
        if(next.done){
            return {
                value: undefined,
                done: true
            };
        }

        while(this.index < this.count){
            next = this.iterator.next();
            if(next.done){
                return {
                    value: undefined,
                    done: true
                };
            }
            this.index += 1;
        }

        return {
            value: next.value
        };
    }
}