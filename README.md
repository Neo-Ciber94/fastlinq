# fastlinq.ts

Provides a lazy evaluated type that provides a set of methods for query over the values of a collection. It provides methods for transform, filter, update, combine an iterable or compute a result with the elements of the iterable.

### Example
```ts
import './src/Query';

const numbers = [1,2,3,4,5,6,7,8,9,10];

// Calls Array.asQuery() to get a ```Queryable<T>``` over the elements of the array
const items = numbers.asQuery()
    .filter(e => e <= 5)     // Filters the elements
    .map(e => e * 2)         // Transforms the elements
    .toArray();              // Gets an array containing the result

console.log(items); // [2,4,6,8,10]
```

Also you can use the ```Query``` namespace which offers functions for create queries.

```ts
import './src/Query';

for(const e of Query.rangeInclusive(0, 10)){
    console.log(e);
}
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### Operations
Here an overview of the fastquery ```API```.

```ts
interface Queryable<T> extends Iterable<T>{
    /// Transform the values of the query.
    map<R>(transform: (value: T) => R) : Queryable<R>;

    /// Gets a query with all the values returned in the callback.
    flatMap<R>(transform: (value: T) => R[]) : Queryable<R>;

    /// Gets all the values that match the specified condition.
    filter(predicate: (value: T) => boolean) : Queryable<T>;

    /// Gets all the values that don't match the specified condition.
    filterNot(predicate: (value: T) => boolean) : Queryable<T>;

    /// Drop the first `n` values of the query.
    skip(n: number) : Queryable<T>;

    /// Takes the first `n` values o fthe query.
    take(n: number) : Queryable<T>;

    /// Drop values while the specified condition is meet.
    skipWhile(predicate: (value: T) => boolean) : Queryable<T>;

    /// Take values while the specified condition is meet.
    takeWhile(predicate: (value: T) => boolean) : Queryable<T>;

    /// Takes values from the end of the query.
    takeLast(count: number) : Queryable<T>;

    /// Drop values from the end of the query.
    skipLast(count: number) : Queryable<T>;

    /// Returns a new query with the specified value at the end.
    append(value: T) : Queryable<T>;

    /// Returns a new query with the specified value at the start.
    prepend(value: T) : Queryable<T>;

    /// Returns a new query with the specified values the end.
    concat(elements: Iterable<T>) : Queryable<T>;

    /// Returns a new query where all the values had an index.
    indexed() : Queryable<IndexedValue<T>>;

    /// Returns a new query where all the values have a key provided by the `keySelector`.
    keyed<TKey>(keySelector: (value: T) => TKey) : Queryable<KeyValue<TKey, T>>;

    /// Gets all the distinct values of this query.
    distinct() : Queryable<T>;

    /// Gets all values that have a different values than the provided by the `keySelector`.
    distinctBy<R>(keySelector: (value: T) => R) : Queryable<T>;

    /// Gets the elements of this query plus provided when that don't exists within.
    /// Check: https://en.wikipedia.org/wiki/Union_(set_theory)
    union(elements: Iterable<T>) : Queryable<T>;

    /// Gets all the elements of this query that don't exist in the provided iterable.
    /// Check: https://en.wikipedia.org/wiki/Complement_(set_theory)
    except(elements: Iterable<T>) : Queryable<T>;

    /// Gets the elements of this query that also exists in the provided.
    /// Check: https://en.wikipedia.org/wiki/Intersection_(set_theory)
    intersect(elements: Iterable<T>) : Queryable<T>;

    /// Reverses the order of the elements in this query.
    reversed() : Queryable<T>;

    /// Gets a view of the values of this query, where each iteration
    /// returns the number of elements specified by `chunkSize`.
    chuncked(chunkSize: number) : Queryable<T[]>;

    /// Gets a view of the values of this query, where each iteration
    /// return the next number of elements specified by `size`
    /// Ignoring the first one returned.
    windowed(size: number) : Queryable<T[]>;

    /// Sorts the elements of this query with an optional `compare`.
    sort() : Queryable<T>;
    sort(compare: Compare<T>) : Queryable<T>;

    /// Sorts by decending the elements of this query with an optional `compare`.
    sortDecending() : Queryable<T>;
    sortDecending(compare: Compare<T>) : Queryable<T>;

    /// Sorts the elements of this query using the provided value
    /// and an optional `compare`
    sortBy<K>(keySelector: (value: T) => K) : Queryable<T>;
    sortBy<K>(keySelector: (value: T) => K, compare: Compare<K>) : Queryable<T>;

    /// Sorts by decending the elements of this query using the provided value
    /// and an optional `compare`
    sortByDecending<K>(keySelector: (value: T) => K) : Queryable<T>;
    sortByDecending<K>(keySelector: (value: T) => K, compare: Compare<K>) : Queryable<T>;

    /// Gets a pair of all the elements of this query and the specified one
    /// that match the specified predicate.
    joinBy<R>(elements: Iterable<R>, selector: (current: T, other: R) => boolean) : Queryable<[T,R]>;

    /// Merge the each elements of this query with the provided.
    zip<R, TResult>(elements: Iterable<R>, combine: (current: T, other: R) => TResult) : Queryable<TResult>;

    /// Gets this query or the `defaultValue` if is empty.
    defaultIfEmpty(defaultValue: Iterable<T>) : Queryable<T>;

