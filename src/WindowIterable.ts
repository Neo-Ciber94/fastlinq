import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";

export class WindowIterable<T> extends IterableIterator<T[]> {
    private readonly source: Iterable<T>;
    private readonly elements: T[];
    private readonly size: number;
    private index: number;

    constructor(iterable: Iterable<T>, size: number) {
        if(size <= 0){
            throw new Error("Invalid window size, should be greater than 0: " +size);
        }

        super();
        this.source = iterable;
        this.elements = Array.from(iterable);
        this.size = size;
        this.index = 0;
    }

    protected clone(): IterableIterator<T[]> {
        return new WindowIterable(this.source, this.size);
    }

    protected getNext(): IteratorResult<T[], any> {
        if((this.index + this.size) <= this.elements.length){
            const array = new Array<T>();
            const remaining = this.elements.length - this.index;
            const length = Math.min(this.size, remaining);

            for(let i = 0; i < length; i++){
                const value = this.elements[this.index + i];
                array.push(value);
            }

            this.index += 1;
            return iteratorResult(array);
        }
        else{
            return iteratorDone();
        }
    }
}