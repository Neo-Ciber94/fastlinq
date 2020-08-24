import { IQuery } from "./IQuery";
import { IterableGenerator } from "./IterableGenerator";
import { ArrayQuery, IterableQuery } from "./IterableQuery";
import { KeyValue } from "./KeyValue";
import { RangeIterable } from "./RangeIterable";
import { RepeatIterable } from "./RepeatIterable";

export class Query{
    private constructor(){}

    static from<T>(...values: T[]) : IQuery<T>{
        return new IterableQuery(values);
    }

    static fromIterable<T>(iterable: Iterable<T>) : IQuery<T>{
        return new IterableQuery(iterable);
    }

    static empty<T>() : IQuery<T>{
        return new IterableQuery(new Array<T>(0));
    }

    static range(start: number, end: number, step: number = 1) : IQuery<number>{
        const iterable = new RangeIterable(start, end, step);
        return new IterableQuery(iterable);
    }

    static rangeInclusive(start: number, end: number, step: number = 1) : IQuery<number>{
        const iterable = new RangeIterable(start, end, step, true);
        return new IterableQuery(iterable);
    }

    static repeat<T>(value: T, count: number) : IQuery<T>{
        const iterable = new RepeatIterable(value, count);
        return new IterableQuery(iterable);
    }

    static generate<T>(length: number, generator: (index: number, prev?: T) => T, seed?: T) : IQuery<T>{
        const iterable = new IterableGenerator<T>(length, generator, seed);
        return new IterableQuery(iterable);
    }
}

declare global{
    interface Map<K, V>{
        asQuery() : IQuery<KeyValue<K,V>>;
    }

    interface Array<T>{
        asQuery() : IQuery<T>;
    }

    interface Set<T>{
        asQuery() : IQuery<T>;
    }

    interface String{
        asQuery() : IQuery<string>;
    }
}

Map.prototype.asQuery = function<K,V>() : IQuery<KeyValue<K,V>>{
    return new IterableQuery(this.entries()).map(KeyValue.from);
}

Array.prototype.asQuery = function<T>() : IQuery<T>{
    return new ArrayQuery(this);
}

Set.prototype.asQuery = function<T>() : IQuery<T>{
    return new IterableQuery(this);
}

String.prototype.asQuery = function() : IQuery<string>{
    return new IterableQuery(this);
}