import { IterableBase } from "./IterableBase";

export class MapIterable<T, R> implements Iterable<R> {
    private readonly iterable: Iterable<T>;
    private readonly transform: (value: T) => R;

    constructor(iterable: Iterable<T>, transform: (value: T) => R) {
        this.iterable = iterable;
        this.transform = transform;
    }

    [Symbol.iterator](): Iterator<R, any, undefined>{
        return new MapIterator(this.iterable, this.transform);
    }
}

// export class MapIterable<T, R> extends IterableBase<T, R> {
//     private readonly transform: (value: T) => R;

//     constructor(iterable: Iterable<T>, transform: (value: T) => R) {
//         super(iterable);
//         this.transform = transform;
//     }

//     next(thisArg: any, iterator: Iterator<T>) : IteratorResult<R>{
//         const next = iterator.next();
//         if(next.done){
//             return {
//                 value: undefined,
//                 done: true
//             }
//         }

//         const value = thisArg.transform(next.value);
//         return { value };
//     }
// }

// tslint:disable-next-line: max-classes-per-file
class MapIterator<T, R> implements Iterator<R>{
    private readonly iterator: Iterator<T>;
    private readonly transform: (value: T) => R;

    constructor(iterable: Iterable<T>, transform: (value: T) => R){
        this.iterator = iterable[Symbol.iterator]();
        this.transform = transform;
    }

    next() : IteratorResult<R>{
        const next = this.iterator.next();
        if(next.done){
            return {
                value: undefined,
                done: true
            };
        }
        else{
            return {
                value: this.transform(next.value)
            };
        }
    }
}