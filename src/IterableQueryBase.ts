/* tslint:disable: unified-signatures */
import { Queryable, ToStringOptions } from "./Queryable";
import { Compare, Ordering, compare as compareNatural, compareReverse } from "./Compare";
import { MapIterable } from "./Iterables/MapIterable";
import { FlatMapIterable } from "./Iterables/FlatMapIterable";
import { WhereIterable } from "./Iterables/WhereIterable";
import { SkipIterable } from "./Iterables/SkipIterable";
import { TakeIterable } from "./Iterables/TakeIterable";
import { SkipWhileIterable } from "./Iterables/SkipWhileIterable";
import { TakeWhileIterable } from "./Iterables/TakeWhileIterable";
import { AppendPrependIterable } from "./Iterables/AppendPredendIterable";
import { ConcatIterable } from "./Iterables/ConcatIterable";
import { IndexedIterable, IndexedValue } from "./Iterables/IndexedIterable";
import { ChunkIterable } from "./Iterables/ChunkIterable";
import { WindowIterable } from "./Iterables/WindowIterable";
import { ZipIterable } from "./Iterables/ZipIterable";
import { JoinIterable } from "./Iterables/JoinIterable";
import { IterableQuery } from "./IterableQuery";
import { isIterable } from "./Iterables/Utils";
import { SizedIterable } from "./Iterables/SizedIterable";

export abstract class IterableQueryBase<T> implements Queryable<T> {
    abstract [Symbol.iterator](): Iterator<T, any, undefined>;

    map<R>(transform: (value: T) => R): Queryable<R> {
        const iterable = new MapIterable(this, transform);
        return new IterableQuery(iterable);
    }

    flatMap<R>(transform: (value: T) => R[]): Queryable<R> {
        const iterable = new FlatMapIterable(this, transform);
        return new IterableQuery(iterable);
    }

    where(predicate: (value: T) => boolean): Queryable<T> {
        const iterable = new WhereIterable(this, predicate);
        return new IterableQuery(iterable);
    }

    skip(n: number): Queryable<T> {
        const iterable = new SkipIterable(this, n);
        return new IterableQuery(iterable);
    }

    take(n: number): Queryable<T> {
        const iterable = new TakeIterable(this, n);
        return new IterableQuery(iterable);
    }

    skipWhile(predicate: (value: T) => boolean): Queryable<T> {
        const iterable = new SkipWhileIterable(this, predicate);
        return new IterableQuery(iterable);
    }

    takeWhile(predicate: (value: T) => boolean): Queryable<T> {
        const iterable = new TakeWhileIterable(this, predicate);
        return new IterableQuery(iterable);
    }

    append(value: T): Queryable<T> {
        const iterable = new AppendPrependIterable(this, value, true);
        return new IterableQuery(iterable);
    }

    prepend(value: T): Queryable<T> {
        const iterable = new AppendPrependIterable(this, value, false);
        return new IterableQuery(iterable);
    }

    concat(elements: Iterable<T>): Queryable<T> {
        const iterable = new ConcatIterable(this, elements);
        return new IterableQuery(iterable);
    }

    indexed(): Queryable<IndexedValue<T>> {
        const iterable = new IndexedIterable(this);
        return new IterableQuery(iterable);
    }

    distinct(): Queryable<T> {
        const array = new Array<T>();
        for (const e of this) {
            if(!array.includes(e)){
                array.push(e);
            }
        }
        return new IterableArrayQuery(array);
    }

    distinctBy<R>(keySelector: (value: T) => R): Queryable<T> {
        const array = new Array<T>();

        for (const e of this) {
            if (array.length === 0) {
                array.push(e);
            }
            else {
                const exists = array.some((current) => {
                    const x = keySelector(e);
                    const y = keySelector(current);
                    return x === y;
                });

                if (!exists) {
                    array.push(e);
                }
            }
        }

        return new IterableArrayQuery(array);
    }

    union(elements: Iterable<T>): Queryable<T> {
        const array = this.toArray();
        for (const e of elements) {
            if (!array.includes(e)) {
                array.push(e);
            }
        }
        return new IterableArrayQuery(array);
    }

    except(elements: Iterable<T>): Queryable<T> {
        const array = new Array<T>();
        const other = Array.from(elements);

        for (const e of this) {
            if (!other.includes(e)) {
                array.push(e);
            }
        }

        return new IterableArrayQuery(array);
    }

    intersect(elements: Iterable<T>): Queryable<T> {
        const array = new Array<T>();
        const other = Array.from(elements);

        for (const e of this) {
            if (other.includes(e)) {
                array.push(e);
            }
        }

        return new IterableArrayQuery(array);
    }

