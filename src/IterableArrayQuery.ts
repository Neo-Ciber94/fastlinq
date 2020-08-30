import { Queryable } from "./Queryable";
import { IterableQuery } from "./IterableQuery";
import { IterableQueryBase } from "./IterableQueryBase";
import { AppendPrependArrayIterable } from "./Iterables/AppendPredendIterable";
import { IndexedArrayIterable, IndexedValue } from "./Iterables/IndexedIterable";
import { MapArrayIterable } from "./Iterables/MapIterable";
import { WhereArrayIterable } from "./Iterables/WhereIterable";
import { SizedIterable } from "./Iterables/SizedIterable";
import { ArrayPartition } from "./Iterables/ArrayPartition";

export class IterableArrayQuery<T> extends IterableQueryBase<T> implements SizedIterable<T> {
    private readonly array: T[];

    constructor(array: T[]) {
        super();
        this.array = array;
    }

    [Symbol.iterator](): Iterator<T, any, undefined> {
        return this.array[Symbol.iterator]();
    }

    map<R>(transform: (value: T) => R) : Queryable<R>{
        const iterable = new MapArrayIterable(this.array, transform);
        return new IterableQuery(iterable);
    }

    where(predicate: (value: T) => boolean) : Queryable<T>{
        const iterable = new WhereArrayIterable(this.array, predicate);
        return new IterableQuery(iterable);
    }

    take(count: number) : Queryable<T>{
        const iterable = ArrayPartition.take<T>(this.array, count);
        return new IterableQuery(iterable);
    }

    skip(count: number) : Queryable<T>{
        const iterable = ArrayPartition.skip<T>(this.array, count);
        return new IterableQuery(iterable);
    }

    takeLast(count: number) : Queryable<T>{
        const iterable = ArrayPartition.takeLast<T>(this.array, count);
        return new IterableQuery(iterable);
    }

    skipLast(count: number) : Queryable<T>{
        const iterable = ArrayPartition.skipLast<T>(this.array, count);
        return new IterableQuery(iterable);
    }

    append(value: T) : Queryable<T>{
        const iterable = new AppendPrependArrayIterable(this.array, value, true);
        return new IterableQuery(iterable);
    }

    prepend(value: T) : Queryable<T>{
        const iterable = new AppendPrependArrayIterable(this.array, value, false);
        return new IterableQuery(iterable);
    }

    forEach(action: (value: T) => void) : void{
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.array.length; i++) {
            action(this.array[i]);
        }
    }

    indexed() : Queryable<IndexedValue<T>>{
        const iterable = new IndexedArrayIterable(this.array);
        return new IterableQuery(iterable);
    }

    first(predicate?: any): T | undefined {
        if(predicate){
            // tslint:disable-next-line: prefer-for-of
            for(let i = 0; i < this.array.length; i++){
                if(predicate(this.array[i])){
                    return this.array[i];
                }
            }
            return undefined;
        }
        return this.array[0];
    }

    last(predicate?: any): T | undefined {
        if(this.array.length === 0){
            return undefined;
        }

        if(predicate){
            // tslint:disable-next-line: prefer-for-of
            for(let i = this.array.length - 1; i >= 0; i--){
                if(predicate(this.array[i])){
                    return this.array[i];
                }
            }
            return undefined;
        }

        return this.array[this.array.length - 1];
    }

    single(predicate?: any){
        if(predicate){
            let result : T | undefined;
            const array = this.array;
            // tslint:disable-next-line: prefer-for-of
            for(let i = 0; i < array.length; i++){
                if(predicate(array[i])){
                    if(result){
                        return undefined;
                    }
                    else{
                        result = array[i];
                    }
                }
            }
            return result;
        }
        else{
            if (this.array.length > 1) {
                return undefined;
            }
            else {
                return this.array[0];
            }
        }
    }

    elementAt(index: number): T | undefined {
        return this.array[index];
    }

    count(predicate?: any): number {
        if(predicate){
            const array = this.array;
            let count = 0;
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < array.length; i++) {
                if(predicate(array[i])){
                    count += 1;
                }
            }
            return count;
        }
        else{
            return this.array.length;
        }
    }

    isEmpty(): boolean {
        return this.array.length === 0;
    }
}