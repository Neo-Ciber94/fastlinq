import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";
import { SizedIterable } from "./SizedIterable";

export class AppendPrependIterable<T> implements IterableIterator<T>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private readonly append: boolean;
    private readonly item: T;
    private hasItem: boolean = true;

    constructor(iterable: Iterable<T>, item: T, append: boolean){
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.item = item;
        this.append = append;
    }

    [Symbol.iterator](): AppendPrependIterable<T> {
        return new AppendPrependIterable(this.source, this.item, this.append);
    }

    next(): IteratorResult<T, any> {
        if(this.append){
            const next = this.iterator.next();

            if(next.done && this.hasItem){
                this.hasItem = false;
                return iteratorResult(this.item);
            }

            return next;
        }
        else{
            if(this.hasItem){
                this.hasItem = false;
                return iteratorResult(this.item);
            }
            else{
                return this.iterator.next();
            }
        }
    }
}

export class AppendPrependArrayIterable<T> implements IterableIterator<T>, SizedIterable<T>{
    private readonly source: T[];
    private readonly append: boolean;
    private readonly item: T;
    private hasItem: boolean = true;
    private index: number;

    constructor(array: T[], item: T, append: boolean){
        this.source = array;
        this.item = item;
        this.append = append;
        this.index = 0;
    }

    [Symbol.iterator](): AppendPrependArrayIterable<T> {
        return new AppendPrependArrayIterable(this.source, this.item, this.append);
    }

    next(): IteratorResult<T, any> {
        if(!this.hasItem && this.index === this.source.length){
            return iteratorDone();
        }

        if(this.append){
            if(this.hasItem && this.index === this.source.length){
                this.hasItem = false;
                return iteratorResult(this.item);
            }

            return iteratorResult(this.source[this.index++]);
        }
        else{
            if(this.hasItem){
                this.hasItem = false;
                return iteratorResult(this.item);
            }
            else{
                return iteratorResult(this.source[this.index++]);
            }
        }
    }

    count(): number {
        return this.source.length;
    }
}