    reversed(): Queryable<T> {
        const array = this.toArray().reverse();
        return new IterableArrayQuery(array);
    }

    chuncked(chunkSize: number): Queryable<T[]> {
        const iterable = new ChunkIterable(this, chunkSize);
        return new IterableQuery(iterable);
    }

    windowed(size: number): Queryable<T[]> {
        const iterable = new WindowIterable(this, size);
        return new IterableQuery(iterable);
    }

    sort(): Queryable<T>;
    sort(compare: Compare<T>): Queryable<T>;
    sort(compare?: any) {
        const array = this.toArray();
        if (compare) {
            const sorted = array.sort((x, y) => compare(x, y).value);
            return new IterableArrayQuery(sorted);
        }

        return new IterableArrayQuery(array.sort());
    }

    sortDecending(): Queryable<T>;
    sortDecending(compare: Compare<T>): Queryable<T>;
    sortDecending(compare?: any) {
        const array = this.toArray();
        if (compare) {
            const sorted = array.sort((x, y) => compare(y, x).value);
            return new IterableArrayQuery(sorted);
        }
        else {
            return new IterableArrayQuery(array.sort((x, y) => {
                return compareReverse(x, y)?.value ?? 0;
            }));
        }
    }

    sortBy<K>(keySelector: (value: T) => K): Queryable<T>;
    sortBy<K>(keySelector: (value: T) => K, compare: Compare<K>): Queryable<T>;
    sortBy(keySelector: any, compare?: any) {
        const array = this.toArray();
        let sorted: T[];

        if (compare) {
            sorted = array.sort((x, y) => {
                const left = keySelector(x);
                const right = keySelector(y);
                return compare(left, right).value;
            });
        }
        else {
            sorted = array.sort((x, y) => {
                const left = keySelector(x);
                const right = keySelector(y);
                return compareNatural(left, right)?.value ?? 0;
            });
        }

        return new IterableArrayQuery(sorted);
    }

    sortByDecending<K>(keySelector: (value: T) => K): Queryable<T>;
    sortByDecending<K>(keySelector: (value: T) => K, compare: Compare<K>): Queryable<T>;
    sortByDecending(keySelector: any, compare?: any) {
        const array = this.toArray();
        let sorted: T[];

        if (compare) {
            sorted = array.sort((x, y) => {
                const left = keySelector(x);
                const right = keySelector(y);
                return compare(right, left).value;
            });
        }
        else {
            sorted = array.sort((x, y) => {
                const left = keySelector(x);
                const right = keySelector(y);
                return compareReverse(left, right)?.value ?? 0;
            });
        }

        return new IterableArrayQuery(sorted);
    }

    joinBy<R>(elements: Iterable<R>, selector: (current: T, other: R) => boolean): Queryable<[T, R]> {
        const iterable = new JoinIterable(this, elements, selector);
        return new IterableQuery(iterable);
    }

    zip<R, TResult>(elements: Iterable<R>, combine: (current: T, other: R) => TResult): Queryable<TResult> {
        const iterable = new ZipIterable(this, elements, combine);
        return new IterableQuery(iterable);
    }

    defaultIfEmpty(defaultValue: Iterable<T>): Queryable<T> {
        if(this.isEmpty()){
            if(Array.isArray(defaultValue)){
                return new IterableArrayQuery(defaultValue as T[]);
            }
            return new IterableQuery(defaultValue);
        }

        return this;
    }

    seek(action: (value: T) => void): Queryable<T> {
        this.forEach(action);
        return this;
    }

    forEach(action: (value: T) => void): void {
        for (const e of this) {
            action(e);
        }
    }

    reduce(reducer: (prev: T, current: T) => T): T | undefined;
    reduce(reducer: (prev: T, current: T) => T, seed: T): T;
    reduce(reducer: any, seed?: any) {
        const iterator = this[Symbol.iterator]();
        let result: T = seed;

        if (!result) {
            const next = iterator.next();
            if (!next.done) {
                result = next.value;
            }
        }

        while (true) {
            const next = iterator.next();
            if (!next.done) {
                result = reducer(result, next.value);
            }
            else {
                break;
            }
        }

        return result!;
    }

    fold<R>(seed: R, combine: (prev: R, current: T) => R): R {
        if (this.isEmpty()) {
            return seed;
        }

        let result = seed;
        for (const e of this) {
            result = combine(result, e);
        }
        return result;
    }

