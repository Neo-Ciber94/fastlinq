import { IterableIterator, iteratorDone, iteratorResult } from "./IterableIterator";

export class ChunkIterable<T> extends IterableIterator<T[], ChunkIterable<T>>{
    private readonly source: Iterable<T>;
    private readonly iterator: Iterator<T>;
    private readonly chunkSize: number;
    private chunk?: T[];

    constructor(iterable: Iterable<T>, chunkSize: number) {
        if(chunkSize <= 0){
            throw new Error("Invalid chunk size, should be greater than 0: " +chunkSize);
        }

        super();
        this.source = iterable;
        this.iterator = iterable[Symbol.iterator]();
        this.chunkSize = chunkSize;
    }

    protected clone(): ChunkIterable<T> {
        return new ChunkIterable(this.source, this.chunkSize);
    }

    protected getNext(): IteratorResult<T[], any> {
        while(true){
            const next = this.iterator.next();

            if(next.done){
                if(this.chunk){
                    if(this.chunk.length === this.chunkSize || next.done){
                        const temp = iteratorResult(this.chunk);
                        this.chunk = undefined;
                        return temp;
                    }
                }

                return iteratorDone();
            }
            else{
                if(!this.chunk){
                    this.chunk = new Array<T>();
                }

                this.chunk.push(next.value);
                if(this.chunk.length === this.chunkSize || next.done){
                    const temp = iteratorResult(this.chunk);
                    this.chunk = undefined;
                    return temp;
                }
            }
        }
    }
}