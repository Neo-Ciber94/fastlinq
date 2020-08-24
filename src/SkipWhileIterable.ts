
export class SkipWhileIterable<T> implements Iterable<T>{
    private readonly iterable: Iterable<T>;
    private readonly predicate: (value: T) => boolean;

    constructor(iterable: Iterable<T>, predicate: (value: T) => boolean){
        this.iterable = iterable;
        this.predicate = predicate;
    }

    *[Symbol.iterator](): Iterator<T, any, undefined> {
        let skip = true;

        for (const e of this.iterable) {
            if(skip){
                if(!this.predicate(e)){
                    skip = false;
                }
            }
            else{
                yield e;
            }
        }
    }
}