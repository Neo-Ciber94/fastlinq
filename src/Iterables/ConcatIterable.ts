import { IterableIterator } from "./IterableIterator";

export class ConcatIterable<T> extends IterableIterator<T> {
    private readonly source: Iterable<T>;
    private readonly other: Iterable<T>;
    private iterator: Iterator<T>;
    private isOther: boolean = false;

    constructor(iterable: Iterable<T>, other: Iterable<T>) {
        super();
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.other = other;
    }

    protected clone(): IterableIterator<T> {
        return new ConcatIterable(this.source, this.other);
    }

    protected getNext(): IteratorResult<T, any> {
        const next = this.iterator.next();

        if(next.done){
            if(!this.isOther){
                this.iterator = this.other[Symbol.iterator]();
                this.isOther = true;
                return this.getNext();
            }
        }

        return next;
    }
}