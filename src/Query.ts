import { Queryable } from "./Queryable";
import { IterableQuery } from "./IterableQuery";
import { IterableArrayQuery } from "./IterableArrayQuery";
import { IterableGenerator } from "./Iterables/IterableGenerator";
import { KeyValue } from "./Iterables/KeyValue";
import { RangeIterable } from "./Iterables/RangeIterable";
import { RepeatIterable } from "./Iterables/RepeatIterable";

/**
 * Helper class for `IQuery<T>`.
 */
export abstract class Query{
    private constructor(){}

    static from<T>(...values: T[]) : Queryable<T>{
        return new IterableArrayQuery(values);
    }

    static fromIterable<T>(iterable: Iterable<T>) : Queryable<T>{
        return new IterableQuery(iterable);
    }

    static empty<T>() : Queryable<T>{
        return new IterableArrayQuery(new Array<T>(0));
    }

    static range(start: number, end: number, step: number = 1) : Queryable<number>{
        const iterable = new RangeIterable(start, end, step);
        return new IterableQuery(iterable);
    }

    static rangeInclusive(start: number, end: number, step: number = 1) : Queryable<number>{
        const iterable = new RangeIterable(start, end, step, true);
        return new IterableQuery(iterable);
    }

    static repeat<T>(value: T, count: number) : Queryable<T>{
        const iterable = new RepeatIterable(value, count);
        return new IterableQuery(iterable);
    }

    static generate<T>(length: number, generator: (index: number, prev?: T) => T, seed?: T) : Queryable<T>{
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

Map.prototype.asQuery = function<K,V>() : Queryable<KeyValue<K,V>>{
    return new IterableQuery(this.entries())
        .map((e): KeyValue<K, V> => ({ key: e[0], value: e[1] }));
}

Array.prototype.asQuery = function<T>() : Queryable<T>{
    return new IterableArrayQuery(this);
}

Set.prototype.asQuery = function<T>() : Queryable<T>{
    return new IterableQuery(this);
}

String.prototype.asQuery = function() : Queryable<string>{
    return new IterableQuery(this);
}