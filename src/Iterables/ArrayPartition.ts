import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";
import { SizedIterable } from "./SizedIterable";

export class ArrayPartition<T> implements IterableIterator<T>, SizedIterable<T>{
    private readonly source: T[];
    private readonly start: number;
    private readonly end: number;
    private index: number;

    private static empty : ArrayPartition<never> = new ArrayPartition([], 0, 0);

    constructor(array: T[], start: number, end: number){
        if(start > end || start < 0 || start > array.length){
            throw new Error("start cannot be negative or greater than end or the array: " +start);
        }

        if(end < 0 || end > array.length){
            throw new Error("end cannot be negative or greater than the array: " +end);
        }

        this.source = array;
        this.start = start;
        this.end = end;
        this.index = start;
    }

    static take<T>(array: T[], count: number) : ArrayPartition<T>{
        if(count === 0){
            return ArrayPartition.empty;
        }

        return new ArrayPartition<T>(array, 0, Math.min(count, array.length));
    }

    static takeLast<T>(array: T[], count: number) : ArrayPartition<T>{
        if(count === 0){
            return ArrayPartition.empty;
        }

        return new ArrayPartition<T>(array, Math.max(0, array.length - count), array.length);
    }

    static skip<T>(array: T[], count: number) : ArrayPartition<T>{
        if(count > array.length){
            return ArrayPartition.empty;
        }

        return new ArrayPartition<T>(array, count, array.length);
    }

    static skipLast<T>(array: T[], count: number) : ArrayPartition<T>{
        if(count > array.length){
            return ArrayPartition.empty;
        }

        return new ArrayPartition<T>(array, 0, array.length - count);
    }

    [Symbol.iterator](): IterableIterator<T> {
        if(Object.is(this, ArrayPartition.empty)){
            return this;
        }

        return new ArrayPartition(this.source, this.start, this.end);
    }

    next(): IteratorResult<T, any> {
        if(this.index < this.end){
            const value = this.source[this.index++];
            return iteratorResult(value);
        }

        return iteratorDone();
    }

    count(): number {
        return this.end - this.start;
    }
}