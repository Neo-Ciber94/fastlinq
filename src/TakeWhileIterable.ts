
export class TakeWhileIterable<T> implements Iterable<T>{
    private readonly iterable: Iterable<T>;
    private readonly predicate: (value: T) => boolean;

    constructor(iterable: Iterable<T>, predicate: (value: T) => boolean){
        this.iterable = iterable;
        this.predicate = predicate;
    }

    *[Symbol.iterator](): Iterator<T, any, undefined> {
        for (const e of this.iterable) {
            if(this.predicate(e)){
                yield e;
            }
            else{
                break;
            }
        }
    }
}