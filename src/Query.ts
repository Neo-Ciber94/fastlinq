import { Queryable } from "./Queryable";
import { IterableQuery } from "./IterableQuery";
import { IterableArrayQuery } from "./IterableArrayQuery";
import { IterableGenerator } from "./Iterables/IterableGenerator";
import { KeyValue } from "./Iterables/KeyValue";
import { RangeIterable } from "./Iterables/RangeIterable";

// tslint:disable-next-line: no-namespace
export namespace Query{
    export function from<T>(...values: T[]) : Queryable<T>{
        return new IterableArrayQuery(values);
    }

    export function fromIterable<T>(iterable: Iterable<T>) : Queryable<T>{
        return new IterableQuery(iterable);
    }

    export function empty<T>() : Queryable<T>{
        return new IterableArrayQuery(new Array<T>(0));
    }

    export function range(start: number, end: number, step: number = 1) : Queryable<number>{
        const iterable = new RangeIterable(start, end, step);
        return new IterableQuery(iterable);
    }

    export function rangeInclusive(start: number, end: number, step: number = 1) : Queryable<number>{
        const iterable = new RangeIterable(start, end, step, true);
        return new IterableQuery(iterable);
    }

    export function repeat<T>(value: T, count: number) : Queryable<T>{
        const iterable = new IterableGenerator<T>(count, (_) => value);
        return new IterableQuery(iterable);
    }

    export function generate<T>(length: number, generator: (index: number, prev?: T) => T, seed?: T) : Queryable<T>{
        const iterable = new IterableGenerator<T>(length, generator, seed);
        return new IterableQuery(iterable);
    }
}

declare global{
    interface Map<K, V>{
        asQuery() : Queryable<KeyValue<K,V>>;
    }

    interface Array<T>{
        asQuery() : Queryable<T>;
    }

    interface Set<T>{
        asQuery() : Queryable<T>;
    }

    interface String{
        asQuery() : Queryable<string>;
    }
}

Map.prototype.asQuery = function<TKey, TValue>() : Queryable<KeyValue<TKey, TValue>>{
    return new IterableQuery(this.entries())
        .map((e): KeyValue<TKey, TValue> => ({ key: e[0], value: e[1] }));
}

Array.prototype.asQuery = function<T>() : Queryable<T>{
    return new IterableArrayQuery<T>(this);
}

Set.prototype.asQuery = function<T>() : Queryable<T>{
    return new IterableQuery<T>(this);
}

String.prototype.asQuery = function() : Queryable<string>{
    return new IterableQuery(this);
}