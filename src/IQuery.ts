/* tslint:disable:unified-signatures */
import { Compare } from "./Compare";
import { IndexedValue } from "./Iterables/IndexedIterable"

/**
 * Provide a set of methods for query over the elements of an Iterable.
 */
export interface IQuery<T> extends Iterable<T>{
    map<R>(f: (value: T) => R) : IQuery<R>;
    flatMap<R>(f: (value: T) => R[]) : IQuery<R>;
    where(f: (value: T) => boolean) : IQuery<T>;
    skip(n: number) : IQuery<T>;
    take(n: number) : IQuery<T>;
    skipWhile(f: (value: T) => boolean) : IQuery<T>;
    takeWhile(f: (value: T) => boolean) : IQuery<T>;
    append(value: T) : IQuery<T>;
    prepend(value: T) : IQuery<T>;
    concat(elements: Iterable<T>) : IQuery<T>;
    indexed() : IQuery<IndexedValue<T>>;
    distinct() : IQuery<T>;
    distinctBy<R>(keySelector: (value: T) => R) : IQuery<T>;
    union(elements: Iterable<T>) : IQuery<T>;
    except(elements: Iterable<T>) : IQuery<T>;
    intersect(elements: Iterable<T>) : IQuery<T>;
    reversed() : IQuery<T>;
    chuncked(chunkSize: number) : IQuery<T[]>;
    windowed(size: number) : IQuery<T[]>;
    sort() : IQuery<T>;
    sort(compare: Compare<T>) : IQuery<T>;
    sortDecending() : IQuery<T>;
    sortDecending(compare: Compare<T>) : IQuery<T>;
    sortBy<K>(keySelector: (value: T) => K) : IQuery<T>;
    sortBy<K>(keySelector: (value: T) => K, compare: Compare<K>) : IQuery<T>;
    sortByDecending<K>(keySelector: (value: T) => K) : IQuery<T>;
    sortByDecending<K>(keySelector: (value: T) => K, compare: Compare<K>) : IQuery<T>;
    joinBy<R>(elements: Iterable<R>, selector: (current: T, other: R) => boolean) : IQuery<[T,R]>;
    zip<R, TResult>(elements: Iterable<R>, combine: (current: T, other: R) => TResult) : IQuery<TResult>;
    defaultIfEmpty(defaultValue: Iterable<T>) : IQuery<T>;
    seek(f: (value: T) => void) : IQuery<T>;
    forEach(f: (value: T) => void) : void;
    reduce(f: (prev: T, current: T) => T) : T | undefined;
    reduce(f: (prev: T, current: T) => T, seed: T) : T;
    fold<R>(seed: R, combine: (prev: R, current: T) => R) : R;
    partition(f: (value: T) => boolean) : [T[], T[]];
    min() : T | undefined;
    min(compare: Compare<T>) : T | undefined;
    max() : T | undefined;
    max(compare: Compare<T>) : T | undefined;
    contains(value: T) : boolean;
    contains(predicate: (value: T) => boolean) : boolean;
    containsAll(values: Iterable<T>) : boolean;
    sequenceEquals(values: Iterable<T>) : boolean;
    elementAt(index: number) : T | undefined;
    indexOf(value: T) : number | undefined;
    lastIndexOf(value: T) : number | undefined;
    first() : T | undefined;
    last() : T | undefined;
    find(predicate: (value: T) => boolean) : T | undefined;
    findLast(predicate: (value: T) => boolean) : T | undefined;
    findIndex(predicate: (value: T) => boolean) : number | undefined;
    findLastIndex(predicate: (value: T) => boolean) : number | undefined;
    findIndices(predicate: (value: T) => boolean) : number[]
    single() : T | undefined;
    single(predicate: (value: T) => boolean) : T | undefined;
    every(predicate: (value: T) => boolean) : boolean;
    any() : boolean;
    any(predicate: (value: T) => boolean) : boolean;
    isSorted() : boolean;
    isSortedDecending() : boolean;
    isSortedBy<R>(keySelector: (value: T) => R) : boolean;
    isSortedByDecending<R>(keySelector: (value: T) => R) : boolean;
    isEmpty() : boolean;
    count() : number;
    count(predicate: (value: T) => boolean) : number;
    groupBy<K>(keySelector: (value: T) => K) : Map<K, T[]>;
    toArray() : T[];
    toSet() : Set<T>;
    toMap<K>(keySelector: (value: T) => K) : Map<K, T>;
    toString() : string;
    toString(separator: string) : string;
    toString(options: ToStringOptions) : string;
}

export interface ToStringOptions{
    readonly separator?: string;
    readonly prefix?: string;
    readonly postfix?: string;
    readonly limit?: number;
    readonly truncate?: string;
}