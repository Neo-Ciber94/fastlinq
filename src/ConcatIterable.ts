/* tslint:disable: max-classes-per-file */

export class ConcatIterable<T> implements Iterable<T>{
    private readonly iterable: Iterable<T>;
    private readonly source: Iterable<T>

    constructor(iterable: Iterable<T>, source: Iterable<T>){
        this.iterable = iterable;
        this.source = source;
    }

    *[Symbol.iterator](): Iterator<T, any, undefined> {
        for (const e of this.iterable) {
            yield e;
        }

        for (const e of this.source) {
            yield e;
        }
    }
}

export class AppendIterable<T> implements Iterable<T>{
    private readonly iterable: Iterable<T>;
    private readonly item: T;

    constructor(iterable: Iterable<T>, item: T){
        this.iterable = iterable;
        this.item = item;
    }

    *[Symbol.iterator](): Iterator<T, any, undefined> {
        for (const e of this.iterable) {
            yield e;
        }

        yield this.item;
    }
}

export class PrependIterable<T> implements Iterable<T>{
    private readonly iterable: Iterable<T>;
    private readonly item: T;

    constructor(iterable: Iterable<T>, item: T){
        this.iterable = iterable;
        this.item = item;
    }

    *[Symbol.iterator](): Iterator<T, any, undefined> {
        yield this.item;

        for (const e of this.iterable) {
            yield e;
        }
    }
}