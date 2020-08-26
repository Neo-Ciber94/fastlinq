import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";

export class AppendPrependIterator<T> extends IterableIterator<T, AppendPrependIterator<T>>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private readonly append: boolean;
    private readonly item: T;
    private hasItem: boolean = true;

    constructor(iterable: Iterable<T>, item: T, append: boolean){
        super();
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.item = item;
        this.append = append;
    }

    protected clone(): AppendPrependIterator<T> {
        return new AppendPrependIterator(this.source, this.item, this.append);
    }

    protected getNext(): IteratorResult<T, any> {
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