    partition(predicate: (value: T) => boolean): [T[], T[]] {
        const left = new Array<T>();
        const right = new Array<T>();

        for (const e of this) {
            if (predicate(e)) {
                left.push(e);
            }
            else {
                right.push(e);
            }
        }

        return [left, right];
    }

    min(): T | undefined;
    min(compare: Compare<T>): T | undefined;
    min(compare?: any) {
        let value: T | undefined;
        compare = compare ?? compareNatural;

        for (const e of this) {
            if (value) {
                if (compare(e, value) === Ordering.Less) {
                    value = e;
                }
            }
            else {
                value = e;
            }
        }

        return value;
    }

    max(): T | undefined;
    max(compare: Compare<T>): T | undefined;
    max(compare?: any) {
        let value: T | undefined;
        compare = compare ?? compareNatural;

        for (const e of this) {
            if (value) {
                if (compare(e, value) === Ordering.Greater) {
                    value = e;
                }
            }
            else {
                value = e;
            }
        }

        return value;
    }

    minmax(): [T, T] | undefined;
    minmax(compare: Compare<T>): [T, T] | undefined;
    minmax(compare?: any) {
        const min = this.min(compare);
        const max = this.max(compare);
        return min && max? [min, max] : undefined;
    }

    contains(value: T): boolean;
    contains(predicate: (value: T) => boolean): boolean;
    contains(obj: any) {
        if (typeof obj === 'function') {
            for (const e of this) {
                if (obj(e)) {
                    return true;
                }
            }
        }
        else {
            for (const e of this) {
                if (obj === e) {
                    return true;
                }
            }
        }
        return false;
    }

    containsAll(values: Iterable<T>): boolean {
        for (const e of values) {
            if (!this.contains(e)) {
                return false;
            }
        }

        return true;
    }

    sequenceEquals(values: Iterable<T>): boolean {
        const x = values[Symbol.iterator]();
        const y = this[Symbol.iterator]();

        while (true) {
            const left = x.next();
            const right = y.next();

            // If both are done, are equals
            if (left.done && right.done) {
                break;
            }

            // If one is done and not the other, are not equals
            if (left.done || right.done) {
                return false;
            }

            if (left.value !== right.value) {
                return false;
            }
        }

        return true;
    }

    elementAt(index: number): T | undefined {
        if (index < 0) {
            return undefined;
        }

        let i = 0;

        for (const e of this) {
            if (i === index) {
                return e;
            }
            else {
                i++;
            }
        }

        return undefined;
    }

    indexOf(value: T): number | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        let index = 0;
        for (const e of this) {
            if (e === value) {
                return index;
            }
            else {
                index += 1;
            }
        }

