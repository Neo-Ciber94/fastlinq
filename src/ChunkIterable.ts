
export class ChunkIterable<T> implements Iterable<T[]> {
    private readonly iterable: Iterable<T>;
    private readonly chunkSize: number;

    constructor(iterable: Iterable<T>, chunkSize: number) {
        if(chunkSize <= 0){
            throw new Error("Invalid chunk size, should be greater than 0: " +chunkSize);
        }

        this.iterable = iterable;
        this.chunkSize = chunkSize;
    }

    *[Symbol.iterator](): Iterator<T[], any, undefined> {
        let array = new Array<T>();
        let count = 0;

        const iterator = this.iterable[Symbol.iterator]();

        while(true){
            const next = iterator.next();

            if(next.done){
                if(array.length > 0){
                    yield array;
                }

                break;
            }
            else{

                if(count === this.chunkSize){
                    yield array;
                    array = new Array<T>();
                    count = 0;
                }

                array.push(next.value);
                count += 1;
            }
        }
    }
}

