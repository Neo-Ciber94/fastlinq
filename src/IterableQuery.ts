import { IterableQueryBase } from "./QueryableBase";

export class IterableQuery<T> extends IterableQueryBase<T>{
    readonly iterable: Iterable<T>;

    constructor(iterable: Iterable<T>){
        super();

        this.iterable = iterable;
    }

    [Symbol.iterator](): Iterator<T, any, undefined> {
        return this.iterable[Symbol.iterator]();
    }
}