    /// Gets each `n` elements of this query.
    stepBy(n: number) : Queryable<T>;

    /// Repeat the elements of this query `n` times.
    repeat(n: number) : Queryable<T>;

    /// Perform an action over each value of this query and returns this.
    seek(action: (value: T) => void) : this;

    /// Perform an action over each value of this query.
    forEach(action: (value: T) => void) : void;

    /// Combine the values of this query and gets the result.
    reduce(reducer: (prev: T, current: T) => T) : T | undefined;
    reduce(reducer: (prev: T, current: T) => T, seed: T) : T;

    /// Provides an initial value and combine the values of this query and get the result.
    fold<R>(seed: R, combine: (prev: R, current: T) => R) : R;

    /// Sums the values provided by the specified selector and get the result.
    sum(selector: (value: T) => number) : number | undefined;

    /// Multiply the values provided by the specified selector and get the result.
    product(selector: (value: T) => number) : number | undefined;

    /// Gets the average of the values provided by the specified selector.
    average(selector: (value: T) => number) : number | undefined;

    /// Gets a pair with values that meet the condition and don't.
    partition(predicate: (value: T) => boolean) : [T[], T[]];

    /// Gets the minimun value of this query.
    min() : T | undefined;
    min(compare: Compare<T>) : T | undefined;

    /// Gets the maximun value of this query.
    max() : T | undefined;
    max(compare: Compare<T>) : T | undefined;

    /// Gets the minimun and maximun values of this query.
    minmax() : [T, T] | undefined;
    minmax(compare: Compare<T>) : [T, T] | undefined;

    /// Checks if this query contains the specified value.
    contains(value: T) : boolean;
    contains(predicate: (value: T) => boolean) : boolean;

    /// Checks if this query contains all the specified values.
    containsAll(values: Iterable<T>) : boolean;

    /// Checks if this query have elements in the same other than the other.
    sequenceEquals(values: Iterable<T>) : boolean;

    /// Gets the element at the specified index.
    elementAt(index: number) : T | undefined;

    /// Gets the element at the specified index or the default value.
    elementAtOrElse(index: number, defaultValue: T) : T;

    /// Gets the position of the specified value if found.
    indexOf(value: T) : number | undefined;

    /// Gets the position of the specified value if found starting from the last.
    lastIndexOf(value: T) : number | undefined;

    /// Gets the first value of this query if any.
    first() : T | undefined;

    /// Gets the last value of this query if any.
    last() : T | undefined;

    /// Gets the first value of this query or the default if not found.
    firstOrElse(defaultValue: T) : T;

    /// Gets the last value of this query or the default if not found.
    lastOrElse(defaultValue: T) : T;

    /// Gets the first value that meet the condition.
    find(predicate: (value: T) => boolean) : T | undefined;

    /// Gets the last value that meet the condition.
    findLast(predicate: (value: T) => boolean) : T | undefined;

    /// Gets the position of the value that meet the condition.
    findIndex(predicate: (value: T) => boolean) : number | undefined;

    /// Gets the position of the last value that meet the condition.
    findLastIndex(predicate: (value: T) => boolean) : number | undefined;

    /// Gets the position of the values that meet the condition.
    findIndices(predicate: (value: T) => boolean) : number[]

    /// Gets the only value of the query, fail if there is more than 1 element.
    single() : T | undefined;

    /// Gets the only value of the query that meet the condition, 
    /// fail if more than one meet the condition.
    single(predicate: (value: T) => boolean) : T | undefined;

    /// Gets the only value of the query, or the default if there is more than 1 element.
    singleOrElse(defaultValue: T) : T;

    /// Gets the only value of the query that meet the condition, 
    /// or the default if there is more than 1 element.
    singleOrElse(defaultValue: T, predicate: (value: T) => boolean) : T;

    /// Check if all the elements in the query meet the condition.
    every(predicate: (value: T) => boolean) : boolean;

    /// Check if there is elements in the query.
    any() : boolean;

    /// Check if any value meet the condition.
    any(predicate: (value: T) => boolean) : boolean;

    /// Test if this query is sorted.
    isSorted() : boolean;

    /// Test if this query is sorted by decending.
    isSortedDecending() : boolean;

    /// Test if this query is sorted by the specified key.
    isSortedBy<R>(keySelector: (value: T) => R) : boolean;

    /// Test if this query is sorted by decending by the specified key.
    isSortedByDecending<R>(keySelector: (value: T) => R) : boolean;

    /// Check if this query have no elements.
    isEmpty() : boolean;

    /// Gets the number of elements in this query.
    count() : number;

    /// Gets the number of elements that match the condition.
    count(predicate: (value: T) => boolean) : number;

    /// Groups the elements of this query by the given key.
    groupBy<K>(keySelector: (value: T) => K) : Map<K, T[]>;

    /// Gets an array with the elements of this query.
    toArray() : T[];
    
    /// Gets a set with the elements of this query.
    toSet() : Set<T>;

    /// Gets a map with the elements of this query using the key provided by the given selector.
    toMap<K>(keySelector: (value: T) => K) : Map<K, T>;

    /// Gets an string representation of the elements of this query.
    toString() : string;
    toString(separator: string) : string;
    toString(options: ToStringOptions) : string;
}
```