        return index;
    }

    lastIndexOf(value: T): number | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        let lastIndex : number | undefined;
        let index = 0;
        for (const e of this) {
            if (e === value) {
                lastIndex = index;
            }
            else {
                index += 1;
            }
        }
        return lastIndex;
    }

    first(): T | undefined {
        const iterator = this[Symbol.iterator]();
        return iterator.next().value;
    }

    last(): T | undefined {
        let last: T | undefined;

        for (const e of this) {
            last = e;
        }

        return last;
    }

    find(predicate: (value: T) => boolean): T | undefined {
        for (const e of this) {
            if (predicate(e)) {
                return e;
            }
        }
    }

    findLast(predicate: (value: T) => boolean): T | undefined {
        let last: T | undefined;

        for (const e of this) {
            if (predicate(e)) {
                last = e;
            }
        }
        return last;
    }

    findIndex(predicate: (value: T) => boolean): number | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        let index = 0;
        for (const e of this) {
            if (predicate(e)) {
                return index;
            }

            index += 1;
        }

        return index;
    }

    findLastIndex(predicate: (value: T) => boolean): number | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        let lastIndex : number | undefined;
        let index = 0;
        for (const e of this) {
            if (predicate(e)) {
                lastIndex = index;
            }

            index += 1;
        }
        return lastIndex;
    }

    findIndices(predicate: (value: T) => boolean): number[] {
        const array = new Array<number>();
        let index = 0;
        for (const e of this) {
            if (predicate(e)) {
                array.push(index);
            }

            index += 1;
        }
        return array;
    }

    single(): T | undefined;
    single(predicate: (value: T) => boolean): T | undefined;
    single(predicate?: any) {
        let result: T | undefined;

        if(predicate){
            for(const e of this){
                if(predicate(e)){
                    if(!result){
                        result = e;
                    }
                    else{
                        return undefined;
                    }
                }
            }
        }
        else{
            for (const e of this) {
                if(!result){
                    result = e;
                }
                else{
                    return undefined;
                }
            }
        }

        return result;
    }

    every(predicate: (value: T) => boolean): boolean {
        for (const e of this) {
            if (!predicate(e)) {
                return false;
            }
        }

        return true;
    }

    any() : boolean;
    any(predicate: (value: T) => boolean): boolean;
    any(predicate?: any){
        if(predicate){
            for (const e of this) {
                if(predicate(e)){
                    return true;
                }
            }
        }
        else{
            return !this.isEmpty();
        }

        return false;
    }

    isSorted(): boolean {
        let prev: T | undefined;

        for (const e of this) {
            if (prev) {
                if (prev > e) {
                    return false;
                }
            }

            prev = e;
        }

        return true;
    }

    isSortedDecending(): boolean {
        let prev: T | undefined;

        for (const e of this) {
            if (prev) {
                if (prev < e) {
                    return false;
                }
            }

            prev = e;
        }

        return true;
    }

    isSortedBy<R>(keySelector: (value: T) => R): boolean {
        let prev: R | undefined;

        for (const e of this) {
            const current = keySelector(e);
            if (prev) {
                if (prev > current) {
                    return false;
                }
            }

            prev = current;
        }

        return true;
    }

    isSortedByDecending<R>(keySelector: (value: T) => R): boolean {
        let prev: R | undefined;

        for (const e of this) {
            const current = keySelector(e);
            if (prev) {
                if (prev < current) {
                    return false;
                }
            }

            prev = current;
        }

        return true;
    }

    isEmpty(): boolean {
        for (const _ of this) {
            return false;
        }

        return true;
    }

    count(): number;
    count(predicate: (value: T) => boolean) : number;
    count(predicate?: any) {
        if(predicate){
            let count = 0;
            for (const e of this) {
                if(predicate(e)){
                    count += 1;
                }
            }
            return count;
        }
        else{
            if(this instanceof IterableQuery){
                const thisCount = getSizedIterableCount(this);
                if(thisCount){
                    return thisCount;
                }
            }

            let count = 0;
            const iterator = this[Symbol.iterator]();

            while(!iterator.next().done){
                count += 1;
            }

            return count;
        }
    }

    groupBy<K>(keySelector: (value: T) => K): Map<K, T[]> {
        const map = new Map<K, T[]>();
        for (const e of this) {
            const key = keySelector(e);
            let values = map.get(key);

            if (!values) {
                values = new Array<T>();
                map.set(key, values);
            }
            values.push(e);
        }
        return map;
    }

    toArray(): T[] {
        return Array.from(this);
    }

    toSet(): Set<T> {
        return new Set(this);
    }

    toMap<K>(keySelector: (value: T) => K): Map<K, T> {
        const map = new Map<K, T>();
        for (const e of this) {
            const key = keySelector(e);
            map.set(key, e);
        }
        return map;
    }

    toString(): string;
    toString(separator: string): string;
    toString(options: ToStringOptions): string;
    toString(options?: any) {
        return iterableToString(this, options);
    }
}

function iterableToString(iterable: any, options: ToStringOptions) : string{
    const separator = typeof options === 'string'? options : options?.separator?? ", ";
    const prefix = options?.prefix?? "[";
    const postfix = options?.postfix?? "]";
    const limit = options?.limit?? Number.MAX_VALUE;
    const truncate = options?.truncate?? "...";

    const iterator = iterable[Symbol.iterator]();
    let count = 0;
    let result : string = prefix;
    let current : IteratorResult<any> = iterator.next();

    while(true){
        if(current.done){
            break;
        }
        else{
            const next = iterator.next();
            if(isIterable(current.value)){
                result += iterableToString(current.value, options);
            }
            else{
                result += current.value;
            }

            if(next.done){
                break;
            }
            else{
                current = next;
                result += separator;
            }
        }

        count += 1;

        if(count >= limit){
            result += truncate;
            break;
        }
    }

    result += postfix;
    return result;
}

function getSizedIterableCount(iter: any) : number | undefined{
    function isSizedIterable(obj: any) : obj is SizedIterable<unknown>{
        return obj.count !== undefined;
    }

    if(iter instanceof IterableQuery){
        return getSizedIterableCount(iter.iterable);
    }

    if(isSizedIterable(iter)){
        return iter.count();
    }

    return undefined;
}

// Work around to avoid 'TypeError: Object prototype may only be an Object or null: undefined'
import { IterableArrayQuery } from "./IterableArrayQuery";