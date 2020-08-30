/* tslint:disable:unified-signatures */
import { Compare } from "./Compare";
import { IndexedValue } from "./Iterables/IndexedIterable"

/**
 * Provide a set of methods for query over the elements of an Iterable.
 */
export interface Queryable<T> extends Iterable<T>{
    map<R>(transform: (value: T) => R) : Queryable<R>;
    flatMap<R>(transform: (value: T) => R[]) : Queryable<R>;
    where(predicate: (value: T) => boolean) : Queryable<T>;
    skip(n: number) : Queryable<T>;
    take(n: number) : Queryable<T>;
    skipWhile(predicate: (value: T) => boolean) : Queryable<T>;
    takeWhile(predicate: (value: T) => boolean) : Queryable<T>;
    takeLast(count: number) : Queryable<T>;
    skipLast(count: number) : Queryable<T>;
    append(value: T) : Queryable<T>;
    prepend(value: T) : Queryable<T>;
    concat(elements: Iterable<T>) : Queryable<T>;
    indexed() : Queryable<IndexedValue<T>>;
    distinct() : Queryable<T>;
    distinctBy<R>(keySelector: (value: T) => R) : Queryable<T>;
    union(elements: Iterable<T>) : Queryable<T>;
    except(elements: Iterable<T>) : Queryable<T>;
    intersect(elements: Iterable<T>) : Queryable<T>;
    reversed() : Queryable<T>;
    chuncked(chunkSize: number) : Queryable<T[]>;
    windowed(size: number) : Queryable<T[]>;
    sort() : Queryable<T>;
    sort(compare: Compare<T>) : Queryable<T>;
    sortDecending() : Queryable<T>;
    sortDecending(compare: Compare<T>) : Queryable<T>;
    sortBy<K>(keySelector: (value: T) => K) : Queryable<T>;
    sortBy<K>(keySelector: (value: T) => K, compare: Compare<K>) : Queryable<T>;
    sortByDecending<K>(keySelector: (value: T) => K) : Queryable<T>;
    sortByDecending<K>(keySelector: (value: T) => K, compare: Compare<K>) : Queryable<T>;
    joinBy<R>(elements: Iterable<R>, selector: (current: T, other: R) => boolean) : Queryable<[T,R]>;
    zip<R, TResult>(elements: Iterable<R>, combine: (current: T, other: R) => TResult) : Queryable<TResult>;
    defaultIfEmpty(defaultValue: Iterable<T>) : Queryable<T>;
    seek(action: (value: T) => void) : Queryable<T>;
    forEach(action: (value: T) => void) : void;
    reduce(reducer: (prev: T, current: T) => T) : T | undefined;
    reduce(reducer: (prev: T, current: T) => T, seed: T) : T;
    fold<R>(seed: R, combine: (prev: R, current: T) => R) : R;
    sum(selector: (value: T) => number) : number | undefined;
    product(selector: (value: T) => number) : number | undefined;
    average(selector: (value: T) => number) : number | undefined;
    partition(predicate: (value: T) => boolean) : [T[], T[]];
    min() : T | undefined;
    min(compare: Compare<T>) : T | undefined;
    max() : T | undefined;
    max(compare: Compare<T>) : T | undefined;
    minmax() : [T, T] | undefined;
    minmax(compare: Compare<T>) : [T, T] | undefined;
    contains(value: T) : boolean;
    contains(predicate: (value: T) => boolean) : boolean;
    containsAll(values: Iterable<T>) : boolean;
    sequenceEquals(values: Iterable<T>) : boolean;
    elementAt(index: number) : T | undefined;
    // elementAtOrElse(index: number, defaultValue: T) : T;
    indexOf(value: T) : number | undefined;
    lastIndexOf(value: T) : number | undefined;
    first() : T | undefined;
    last() : T | undefined;
    // firstOrElse(defaultValue: T) : T;
    // lastOrElse(defaultValue: T) : T;
    find(predicate: (value: T) => boolean) : T | undefined;
    findLast(predicate: (value: T) => boolean) : T | undefined;
    findIndex(predicate: (value: T) => boolean) : number | undefined;
    findLastIndex(predicate: (value: T) => boolean) : number | undefined;
    findIndices(predicate: (value: T) => boolean) : number[]
    single() : T | undefined;
    single(predicate: (value: T) => boolean) : T | undefined;
    // singleOrElse(defaultValue: T) : T;
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