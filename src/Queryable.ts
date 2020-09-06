/* tslint:disable:unified-signatures */
import { Compare } from "./Compare";
import { IndexedValue } from "./Iterables/IndexedIterable"
import { KeyValue } from "./Iterables/KeyValue";

/**
 * Provide a set of methods for query over the elements of an Iterable.
 */
export interface Queryable<T> extends Iterable<T>{
    map<TResult>(transform: (value: T) => TResult) : Queryable<TResult>;
    flatMap<TResult>(transform: (value: T) => TResult[]) : Queryable<TResult>;
    filter(predicate: (value: T) => boolean) : Queryable<T>;
    filterNot(predicate: (value: T) => boolean) : Queryable<T>;
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
    keyed<TKey>(keySelector: (value: T) => TKey) : Queryable<KeyValue<TKey, T>>;
    distinct() : Queryable<T>;
    distinctBy<TKey>(keySelector: (value: T) => TKey) : Queryable<T>;
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
    sortBy<TKey>(keySelector: (value: T) => TKey) : Queryable<T>;
    sortBy<TKey>(keySelector: (value: T) => TKey, compare: Compare<TKey>) : Queryable<T>;
    sortByDecending<TKey>(keySelector: (value: T) => TKey) : Queryable<T>;
    sortByDecending<TKey>(keySelector: (value: T) => TKey, compare: Compare<TKey>) : Queryable<T>;
    joinBy<TKey>(elements: Iterable<TKey>, selector: (current: T, other: TKey) => boolean) : Queryable<[T,TKey]>;
    zip<TOther, TResult>(elements: Iterable<TOther>, combine: (current: T, other: TOther) => TResult) : Queryable<TResult>;
    defaultIfEmpty(defaultValue: Iterable<T>) : Queryable<T>;
    stepBy(n: number) : Queryable<T>;
    repeat(n: number) : Queryable<T>;
    seek(action: (value: T) => void) : this;
    forEach(action: (value: T) => void) : void;
    reduce(reducer: (prev: T, current: T) => T) : T | undefined;
    reduce(reducer: (prev: T, current: T) => T, seed: T) : T;
    fold<TResult>(seed: TResult, combine: (prev: TResult, current: T) => TResult) : TResult;
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
    elementAtOrElse(index: number, defaultValue: T) : T;
    indexOf(value: T) : number | undefined;
    lastIndexOf(value: T) : number | undefined;
    first() : T | undefined;
    last() : T | undefined;
    firstOrElse(defaultValue: T) : T;
    lastOrElse(defaultValue: T) : T;
    find(predicate: (value: T) => boolean) : T | undefined;
    findLast(predicate: (value: T) => boolean) : T | undefined;
    findOrElse(defaultValue: T, predicate: (value: T) => boolean) : T | undefined;
    findLastOrElse(defaultValue: T, predicate: (value: T) => boolean) : T | undefined;
    findIndex(predicate: (value: T) => boolean) : number | undefined;
    findLastIndex(predicate: (value: T) => boolean) : number | undefined;
    findIndices(predicate: (value: T) => boolean) : number[]
    single() : T | undefined;
    single(predicate: (value: T) => boolean) : T | undefined;
    singleOrElse(defaultValue: T) : T;
    singleOrElse(defaultValue: T, predicate: (value: T) => boolean) : T;
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
    groupBy<TKey>(keySelector: (value: T) => TKey) : Map<TKey, T[]>;
    toArray() : T[];
    toSet() : Set<T>;
    toMap<TKey>(keySelector: (value: T) => TKey) : Map<TKey, T>;
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